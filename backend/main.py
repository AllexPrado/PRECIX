# ==== INÍCIO DOS IMPORTS ÚNICOS ====
import os
import json
import io
import sys
import shutil
# ==== INÍCIO DOS IMPORTS ÚNICOS ====
import os
import json
import io
import sys
import shutil
import threading
import time
import requests
from datetime import datetime
from fastapi import FastAPI, HTTPException, UploadFile, File, Request, Body, Depends, Query
from typing import List, Dict, Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
try:
    from .database import (
        get_product_by_barcode, init_db, populate_example_data, get_db_connection, authenticate_admin,
        get_system_status, export_products_to_txt, get_all_stores, add_store, update_store, delete_store,
        get_all_devices, add_device, update_device, delete_device, set_device_online, set_device_offline,
        add_audit_log, get_audit_logs, get_device_audit_logs, upsert_agent_status, get_all_agents_status,
        upsert_products, delete_agent_status, update_agent_status, update_device_catalog_sync,
    get_device_by_identifier, bulk_upsert_agent_devices, get_agent_devices, delete_agent_device,
    replace_agent_stores, get_agent_stores, dedupe_agents, dedupe_agents_by_ip, get_latest_agent_by_ip,
    reassign_orphan_agent_devices_by_ip
    )
    from .static_middleware import mount_frontend
    from .ai_agent_integration import notify_ai_agent
    from .ia_event_log import router as ia_event_router
    from .auth_jwt import create_access_token, verify_access_token
    from .backup_restore import router as backup_restore_router
    from .device_store_router import router as device_store_router
    from .importador_precos import importar_todos_precos
    from .integration_config import create_integration_table, upsert_integration, get_integrations, update_integration_by_id, delete_integration
except ImportError:
    from database import (
        get_product_by_barcode, init_db, populate_example_data, get_db_connection, authenticate_admin,
        get_system_status, export_products_to_txt, get_all_stores, add_store, update_store, delete_store,
        get_all_devices, add_device, update_device, delete_device, set_device_online, set_device_offline,
        add_audit_log, get_audit_logs, get_device_audit_logs, upsert_agent_status, get_all_agents_status,
        upsert_products, delete_agent_status, update_agent_status, update_device_catalog_sync,
    get_device_by_identifier, bulk_upsert_agent_devices, get_agent_devices, delete_agent_device,
    replace_agent_stores, get_agent_stores, dedupe_agents, dedupe_agents_by_ip, get_latest_agent_by_ip,
    reassign_orphan_agent_devices_by_ip
    )
    from static_middleware import mount_frontend
    from ai_agent_integration import notify_ai_agent
    from ia_event_log import router as ia_event_router
    from auth_jwt import create_access_token, verify_access_token
    from backup_restore import router as backup_restore_router
    from device_store_router import router as device_store_router
    from importador_precos import importar_todos_precos
    from integration_config import create_integration_table, upsert_integration, get_integrations, update_integration_by_id, delete_integration
# ==== FIM DOS IMPORTS ÚNICOS ====

# Inicializa tabela de integrações ao iniciar o backend
create_integration_table()

# Logs de importação
_import_logs = []
class ImportLogCatcher(io.StringIO):
    def write(self, txt):
        super().write(txt)
        _import_logs.append(txt)
        if len(_import_logs) > 100:
            _import_logs.pop(0)
_old_stdout = sys.stdout
sys.stdout = ImportLogCatcher()

# Diretório público do frontend
FRONTEND_PUBLIC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'public'))


# Criação única do app
app = FastAPI()
app.include_router(ia_event_router)
app.include_router(backup_restore_router)
app.include_router(device_store_router)
security = HTTPBearer()

# Deduplicação defensiva na inicialização (id canônico e por IP)
try:
    dedupe_agents()
    dedupe_agents_by_ip()
    reassign_orphan_agent_devices_by_ip()
except Exception:
    pass

# --- Endpoint para agentes locais ---
@app.get('/admin/agents')
def listar_agentes(include_fakes: bool = Query(False, description="Se falso, tenta ocultar agentes simulados/fictícios")):
    """Retorna lista de agentes do banco, ajustando chaves para o painel."""
    # Antes de listar, tenta reatribuir devices órfãos
    try:
        reassign_orphan_agent_devices_by_ip()
    except Exception:
        pass
    rows = get_all_agents_status()
    out = []
    seen = set()
    now = datetime.now()
    for r in rows:
        rec = dict(r)
        # Normaliza ID esperado pelo frontend
        rec['id'] = (rec.get('agent_id') or rec.get('id') or '').strip().lower()
        if not rec['id']:
            continue
        if rec['id'] in seen:
            # deduplica
            continue
        seen.add(rec['id'])
        # Opcional: remove itens claramente fictícios pelo ID conhecido/padrão
        if not include_fakes and rec.get('id') in (None, '', 'cli-check-01', 'fake-agent', 'simulador'):
            continue
        # Calcula status online/offline por frescor do last_update (fallback para status salvo)
        last = rec.get('last_update') or rec.get('ultima_atualizacao')
        status_calc = None
        # Normaliza formato de last_update para ISO 8601 quando possível
        normalized_last = None
        try:
            if last:
                # aceita 'YYYY-mm-dd HH:MM:SS'
                try:
                    dt = datetime.strptime(str(last), '%Y-%m-%d %H:%M:%S')
                except Exception:
                    # aceita '%d/%m/%Y, %H:%M:%S'
                    from datetime import datetime as _dt
                    dt = _dt.strptime(str(last), '%d/%m/%Y, %H:%M:%S')
                diff = (now - dt).total_seconds()
                # relaxa a janela para 120s para evitar flutuação
                status_calc = 'online' if diff <= 120 else 'offline'
                normalized_last = dt.isoformat(timespec='seconds')
        except Exception:
            status_calc = None
            normalized_last = None
        if normalized_last:
            rec['last_update'] = normalized_last
            # também mantém campo legível se o frontend quiser exibir raw
            rec['ultima_atualizacao'] = dt.strftime('%d/%m/%Y, %H:%M:%S')
        rec['status'] = status_calc or rec.get('status') or 'offline'
        # Enriquecer com lojas vinculadas
        try:
            rec['lojas'] = get_agent_stores(rec['id'])
            # Se não veio loja_nome direto, deriva da primeira loja vinculada
            if not rec.get('loja_nome') and rec.get('lojas'):
                rec['loja_nome'] = rec['lojas'][0].get('loja_nome')
                rec['loja_codigo'] = rec.get('loja_codigo') or rec['lojas'][0].get('loja_codigo')
        except Exception:
            rec['lojas'] = []
        # Anexa devices legados (se houver)
        try:
            rec['devices'] = get_agent_devices(rec['id'])
        except Exception:
            rec['devices'] = []
        out.append(rec)
    return out

