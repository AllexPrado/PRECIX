from fastapi import APIRouter, HTTPException

try:
    from .database import get_db_connection
except ImportError:
    from database import get_db_connection

router = APIRouter()

# Compatibilidade: aceita também /device/store/{identifier}
@router.get('/device/store/{identifier}')
def get_device_store_compat(identifier: str):
    return get_device_store(identifier)

@router.get('/device/{uuid}/store')
def get_device_store(uuid: str):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            '''
            SELECT d.id as device_id, d.name as device_name, s.id as store_id, s.codigo as store_codigo, s.name as store_name, d.identifier
            FROM devices d
            JOIN stores s ON d.store_id = s.id
            WHERE d.identifier = %s
            ''',
            (uuid,)
        )
        row = cur.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Device not found")
        # row: (device_id, device_name, store_id, store_codigo, store_name, identifier)
        return {
            'device_id': row[0],
            'device_name': row[1],
            'store_id': row[2],
            'store_codigo': row[3],
            'store_name': row[4],
            'identifier': row[5],
        }
    finally:
        conn.close()
