from fastapi import FastAPI, HTTPException, UploadFile, File, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from database import get_product_by_barcode, init_db, populate_example_data, get_db_connection, authenticate_admin, get_system_status, export_products_to_txt, get_all_stores, add_store, update_store, delete_store, get_all_devices, add_device, update_device, delete_device, set_device_online, set_device_offline, add_audit_log, get_audit_logs, get_device_audit_logs
from static_middleware import mount_frontend
from fastapi.responses import FileResponse
import shutil
import os
from ai_agent_integration import notify_ai_agent
from ia_event_log import router as ia_event_router
from auth_jwt import create_access_token, verify_access_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends
from backup_restore import router as backup_restore_router

BANNERS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'banners'))
os.makedirs(BANNERS_DIR, exist_ok=True)
import logging
FRONTEND_PUBLIC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'public'))

app = FastAPI()
app.include_router(ia_event_router)
app.include_router(backup_restore_router)

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    username = verify_access_token(token)
    if not username:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")
    return username

# Endpoint para servir favicon.ico
@app.get('/favicon.ico')
def favicon():
    file_path = os.path.join(FRONTEND_PUBLIC_DIR, 'favicon.ico')
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail='favicon not found')


# Endpoint para status do sistema (dashboard admin)
# Endpoint para status do sistema (dashboard admin)
@app.get('/admin/status')
def admin_status():
    return get_system_status()

# Endpoint para upload de banner
@app.post('/admin/banners/upload')
async def upload_banner(file: UploadFile = File(...)):
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
        return {"success": False, "message": "Formato de imagem não suportado."}
    dest_path = os.path.join(BANNERS_DIR, file.filename)
    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"success": True, "filename": file.filename}