@app.post('/admin/agents/status')
async def upsert_agent_status_handler(request: Request):
    """Recebe heartbeat/status do agente local e persiste no banco para o painel.
    Espera JSON: { agent_id, status, last_update, loja_codigo?, loja_nome?, ip? }
    """
    try:
        data = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail='Invalid JSON payload')
    # Normaliza agent_id para evitar duplicados por case/espacos
    agent_id = (data.get('agent_id') or '').strip().lower()
    if not agent_id:
        raise HTTPException(status_code=400, detail='agent_id é obrigatório')
    loja_codigo = data.get('loja_codigo')
    loja_nome = data.get('loja_nome') or data.get('store_name')
    status = data.get('status') or 'online'
    last_update = data.get('last_update') or datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    # Preferir IP do request (edge/gateway) para evitar colisões com '127.0.0.1' enviados pelo agente
    # Descobre IP real: respeita X-Forwarded-For / X-Real-IP se existir (proxy/reverso)
    def _client_ip(req: Request):
        try:
            if not req:
                return None
            xf = req.headers.get('x-forwarded-for') or req.headers.get('X-Forwarded-For')
            if xf:
                # pode conter lista, pega o primeiro não vazio
                parts = [p.strip() for p in xf.split(',') if p.strip()]
                if parts:
                    return parts[0]
            xr = req.headers.get('x-real-ip') or req.headers.get('X-Real-IP')
            if xr:
                return xr.strip()
            return req.client.host if req.client else None
        except Exception:
            return req.client.host if req and req.client else None
    req_ip = _client_ip(request)
    ip = req_ip or data.get('ip')
    # Coalescer agentes do mesmo IP (sem janela de tempo) e normalizar id já existente
    try:
        # 1) Se já existe um agent_id para este IP, usa o mais recente
        same_ip_id = get_latest_agent_by_ip(ip)
        if same_ip_id:
            agent_id = same_ip_id
    except Exception:
        pass
    try:
        upsert_agent_status(agent_id, loja_codigo=loja_codigo, loja_nome=loja_nome, status=status, last_update=last_update, ip=ip)
        # Dedup pós-upsert para capturar corridas entre processos (GUI/Serviço)
        try:
            dedupe_agents(); dedupe_agents_by_ip(); reassign_orphan_agent_devices_by_ip()
        except Exception:
            pass
        # opcional: lista de lojas vinculadas
        lojas = data.get('lojas')
        if isinstance(lojas, list):
            replace_agent_stores(agent_id, lojas)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/admin/agents/summary')
def agents_summary():
    """Resumo simples de monitoramento: total/online/offline."""
    rows = listar_agentes()
    total = len(rows)
    online = sum(1 for r in rows if str(r.get('status')).lower() == 'online')
    offline = total - online
    return {"total": total, "online": online, "offline": offline}

# Edição/Exclusão de agentes (manutenção)
@app.delete('/admin/agents/{agent_id}')
def delete_agent(agent_id: str):
    try:
        delete_agent_status(agent_id)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put('/admin/agents/{agent_id}')
def edit_agent(agent_id: str, data: dict = Body(...)):
    try:
        loja_codigo = data.get('loja_codigo')
        loja_nome = data.get('loja_nome')
        status = data.get('status')
        ip = data.get('ip')
        last_update = data.get('last_update')
        update_agent_status(agent_id, loja_codigo=loja_codigo, loja_nome=loja_nome, status=status, ip=ip, last_update=last_update)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Legacy devices reportados via Agente Local ---
