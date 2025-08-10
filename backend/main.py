# Backup do main.py gerado automaticamente em 30/07/2025

import json
from fastapi import FastAPI, HTTPException, UploadFile, File, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from database import get_product_by_barcode, init_db, populate_example_data, get_db_connection, authenticate_admin, get_system_status, export_products_to_txt, get_all_stores, add_store, update_store, delete_store, get_all_devices, add_device, update_device, delete_device, set_device_online, set_device_offline, add_audit_log, get_audit_logs, get_device_audit_logs, upsert_agent_status, get_all_agents_status
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
from datetime import datetime
import requests
from fastapi.responses import JSONResponse
import threading
import time

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

@app.get('/admin/status')
def admin_status():
    status = get_system_status()
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

@app.on_event("startup")
async def startup_event():
    # Inicializa o banco de dados e popula com dados de exemplo
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

# Endpoint para fazer upload de banner
@app.post('/admin/banners/upload')
async def upload_banner(file: UploadFile = File(...), username: str = Depends(get_current_user)):
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
        raise HTTPException(status_code=400, detail="Formato de arquivo não suportado.")
    file_path = os.path.join(BANNERS_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
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
        return {
            "success": True,
            "access_token": access_token,
            "token_type": "bearer",
            "role": role,
            "store_id": store_id,
            "permissoes": permissoes,
            "username": username
        }
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

# --- Endpoints de administração de usuários admin ---
from fastapi import Body

@app.get('/admin/users')
def list_admin_users(current_user: str = Depends(require_admin)):
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


# Novo endpoint: cadastro de loja com código
@app.post('/admin/stores')
async def api_add_store(request: Request):
    data = await request.json()
    codigo = data.get('codigo')
    name = data.get('name')
    status = data.get('status', 'ativo')
    if not codigo or not name:
        return {"success": False, "message": "Código e nome da loja são obrigatórios."}
    try:
        from database import add_store_with_code
        add_store_with_code(codigo, name, status)
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}

# Novo endpoint: importação em massa de lojas
@app.post('/admin/stores/import')
async def api_import_stores(request: Request):
    data = await request.json()
    lojas = data.get('lojas')
    if not lojas or not isinstance(lojas, list):
        return {"success": False, "message": "Lista de lojas inválida."}
    from database import add_store_with_code
    count = 0
    for loja in lojas:
        codigo = loja.get('codigo')
        name = loja.get('name')
        status = loja.get('status', 'ativo')
        if codigo and name:
            try:
                add_store_with_code(codigo, name, status)
                count += 1
            except Exception:
                continue
    return {"success": True, "imported": count}


# Novo endpoint: edição de loja com código
@app.put('/admin/stores/{store_id}')
async def api_update_store(store_id: int, request: Request):
    data = await request.json()
    codigo = data.get('codigo')
    name = data.get('name')
    status = data.get('status', 'ativo')
    if not codigo or not name:
        return {"success": False, "message": "Código e nome obrigatórios."}
    from database import update_store_code
    try:
        update_store_code(store_id, codigo, name, status)
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}

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
def list_admin_users(current_user: str = Depends(require_admin)):
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
def list_admin_users(current_user: str = Depends(require_admin)):
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
def list_admin_users(current_user: str = Depends(require_admin)):
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
def list_admin_users(current_user: str = Depends(require_admin)):
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