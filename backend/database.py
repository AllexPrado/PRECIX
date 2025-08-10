import sqlite3
from typing import Optional, Dict
import logging
import bcrypt  # Adicionado para hash de senha

logging.basicConfig(level=logging.INFO)

# Função para obter status do sistema (quantidade de produtos e última sincronização)
def get_system_status():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT COUNT(*) FROM products')
    total_products = cur.fetchone()[0]
    # Última sincronização: para exemplo, retorna None (pode ser incrementado depois)
    last_sync = None
    conn.close()
    return {
        'total_products': total_products,
        'last_sync': last_sync
    }

DB_PATH = r'd:\Sonda\Precix\sync\products.db'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def get_product_by_barcode(barcode: str) -> Optional[Dict]:
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT barcode, name, price, promo FROM products WHERE barcode = ?', (barcode,))
    row = cur.fetchone()
    conn.close()
    if row:
        return dict(row)
    return None


# Função para inicializar o banco (criação das tabelas)
def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    logging.info(f"[DB] Usando banco em: {DB_PATH}")
    # Tabela de produtos
    cur.execute('''
        CREATE TABLE IF NOT EXISTS products (
            barcode TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            promo TEXT
        )
    ''')
    # Tabela de usuários admin
    cur.execute('''
        CREATE TABLE IF NOT EXISTS admin_users (
            username TEXT PRIMARY KEY,
            password TEXT NOT NULL
        )
    ''')
    # MIGRAÇÃO: Garante que a coluna 'role' existe
    cur.execute("PRAGMA table_info(admin_users)")
    admin_columns = [row[1] for row in cur.fetchall()]
    if 'role' not in admin_columns:
        logging.info("[DB] Adicionando coluna 'role' na tabela admin_users")
        cur.execute("ALTER TABLE admin_users ADD COLUMN role TEXT DEFAULT 'admin'")
    # MIGRAÇÃO: Garante que a coluna 'store_id' existe
    if 'store_id' not in admin_columns:
        logging.info("[DB] Adicionando coluna 'store_id' na tabela admin_users")
        cur.execute("ALTER TABLE admin_users ADD COLUMN store_id INTEGER")
    # MIGRAÇÃO: Garante que a coluna 'permissoes' existe
    if 'permissoes' not in admin_columns:
        logging.info("[DB] Adicionando coluna 'permissoes' na tabela admin_users")
        cur.execute("ALTER TABLE admin_users ADD COLUMN permissoes TEXT")
    # Loga usuários admin existentes
    cur.execute('SELECT * FROM admin_users')
    logging.info(f"[DB] Usuários admin existentes ao iniciar: {cur.fetchall()}")
    # Tabela de lojas
    cur.execute('''
        CREATE TABLE IF NOT EXISTS stores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            status TEXT DEFAULT 'ativo'
        )
    ''')
    # Tabela de equipamentos
    cur.execute('''
        CREATE TABLE IF NOT EXISTS devices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            store_id INTEGER,
            name TEXT NOT NULL,
            status TEXT DEFAULT 'ativo',
            last_sync TEXT,
            online INTEGER DEFAULT 0,
            identifier TEXT,
            FOREIGN KEY(store_id) REFERENCES stores(id)
        )
    ''')
    # MIGRAÇÃO: Garante que a coluna 'identifier' existe mesmo em bancos antigos
    cur.execute("PRAGMA table_info(devices)")
    columns = [row[1] for row in cur.fetchall()]
    if 'identifier' not in columns:
        logging.info("[DB] Adicionando coluna 'identifier' na tabela devices")
        cur.execute('ALTER TABLE devices ADD COLUMN identifier TEXT')
    # Tabela de auditoria/logs
    cur.execute('''
        CREATE TABLE IF NOT EXISTS audit_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            device_id INTEGER,
            device_name TEXT,
            action TEXT NOT NULL,
            details TEXT,
            FOREIGN KEY(device_id) REFERENCES devices(id)
        )
    ''')
    # Tabela de status dos agentes locais (persistência)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS agents_status (
            agent_id TEXT PRIMARY KEY,
            loja_codigo TEXT,
            loja_nome TEXT,
            status TEXT,
            last_update TEXT,
            ip TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Função para popular o banco com dados de exemplo
def populate_example_data():
    conn = get_db_connection()
    cur = conn.cursor()
    # Loga antes de inserir admin
    cur.execute('SELECT * FROM admin_users')
    logging.info(f"[DB] Usuários admin antes de popular: {cur.fetchall()}")
    example_products = [
        ('7891234567890', 'Arroz Sonda 5kg', 22.99, 'Leve 2 pague 1'),
        ('7899876543210', 'Feijão Preto 1kg', 8.49, None),
        ('7891112223334', 'Óleo de Soja 900ml', 6.99, 'Desconto 10%'),
        ('7895556667778', 'Açúcar Refinado 1kg', 4.59, None),
        ('7894443332221', 'Café Tradicional 500g', 13.99, 'Brinde Caneca'),
    ]
    for prod in example_products:
        cur.execute('INSERT OR IGNORE INTO products (barcode, name, price, promo) VALUES (?, ?, ?, ?)', prod)
    # Usuário admin padrão: admin / admin123
    cur.execute('INSERT OR IGNORE INTO admin_users (username, password) VALUES (?, ?)', ('admin', 'admin123'))
    # Loga depois de inserir admin
    cur.execute('SELECT * FROM admin_users')
    logging.info(f"[DB] Usuários admin após popular: {cur.fetchall()}")
    conn.commit()
    conn.close()

