import sqlite3
import csv
import os

sqlite_path = r'D:\Sonda\Precix\sync\products.db'
output_dir = r'D:\Sonda\Precix\sync'

tables = [
    'products',
    'admin_users',
    'stores',
    'devices',
    'audit_log',
    'agents_status',
    'integration_configs',
    'agent_devices',
    'agent_stores',
    'integration_runs'
]

conn = sqlite3.connect(sqlite_path)
cursor = conn.cursor()

for table in tables:
    out_csv = os.path.join(output_dir, f'{table}.csv')
    cursor.execute(f'SELECT * FROM {table}')
    rows = cursor.fetchall()
    col_names = [desc[0] for desc in cursor.description]
    with open(out_csv, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(col_names)
        writer.writerows(rows)
    print(f'Exportado: {out_csv}')

conn.close()
print('Exportação concluída!')
