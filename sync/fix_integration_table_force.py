import sqlite3

DB_PATH = 'products.db'

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# Verifica se a coluna layout já existe
cur.execute("PRAGMA table_info(integration_configs)")
columns = [row[1] for row in cur.fetchall()]
if 'layout' in columns:
    print("A coluna 'layout' já existe. Nada a fazer.")
else:
    print("Corrigindo tabela integration_configs...")
    # Renomeia a tabela antiga
    cur.execute("ALTER TABLE integration_configs RENAME TO integration_configs_old")
    # Cria a nova tabela com a coluna layout
    cur.execute('''
    CREATE TABLE integration_configs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        loja_id INTEGER,
        tipo TEXT,
        parametro1 TEXT,
        parametro2 TEXT,
        ativo INTEGER,
        layout TEXT
    )
    ''')
    # Copia os dados antigos (sem a coluna layout)
    cur.execute('''
    INSERT INTO integration_configs (id, loja_id, tipo, parametro1, parametro2, ativo)
    SELECT id, loja_id, tipo, parametro1, parametro2, ativo FROM integration_configs_old
    ''')
    # Remove a tabela antiga
    cur.execute("DROP TABLE integration_configs_old")
    conn.commit()
    print("Tabela integration_configs atualizada com a coluna layout!")

conn.close()