# Função utilitária para gerar hash de senha
# Documentação: https://pypi.org/project/bcrypt/
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
    except Exception:
        return False

# Função para autenticar usuário admin
# Compatível com senhas antigas (texto puro) e novas (hash)
def authenticate_admin(username: str, password: str) -> bool:
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM admin_users WHERE username = ?', (username,))
    user = cur.fetchone()
    conn.close()
    if not user:
        return False
    stored = user['password']
    # Compatibilidade: aceita hash bcrypt ou senha texto puro
    if stored.startswith('$2b$') or stored.startswith('$2a$'):
        return verify_password(password, stored)
    else:
        return password == stored


# Funções de auditoria/log (definidas primeiro para evitar erros de import)
def add_audit_log(device_id: int = None, device_name: str = None, action: str = '', details: str = ''):
    from datetime import datetime
    conn = get_db_connection()
    cur = conn.cursor()
    timestamp = datetime.utcnow().isoformat()
    cur.execute('INSERT INTO audit_log (timestamp, device_id, device_name, action, details) VALUES (?, ?, ?, ?, ?)', 
                (timestamp, device_id, device_name, action, details))
    conn.commit()
    conn.close()

def get_audit_logs(limit: int = 50):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM audit_log ORDER BY timestamp DESC LIMIT ?', (limit,))
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_device_audit_logs(device_id: int, limit: int = 20):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM audit_log WHERE device_id = ? ORDER BY timestamp DESC LIMIT ?', (device_id, limit))
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]


# CRUD de lojas
def get_all_stores():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM stores ORDER BY codigo')
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def add_store(name: str, status: str = 'ativo'):
    conn = get_db_connection()
    cur = conn.cursor()
    # Novo: exige código
    raise Exception('Use add_store_with_code(codigo, name, status)')

def add_store_with_code(codigo: str, name: str, status: str = 'ativo'):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO stores (codigo, name, status) VALUES (?, ?, ?)', (codigo, name, status))
    conn.commit()
    conn.close()
    conn.commit()
    conn.close()

