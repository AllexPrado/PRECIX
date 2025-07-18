import sqlite3

DB_PATH = "backend/products.db"

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()
try:
    cur.execute("ALTER TABLE devices ADD COLUMN identifier TEXT;")
    print("Coluna 'identifier' adicionada com sucesso.")
except sqlite3.OperationalError as e:
    print("Erro ao adicionar coluna 'identifier':", e)
finally:
    conn.commit()
    conn.close()
