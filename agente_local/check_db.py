import sqlite3, os, sys
p = r"D:\Sonda\Precix\sync\products.db"
print('DB path:', p)
print('exists:', os.path.exists(p))
if not os.path.exists(p):
    sys.exit(2)
try:
    con = sqlite3.connect(p)
    c = con.cursor()
    try:
        c.execute('SELECT count(*) FROM products')
        cnt = c.fetchone()[0]
        print('count:', cnt)
    except Exception as e:
        print('count error:', e)
    try:
        c.execute('SELECT rowid, barcode, name, price FROM products LIMIT 3')
        rows = c.fetchall()
        print('sample rows:', rows)
    except Exception as e:
        print('sample query error:', e)
except Exception as e:
    print('open error:', e)
finally:
    try:
        con.close()
    except Exception:
        pass
