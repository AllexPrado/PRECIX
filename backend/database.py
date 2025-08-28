import sqlite3
import os
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
    # Última sincronização: pega o maior last_sync dos devices
    cur.execute('SELECT MAX(last_sync) FROM devices WHERE last_sync IS NOT NULL')
    last_sync = cur.fetchone()[0]
    conn.close()
    return {
        'total_products': total_products,
        'last_sync': last_sync
    }

DB_PATH = None

# Utilitário: normaliza identificadores de agente para evitar duplicidade por case/espacos
def normalize_agent_id(agent_id: str) -> str:
    try:
        return str(agent_id or '').strip().lower()
    except Exception:
        return ''

def _resolve_db_path():
    # 1) Env var wins
    env = os.environ.get('PRECIX_DB_PATH')
    if env:
        return env
    # 2) Candidates (prefer the one with devices data)
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    candidate_sync = os.path.join(repo_root, 'sync', 'products.db')
    candidate_backend = os.path.join(os.path.dirname(__file__), 'products.db')
    candidates = [candidate_backend, candidate_sync]
    best = None
    best_devices = -1
    for path in candidates:
        try:
            if not os.path.exists(path):
                continue
            conn = sqlite3.connect(path)
            cur = conn.cursor()
            # Check table exists
            cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='devices'")
            has_table = cur.fetchone() is not None
            devices_count = 0
            if has_table:
                try:
                    cur.execute('SELECT COUNT(*) FROM devices')
                    devices_count = cur.fetchone()[0]
                except Exception:
                    devices_count = 0
            conn.close()
            # Prefer the DB with more devices
            if has_table and devices_count > best_devices:
                best_devices = devices_count
                best = path
            elif best is None:
                # Fallback to the first existing candidate
                best = path
        except Exception:
            continue
    return best or candidate_sync

def get_db_connection():
    global DB_PATH
    if not DB_PATH:
        DB_PATH = _resolve_db_path()
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    try:
        # Reduz "database is locked" em concorrência leve
        conn.execute('PRAGMA busy_timeout=5000')
        # Melhora concorrência de leitura/gravação
        conn.execute('PRAGMA journal_mode=WAL')
        conn.execute('PRAGMA synchronous=NORMAL')
    except Exception:
        pass
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


