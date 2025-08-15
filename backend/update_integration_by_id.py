import sqlite3
from typing import Optional
DB_PATH = r'd:\Sonda\Precix\sync\products.db'

def update_integration_by_id(id_: int, loja_id: Optional[int], tipo: str, parametro1: str, parametro2: str, ativo: int = 1, layout: Optional[str] = None):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('''
        UPDATE integration_configs SET loja_id=?, tipo=?, parametro1=?, parametro2=?, layout=?, ativo=? WHERE id=?
    ''', (loja_id, tipo, parametro1, parametro2, layout, ativo, id_))
    conn.commit()
    conn.close()
