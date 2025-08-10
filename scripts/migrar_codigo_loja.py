# Script de migração: adiciona coluna 'codigo' única na tabela stores sem perder dados
import sqlite3

DB_PATH = r'd:/Sonda/Precix/sync/products.db'

conn = sqlite3.connect(DB_PATH)
c = conn.cursor()

# Verifica se a coluna já existe
c.execute("PRAGMA table_info(stores)")
columns = [row[1] for row in c.fetchall()]
if 'codigo' not in columns:
    print('Adicionando coluna codigo em stores...')
    c.execute("ALTER TABLE stores ADD COLUMN codigo TEXT")
    conn.commit()
    print('Coluna codigo adicionada.')
else:
    print('Coluna codigo já existe.')

# Garante unicidade (depois de preencher os códigos, criar índice único)
try:
    c.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_stores_codigo ON stores(codigo)")
    conn.commit()
    print('Índice único criado para codigo.')
except Exception as e:
    print('Erro ao criar índice único:', e)

conn.close()
print('Migração concluída.')
