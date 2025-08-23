import tempfile
import os
from fastapi.testclient import TestClient

# ensure workspace root in sys.path when tests run
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend import main, auth_jwt, database


def test_products_bulk_endpoint():
    tmp = tempfile.NamedTemporaryFile(delete=False)
    tmp.close()
    try:
        # point DB to temp and init
        database.DB_PATH = tmp.name
        database.init_db()
        client = TestClient(main.app)
        token = auth_jwt.create_access_token({"sub": "testuser"})
        headers = {"Authorization": f"Bearer {token}"}
        payload = [
            {"barcode": "1112223334445", "name": "Bulk A", "price": 3.21},
            {"barcode": "1112223334446", "name": "Bulk B", "price": 4.32}
        ]
        resp = client.post('/admin/products/bulk', json=payload, headers=headers)
        assert resp.status_code == 200
        j = resp.json()
        assert j.get('success') is True
        result = j.get('result')
        assert result and (result.get('inserted', 0) >= 2)
        # verify in DB
        conn = database.get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT COUNT(*) as cnt FROM products')
        cnt = cur.fetchone()['cnt']
        assert cnt >= 2
        conn.close()
    finally:
        try:
            os.remove(tmp.name)
        except Exception:
            pass
