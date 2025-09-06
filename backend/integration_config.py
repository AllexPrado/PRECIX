from typing import List, Dict, Optional

try:
    from .database import get_db_connection
except ImportError:
    from database import get_db_connection


def create_integration_table():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        '''
        CREATE TABLE IF NOT EXISTS integration_configs (
            id SERIAL PRIMARY KEY,
            loja_id INTEGER NULL,
            tipo TEXT NOT NULL,
            parametro1 TEXT NOT NULL,
            parametro2 TEXT NULL,
            ativo INTEGER DEFAULT 1,
            layout TEXT NULL,
            UNIQUE (loja_id, tipo)
        )
        '''
    )
    conn.commit()
    conn.close()


def upsert_integration(loja_id: Optional[int], tipo: str, parametro1: str, parametro2: Optional[str], ativo: int = 1, layout: Optional[str] = None):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        '''
        INSERT INTO integration_configs (loja_id, tipo, parametro1, parametro2, ativo, layout)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON CONFLICT (loja_id, tipo) DO UPDATE SET
            parametro1 = EXCLUDED.parametro1,
            parametro2 = EXCLUDED.parametro2,
            ativo = EXCLUDED.ativo,
            layout = EXCLUDED.layout
        ''',
        (loja_id, tipo, parametro1, parametro2, ativo, layout)
    )
    conn.commit()
    conn.close()


def get_integrations(loja_id: Optional[int] = None) -> List[Dict]:
    conn = get_db_connection()
    cur = conn.cursor()
    if loja_id is not None:
        cur.execute('SELECT id, loja_id, tipo, parametro1, parametro2, ativo, layout FROM integration_configs WHERE loja_id = %s', (loja_id,))
    else:
        cur.execute('SELECT id, loja_id, tipo, parametro1, parametro2, ativo, layout FROM integration_configs')
    rows = cur.fetchall()
    conn.close()
    out: List[Dict] = []
    for row in rows:
        if isinstance(row, dict):
            out.append(row)
        else:
            out.append({
                'id': row[0],
                'loja_id': row[1],
                'tipo': row[2],
                'parametro1': row[3],
                'parametro2': row[4],
                'ativo': row[5],
                'layout': row[6],
            })
    return out


def update_integration_by_id(integration_id: int, loja_id: Optional[int], tipo: str, parametro1: str, parametro2: Optional[str], ativo: int, layout: Optional[str]):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        'UPDATE integration_configs SET loja_id = %s, tipo = %s, parametro1 = %s, parametro2 = %s, ativo = %s, layout = %s WHERE id = %s',
        (loja_id, tipo, parametro1, parametro2, ativo, layout, integration_id)
    )
    conn.commit()
    conn.close()


def delete_integration(integration_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM integration_configs WHERE id = %s', (integration_id,))
    conn.commit()
    conn.close()
