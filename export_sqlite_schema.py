import sqlite3

sqlite_path = r'D:\Sonda\Precix\sync\products.db'
output_path = r'D:\Sonda\Precix\sqlite_schema.sql'

conn = sqlite3.connect(sqlite_path)
cursor = conn.cursor()

# Exportar o schema de todas as tabelas
with open(output_path, 'w', encoding='utf-8') as f:
    for row in cursor.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"):
        if row[0]:
            f.write(row[0] + ";\n\n")

conn.close()
print(f'Schema exportado para {output_path}')
