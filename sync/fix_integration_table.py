import sqlite3

DB_PATH = 'products.db'

def ensure_integration_table():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    # Cria a tabela se não existir
    cur.execute('''
    CREATE TABLE IF NOT EXISTS integration_configs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        loja_id INTEGER,
        tipo TEXT,
        parametro1 TEXT,
        parametro2 TEXT,
        ativo INTEGER,
        layout TEXT
    )
    ''')
    # Tenta adicionar a coluna layout se não existir (ignora erro se já existe)
    try:
        cur.execute("ALTER TABLE integration_configs ADD COLUMN layout TEXT")
    except Exception as e:
        if 'duplicate column' not in str(e) and 'already exists' not in str(e):
            print('Erro ao adicionar coluna layout:', e)
    conn.commit()
    conn.close()
    print('Tabela integration_configs garantida com coluna layout!')

if __name__ == '__main__':
    ensure_integration_table()