# Endpoint para listar banners
@app.get('/admin/banners')
def list_banners():
    files = [f for f in os.listdir(BANNERS_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp'))]
    return [{"filename": f, "url": f"/admin/banners/{f}"} for f in files]

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
    notify_ai_agent('startup', {'source': 'backend', 'info': 'Backend iniciado'})
    start_ia_healthcheck()  # Inicia monitoramento proativo



# --- Funções auxiliares de automação IA ---
from datetime import datetime
import json

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
        access_token = create_access_token({"sub": username, "role": role})
        return {"success": True, "access_token": access_token, "token_type": "bearer", "role": role}
    else:
        return JSONResponse(status_code=401, content={"success": False, "message": "Usuário ou senha inválidos"})

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

@app.get('/admin/users')
def list_admin_users(current_user: str = Depends(require_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT username, role FROM admin_users')
    users = [{"username": row['username'], "role": row['role'] if 'role' in row.keys() else 'admin'} for row in cur.fetchall()]
    conn.close()
    return {'users': users}

@app.post('/admin/users')
def create_admin_user_endpoint(data: dict = Body(...), current_user: str = Depends(require_admin)):
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
def update_admin_user(username: str, data: dict = Body(...), current_user: str = Depends(require_admin)):
    from database import hash_password
    password = data.get('password')
    role = data.get('role')
    if not password and not role:
        raise HTTPException(status_code=400, detail='Nada para atualizar')
    conn = get_db_connection()
    cur = conn.cursor()
    if password and role:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, role = ? WHERE username = ?', (hashed, role, username))
    elif password:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ? WHERE username = ?', (hashed, username))
    elif role:
        cur.execute('UPDATE admin_users SET role = ? WHERE username = ?', (role, username))
    if cur.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    conn.commit()
    conn.close()
    return {'success': True, 'message': 'Usuário atualizado com sucesso'}

@app.delete('/admin/users/{username}')
def delete_admin_user(username: str, current_user: str = Depends(require_admin)):
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
    name = data.get('name')
    if not name:
        return {"success": False, "message": "Nome da loja obrigatório."}
    add_store(name)
    return {"success": True}

@app.put('/admin/stores/{store_id}')
def api_update_store(store_id: int, name: str, status: str):
    update_store(store_id, name, status)
    return {"success": True}

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
def api_update_device(device_id: int, name: str, status: str, last_sync: str = None, online: int = None):
    update_device(device_id, name, status, last_sync, online)
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
def list_admin_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT username FROM admin_users')
    users = [row['username'] for row in cur.fetchall()]
    conn.close()
    return {'users': users}

@app.post('/admin/users')
def create_admin_user_endpoint(data: dict = Body(...)):
    from database import hash_password
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        raise HTTPException(status_code=400, detail='Usuário e senha obrigatórios')
    hashed = hash_password(password)
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute('INSERT INTO admin_users (username, password) VALUES (?, ?)', (username, hashed))
        conn.commit()
    except Exception as e:
        conn.close()
        if 'UNIQUE constraint failed' in str(e):
            raise HTTPException(status_code=409, detail='Usuário já existe')
        raise HTTPException(status_code=500, detail='Erro ao criar usuário')
    conn.close()
    return {'success': True, 'message': 'Usuário criado com sucesso'}

@app.put('/admin/users/{username}')
def update_admin_user(username: str, data: dict = Body(...)):
    from database import hash_password
    password = data.get('password')
    role = data.get('role')
    if not password and not role:
        raise HTTPException(status_code=400, detail='Nada para atualizar')
    conn = get_db_connection()
    cur = conn.cursor()
    if password and role:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, role = ? WHERE username = ?', (hashed, role, username))
    elif password:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ? WHERE username = ?', (hashed, username))
    elif role:
        cur.execute('UPDATE admin_users SET role = ? WHERE username = ?', (role, username))
    if cur.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    conn.commit()
    conn.close()
    return {'success': True, 'message': 'Usuário atualizado com sucesso'}

@app.delete('/admin/users/{username}')
def delete_admin_user(username: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM admin_users WHERE username = ?', (username,))
    if cur.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    conn.commit()
    conn.close()
    return {'success': True, 'message': 'Usuário removido com sucesso'}

# --- AUTOMAÇÕES INTELIGENTES DA IA ---
from fastapi import BackgroundTasks
from datetime import datetime
import json

AUTOMATION_HISTORY_FILE = os.path.join(os.path.dirname(__file__), 'logs', 'automation_history.log')
os.makedirs(os.path.dirname(AUTOMATION_HISTORY_FILE), exist_ok=True)

def log_automation(action):
    entry = {'timestamp': datetime.now().isoformat(), 'action': action}
    with open(AUTOMATION_HISTORY_FILE, 'a', encoding='utf-8') as f:
        f.write(json.dumps(entry, ensure_ascii=False) + '\n')

def get_automation_history(limit=50):
    if not os.path.exists(AUTOMATION_HISTORY_FILE):
        return []
    with open(AUTOMATION_HISTORY_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()[-limit:]
        return [json.loads(line) for line in lines]

@app.get('/admin/ia-automations')
def ia_automations():
    # Sugestões fixas e exemplos de automações inteligentes
    suggestions = [
        {"title": "Sincronizar preços automaticamente", "desc": "A IA recomenda agendar sincronização diária dos preços."},
        {"title": "Monitorar dispositivos offline", "desc": "A IA pode alertar quando um dispositivo ficar offline por mais de 10 minutos."},
        {"title": "Gerar relatório de vendas do dia", "desc": "A IA pode gerar e enviar um relatório de vendas diário automaticamente."},
        {"title": "Verificar estoque baixo", "desc": "A IA pode analisar o estoque e alertar sobre produtos com quantidade crítica."},
        {"title": "Analisar performance do sistema", "desc": "A IA pode monitorar tempo de resposta e sugerir melhorias de performance."},
        {"title": "Sugerir promoções para produtos parados", "desc": "A IA pode identificar produtos com baixa saída e sugerir promoções."},
        {"title": "Enviar alerta de falha crítica", "desc": "A IA pode notificar a equipe em caso de erro grave no sistema."}
    ]
    return {"suggestions": suggestions, "history": get_automation_history()}

from database import export_products_to_txt, set_device_offline, set_device_online
import threading
import time

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
        access_token = create_access_token({"sub": username, "role": role})
        return {"success": True, "access_token": access_token, "token_type": "bearer", "role": role}
    else:
        return JSONResponse(status_code=401, content={"success": False, "message": "Usuário ou senha inválidos"})

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

@app.get('/admin/users')
def list_admin_users(current_user: str = Depends(require_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT username, role FROM admin_users')
    users = [{"username": row['username'], "role": row['role'] if 'role' in row.keys() else 'admin'} for row in cur.fetchall()]
    conn.close()
    return {'users': users}

@app.post('/admin/users')
def create_admin_user_endpoint(data: dict = Body(...), current_user: str = Depends(require_admin)):
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
def update_admin_user(username: str, data: dict = Body(...), current_user: str = Depends(require_admin)):
    from database import hash_password
    password = data.get('password')
    role = data.get('role')
    if not password and not role:
        raise HTTPException(status_code=400, detail='Nada para atualizar')
    conn = get_db_connection()
    cur = conn.cursor()
    if password and role:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ?, role = ? WHERE username = ?', (hashed, role, username))
    elif password:
        hashed = hash_password(password)
        cur.execute('UPDATE admin_users SET password = ? WHERE username = ?', (hashed, username))
    elif role:
        cur.execute('UPDATE admin_users SET role = ? WHERE username = ?', (role, username))
    if cur.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    conn.commit()
    conn.close()
    return {'success': True, 'message': 'Usuário atualizado com sucesso'}

@app.delete('/admin/users/{username}')
def delete_admin_user(username: str, current_user: str = Depends(require_admin)):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM admin_users WHERE username = ?', (username,))
    if cur.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    conn.commit()
    conn.close()
    return {'success': True, 'message': 'Usuário removido com sucesso'}

# Monitoramento de identificadores duplicados de dispositivos
def ia_autonomous_check_duplicate_device_identifiers():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT identifier, COUNT(*) as qtd FROM devices WHERE identifier IS NOT NULL GROUP BY identifier HAVING qtd > 1')
    duplicates = cur.fetchall()
    for dup in duplicates:
        log_ia_autonomous_action('duplicate_device_identifier', 'warning', {'identifier': dup['identifier'], 'count': dup['qtd']})
        notify_ai_agent('duplicate_device_identifier', {'identifier': dup['identifier'], 'count': dup['qtd']})
    conn.close()
    return len(duplicates)

# Atualizar função de execução das automações autônomas
def ia_autonomous_execute_all():
    offline_count = ia_autonomous_check_devices()
    ia_autonomous_cleanup_logs()
    fixed_products = ia_autonomous_fix_product_data()
    fixed_outliers = ia_autonomous_fix_outlier_prices()
    duplicate_ids = ia_autonomous_check_duplicate_device_identifiers()
    log_ia_autonomous_action('autonomous_execute', 'success', {
        'offline_devices': offline_count,
        'fixed_products': fixed_products,
        'fixed_outlier_prices': fixed_outliers,
        'duplicate_device_identifiers': duplicate_ids
    })

@app.get('/api/produtos')
def api_produtos():
    return get_all_products()

@app.get('/api/ping')
def api_ping():
    return {"status": "ok"}