def update_store(store_id: int, name: str, status: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE stores SET name = ?, status = ? WHERE id = ?', (name, status, store_id))

def update_store_code(store_id: int, codigo: str, name: str, status: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE stores SET codigo = ?, name = ?, status = ? WHERE id = ?', (codigo, name, status, store_id))
    conn.commit()
    conn.close()
def get_store_by_code(codigo: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM stores WHERE codigo = ?', (codigo,))
    row = cur.fetchone()
    conn.close()
    return dict(row) if row else None
    conn.commit()
    conn.close()

def delete_store(store_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    logging.info(f"[DB] Deletando loja id={store_id}")
    cur.execute('DELETE FROM stores WHERE id = ?', (store_id,))
    conn.commit()
    conn.close()

# CRUD de equipamentos
def get_all_devices():
    from datetime import datetime, timedelta
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM devices')
    rows = cur.fetchall()
    conn.close()
    devices = []
    now = datetime.utcnow()
    for row in rows:
        device = dict(row)
        last_sync = device.get('last_sync')
        # Considera online se o último heartbeat (last_sync) foi há menos de 2 minutos
        if last_sync:
            try:
                dt = datetime.fromisoformat(last_sync)
                device['online'] = int((now - dt) < timedelta(minutes=2))
            except Exception:
                device['online'] = 0
        else:
            device['online'] = 0
        devices.append(device)
    return devices

def add_device(store_id: int, name: str, status: str = 'ativo', last_sync: str = None, online: int = 0, identifier: str = None):
    conn = get_db_connection()
    cur = conn.cursor()
    # Usa o identifier fornecido ou gera um novo se não vier
    if not identifier:
        import uuid
        identifier = str(uuid.uuid4())
    cur.execute('INSERT INTO devices (store_id, name, status, last_sync, online, identifier) VALUES (?, ?, ?, ?, ?, ?)', (store_id, name, status, last_sync, online, identifier))
    device_id = cur.lastrowid
    conn.commit()
    conn.close()
    # Log de auditoria
    add_audit_log(device_id, name, 'DEVICE_CREATED', f'Dispositivo criado na loja ID {store_id}')
    return device_id

def update_device(device_id: int, name: str = None, status: str = None, last_sync: str = None, online: int = None):
    conn = get_db_connection()
    cur = conn.cursor()
    # Busca valores atuais
    cur.execute('SELECT name, status FROM devices WHERE id = ?', (device_id,))
    row = cur.fetchone()
    current_name = row['name'] if row else ''
    current_status = row['status'] if row else ''
    # Usa os valores atuais se não forem passados
    name = name if name not in (None, '') else current_name
    status = status if status not in (None, '') else current_status
    if online is not None:
        cur.execute('UPDATE devices SET name = ?, status = ?, last_sync = ?, online = ? WHERE id = ?', (name, status, last_sync, online, device_id))
    else:
        cur.execute('UPDATE devices SET name = ?, status = ?, last_sync = ? WHERE id = ?', (name, status, last_sync, device_id))
    conn.commit()
    conn.close()
# Novo endpoint: atualizar status online (heartbeat)
def set_device_online(identifier: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id FROM devices WHERE identifier = ?', (identifier,))
    row = cur.fetchone()
    if row:
        device_id = row['id']
        # Atualiza apenas last_sync e online, preservando nome/status
        from datetime import datetime
        now = datetime.utcnow().isoformat()
        update_device(device_id, last_sync=now, online=1)
        logging.info(f"[HEARTBEAT] Device online: id={device_id}, identifier={identifier}")
    else:
        # Loga todos os identifiers para debug
        cur.execute('SELECT id, identifier, name FROM devices')
        all_devices = cur.fetchall()
        logging.warning(f"[HEARTBEAT] Device NOT FOUND for identifier={identifier}. Devices in DB: {[dict(row) for row in all_devices]}")
    conn.close()

def set_device_offline(device_id: int):
    # Busca nome do device
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT name FROM devices WHERE id = ?', (device_id,))
    result = cur.fetchone()
    device_name = result['name'] if result else f'Device {device_id}'
    conn.close()
    
    update_device(device_id, name='', status='', last_sync=None, online=0)
    add_audit_log(device_id, device_name, 'DEVICE_OFFLINE', 'Dispositivo ficou offline')

def delete_device(device_id: int):
    # Busca nome do device antes de deletar
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT name FROM devices WHERE id = ?', (device_id,))
    result = cur.fetchone()
    device_name = result['name'] if result else f'Device {device_id}'
    logging.info(f"[DB] Deletando device id={device_id} nome={device_name}")
    cur.execute('DELETE FROM devices WHERE id = ?', (device_id,))
    conn.commit()
    conn.close()
    # Log de auditoria
    add_audit_log(device_id, device_name, 'DEVICE_DELETED', 'Dispositivo removido do sistema')


# Exportador de produtos para .txt
def export_products_to_txt(txt_path: str = 'produtos.txt'):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT barcode, name, price, promo FROM products')
    rows = cur.fetchall()
    conn.close()
    with open(txt_path, 'w', encoding='utf-8') as f:
        for row in rows:
            barcode = row['barcode']
            name = row['name']
            price = row['price']
            promo = row['promo'] if row['promo'] else ''
            f.write(f'{barcode};{name};{price};{promo}\n')
    return txt_path

def debug_list_device_identifiers():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id, identifier, name FROM devices')
    rows = cur.fetchall()
    conn.close()
    for row in rows:
        logging.info(f"[DEBUG] Device: id={row['id']}, identifier={row['identifier']}, name={row['name']}")

def upsert_agent_status(agent_id: str, loja_codigo: str = None, loja_nome: str = None, status: str = None, last_update: str = None, ip: str = None):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('''
            INSERT INTO agents_status (agent_id, loja_codigo, loja_nome, status, last_update, ip)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(agent_id) DO UPDATE SET
                loja_codigo=excluded.loja_codigo,
                loja_nome=excluded.loja_nome,
                status=excluded.status,
                last_update=excluded.last_update,
                ip=excluded.ip
        ''', (agent_id, loja_codigo, loja_nome, status, last_update, ip))
        conn.commit()
        conn.close()
    except Exception as e:
        logging.error(f"[DB][upsert_agent_status] Erro ao inserir/atualizar agente: {e}")
        raise

def get_all_agents_status():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM agents_status')
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_all_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM admin_users')
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def add_user(username: str, password: str, role: str = 'operador', store_id: int = None, permissoes: str = None):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO admin_users (username, password, role, store_id, permissoes) VALUES (?, ?, ?, ?, ?)',
                (username, password, role, store_id, permissoes))
    conn.commit()
    conn.close()

def update_user(username: str, password: str = None, role: str = None, store_id: int = None, permissoes: str = None):
    conn = get_db_connection()
    cur = conn.cursor()
    # Busca valores atuais
    cur.execute('SELECT password, role, store_id, permissoes FROM admin_users WHERE username = ?', (username,))
    row = cur.fetchone()
    current_password = row['password'] if row else None
    current_role = row['role'] if row else None
    current_store_id = row['store_id'] if row else None
    current_permissoes = row['permissoes'] if row else None
    password = password if password else current_password
    role = role if role else current_role
    store_id = store_id if store_id is not None else current_store_id
    permissoes = permissoes if permissoes is not None else current_permissoes
    cur.execute('UPDATE admin_users SET password = ?, role = ?, store_id = ?, permissoes = ? WHERE username = ?',
                (password, role, store_id, permissoes, username))
    conn.commit()
    conn.close()

def delete_user(username: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM admin_users WHERE username = ?', (username,))
    conn.commit()
    conn.close()