@app.post('/admin/agents/{agent_id}/devices')
def upsert_agent_devices(agent_id: str, payload: dict = Body(...), request: Request = None):
    """Recebe lista de devices legados de um agente local.
    Body: { devices: [ {identifier, name?, tipo?, status?, ip?, last_update?, last_catalog_sync?, catalog_count?}, ... ] }
    """
    try:
        # Normaliza para o agent_id canônico pelo IP do request se possível
        try:
            req_ip = _client_ip(request)
            canon = get_latest_agent_by_ip(req_ip)
            if canon:
                agent_id = canon
        except Exception:
            pass
        devices = payload.get('devices') or []
        # Sanitiza e ignora entradas sem identifier
        devices = [d for d in devices if str(d.get('identifier') or '').strip()]
        bulk_upsert_agent_devices(agent_id, devices)
        # Após inserir, reatribui possíveis órfãos
        try:
            reassign_orphan_agent_devices_by_ip()
        except Exception:
            pass
        return {"success": True, "count": len(devices)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Heartbeat simples por device do agente (mais fácil de integrar)
@app.post('/admin/agents/{agent_id}/devices/heartbeat')
def agent_device_heartbeat(agent_id: str, data: dict = Body(...), request: Request = None):
    """Marca um device legado como online com last_update atual.
    Body: { identifier?, ip?, port?, name?, status? }
    - Se não vier identifier, será montado como "PC-<ip>:<port>" (port padrão 21)
    """
    try:
        ip = (data.get('ip') or '').strip()
        port = str(data.get('port') or '21').strip()
        identifier = (data.get('identifier') or '').strip()
        if not identifier:
            if not ip:
                raise HTTPException(status_code=400, detail='identifier ou ip são obrigatórios')
            identifier = f'PC-{ip}:{port}'
        name = data.get('name') or 'PC'
        status = data.get('status') or 'online'
        from datetime import datetime as _dt
        # Usa horário local para bater com a janela de 120s
        now = _dt.now().isoformat()
        # Persistir/atualizar apenas este device
        from database import upsert_agent_device
        # Normaliza agent_id pelo IP do request
        try:
            req_ip = _client_ip(request)
            canon = get_latest_agent_by_ip(req_ip)
            if canon:
                agent_id = canon
        except Exception:
            pass
        upsert_agent_device(
            agent_id=agent_id,
            identifier=identifier,
            name=name,
            tipo='LEGACY',
            status=status,
            last_update=now,
            ip=ip
        )
        try:
            reassign_orphan_agent_devices_by_ip()
        except Exception:
            pass
        return {"success": True, "identifier": identifier, "last_update": now}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/admin/agents/{agent_id}/devices')
def list_agent_devices(agent_id: str):
    try:
        return get_agent_devices(agent_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete('/admin/agents/{agent_id}/devices/{identifier}')
def remove_agent_device(agent_id: str, identifier: str):
    try:
        delete_agent_device(agent_id, identifier)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Eventos de dispositivos (consultas de preço e sincronizações) ---
_device_events = []  # memória recente

def _push_device_event(event: dict):
    try:
        from datetime import datetime as _dt
        event['timestamp'] = event.get('timestamp') or _dt.utcnow().isoformat()
        _device_events.append(event)
        if len(_device_events) > 500:
            _device_events.pop(0)
    except Exception:
        pass

@app.post('/admin/devices/events/price-query')
def log_price_query(data: dict = Body(...)):
    """Registra consulta de preço por um equipamento.
    Espera: { identifier, barcode, ok: bool, price?, error? }
    """
    identifier = (data.get('identifier') or '').strip()
    barcode = (data.get('barcode') or '').strip()
    ok = bool(data.get('ok'))
    price = data.get('price')
    error = data.get('error')
    if not identifier or not barcode:
        raise HTTPException(status_code=400, detail='identifier e barcode são obrigatórios')
    # Guardar em memória e auditar básico
    action = 'PRICE_QUERY_OK' if ok else 'PRICE_QUERY_FAIL'
    add_audit_log(None, identifier, action, json.dumps({'barcode': barcode, 'price': price, 'error': error}, ensure_ascii=False))
    _push_device_event({'type': 'price_query', 'identifier': identifier, 'barcode': barcode, 'ok': ok, 'price': price, 'error': error})
    return {"success": True}

@app.post('/admin/devices/events/catalog-sync')
def log_catalog_sync(data: dict = Body(...)):
    """Registra sincronização de catálogo feita por um equipamento PWA.
    Espera: { identifier, total_products, timestamp? }
    """
    identifier = (data.get('identifier') or '').strip()
    total = data.get('total_products')
    timestamp = data.get('timestamp')
    if not identifier:
        raise HTTPException(status_code=400, detail='identifier é obrigatório')
    update_device_catalog_sync(identifier, total_products=int(total or 0), timestamp=timestamp)
    _push_device_event({'type': 'catalog_sync', 'identifier': identifier, 'total_products': int(total or 0)})
    return {"success": True}

@app.get('/admin/devices/events')
def list_device_events(limit: int = Query(100, ge=1, le=500), identifier: str = Query(None), store_id: int = Query(None)):
    """Lista eventos recentes (consultas e syncs) com filtros opcionais por identifier e store_id."""
    evts = _device_events[-500:]
    # Filtra por identifier
    if identifier:
        evts = [e for e in evts if str(e.get('identifier')) == str(identifier)]
    # Filtra por store_id (mapeando identifiers conhecidos no banco)
    if store_id is not None:
        try:
            devices = get_all_devices()
            idents = {d.get('identifier') for d in devices if str(d.get('store_id')) == str(store_id)}
            evts = [e for e in evts if e.get('identifier') in idents]
        except Exception:
            pass
    return list(reversed(evts[-limit:]))

# Health events from Local Agent (online/offline transitions)
@app.post('/admin/devices/events/health')
def device_health_event(event: dict = Body(...)):
    """Registra eventos de saúde de dispositivos reportados pelo Agente Local.
    Espera: { identifier, status: 'online'|'offline', previous?, agent_id?, ip?, ts? }
    """
    try:
        identifier = (event.get('identifier') or '').strip()
        status = (event.get('status') or '').strip().lower()
        if not identifier or status not in ('online', 'offline'):
            raise HTTPException(status_code=400, detail='identifier e status (online/offline) são obrigatórios')
        ev = {
            'type': 'health',
            'identifier': identifier,
            'status': status,
            'previous': event.get('previous'),
            'agent_id': event.get('agent_id'),
            'ip': event.get('ip'),
            'timestamp': event.get('ts'),
        }
        _push_device_event(ev)
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
security = HTTPBearer()

# Inclusão dos routers
app.include_router(ia_event_router)
app.include_router(backup_restore_router)
app.include_router(device_store_router)

# Endpoints de importação de preços
@app.post('/admin/importar-precos')
def acionar_importacao():
    """
    Aciona manualmente a rotina de importação de preços para todas as integrações ativas.
    """
    try:
        importar_todos_precos()
        return {"success": True, "message": "Importação executada."}
    except Exception as e:
        return {"success": False, "message": str(e)}

@app.get('/admin/importar-precos/logs')
def get_import_logs():
    """
    Retorna os últimos logs de importação de preços.
    """
    return {"logs": _import_logs[-50:]}

# Endpoints de integração de preços
@app.get('/admin/integracoes')
def listar_integracoes(loja_id: int = Query(None)):
    """
    Lista integrações de preço cadastradas. Se loja_id for informado, filtra por loja.
    """
    return get_integrations(loja_id)



@app.post('/admin/integracoes')
def salvar_integracao(data: dict = Body(...)):
    """
    Adiciona ou atualiza uma integração de preço para uma loja ou global, incluindo layout do arquivo.
    """
    id_ = data.get('id')
    # Coerção de loja_id vindo do UI (pode ser '', 'null', null, número)
    raw_loja = data.get('loja_id')
    if raw_loja in (None, '', 'null'):
        loja_id = None
    else:
        try:
            loja_id = int(raw_loja)
        except Exception:
            loja_id = None
    tipo = data.get('tipo')
    parametro1 = data.get('parametro1')
    parametro2 = data.get('parametro2')
    ativo = data.get('ativo', 1)
    layout = data.get('layout')
    # Validação básica
    if not tipo or not parametro1:
        return {"success": False, "message": "Campos obrigatórios: tipo e parametro1"}
    if id_ is not None:
        # Atualiza pelo id
        update_integration_by_id(id_, loja_id, tipo, parametro1, parametro2, ativo, layout)
    else:
        # Insere ou atualiza por (loja_id, tipo)
        upsert_integration(loja_id, tipo, parametro1, parametro2, ativo, layout)
    return {"success": True}

# Testa uma integração do tipo API (sem salvar), útil para o modal
@app.post('/admin/integracoes/testar-api')
def testar_integracao_api(data: dict = Body(...)):
    url = (data.get('url') or data.get('parametro1') or '').strip()
    token = (data.get('token') or data.get('parametro2') or '').strip()
    if not url:
        return {"success": False, "message": "Informe a URL da API."}
    headers = {}
    if token:
        headers['Authorization'] = f'Bearer {token}'
    try:
        r = requests.get(url, headers=headers, timeout=8)
        r.raise_for_status()
        try:
            js = r.json()
        except Exception:
            return {"success": False, "message": "A resposta não é JSON válido."}
        count = len(js) if isinstance(js, list) else (len(js.keys()) if isinstance(js, dict) else 1)
        sample = js[0] if isinstance(js, list) and js else js
        # Não retornar payload completo para não poluir a UI
        return {"success": True, "status": r.status_code, "count": int(count), "sample": sample if isinstance(sample, dict) else None}
    except Exception as e:
        return {"success": False, "message": str(e)}

@app.post('/admin/devices/register')
async def register_device_by_store_code(request: Request):
    data = await request.json()
    store_codigo = data.get('store_codigo')
    name = data.get('name')
    identifier = data.get('identifier')
    if not store_codigo or not name or not identifier:
        return {"success": False, "message": "Todos os campos são obrigatórios (store_codigo, name, identifier)."}
    from database import get_store_by_code, add_device
    store = get_store_by_code(str(store_codigo).strip())
    if not store:
        return {"success": False, "message": f"Loja com código {store_codigo} não encontrada."}
    store_id = store['id']
    add_device(store_id, name, identifier=identifier)
    return {"success": True, "message": "Equipamento registrado com sucesso."}


BANNERS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'banners'))
os.makedirs(BANNERS_DIR, exist_ok=True)
import logging

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    username = verify_access_token(token)
    if not username:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")
    return username

@app.get('/admin/status')
@app.get('/admin/status')
def admin_status():
    status = get_system_status()
    # Determina status online: se existe pelo menos 1 device online
    devices = get_all_devices()
    online = any([d.get('online') for d in devices])
    # Busca último backup
    try:
        from backup_restore import get_last_backup
        backup = get_last_backup()
        last_backup = backup['timestamp'] if backup and 'timestamp' in backup else None
    except Exception:
        last_backup = None
    status['online'] = online
    status['last_backup'] = last_backup
    return JSONResponse(content=status)

# Endpoint para servir favicon.ico
@app.get('/favicon.ico')
def favicon():
    file_path = os.path.join(FRONTEND_PUBLIC_DIR, 'favicon.ico')
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail='favicon not found')

# Endpoint simples de healthcheck para monitoramento
@app.get('/health')
def health():
    return {"status": "ok"}


# Inicializa o banco de dados e popula com dados de exemplo ao iniciar o app
@app.on_event("startup")
def startup():
    init_db()
    populate_example_data()

@app.get("/status")
async def system_status():
    # Verifica o status do sistema
    status = get_system_status()
    return JSONResponse(content=status)

@app.post("/notify-ai-agent/")
async def notify_agent(request: Request):
    # Notifica o agente AI sobre uma nova requisição
    data = await request.json()
    response = notify_ai_agent(data)
    return JSONResponse(content=response)

# Resto dos endpoints e lógica da aplicação... (continua com todo o conteúdo do main_backup_20250730.py, linha a linha, até o final)

# Endpoint para listar banners filtrando por loja
from fastapi import Query
@app.get('/admin/banners')
def list_banners(store_id: str = Query(None)):
    files = [f for f in os.listdir(BANNERS_DIR) if f.lower().endswith((".jpg", ".jpeg", ".png", ".gif", ".webp"))]
    meta_path = os.path.join(BANNERS_DIR, 'banners_meta.json')
    meta = {}
    if os.path.exists(meta_path):
        try:
            with open(meta_path, 'r', encoding='utf-8') as f:
                meta = json.load(f)
        except Exception:
            meta = {}
    filtered = []
    import logging
    logging.info(f"[BANNERS] list_banners chamado com store_id={store_id}")
    for f in files:
        m = meta.get(f, {})
        # Padroniza store_id: sempre string, sem espaços
        meta_store_id = str(m.get('store_id')).strip() if m.get('store_id') is not None else None
        req_store_id = str(store_id).strip() if store_id is not None else None
        all_stores_flag = bool(m.get('all_stores'))
        logging.info(f"[BANNERS][DEBUG] Banner: {f} | meta_store_id: '{meta_store_id}' | req_store_id: '{req_store_id}' | all_stores: {all_stores_flag}")
        if all_stores_flag:
            filtered.append({"filename": f, "url": f"/admin/banners/{f}"})
        elif req_store_id and meta_store_id and meta_store_id == req_store_id:
            filtered.append({"filename": f, "url": f"/admin/banners/{f}"})
    logging.info(f"[BANNERS] Retornando {len(filtered)} banners para store_id={store_id}")
    return filtered


