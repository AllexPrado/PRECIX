import sqlite3

DB_PATH = 'backend/products.db'

try:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("ALTER TABLE devices ADD COLUMN identifier TEXT;")
    conn.commit()
    print("Coluna 'identifier' adicionada com sucesso na tabela 'devices'.")
except sqlite3.OperationalError as e:
    if 'duplicate column name' in str(e) or 'already exists' in str(e):
        print("A coluna 'identifier' já existe na tabela 'devices'. Nenhuma alteração necessária.")
    else:
        print(f"Erro ao adicionar coluna: {e}")
finally:
    conn.close()
