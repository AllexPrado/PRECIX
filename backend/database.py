import sqlite3
from typing import Optional, Dict



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

DB_PATH = 'products.db'

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
    # Tabela de lojas
    cur.execute('''
        CREATE TABLE IF NOT EXISTS stores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
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
            FOREIGN KEY(store_id) REFERENCES stores(id)
        )
    ''')
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
    conn.commit()
    conn.close()

# Função para popular o banco com dados de exemplo
def populate_example_data():
    conn = get_db_connection()
    cur = conn.cursor()
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
    conn.commit()
    conn.close()

# Função para autenticar usuário admin
def authenticate_admin(username: str, password: str) -> bool:
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM admin_users WHERE username = ? AND password = ?', (username, password))
    user = cur.fetchone()
    conn.close()
    return user is not None


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
    cur.execute('SELECT * FROM stores')
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def add_store(name: str, status: str = 'ativo'):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO stores (name, status) VALUES (?, ?)', (name, status))
    conn.commit()
    conn.close()

def update_store(store_id: int, name: str, status: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE stores SET name = ?, status = ? WHERE id = ?', (name, status, store_id))
    conn.commit()
    conn.close()

def delete_store(store_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
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
        last_heartbeat = device.get('last_heartbeat')
        # Considera online se o último heartbeat foi há menos de 2 minutos
        if last_heartbeat:
            try:
                dt = datetime.fromisoformat(last_heartbeat)
                device['online'] = int((now - dt) < timedelta(minutes=2))
            except Exception:
                device['online'] = 0
        else:
            device['online'] = 0
        devices.append(device)
    return devices

def add_device(store_id: int, name: str, status: str = 'ativo', last_sync: str = None, online: int = 0):
    conn = get_db_connection()
    cur = conn.cursor()
    # Gera identificador único simples (pode ser UUID, MAC, etc)
    import uuid
    identifier = str(uuid.uuid4())
    cur.execute('INSERT INTO devices (store_id, name, status, last_sync, online, identifier) VALUES (?, ?, ?, ?, ?, ?)', (store_id, name, status, last_sync, online, identifier))
    device_id = cur.lastrowid
    conn.commit()
    conn.close()
    # Log de auditoria
    add_audit_log(device_id, name, 'DEVICE_CREATED', f'Dispositivo criado na loja ID {store_id}')
    return device_id

def update_device(device_id: int, name: str, status: str, last_sync: str = None, online: int = None):
    conn = get_db_connection()
    cur = conn.cursor()
    if online is not None:
        cur.execute('UPDATE devices SET name = ?, status = ?, last_sync = ?, online = ? WHERE id = ?', (name, status, last_sync, online, device_id))
    else:
        cur.execute('UPDATE devices SET name = ?, status = ?, last_sync = ? WHERE id = ?', (name, status, last_sync, device_id))
    conn.commit()
    conn.close()
# Novo endpoint: atualizar status online (heartbeat)
def set_device_online(device_id: int):
    from datetime import datetime
    now = datetime.utcnow().isoformat()
    # Verifica se o device estava offline antes
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT name, online FROM devices WHERE id = ?', (device_id,))
    result = cur.fetchone()
    was_offline = result and not result['online']
    device_name = result['name'] if result else f'Device {device_id}'
    conn.close()
    
    update_device(device_id, name='', status='', last_sync=now, online=1)
    
    # Log apenas se estava offline (evita spam de logs)
    if was_offline:
        add_audit_log(device_id, device_name, 'DEVICE_ONLINE', 'Dispositivo voltou online')

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
