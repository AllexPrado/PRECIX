import sqlite3

DB_PATH = "backend/products.db"

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()
try:
    cur.execute("ALTER TABLE devices ADD COLUMN last_heartbeat TEXT;")
    print("Coluna 'last_heartbeat' adicionada com sucesso.")
except sqlite3.OperationalError as e:
    print("Erro ao adicionar coluna 'last_heartbeat':", e)
finally:
    conn.commit()
    conn.close()