# Endpoint para receber atualizações em lote (bulk) de produtos
@app.post('/admin/products/bulk')
def admin_products_bulk(payload: Union[List[Dict], Dict, str] = Body(...), username: str = Depends(get_current_user)):
    """Recebe produtos e faz upsert no banco local.

    Aceita formatos:
    - Lista de produtos: [ {barcode, name, price, promo?}, ... ]
    - Objeto com chave 'produtos' ou 'products': { produtos: [...]} ou { products: [...] }
    - Objeto de um único produto: { barcode, name, price }
    """
    try:
        data_list: List[Dict] = []
        # Normaliza para lista de dicionários
        if isinstance(payload, list):
            data_list = [p for p in payload if isinstance(p, dict)]
        elif isinstance(payload, dict):
            if isinstance(payload.get('produtos'), list):
                data_list = [p for p in payload.get('produtos') if isinstance(p, dict)]
            elif isinstance(payload.get('products'), list):
                data_list = [p for p in payload.get('products') if isinstance(p, dict)]
            else:
                # considera como um único produto
                data_list = [payload]
        elif isinstance(payload, str):
            try:
                parsed = json.loads(payload)
                if isinstance(parsed, list):
                    data_list = [p for p in parsed if isinstance(p, dict)]
                elif isinstance(parsed, dict):
                    if isinstance(parsed.get('produtos'), list):
                        data_list = [p for p in parsed.get('produtos') if isinstance(p, dict)]
                    elif isinstance(parsed.get('products'), list):
                        data_list = [p for p in parsed.get('products') if isinstance(p, dict)]
                    else:
                        data_list = [parsed]
            except Exception:
                raise HTTPException(status_code=400, detail='Payload inválido (string não é JSON válido)')

        if not data_list:
            raise HTTPException(status_code=400, detail='Nenhum produto válido no payload')

        result = upsert_products(data_list)
        # registra auditoria
        try:
            add_audit_log(None, None, 'PRODUCTS_BULK_UPSERT', json.dumps({'user': username, 'result': result}, ensure_ascii=False))
        except Exception:
            pass
        return JSONResponse(content={'success': True, 'result': result})
    except HTTPException:
        raise
    except Exception as e:
        logging.exception('Erro no endpoint admin/products/bulk')
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint para servir banner individual
@app.get('/admin/banners/{filename}')
def get_banner(filename: str):
    file_path = os.path.join(BANNERS_DIR, filename)
    if not os.path.exists(file_path):
        return {"success": False, "message": "Arquivo não encontrado."}
    return FileResponse(file_path)

# Endpoint para deletar banner
@app.delete('/admin/banners/{filename}')
def delete_banner(filename: str):
    file_path = os.path.join(BANNERS_DIR, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"success": True}
    return {"success": False, "message": "Arquivo não encontrado."}

# Endpoint para fazer upload de banner




@app.post('/admin/banners/upload')
async def upload_banner(request: Request, username: str = Depends(get_current_user)):
    import logging
    form = await request.form()
    file = form.get('file')
    store_id = form.get('store_id')
    all_stores = form.get('all_stores')
    logging.info(f"[UPLOAD] username={username} file={getattr(file, 'filename', None)} store_id={store_id} all_stores={all_stores}")
    # Validação: arquivo obrigatório
    if not file or not hasattr(file, 'filename'):
        logging.error("[UPLOAD] Falta arquivo de imagem.")
        raise HTTPException(status_code=400, detail="Arquivo de imagem obrigatório.")
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
        logging.error(f"[UPLOAD] Formato não suportado: {file_ext}")
        raise HTTPException(status_code=400, detail="Formato de arquivo não suportado.")
    if not store_id and not all_stores:
        logging.error("[UPLOAD] Falta store_id e all_stores.")
        raise HTTPException(status_code=400, detail="É obrigatório informar a loja ou marcar 'todas as lojas'.")
    # Salva arquivo
    file_path = os.path.join(BANNERS_DIR, file.filename)
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        logging.info(f"[UPLOAD] Arquivo salvo em {file_path}")
    except Exception as e:
        logging.error(f"[UPLOAD] Erro ao salvar arquivo: {e}")
        raise HTTPException(status_code=500, detail="Erro ao salvar arquivo.")
    # Salva metadados do banner
    meta_path = os.path.join(BANNERS_DIR, 'banners_meta.json')
    try:
        if os.path.exists(meta_path):
            with open(meta_path, 'r', encoding='utf-8') as f:
                meta = json.load(f)
        else:
            meta = {}
    except Exception as e:
        logging.error(f"[UPLOAD] Erro ao ler banners_meta.json: {e}")
        meta = {}
    # Padroniza store_id para string limpa
    store_id_clean = str(store_id).strip() if store_id else None
    all_stores_flag = str(all_stores).lower() in ['1', 'true', 'on', 'yes'] if all_stores is not None else False
    logging.info(f"[UPLOAD][DEBUG] Salvando banner: {getattr(file, 'filename', None)} | store_id: '{store_id}' | store_id_clean: '{store_id_clean}' | all_stores: {all_stores_flag} | uploaded_by: {username}")
    meta[file.filename] = {
        'store_id': store_id_clean,
        'all_stores': all_stores_flag,
        'uploaded_by': username
    }
    try:
        with open(meta_path, 'w', encoding='utf-8') as f:
            json.dump(meta, f, ensure_ascii=False, indent=2)
        logging.info(f"[UPLOAD] Metadados salvos para {file.filename}")
    except Exception as e:
        logging.error(f"[UPLOAD] Erro ao salvar banners_meta.json: {e}")
        raise HTTPException(status_code=500, detail="Erro ao salvar metadados.")
    return {"success": True, "filename": file.filename}

# Configuração básica de logs
logging.basicConfig(level=logging.INFO)

# Permitir CORS em desenvolvimento (frontend separado)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.on_event('startup')
def startup():
    init_db()
    # Cria usuário admin padrão se não existir nenhum
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT COUNT(*) as total FROM admin_users')
    total = cur.fetchone()['total']
    if total == 0:
        cur.execute('INSERT INTO admin_users (username, password) VALUES (?, ?)', ('admin', 'admin'))
        conn.commit()
        import logging
        logging.info('Usuário admin padrão criado: admin/admin')
    conn.close()
    # Deduplica agentes existentes e normaliza IDs
    try:
        from database import dedupe_agents
        dedupe_agents()
    except Exception:
        pass
    notify_ai_agent('startup', {'source': 'backend', 'info': 'Backend iniciado'})
    start_ia_healthcheck()  # Inicia monitoramento proativo

# --- Funções auxiliares de automação IA ---
IA_AUTONOMOUS_ACTIONS_LOG = os.path.join(os.path.dirname(__file__), 'logs', 'ia_autonomous_actions.log')
os.makedirs(os.path.dirname(IA_AUTONOMOUS_ACTIONS_LOG), exist_ok=True)

def log_ia_autonomous_action(action, result, details=None):
    entry = {
        'timestamp': datetime.now().isoformat(),
        'action': action,
        'result': result,
        'details': details or {}
    }
    with open(IA_AUTONOMOUS_ACTIONS_LOG, 'a', encoding='utf-8') as f:
        f.write(json.dumps(entry, ensure_ascii=False) + '\n')

