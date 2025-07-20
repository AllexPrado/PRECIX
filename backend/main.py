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
    # Adiciona dispositivo com identificador único
    add_device(store_id, name)
    # Atualiza identificador
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE devices SET identifier = ? WHERE store_id = ? AND name = ?', (identifier, store_id, name))
    conn.commit()
    conn.close()
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
        raise HTTPException(status_code=404, detail='Dispositivo não encontrado')
    device_id = row['id']
    set_device_online(device_id)
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
    if not password:
        raise HTTPException(status_code=400, detail='Senha obrigatória')
    hashed = hash_password(password)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE admin_users SET password = ? WHERE username = ?', (hashed, username))
    if cur.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail='Usuário não encontrado')
    conn.commit()
    conn.close()
    return {'success': True, 'message': 'Senha atualizada com sucesso'}

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

# Healthcheck endpoint
@app.get('/health')
def healthcheck():
    return {"status": "ok"}

# IA Chat endpoint (exemplo)
@app.post('/chat')
async def chat_endpoint(request: Request):
    data = await request.json()
    message = data.get('message')
    if not message:
        raise HTTPException(status_code=400, detail='Mensagem é obrigatória')
    # Aqui você chamaria a lógica do seu chatbot ou IA
    response_message = f"Echo: {message}"
    return {"message": response_message}

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
    # Exemplo: buscar sugestões da IA
    resp = notify_ai_agent('suggest_automations', {})
    suggestions = resp.get('suggestions') if resp else []
    return {"suggestions": suggestions or [
        {"title": "Sincronizar preços automaticamente", "desc": "A IA recomenda agendar sincronização diária dos preços."},
        {"title": "Monitorar dispositivos offline", "desc": "A IA pode alertar quando um dispositivo ficar offline por mais de 10 minutos."}
    ], "history": get_automation_history()}

from database import export_products_to_txt, set_device_offline, set_device_online
import threading

def sync_prices_background():
    # Exemplo: exporta produtos para TXT (mock de sincronização)
    export_products_to_txt('produtos_sync_ia.txt')
    notify_ai_agent('sync_success', {'info': 'Sincronização de preços concluída pela IA.'})

def monitor_devices_background():
    # Exemplo: verifica dispositivos offline e notifica
    # Aqui você pode implementar lógica real de monitoramento
    notify_ai_agent('monitor_devices', {'info': 'Monitoramento de dispositivos executado.'})

@app.post('/admin/ia-automation/execute')
def execute_automation(data: dict = Body(...), background_tasks: BackgroundTasks = None):
    action = data.get('action')
    params = data.get('params', {})
    notify_ai_agent('automation_execute', {'action': action, 'params': params})
    log_automation(action)
    msg = f"Ação '{action}' executada."
    if action == 'Sincronizar preços automaticamente':
        if background_tasks:
            background_tasks.add_task(sync_prices_background)
        else:
            threading.Thread(target=sync_prices_background).start()
        msg = 'Sincronização de preços iniciada pela IA.'
    elif action == 'Monitorar dispositivos offline':
        if background_tasks:
            background_tasks.add_task(monitor_devices_background)
        else:
            threading.Thread(target=monitor_devices_background).start()
        msg = 'Monitoramento de dispositivos iniciado pela IA.'
    return {"success": True, "message": msg}
