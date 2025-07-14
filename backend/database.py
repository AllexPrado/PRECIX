
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

DB_PATH = 'backend/products.db'

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