def ia_autonomous_check_devices():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id, name, identifier, last_sync, online FROM devices')
    now = datetime.now()
    offline_count = 0
    for row in cur.fetchall():
        last_sync = row['last_sync']
        online = row['online']
        if last_sync:
            try:
                last_dt = datetime.fromisoformat(last_sync)
            except Exception:
                continue
            diff = (now - last_dt).total_seconds() / 60
            if diff > 10 and online:
                set_device_offline(row['id'])
                log_ia_autonomous_action(
                    action='set_device_offline',
                    result='success',
                    details={'device_id': row['id'], 'name': row['name'], 'identifier': row['identifier'], 'reason': f'No heartbeat for {diff:.1f} min'}
                )
                notify_ai_agent('device_offline_auto', {'device_id': row['id'], 'name': row['name'], 'identifier': row['identifier'], 'reason': f'No heartbeat for {diff:.1f} min'})
                offline_count += 1
    conn.close()
    return offline_count

def ia_autonomous_cleanup_logs():
    from datetime import datetime, timedelta
    conn = get_db_connection()
    cur = conn.cursor()
    # Remove logs com mais de 30 dias
    limite = (datetime.utcnow() - timedelta(days=30)).isoformat()
    cur.execute('DELETE FROM audit_log WHERE timestamp < ?', (limite,))
    removidos = cur.rowcount
    conn.commit()
    conn.close()
    log_ia_autonomous_action(
        action='cleanup_logs',
        result='success',
        details={'removed_logs': removidos, 'older_than': limite}
    )
    return removidos

def ia_autonomous_fix_product_data():
    conn = get_db_connection()
    cur = conn.cursor()
    # Corrige produtos com nome vazio
    cur.execute("UPDATE products SET name = 'Produto sem nome' WHERE name IS NULL OR TRIM(name) = ''")
    nome_corrigido = cur.rowcount
    # Corrige preços negativos ou nulos
    cur.execute("UPDATE products SET price = 0.01 WHERE price IS NULL OR price <= 0")
    preco_corrigido = cur.rowcount
    # Corrige promoções inconsistentes (promo nulo vira string vazia)
    cur.execute("UPDATE products SET promo = '' WHERE promo IS NULL")
    promo_corrigido = cur.rowcount
    conn.commit()
    conn.close()
    total = nome_corrigido + preco_corrigido + promo_corrigido
    log_ia_autonomous_action(
        action='fix_product_data',
        result='success',
        details={'name_fixed': nome_corrigido, 'price_fixed': preco_corrigido, 'promo_fixed': promo_corrigido}
    )
    return total

