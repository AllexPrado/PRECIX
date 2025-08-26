from fastapi import APIRouter, HTTPException
try:
    from .database import get_db_connection
except ImportError:
    from database import get_db_connection

router = APIRouter()

@router.get('/device/store/{uuid}')
def get_store_by_device_uuid(uuid: str):
    conn = get_db_connection()
    cur = conn.cursor()
    # Corrigido: usa s.name, não s.nome
    cur.execute('''
        SELECT s.id, s.codigo, s.name, d.id as device_id, d.identifier
        FROM devices d
        JOIN stores s ON d.store_id = s.id
        WHERE d.identifier = ?
    ''', (uuid,))
    row = cur.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail='Dispositivo ou loja não encontrados')
    return {
        'store_id': row['id'],
        'store_codigo': row['codigo'],
        'store_name': row['name'],
        'device_id': row['device_id'],
        'identifier': row['identifier']
    }
