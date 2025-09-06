"""
Quick privilege checker for PRECIX tables using environment-based connection
Usage (PowerShell):
  $env:PRECIX_PG_USER='precix_user'; $env:PRECIX_PG_PASS='yourpass'; \
  python -m backend.check_db_privileges

Make sure D:\Sonda\Precix is on sys.path or run with -m from project root.
"""
import os
import sys
from pathlib import Path

# Add project root
ROOT = str(Path(__file__).resolve().parents[1])
if ROOT not in sys.path:
    sys.path.append(ROOT)

from backend.database import get_db_connection

TABLES = [
    'products', 'admin_users', 'agents_status', 'agent_devices', 'agent_stores', 'audit_log', 'stores'
]

PRIVS = ['SELECT', 'INSERT', 'UPDATE', 'DELETE']


def run():
    print("Connecting with env user=", os.getenv('PRECIX_PG_USER'))
    conn = get_db_connection()
    cur = conn.cursor()
    ok = True

    # Schema privileges
    print("\n== schema public ==")
    for p in ['USAGE', 'CREATE']:
        cur.execute("SELECT has_schema_privilege(current_user, 'public', %s)", (p,))
        has = cur.fetchone()[0]
        print(f"  {p:<6}:", 'YES' if has else 'NO')
        if p == 'USAGE' and not has:
            ok = False

    # Table privileges
    for t in TABLES:
        print(f"\n== table {t} ==")
        for p in PRIVS:
            cur.execute("SELECT has_table_privilege(current_user, %s, %s)", (f"public.{t}", p))
            has = cur.fetchone()[0]
            print(f"  {p:<6}:", 'YES' if has else 'NO')
            if p in ('SELECT', 'INSERT', 'UPDATE', 'DELETE') and not has:
                ok = False

    cur.close()
    conn.close()
    if not ok:
        print("\nOne or more privileges are missing. Apply backend/sql/grant_precix_user.sql as a superuser (postgres).")
        sys.exit(2)
    print("\nAll checks passed")


if __name__ == '__main__':
    run()
