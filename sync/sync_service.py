import os
import sys
import sqlite3
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))
from database import DB_PATH, init_db

def import_txt_to_db(txt_path):
    if not os.path.exists(txt_path):
        print(f'Arquivo não encontrado: {txt_path}')
        return
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    with open(txt_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or ';' not in line:
                continue
            parts = line.split(';')
            if len(parts) < 4:
                print(f'Linha inválida: {line}')
                continue
            barcode, name, price, promo = parts
            try:
                price = float(price)
            except ValueError:
                print(f'Preço inválido: {price} (linha: {line})')
                continue
            cur.execute('INSERT OR REPLACE INTO products (barcode, name, price, promo) VALUES (?, ?, ?, ?)',
                        (barcode, name, price, promo if promo else None))
    conn.commit()
    conn.close()
    print('Importação concluída.')

if __name__ == '__main__':
    init_db()
    import_txt_to_db(r'd:\Sonda\Precix\sync\produtos.txt')  # Altere para o caminho do seu arquivo .txt
