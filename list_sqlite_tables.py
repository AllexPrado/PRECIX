import sqlite3

# Caminho do banco SQLite
sqlite_path = r'D:\Sonda\Precix\sync\products.db'

# Conectar ao banco
conn = sqlite3.connect(sqlite_path)
cursor = conn.cursor()

# Listar todas as tabelas
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

print('Tabelas encontradas:')
for table in tables:
    print(table[0])

conn.close()
