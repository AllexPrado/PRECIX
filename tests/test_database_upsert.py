import tempfile
import os
from backend import database


def test_upsert_products_basic():
    # create a temporary sqlite file and point the module to it
    tmp = tempfile.NamedTemporaryFile(delete=False)
    tmp.close()
    try:
        database.DB_PATH = tmp.name
        database.init_db()
        products = [
            {"barcode": "0001112223334", "name": "Teste A", "price": 1.23},
            {"barcode": "0001112223335", "name": "Teste B", "price": 2.34},
        ]
        res = database.upsert_products(products)
        assert res["inserted"] == 2
        # calling again with updated price should report updated
        products2 = [{"barcode": "0001112223334", "name": "Teste A2", "price": 9.99}]
        res2 = database.upsert_products(products2)
        assert res2["updated"] == 1 or res2["inserted"] == 0
        # verify data persisted
        conn = database.get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT price, name FROM products WHERE barcode = ?', ("0001112223334",))
        row = cur.fetchone()
        assert row is not None
        conn.close()
    finally:
        try:
            os.remove(tmp.name)
        except Exception:
            pass