def upsert_products(products: list):
    """Insere ou atualiza produtos em lote.

    products: lista de dicionários com, pelo menos, 'barcode' e 'price'.
    Retorna um dicionário com contadores: inserted, updated, ignored.
    """
    if not products:
        return {'inserted': 0, 'updated': 0, 'ignored': 0}
    conn = get_db_connection()
    cur = conn.cursor()
    inserted = 0
    updated = 0
    ignored = 0
    for p in products:
        try:
            if not isinstance(p, dict):
                ignored += 1
                continue
            barcode = str(p.get('barcode') or p.get('codigo') or '').strip()
            if not barcode:
                ignored += 1
                continue
            name = p.get('name') or p.get('nome') or ''
            try:
                price = float(p.get('price') if p.get('price') is not None else 0)
            except Exception:
                price = 0.0
            promo = p.get('promo') or p.get('promocao') or None
            # detecta presença
            cur.execute('SELECT 1 FROM products WHERE barcode = ?', (barcode,))
            if cur.fetchone():
                cur.execute('UPDATE products SET name = ?, price = ?, promo = ? WHERE barcode = ?', (name, price, promo, barcode))
                updated += 1
            else:
                cur.execute('INSERT INTO products (barcode, name, price, promo) VALUES (?, ?, ?, ?)', (barcode, name, price, promo))
                inserted += 1
        except Exception:
            ignored += 1
            continue
    conn.commit()
    conn.close()
    return {'inserted': inserted, 'updated': updated, 'ignored': ignored}


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
            last_catalog_sync TEXT,
            catalog_count INTEGER,
            FOREIGN KEY(store_id) REFERENCES stores(id)
        )
    ''')
    # MIGRAÇÃO: Garante que a coluna 'identifier' existe mesmo em bancos antigos
    cur.execute("PRAGMA table_info(devices)")
    columns = [row[1] for row in cur.fetchall()]
    if 'identifier' not in columns:
        logging.info("[DB] Adicionando coluna 'identifier' na tabela devices")
        cur.execute('ALTER TABLE devices ADD COLUMN identifier TEXT')
    # MIGRAÇÃO: adiciona colunas de catálogo
    if 'last_catalog_sync' not in columns:
        logging.info("[DB] Adicionando coluna 'last_catalog_sync' na tabela devices")
        cur.execute('ALTER TABLE devices ADD COLUMN last_catalog_sync TEXT')
    if 'catalog_count' not in columns:
        logging.info("[DB] Adicionando coluna 'catalog_count' na tabela devices")
        cur.execute('ALTER TABLE devices ADD COLUMN catalog_count INTEGER')
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
    # Tabela de dispositivos legados gerenciados por agentes locais
    cur.execute('''
        CREATE TABLE IF NOT EXISTS agent_devices (
            agent_id TEXT NOT NULL,
            identifier TEXT NOT NULL,
            name TEXT,
            tipo TEXT DEFAULT 'LEGACY',
            status TEXT,
            last_update TEXT,
            ip TEXT,
            last_catalog_sync TEXT,
            catalog_count INTEGER,
            PRIMARY KEY (agent_id, identifier)
        )
    ''')
    # Migração: acrescenta colunas de loja se não existirem
    cur.execute("PRAGMA table_info(agent_devices)")
    ad_cols = [row[1] for row in cur.fetchall()]
    if 'store_code' not in ad_cols:
        cur.execute('ALTER TABLE agent_devices ADD COLUMN store_code TEXT')
    if 'store_name' not in ad_cols:
        cur.execute('ALTER TABLE agent_devices ADD COLUMN store_name TEXT')
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
    # Tabela de lojas vinculadas por agente (para múltiplas lojas)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS agent_stores (
            agent_id TEXT NOT NULL,
            loja_codigo TEXT,
            loja_nome TEXT,
            PRIMARY KEY(agent_id, loja_codigo)
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
        # Considera online se o último heartbeat (last_sync) foi há menos de 120 segundos
        if last_sync:
            try:
                dt = datetime.fromisoformat(last_sync)
                device['online'] = int((now - dt) < timedelta(seconds=120))
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

def update_device(device_id: int, name: str = None, status: str = None, last_sync: str = None, online: int = None, store_id: int = None, identifier: str = None):
    conn = get_db_connection()
    cur = conn.cursor()
    # Busca valores atuais
    cur.execute('SELECT name, status, store_id, identifier FROM devices WHERE id = ?', (device_id,))
    row = cur.fetchone()
    current_name = row['name'] if row else ''
    current_status = row['status'] if row else ''
    current_store_id = row['store_id'] if row else None
    current_identifier = row['identifier'] if row else None
    # Permite atualizar identifier para vazio ou null explicitamente
    if identifier == "null":
        identifier = None
    # Se for para atualizar o identifier, verifica unicidade (não pode duplicar)
    if identifier not in (None, '', current_identifier):
        conn_check = get_db_connection()
        cur_check = conn_check.cursor()
        cur_check.execute('SELECT id FROM devices WHERE identifier = ?', (identifier,))
        found = cur_check.fetchone()
        conn_check.close()
        if found and found['id'] != device_id:
            raise Exception(f"Já existe outro equipamento com o identificador {identifier}.")
    # Nunca remove ou sobrescreve identifier de outro device
    name = name if name not in (None, '') else current_name
    status = status if status not in (None, '') else current_status
    store_id = store_id if store_id not in (None, '') else current_store_id
    if identifier is None:
        identifier = current_identifier
    elif identifier == '':
        identifier = ''
    else:
        identifier = identifier
    if online is not None:
        cur.execute('UPDATE devices SET name = ?, status = ?, last_sync = ?, online = ?, store_id = ?, identifier = ? WHERE id = ?', (name, status, last_sync, online, store_id, identifier, device_id))
    else:
        cur.execute('UPDATE devices SET name = ?, status = ?, last_sync = ?, store_id = ?, identifier = ? WHERE id = ?', (name, status, last_sync, store_id, identifier, device_id))
    conn.commit()
    conn.close()
# Novo endpoint: atualizar status online (heartbeat)
def set_device_online(identifier: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id FROM devices WHERE identifier = ?', (identifier,))
    row = cur.fetchone()
    from datetime import datetime
    now = datetime.utcnow().isoformat()
    if row:
        device_id = row['id']
        # Atualiza apenas last_sync e online, preservando nome/status e identifier
        update_device(device_id, last_sync=now, online=1)
        logging.info(f"[HEARTBEAT] Device online: id={device_id}, identifier={identifier}")
    else:
        # Garante que não existe outro device com esse identifier (unicidade)
        # Busca device com o identifier informado
        cur.execute('SELECT id FROM devices WHERE identifier = ?', (identifier,))
        row = cur.fetchone()
        from datetime import datetime
        now = datetime.utcnow().isoformat()
        if row:
            device_id = row['id']
            # Só atualiza online e last_sync, nunca mexe no identifier
            update_device(device_id, last_sync=now, online=1)
            logging.info(f"[HEARTBEAT] Device online: id={device_id}, identifier={identifier}")
        else:
            # Não existe device com esse identifier, cria novo
            logging.warning(f"[HEARTBEAT] Device NOT FOUND for identifier={identifier}. Criando novo device.")
            default_name = f"Novo Equipamento {identifier[:8]}"
            cur.execute('SELECT id FROM stores ORDER BY id LIMIT 1')
            store_row = cur.fetchone()
            default_store_id = store_row['id'] if store_row else None
            from database import add_device
            add_device(default_store_id, default_name, identifier=identifier, last_sync=now, online=1)

def get_device_by_identifier(identifier: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM devices WHERE identifier = ?', (identifier,))
    row = cur.fetchone()
    conn.close()
    return dict(row) if row else None

def update_device_catalog_sync(identifier: str, total_products: int = None, timestamp: str = None):
    """Atualiza colunas de sincronização de catálogo por identifier."""
    conn = get_db_connection()
    cur = conn.cursor()
    # Define timestamp
    if not timestamp:
        from datetime import datetime
        timestamp = datetime.utcnow().isoformat()
    # Garante que o device existe
    cur.execute('SELECT id FROM devices WHERE identifier = ?', (identifier,))
    row = cur.fetchone()
    if not row:
        # cria placeholder
        default_name = f"Novo Equipamento {identifier[:8]}"
        cur.execute('SELECT id FROM stores ORDER BY id LIMIT 1')
        store_row = cur.fetchone()
        default_store_id = store_row['id'] if store_row else None
        cur.execute('INSERT INTO devices (store_id, name, status, last_sync, online, identifier, last_catalog_sync, catalog_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    (default_store_id, default_name, 'ativo', timestamp, 1, identifier, timestamp, total_products or 0))
        conn.commit()
        conn.close()
        return
    # Atualiza existentes
    cur.execute('UPDATE devices SET last_catalog_sync = ?, catalog_count = ? WHERE identifier = ?', (timestamp, total_products, identifier))
    conn.commit()
    conn.close()

def set_device_offline(device_id: int):
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
        agent_id = normalize_agent_id(agent_id)
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

def replace_agent_stores(agent_id: str, lojas: list):
    """Substitui a lista de lojas vinculadas a um agente."""
    try:
        agent_id = normalize_agent_id(agent_id)
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM agent_stores WHERE agent_id = ?', (agent_id,))
        for lj in lojas or []:
            if not isinstance(lj, dict):
                continue
            codigo = (lj.get('codigo') or '').strip()
            nome = (lj.get('nome') or lj.get('name') or '').strip()
            if not codigo and not nome:
                continue
            cur.execute('INSERT OR REPLACE INTO agent_stores (agent_id, loja_codigo, loja_nome) VALUES (?, ?, ?)', (agent_id, codigo or None, nome or None))
        conn.commit()
        conn.close()
    except Exception as e:
        logging.error(f"[DB][replace_agent_stores] {e}")
        raise

def get_agent_stores(agent_id: str):
    agent_id = normalize_agent_id(agent_id)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT loja_codigo, loja_nome FROM agent_stores WHERE agent_id = ? ORDER BY loja_codigo', (agent_id,))
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_all_agents_status():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM agents_status')
    rows = cur.fetchall()
    conn.close()
    # Normaliza agent_id no retorno para consumo unificado
    out = []
    for row in rows:
        d = dict(row)
        d['agent_id'] = normalize_agent_id(d.get('agent_id'))
        out.append(d)
    return out

def delete_agent_status(agent_id: str):
    agent_id = normalize_agent_id(agent_id)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM agents_status WHERE agent_id = ?', (agent_id,))
    conn.commit()
    conn.close()

def update_agent_status(agent_id: str, loja_codigo: str = None, loja_nome: str = None, status: str = None, ip: str = None, last_update: str = None):
    agent_id = normalize_agent_id(agent_id)
    conn = get_db_connection()
    cur = conn.cursor()
    # Busca valores atuais
    cur.execute('SELECT loja_codigo, loja_nome, status, last_update, ip FROM agents_status WHERE agent_id = ?', (agent_id,))
    row = cur.fetchone()
    if not row:
        # Se não existir, cria com os dados fornecidos
        conn.close()
        upsert_agent_status(agent_id, loja_codigo=loja_codigo, loja_nome=loja_nome, status=status, last_update=last_update, ip=ip)
        return
    current = dict(row)
    new_loja_codigo = loja_codigo if loja_codigo is not None else current.get('loja_codigo')
    new_loja_nome = loja_nome if loja_nome is not None else current.get('loja_nome')
    new_status = status if status is not None else current.get('status')
    new_last_update = last_update if last_update is not None else current.get('last_update')
    new_ip = ip if ip is not None else current.get('ip')
    cur.execute('''
        UPDATE agents_status
           SET loja_codigo = ?, loja_nome = ?, status = ?, last_update = ?, ip = ?
         WHERE agent_id = ?
    ''', (new_loja_codigo, new_loja_nome, new_status, new_last_update, new_ip, agent_id))
    conn.commit()
    conn.close()

def _parse_dt(dt_str: str):
    from datetime import datetime as _dt
    if not dt_str:
        return None
    for fmt in ('%Y-%m-%d %H:%M:%S', '%Y-%m-%dT%H:%M:%S', '%d/%m/%Y, %H:%M:%S'):
        try:
            return _dt.strptime(str(dt_str), fmt)
        except Exception:
            continue
    # try ISO flexible
    try:
        return _dt.fromisoformat(str(dt_str))
    except Exception:
        return None

def dedupe_agents():
    """Normaliza e deduplica registros de agentes e referencias.
    - Canonicaliza agent_id para lower().strip()
    - Mantem apenas 1 registro por agent_id (o de last_update mais recente)
    - Migra agent_stores e agent_devices para o agent_id canônico
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT agent_id, loja_codigo, loja_nome, status, last_update, ip FROM agents_status')
        rows = cur.fetchall()
        # Agrupa por id normalizado
        groups = {}
        for row in rows:
            raw_id = row['agent_id']
            norm = normalize_agent_id(raw_id)
            groups.setdefault(norm, []).append(dict(row))
        for norm_id, lst in groups.items():
            if norm_id == '':
                # limpa entradas inválidas
                cur.execute("DELETE FROM agents_status WHERE agent_id IS NULL OR TRIM(agent_id) = ''")
                continue
            # Seleciona registro vencedor pelo last_update mais recente
            best = None
            best_dt = None
            for rec in lst:
                dt = _parse_dt(rec.get('last_update'))
                if dt and (best_dt is None or dt > best_dt):
                    best_dt = dt
                    best = rec
                elif best is None:
                    best = rec
            # Garante registro canônico
            if best:
                upsert_agent_status(norm_id, best.get('loja_codigo'), best.get('loja_nome'), best.get('status'), best.get('last_update'), best.get('ip'))
            # Migra children e remove duplicados com ids divergentes
            raw_values = set([r.get('agent_id') for r in lst if r.get('agent_id')])
            for raw in list(raw_values):
                if not raw or normalize_agent_id(raw) == norm_id:
                    continue
                # Atualiza agent_stores
                cur.execute('UPDATE agent_stores SET agent_id = ? WHERE agent_id = ?', (norm_id, raw))
                # Atualiza agent_devices
                cur.execute('UPDATE agent_devices SET agent_id = ? WHERE agent_id = ?', (norm_id, raw))
                # Remove antigo em agents_status
                cur.execute('DELETE FROM agents_status WHERE agent_id = ?', (raw,))
        conn.commit()
        conn.close()
    except Exception as e:
        logging.error(f"[DB][dedupe_agents] {e}")
        # não propaga para não derrubar startup

def _latest_agent_id_for_ip(ip: str):
    """Retorna (agent_id, last_update) mais recente para um IP, sem janela de tempo."""
    try:
        if not ip:
            return None, None
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT agent_id, last_update FROM agents_status WHERE ip = ?', (ip,))
        rows = cur.fetchall()
        conn.close()
        if not rows:
            return None, None
        best_id = None
        best_dt = None
        for r in rows:
            dt = _parse_dt(r['last_update'])
            if dt and (best_dt is None or dt > best_dt):
                best_dt = dt
                best_id = normalize_agent_id(r['agent_id'])
        return best_id, best_dt
    except Exception as e:
        logging.error(f"[DB][_latest_agent_id_for_ip] {e}")
        return None, None

def dedupe_agents_by_ip():
    """
    Colapsa agentes com o mesmo IP em um único agent_id canônico (o mais recente),
    migrando agent_stores e agent_devices e removendo duplicados em agents_status.
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "SELECT ip, COUNT(*) as c FROM agents_status "
            "WHERE ip IS NOT NULL AND TRIM(ip) <> '' "
            "GROUP BY ip HAVING c > 1"
        )
        groups = cur.fetchall()
        for g in groups:
            ip = g['ip']
            # Determina id canônico
            cur.execute('SELECT agent_id, last_update FROM agents_status WHERE ip = ?', (ip,))
            rows = cur.fetchall()
            canonical_id = None
            best_dt = None
            for r in rows:
                dt = _parse_dt(r['last_update'])
                aid = normalize_agent_id(r['agent_id'])
                if dt and (best_dt is None or dt > best_dt):
                    best_dt = dt
                    canonical_id = aid
                elif canonical_id is None:
                    canonical_id = aid
            if not canonical_id:
                continue
            # Garante registro canônico atualizado
            cur.execute(
                'SELECT loja_codigo, loja_nome, status, last_update, ip FROM agents_status WHERE agent_id = ?',
                (canonical_id,)
            )
            best = cur.fetchone()
            if best:
                upsert_agent_status(
                    canonical_id,
                    best['loja_codigo'],
                    best['loja_nome'],
                    best['status'],
                    best['last_update'],
                    best['ip']
                )
            # Migra filhos e remove duplicados com segurança (evita UNIQUE conflicts)
            cur.execute('SELECT agent_id FROM agents_status WHERE ip = ?', (ip,))
            others = cur.fetchall()
            for r in others:
                raw = r['agent_id']
                if not raw:
                    continue
                if normalize_agent_id(raw) == canonical_id:
                    continue
                # Copia lojas da origem para o canônico (upsert por (agent_id, loja_codigo))
                cur.execute('SELECT loja_codigo, loja_nome FROM agent_stores WHERE agent_id = ?', (raw,))
                stores_rows = cur.fetchall()
                for s in stores_rows or []:
                    cur.execute(
                        'INSERT OR REPLACE INTO agent_stores (agent_id, loja_codigo, loja_nome) VALUES (?, ?, ?)',
                        (canonical_id, s['loja_codigo'], s['loja_nome'])
                    )
                # Copia devices da origem para o canônico (upsert por (agent_id, identifier))
                cur.execute('SELECT identifier, name, tipo, status, last_update, ip, last_catalog_sync, catalog_count, store_code, store_name FROM agent_devices WHERE agent_id = ?', (raw,))
                dev_rows = cur.fetchall()
                for d in dev_rows or []:
                    cur.execute(
                        'INSERT OR REPLACE INTO agent_devices (agent_id, identifier, name, tipo, status, last_update, ip, last_catalog_sync, catalog_count, store_code, store_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        (canonical_id, d['identifier'], d['name'], d['tipo'], d['status'], d['last_update'], d['ip'], d['last_catalog_sync'], d['catalog_count'], d['store_code'], d['store_name'])
                    )
                # Remove origem após copiar
                cur.execute('DELETE FROM agent_stores WHERE agent_id = ?', (raw,))
                cur.execute('DELETE FROM agent_devices WHERE agent_id = ?', (raw,))
                cur.execute('DELETE FROM agents_status WHERE agent_id = ?', (raw,))
        conn.commit()
        conn.close()
    except Exception as e:
        logging.error(f"[DB][dedupe_agents_by_ip] {e}")

def get_latest_agent_by_ip(ip: str):
    """Retorna o agent_id mais recente para um IP, sem limitar por janela de tempo."""
    aid, _ = _latest_agent_id_for_ip(ip)
    return aid

def get_recent_agent_by_ip(ip: str, window_seconds: int = 300) -> Optional[str]:
    """Retorna o agent_id mais recente para um IP dentro de uma janela de tempo.
    Usado para unificar múltiplos processos (GUI/Serviço) rodando na mesma máquina.
    """
    try:
        if not ip:
            return None
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT agent_id, last_update FROM agents_status WHERE ip = ?', (ip,))
        rows = cur.fetchall()
        conn.close()
        if not rows:
            return None
        from datetime import datetime, timedelta
        now = datetime.now()
        best_id = None
        best_dt = None
        for r in rows:
            dt = _parse_dt(r['last_update'])
            if not dt:
                continue
            if (now - dt) <= timedelta(seconds=window_seconds):
                if best_dt is None or dt > best_dt:
                    best_dt = dt
                    best_id = normalize_agent_id(r['agent_id'])
        return best_id
    except Exception as e:
        logging.error(f"[DB][get_recent_agent_by_ip] {e}")
        return None

def get_all_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM admin_users')
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# --- Reatribuição de devices órfãos para o agente canônico por IP ---
def reassign_orphan_agent_devices_by_ip():
    """Move registros de agent_devices cujo agent_id não existe mais em agents_status
    para o agent_id canônico determinado pelo IP do próprio device.

    Estratégia segura: para cada device órfão, faz INSERT OR REPLACE no canônico
    e depois remove o registro antigo, evitando falhas de UNIQUE.
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        # Seleciona devices cujo agent_id não está presente em agents_status
        cur.execute(
            'SELECT d.agent_id, d.identifier, d.name, d.tipo, d.status, d.last_update, d.ip, '
            '       d.last_catalog_sync, d.catalog_count, d.store_code, d.store_name '
            '  FROM agent_devices d '
            '  LEFT JOIN agents_status a ON a.agent_id = d.agent_id '
            ' WHERE a.agent_id IS NULL'
        )
        rows = cur.fetchall()
        moved = 0
        for r in rows or []:
            ip = (r['ip'] or '').strip()
            if not ip:
                continue
            canonical_id = get_latest_agent_by_ip(ip)
            if not canonical_id:
                continue
            if normalize_agent_id(canonical_id) == normalize_agent_id(r['agent_id']):
                continue
            # Copia para o canônico e remove origem
            cur.execute(
                'INSERT OR REPLACE INTO agent_devices '
                ' (agent_id, identifier, name, tipo, status, last_update, ip, last_catalog_sync, catalog_count, store_code, store_name) '
                ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                (normalize_agent_id(canonical_id), r['identifier'], r['name'], r['tipo'], r['status'], r['last_update'], r['ip'], r['last_catalog_sync'], r['catalog_count'], r['store_code'], r['store_name'])
            )
            cur.execute('DELETE FROM agent_devices WHERE agent_id = ? AND identifier = ?', (r['agent_id'], r['identifier']))
            moved += 1
        if moved:
            conn.commit()
        conn.close()
    except Exception as e:
        logging.error(f"[DB][reassign_orphan_agent_devices_by_ip] {e}")

# --- Agent Devices (legacy) ---
def upsert_agent_device(agent_id: str, identifier: str, name: str = None, tipo: str = 'LEGACY', status: str = None, last_update: str = None, ip: str = None, last_catalog_sync: str = None, catalog_count: int = None, store_code: str = None, store_name: str = None):
    agent_id = normalize_agent_id(agent_id)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
    INSERT INTO agent_devices (agent_id, identifier, name, tipo, status, last_update, ip, last_catalog_sync, catalog_count, store_code, store_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(agent_id, identifier) DO UPDATE SET
            name=COALESCE(excluded.name, agent_devices.name),
            tipo=COALESCE(excluded.tipo, agent_devices.tipo),
            status=COALESCE(excluded.status, agent_devices.status),
            last_update=COALESCE(excluded.last_update, agent_devices.last_update),
            ip=COALESCE(excluded.ip, agent_devices.ip),
            last_catalog_sync=COALESCE(excluded.last_catalog_sync, agent_devices.last_catalog_sync),
        catalog_count=COALESCE(excluded.catalog_count, agent_devices.catalog_count),
        store_code=COALESCE(excluded.store_code, agent_devices.store_code),
        store_name=COALESCE(excluded.store_name, agent_devices.store_name)
    ''', (agent_id, identifier, name, tipo, status, last_update, ip, last_catalog_sync, catalog_count, store_code, store_name))
    conn.commit()
    conn.close()

