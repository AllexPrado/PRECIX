import sqlite3

DB_PATH = "backend/products.db"

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()
try:
    cur.execute("ALTER TABLE devices ADD COLUMN online INTEGER DEFAULT 0;")
    print("Coluna 'online' adicionada com sucesso.")
except sqlite3.OperationalError as e:
    print("Erro ao adicionar coluna 'online':", e)
finally:
    conn.commit()
    conn.close()