def ia_autonomous_fix_outlier_prices():
    conn = get_db_connection()
    cur = conn.cursor()
    # Busca todos os preços válidos
    cur.execute("SELECT price FROM products WHERE price IS NOT NULL AND price > 0 ORDER BY price")
    prices = [row['price'] for row in cur.fetchall()]
    if not prices:
        conn.close()
        return 0
    # Calcula mediana
    n = len(prices)
    if n % 2 == 1:
        mediana = prices[n // 2]
    else:
        mediana = (prices[n // 2 - 1] + prices[n // 2]) / 2
    # Define limites de outlier (ex: 10x acima ou 0.1x abaixo da mediana)
    limite_sup = mediana * 10
    limite_inf = mediana * 0.1
    # Corrige preços muito altos
    cur.execute("UPDATE products SET price = ? WHERE price > ?", (limite_sup, limite_sup))
    acima = cur.rowcount
    # Corrige preços muito baixos (mas > 0)
    cur.execute("UPDATE products SET price = ? WHERE price < ? AND price > 0", (limite_inf, limite_inf))
    abaixo = cur.rowcount
    conn.commit()
    conn.close()
    total = acima + abaixo
    log_ia_autonomous_action(
        action='fix_outlier_prices',
        result='success',
        details={'fixed_above': acima, 'fixed_below': abaixo, 'median': mediana, 'limit_sup': limite_sup, 'limit_inf': limite_inf}
    )
    return total

# --- IA Monitoramento Proativo e Otimização do Sistema ---
HEALTHCHECK_ENDPOINTS = [
    '/admin/status',
    '/admin/devices',
    '/admin/stores',
    '/product/all',
    '/health'
]

HEALTHCHECK_LOG = os.path.join(os.path.dirname(__file__), 'logs', 'healthcheck.log')
os.makedirs(os.path.dirname(HEALTHCHECK_LOG), exist_ok=True)

# Função para checar endpoints periodicamente
def ia_healthcheck_loop():
    while True:
        results = []
        for ep in HEALTHCHECK_ENDPOINTS:
            try:
                url = f'http://127.0.0.1:8000{ep}'
                r = requests.get(url, timeout=5)
                status = r.status_code
                ok = status == 200
            except Exception as e:
                ok = False
                status = str(e)
            results.append({'endpoint': ep, 'ok': ok, 'status': status, 'timestamp': time.strftime('%Y-%m-%dT%H:%M:%S')})
        # Loga resultado
        with open(HEALTHCHECK_LOG, 'a', encoding='utf-8') as f:
            for res in results:
                f.write(json.dumps(res, ensure_ascii=False) + '\n')
        # Notifica IA se algum endpoint falhar
        for res in results:
            if not res['ok']:
                notify_ai_agent('healthcheck_fail', res)
        # Executa automações autônomas da IA a cada ciclo
        try:
            ia_autonomous_execute_all()
        except Exception as e:
            log_ia_autonomous_action('autonomous_execute', 'fail', {'error': str(e)})
        time.sleep(60)  # roda a cada 1 min

def start_ia_healthcheck():
    t = threading.Thread(target=ia_healthcheck_loop, daemon=True)
    t.start()

OPTIMIZATION_LOG = os.path.join(os.path.dirname(__file__), 'logs', 'optimization_suggestions.log')

def ia_analyze_logs_and_optimize():
    # Exemplo: IA analisa healthcheck.log e sugere melhorias
    if not os.path.exists(HEALTHCHECK_LOG):
        return
    with open(HEALTHCHECK_LOG, 'r', encoding='utf-8') as f:
        lines = f.readlines()[-100:]
    issues = [json.loads(l) for l in lines if not json.loads(l)['ok']]
    if issues:
        suggestion = {
            'timestamp': time.strftime('%Y-%m-%dT%H:%M:%S'),
            'suggestion': f"Foram detectados {len(issues)} falhas recentes em endpoints. Recomenda-se revisar logs e infraestrutura.",
            'issues': issues
        }
        with open(OPTIMIZATION_LOG, 'a', encoding='utf-8') as f:
            f.write(json.dumps(suggestion, ensure_ascii=False) + '\n')
        notify_ai_agent('optimization_suggestion', suggestion)

@app.get('/admin/ia-health-dashboard')
def ia_health_dashboard():
    # Últimos healthchecks
    health = []
    if os.path.exists(HEALTHCHECK_LOG):
        with open(HEALTHCHECK_LOG, 'r', encoding='utf-8') as f:
            health = [json.loads(l) for l in f.readlines()[-20:]]
    # Últimas sugestões de otimização
    optim = []
    if os.path.exists(OPTIMIZATION_LOG):
        with open(OPTIMIZATION_LOG, 'r', encoding='utf-8') as f:
            optim = [json.loads(l) for l in f.readlines()[-10:]]
    return {
        'healthchecks': health,
        'optimizations': optim
    }

@app.post('/admin/ia-analyze-logs')
def ia_analyze_logs_endpoint():
    ia_analyze_logs_and_optimize()
    return {'success': True, 'message': 'Análise de logs e sugestão de otimização executada.'}

@app.on_event('startup')
def startup():
    init_db()
    # Cria usuário admin padrão se não existir nenhum
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT COUNT(*) as total FROM admin_users')
    total = cur.fetchone()['total']
    if total == 0:
        cur.execute('INSERT INTO admin_users (username, password) VALUES (?, ?)', ('admin', 'admin'))
        conn.commit()
        import logging
        logging.info('Usuário admin padrão criado: admin/admin')
    conn.close()
    notify_ai_agent('startup', {'source': 'backend', 'info': 'Backend iniciado'})
    start_ia_healthcheck()  # Inicia monitoramento proativo

# Endpoint para retornar todos os produtos (para sync do frontend)
@app.get('/product/all')
def get_all_products():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT barcode, name, price, promo FROM products')
    rows = cur.fetchall()
    conn.close()
    # Corrige preço para reais se estiver em centavos
    produtos = []
    for row in rows:
        produto = dict(row)
        preco = produto['price']
        # Se o preço for menor que 1 e não for zero, provavelmente está em centavos
        if preco and preco < 1:
            produto['price'] = round(preco * 100, 2)
        produtos.append(produto)
    notify_ai_agent('sync_success', {'source': 'backend', 'info': 'Produtos sincronizados'})
    return produtos

# Alias legacy para compatibilidade com agentes locais antigos
@app.get('/api/produtos')
def alias_api_produtos():
    return get_all_products()

# Endpoint de login admin
from fastapi.responses import JSONResponse
@app.post('/admin/login')
async def admin_login(request: Request):
    data = await request.json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return JSONResponse(status_code=400, content={"success": False, "message": "Usuário e senha obrigatórios"})
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM admin_users WHERE username = ?', (username,))
    user = cur.fetchone()
    conn.close()
    if user and authenticate_admin(username, password):
        role = user['role'] if 'role' in user.keys() else 'admin'
        store_id = user['store_id'] if 'store_id' in user.keys() else None
        permissoes = user['permissoes'] if 'permissoes' in user.keys() else None
        # Converte permissoes de string JSON para array, se necessário
        if permissoes:
            try:
                permissoes = json.loads(permissoes)
            except Exception:
                permissoes = []
        else:
            permissoes = []
        access_token = create_access_token({"sub": username, "role": role})
        # Busca o codigo da loja se houver store_id
        store_codigo = None
        if store_id:
            from database import get_store_by_code
            store = None
            try:
                store = get_store_by_code(store_id) if isinstance(store_id, str) and not store_id.isdigit() else None
                if not store:
                    # store_id pode ser int, buscar por id
                    conn2 = get_db_connection()
                    cur2 = conn2.cursor()
                    cur2.execute('SELECT codigo FROM stores WHERE id = ?', (store_id,))
                    row = cur2.fetchone()
                    conn2.close()
                    if row:
                        store_codigo = row['codigo']
            except Exception:
                store_codigo = None
        return {
            "success": True,
            "access_token": access_token,
            "token_type": "bearer",
            "role": role,
            "store_id": store_id,
            "store_codigo": store_codigo,
            "permissoes": permissoes,
            "username": username
        }
    else:
        return JSONResponse(status_code=401, content={"success": False, "message": "Usuário ou senha inválidos"})

# Endpoint para renovar token (antes de expirar)
@app.post('/admin/token/refresh')
def refresh_token(current_user: str = Depends(get_current_user)):
    # Busca o papel (role) atual do usuário para manter as claims
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT role FROM admin_users WHERE username = ?', (current_user,))
    row = cur.fetchone()
    conn.close()
    role = row['role'] if row and 'role' in row.keys() else 'admin'
    new_token = create_access_token({"sub": current_user, "role": role})
    return {"success": True, "access_token": new_token, "token_type": "bearer", "role": role}

# Função utilitária para checar se usuário é admin
from jose import jwt
SECRET_KEY = "precix_super_secret_key_2025"
ALGORITHM = "HS256"
def require_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get('role') != 'admin':
            raise HTTPException(status_code=403, detail='Acesso restrito a administradores')
    except Exception:
        raise HTTPException(status_code=401, detail='Token inválido ou expirado')

def require_admin_or_perm(perm: str):
    def _inner(credentials: HTTPAuthorizationCredentials = Depends(security)):
        token = credentials.credentials
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username = payload.get('sub')
            role = payload.get('role')
            if role == 'admin':
                return username
            # Busca permissões no banco para o usuário
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute('SELECT permissoes FROM admin_users WHERE username = ?', (username,))
            row = cur.fetchone()
            conn.close()
            perms = []
            if row and ('permissoes' in row.keys()):
                p = row['permissoes']
                if p:
                    try:
                        perms = json.loads(p) if isinstance(p, str) else p
                    except Exception:
                        perms = []
            if perm in perms:
                return username
            raise HTTPException(status_code=403, detail='Acesso restrito: falta permissão')
        except HTTPException:
            raise
        except Exception:
            raise HTTPException(status_code=401, detail='Token inválido ou expirado')
    return _inner

# --- Endpoints de administração de usuários admin ---
from fastapi import Body

@app.get('/admin/users')
def list_admin_users(current_user: str = Depends(require_admin_or_perm('usuarios'))):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT username, role, store_id, permissoes FROM admin_users')
    users = []
    for row in cur.fetchall():
        permissoes = row['permissoes'] if 'permissoes' in row.keys() else None
        if permissoes:
            try:
                permissoes = json.loads(permissoes)
            except Exception:
                permissoes = []
        else:
            permissoes = []
        users.append({
            'username': row['username'],
            'role': row['role'] if 'role' in row.keys() else 'admin',
            'store_id': row['store_id'] if 'store_id' in row.keys() else None,
            'permissoes': permissoes
        })
    conn.close()
    return {'users': users}

@app.post('/admin/users')
def create_admin_user_endpoint(data: dict = Body(...), current_user: str = Depends(require_admin_or_perm('usuarios'))):
    from database import hash_password
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'admin')
    if not username or not password:
        raise HTTPException(status_code=400, detail='Usuário e senha obrigatórios')
    hashed = hash_password(password)
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute('INSERT INTO admin_users (username, password, role) VALUES (?, ?, ?)', (username, hashed, role))
        conn.commit()
    except Exception as e:
        conn.close()
        if 'UNIQUE constraint failed' in str(e):
            raise HTTPException(status_code=409, detail='Usuário já existe')
        raise HTTPException(status_code=500, detail='Erro ao criar usuário')
    conn.close()
    return {'success': True, 'message': 'Usuário criado com sucesso'}

@app.put('/admin/users/{username}')
def update_admin_user(username: str, data: dict = Body(...), current_user: str = Depends(require_admin_or_perm('usuarios'))):
    from database import hash_password
    password = data.get('password')
    role = data.get('role')
    permissoes = data.get('permissoes')
    store_id = data.get('store_id')
    # Garante que permissoes seja string JSON para o banco
    if permissoes is not None and not isinstance(permissoes, str):
        permissoes = json.dumps(permissoes)
    if not password and not role and permissoes is None and store_id is None:
        raise HTTPException(status_code=400, detail='Nada para atualizar')
    conn = get_db_connection()
    cur = conn.cursor()
    # Atualiza todos os campos enviados
    if password and role and permissoes is not None and store_id is not None:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, role = ?, permissoes = ?, store_id = ? WHERE username = ?', (hashed, role, permissoes, store_id, username))
    elif password and role and store_id is not None:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, role = ?, store_id = ? WHERE username = ?', (hashed, role, store_id, username))
    elif password and permissoes is not None and store_id is not None:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, permissoes = ?, store_id = ? WHERE username = ?', (hashed, permissoes, store_id, username))
    elif role and permissoes is not None and store_id is not None:
        cur.execute('UPDATE admin_users SET role = ?, permissoes = ?, store_id = ? WHERE username = ?', (role, permissoes, store_id, username))
    elif password and store_id is not None:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, store_id = ? WHERE username = ?', (hashed, store_id, username))
    elif role and store_id is not None:
        cur.execute('UPDATE admin_users SET role = ?, store_id = ? WHERE username = ?', (role, store_id, username))
    elif permissoes is not None and store_id is not None:
        cur.execute('UPDATE admin_users SET permissoes = ?, store_id = ? WHERE username = ?', (permissoes, store_id, username))
    elif store_id is not None:
        cur.execute('UPDATE admin_users SET store_id = ? WHERE username = ?', (store_id, username))
    elif password and role and permissoes is not None:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, role = ?, permissoes = ? WHERE username = ?', (hashed, role, permissoes, username))
    elif password and role:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, role = ? WHERE username = ?', (hashed, role, username))
    elif password and permissoes is not None:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, permissoes = ? WHERE username = ?', (hashed, permissoes, username))
    elif role and permissoes is not None:
        cur.execute('UPDATE admin_users SET role = ?, permissoes = ? WHERE username = ?', (role, permissoes, username))
    elif password:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ? WHERE username = ?', (hashed, username))
    elif role:
        cur.execute('UPDATE admin_users SET role = ? WHERE username = ?', (role, username))
    elif permissoes is not None:
        cur.execute('UPDATE admin_users SET permissoes = ? WHERE username = ?', (permissoes, username))
    if cur.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    conn.commit()
    conn.close()
    return {'success': True, 'message': 'Usuário atualizado com sucesso'}

@app.delete('/admin/users/{username}')
def delete_admin_user(username: str, current_user: str = Depends(require_admin_or_perm('usuarios'))):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM admin_users WHERE username = ?', (username,))
    if cur.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    conn.commit()
    conn.close()
    return {'success': True, 'message': 'Usuário removido com sucesso'}

# Endpoint para buscar produto pelo código de barras
@app.get('/product/{barcode}')
def get_product(barcode: str):
    product = get_product_by_barcode(barcode)
    if not product:
        raise HTTPException(status_code=404, detail='Produto não encontrado')
    return product


# Serve o frontend (build) se existir, mas não impede execução separada
def mount_frontend_if_exists():
    FRONTEND_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist'))
    if os.path.exists(FRONTEND_PATH):
        logging.info(f"Montando frontend na pasta: {FRONTEND_PATH}")
        mount_frontend(app, FRONTEND_PATH)
    else:
        logging.warning(f"Pasta {FRONTEND_PATH} não encontrada. Certifique-se de que o build do frontend foi gerado corretamente.")

mount_frontend_if_exists()

# Endpoints de lojas
@app.get('/admin/stores')
def api_get_stores():
    return get_all_stores()

@app.post('/admin/stores')
async def api_add_store(request: Request):
    data = await request.json()
    codigo = data.get('codigo') or data.get('code')
    name = data.get('name')
    status = data.get('status') or 'ativo'
    if not codigo or not name:
        return {"success": False, "message": "Código e nome da loja são obrigatórios."}
    try:
        from database import add_store_with_code
        add_store_with_code(str(codigo), name, status)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put('/admin/stores/{store_id}')
async def api_update_store(store_id: int, request: Request):
    data = await request.json()
    codigo = data.get('codigo') or data.get('code')
    name = data.get('name')
    status = data.get('status') or 'ativo'
    try:
        if codigo is not None:
            from database import update_store_code
            update_store_code(store_id, str(codigo), name, status)
        else:
            update_store(store_id, name, status)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete('/admin/stores/{store_id}')
def api_delete_store(store_id: int):
    delete_store(store_id)
    return {"success": True}

# Endpoints de equipamentos
@app.get('/admin/devices')
def api_get_devices():
    return get_all_devices()

@app.post('/admin/devices')
async def api_add_device(request: Request):
    data = await request.json()
    store_id = data.get('store_id')
    name = data.get('name')
    identifier = data.get('identifier')
    if not store_id or not name or not identifier:
        return {"success": False, "message": "Todos os campos são obrigatórios."}
    # Adiciona dispositivo já com o identifier correto
    add_device(store_id, name, identifier=identifier)
    notify_ai_agent('device_added', {'store_id': store_id, 'name': name, 'identifier': identifier})
    return {"success": True}

@app.put('/admin/devices/{device_id}')
def api_update_device(device_id: int, name: str, status: str, last_sync: str = None, online: int = None, store_id: int = None, identifier: str = None):
    update_device(device_id, name, status, last_sync, online, store_id=store_id, identifier=identifier)
    return {"success": True}

@app.delete('/admin/devices/{device_id}')
def api_delete_device(device_id: int):
    delete_device(device_id)
    return {"success": True}

# Endpoint heartbeat: equipamento envia ping para marcar online
@app.post('/device/heartbeat/{identifier}')
def device_heartbeat(identifier: str):
    # Busca o device pelo identificador (UUID)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id FROM devices WHERE identifier = ?', (identifier,))
    row = cur.fetchone()
    conn.close()
    if not row:
        # Tenta buscar por identifier ignorando case e espaços
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT id FROM devices WHERE TRIM(LOWER(identifier)) = ?', (identifier.strip().lower(),))
        row = cur.fetchone()
        conn.close()
        if not row:
            raise HTTPException(status_code=404, detail='Dispositivo não encontrado')
    # Corrigido: passa identifier para set_device_online
    set_device_online(identifier)
    notify_ai_agent('device_heartbeat', {'identifier': identifier})
    return {"success": True}

# Endpoint para exportar produtos para .txt
@app.get('/admin/export-txt')
def export_txt():
    txt_path = export_products_to_txt()
    notify_ai_agent('export', {'file': txt_path})
    return FileResponse(txt_path, media_type='text/plain', filename='produtos.txt')

# Endpoints de auditoria
@app.get('/admin/audit-logs')
def api_get_audit_logs(limit: int = 50):
    """Retorna logs de auditoria gerais do sistema"""
    return get_audit_logs(limit)

@app.get('/admin/devices/{device_id}/audit-logs')
def api_get_device_audit_logs(device_id: int, limit: int = 20):
    """Retorna logs de auditoria específicos de um dispositivo"""
    return get_device_audit_logs(device_id, limit)

# --- Endpoints de administração de usuários admin ---
from fastapi import Body

@app.get('/admin/users')
def list_admin_users(current_user: str = Depends(require_admin_or_perm('usuarios'))):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT username, role, store_id, permissoes FROM admin_users')
    users = []
    for row in cur.fetchall():
        permissoes = row['permissoes'] if 'permissoes' in row.keys() else None
        if permissoes:
            try:
                permissoes = json.loads(permissoes)
            except Exception:
                permissoes = []
        else:
            permissoes = []
        users.append({
            'username': row['username'],
            'role': row['role'] if 'role' in row.keys() else 'admin',
            'store_id': row['store_id'] if 'store_id' in row.keys() else None,
            'permissoes': permissoes
        })
   
    conn.close()
    return {'users': users}

@app.post('/admin/users')
def create_admin_user_endpoint(data: dict = Body(...), current_user: str = Depends(require_admin_or_perm('usuarios'))):
    from database import hash_password
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'admin')
    if not username or not password:
        raise HTTPException(status_code=400, detail='Usuário e senha obrigatórios')
    hashed = hash_password(password)
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute('INSERT INTO admin_users (username, password, role) VALUES (?, ?, ?)', (username, hashed, role))
        conn.commit()
    except Exception as e:
        conn.close()
        if 'UNIQUE constraint failed' in str(e):
            raise HTTPException(status_code=409, detail='Usuário já existe')
        raise HTTPException(status_code=500, detail='Erro ao criar usuário')
    conn.close()
    return {'success': True, 'message': 'Usuário criado com sucesso'}

@app.put('/admin/users/{username}')
def update_admin_user(username: str, data: dict = Body(...), current_user: str = Depends(require_admin_or_perm('usuarios'))):
    from database import hash_password
    password = data.get('password')
    role = data.get('role')
    permissoes = data.get('permissoes')
    store_id = data.get('store_id')
    # Garante que permissoes seja string JSON para o banco
    if permissoes is not None and not isinstance(permissoes, str):
        permissoes = json.dumps(permissoes)
    if not password and not role and permissoes is None and store_id is None:
        raise HTTPException(status_code=400, detail='Nada para atualizar')
    conn = get_db_connection()
    cur = conn.cursor()
    # Atualiza todos os campos enviados
    if password and role and permissoes is not None and store_id is not None:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, role = ?, permissoes = ?, store_id = ? WHERE username = ?', (hashed, role, permissoes, store_id, username))
    elif password and role and store_id is not None:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, role = ?, store_id = ? WHERE username = ?', (hashed, role, store_id, username))
    elif password and permissoes is not None and store_id is not None:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, permissoes = ?, store_id = ? WHERE username = ?', (hashed, permissoes, store_id, username))
    elif role and permissoes is not None and store_id is not None:
        cur.execute('UPDATE admin_users SET role = ?, permissoes = ?, store_id = ? WHERE username = ?', (role, permissoes, store_id, username))
    elif password and store_id is not None:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, store_id = ? WHERE username = ?', (hashed, store_id, username))
    elif role and store_id is not None:
        cur.execute('UPDATE admin_users SET role = ?, store_id = ? WHERE username = ?', (role, store_id, username))
    elif permissoes is not None and store_id is not None:
        cur.execute('UPDATE admin_users SET permissoes = ?, store_id = ? WHERE username = ?', (permissoes, store_id, username))
    elif store_id is not None:
        cur.execute('UPDATE admin_users SET store_id = ? WHERE username = ?', (store_id, username))
    elif password and role and permissoes is not None:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, role = ?, permissoes = ? WHERE username = ?', (hashed, role, permissoes, username))
    elif password and role:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, role = ? WHERE username = ?', (hashed, role, username))
    elif password and permissoes is not None:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, permissoes = ? WHERE username = ?', (hashed, permissoes, username))
    elif role and permissoes is not None:
        cur.execute('UPDATE admin_users SET role = ?, permissoes = ? WHERE username = ?', (role, permissoes, username))
    elif password:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ? WHERE username = ?', (hashed, username))
    elif role:
        cur.execute('UPDATE admin_users SET role = ? WHERE username = ?', (role, username))
    elif permissoes is not None:
        cur.execute('UPDATE admin_users SET permissoes = ? WHERE username = ?', (permissoes, username))
    if cur.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    conn.commit()
    conn.close()
    return {'success': True, 'message': 'Usuário atualizado com sucesso'}

@app.delete('/admin/users/{username}')
def delete_admin_user(username: str, current_user: str = Depends(require_admin_or_perm('usuarios'))):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM admin_users WHERE username = ?', (username,))
    if cur.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    conn.commit()
    conn.close()
    return {'success': True, 'message': 'Usuário removido com sucesso'}

# Endpoint para buscar produto pelo código de barras
@app.get('/product/{barcode}')
def get_product(barcode: str):
    product = get_product_by_barcode(barcode)
    if not product:
        raise HTTPException(status_code=404, detail='Produto não encontrado')
    return product


# Serve o frontend (build) se existir, mas não impede execução separada
def mount_frontend_if_exists():
    FRONTEND_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist'))
    if os.path.exists(FRONTEND_PATH):
        logging.info(f"Montando frontend na pasta: {FRONTEND_PATH}")
        mount_frontend(app, FRONTEND_PATH)
    else:
        logging.warning(f"Pasta {FRONTEND_PATH} não encontrada. Certifique-se de que o build do frontend foi gerado corretamente.")

mount_frontend_if_exists()

# Endpoints de lojas
@app.get('/admin/stores')
def api_get_stores():
    return get_all_stores()

@app.post('/admin/stores')
async def api_add_store(request: Request):
    data = await request.json()
    codigo = data.get('codigo') or data.get('code')
    name = data.get('name')
    status = data.get('status') or 'ativo'
    if not codigo or not name:
        return {"success": False, "message": "Código e nome da loja são obrigatórios."}
    try:
        from database import add_store_with_code
        add_store_with_code(str(codigo), name, status)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put('/admin/stores/{store_id}')
async def api_update_store(store_id: int, request: Request):
    data = await request.json()
    codigo = data.get('codigo') or data.get('code')
    name = data.get('name')
    status = data.get('status') or 'ativo'
    try:
        if codigo is not None:
            from database import update_store_code
            update_store_code(store_id, str(codigo), name, status)
        else:
            update_store(store_id, name, status)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete('/admin/stores/{store_id}')
def api_delete_store(store_id: int):
    delete_store(store_id)
    return {"success": True}

# Endpoints de equipamentos
@app.get('/admin/devices')
def api_get_devices():
    return get_all_devices()

@app.post('/admin/devices')
async def api_add_device(request: Request):
    data = await request.json()
    store_id = data.get('store_id')
    name = data.get('name')
    identifier = data.get('identifier')
    if not store_id or not name or not identifier:
        return {"success": False, "message": "Todos os campos são obrigatórios."}
    # Adiciona dispositivo já com o identifier correto
    add_device(store_id, name, identifier=identifier)
    notify_ai_agent('device_added', {'store_id': store_id, 'name': name, 'identifier': identifier})
    return {"success": True}

@app.put('/admin/devices/{device_id}')
def api_update_device(device_id: int, name: str, status: str, last_sync: str = None, online: int = None, store_id: int = None, identifier: str = None):
    update_device(device_id, name, status, last_sync, online, store_id=store_id, identifier=identifier)
    return {"success": True}

@app.delete('/admin/devices/{device_id}')
def api_delete_device(device_id: int):
    delete_device(device_id)
    return {"success": True}

# Endpoint heartbeat: equipamento envia ping para marcar online
@app.post('/device/heartbeat/{identifier}')
def device_heartbeat(identifier: str):
    # Busca o device pelo identificador (UUID)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id FROM devices WHERE identifier = ?', (identifier,))
    row = cur.fetchone()
    conn.close()
    if not row:
        # Tenta buscar por identifier ignorando case e espaços
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT id FROM devices WHERE TRIM(LOWER(identifier)) = ?', (identifier.strip().lower(),))
        row = cur.fetchone()
        conn.close()
        if not row:
            raise HTTPException(status_code=404, detail='Dispositivo não encontrado')
    # Corrigido: passa identifier para set_device_online
    set_device_online(identifier)
    notify_ai_agent('device_heartbeat', {'identifier': identifier})
    return {"success": True}

# Endpoint para exportar produtos para .txt
@app.get('/admin/export-txt')
def export_txt():
    txt_path = export_products_to_txt()
    notify_ai_agent('export', {'file': txt_path})
    return FileResponse(txt_path, media_type='text/plain', filename='produtos.txt')

# Endpoints de auditoria
@app.get('/admin/audit-logs')
def api_get_audit_logs(limit: int = 50):
    """Retorna logs de auditoria gerais do sistema"""
    return get_audit_logs(limit)

@app.get('/admin/devices/{device_id}/audit-logs')
def api_get_device_audit_logs(device_id: int, limit: int = 20):
    """Retorna logs de auditoria específicos de um dispositivo"""
    return get_device_audit_logs(device_id, limit)


# Endpoint para deletar integração
@app.delete('/admin/integracoes/{integracao_id}')
def deletar_integracao(integracao_id: int):
    try:
        delete_integration(integracao_id)
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