def bulk_upsert_agent_devices(agent_id: str, devices: list):
    from datetime import datetime
    agent_id = normalize_agent_id(agent_id)
    # Usa horário local para compatibilidade com cálculo em get_agent_devices
    now = datetime.now().isoformat()
    for d in devices or []:
        upsert_agent_device(
            agent_id=agent_id,
            identifier=str(d.get('identifier') or '').strip(),
            name=d.get('name'),
            tipo=d.get('tipo') or 'LEGACY',
            status=d.get('status') or 'online',
            last_update=d.get('last_update') or now,
            ip=d.get('ip'),
            last_catalog_sync=d.get('last_catalog_sync'),
            catalog_count=d.get('catalog_count'),
            store_code=d.get('store_code') or d.get('loja') or d.get('loja_codigo'),
            store_name=d.get('store_name') or d.get('loja_nome')
        )

def get_agent_devices(agent_id: str):
    """Lista dispositivos de um agente com status calculado por frescor de last_update.
    Regra: online se last_update dentro da janela de 120s (mesma lógica do PWA/heartbeat).
    """
    agent_id = normalize_agent_id(agent_id)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM agent_devices WHERE agent_id = ? ORDER BY name, identifier', (agent_id,))
    rows = cur.fetchall()
    conn.close()
    devices = []
    try:
        from datetime import datetime, timedelta
        # Usa horário local para comparar com last_update enviado pelo agente (também local)
        now = datetime.now()
    except Exception:
        now = None
    for row in rows:
        d = dict(row)
        # normaliza status textual legado
        raw_status = (d.get('status') or '').strip().lower()
        mapped = None
        if raw_status in ('ok', 'online', 'ligado', 'ativo', 'sucesso'):
            mapped = 'online'
        elif raw_status in ('desconhecido', 'unknown', 'offline', 'desligado', 'inativo', 'falha', 'erro'):
            mapped = 'offline'
        # Regra: se mapeado explicitamente como offline/unknown, respeita isso.
        # Caso contrário, usa frescor de last_update para decidir online/offline.
        final_status = mapped
        if final_status != 'offline':
            lu = d.get('last_update')
            if lu and now:
                try:
                    # aceita ISO 8601 ou 'YYYY-mm-dd HH:MM:SS'
                    try:
                        dt = datetime.fromisoformat(str(lu))
                    except Exception:
                        from datetime import datetime as _dt
                        dt = _dt.strptime(str(lu), '%Y-%m-%d %H:%M:%S')
                    final_status = 'online' if (now - dt) <= timedelta(seconds=120) else 'offline'
                except Exception:
                    pass
        # aplica cálculo (fallback para valor já salvo)
        d['status'] = final_status or (d.get('status') or 'offline')
        # opcional: booleano para facilitar UI futuras
        d['online'] = 1 if (d.get('status') or '').lower() == 'online' else 0
        devices.append(d)
    return devices

def delete_agent_device(agent_id: str, identifier: str):
    agent_id = normalize_agent_id(agent_id)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM agent_devices WHERE agent_id = ? AND identifier = ?', (agent_id, identifier))
    conn.commit()
    conn.close()

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
