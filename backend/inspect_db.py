import sqlite3, os
from pathlib import Path

def resolve_db_path():
    repo = Path(__file__).resolve().parent.parent
    cands = [repo/"backend"/"products.db", repo/"sync"/"products.db"]
    best = None
    best_devices = -1
    for p in cands:
        if not p.exists():
            continue
        conn = sqlite3.connect(str(p))
        cur = conn.cursor()
        try:
            cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='devices'")
            has = cur.fetchone() is not None
            count = 0
            if has:
                try:
                    cur.execute("SELECT COUNT(*) FROM devices")
                    count = cur.fetchone()[0]
                except Exception:
                    count = 0
        finally:
            conn.close()
        if has and count > best_devices:
            best_devices = count
            best = p
        elif best is None:
            best = p
    return str(best) if best else None


def main():
    db = resolve_db_path()
    if not db:
        print('No DB found')
        return
    print('DB =', db)
    conn = sqlite3.connect(db)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    def show(q):
        print(q)
        for r in cur.execute(q):
            print(dict(r))
    try:
        c = cur.execute('SELECT COUNT(*) as c FROM agents_status').fetchone()['c']
        print('agents_status count =', c)
        c = cur.execute('SELECT COUNT(*) as c FROM agent_devices').fetchone()['c']
        print('agent_devices count =', c)
        print('Recent agents_status:')
        show("SELECT agent_id, loja_codigo, loja_nome, status, last_update, ip FROM agents_status ORDER BY last_update DESC LIMIT 5")
        print('Recent agent_devices:')
        show("SELECT agent_id, identifier, name, status, last_update, ip FROM agent_devices ORDER BY last_update DESC LIMIT 10")
    finally:
        conn.close()

if __name__ == '__main__':
    main()
