import psycopg2
import psycopg2.extras
import os
from datetime import datetime, timezone

# Carrega variáveis do .env se existir
try:
    from dotenv import load_dotenv
    load_dotenv()
except:
    pass

PG_HOST = os.environ.get('PRECIX_PG_HOST', 'localhost')
PG_PORT = os.environ.get('PRECIX_PG_PORT', '5432')  
PG_DB = os.environ.get('PRECIX_PG_DB', 'precix')
PG_USER = os.environ.get('PRECIX_PG_USER')
PG_PASS = os.environ.get('PRECIX_PG_PASS')

try:
    conn = psycopg2.connect(
        host=PG_HOST, port=PG_PORT, dbname=PG_DB,
        user=PG_USER, password=PG_PASS
    )
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    
    print('=== VERIFICANDO AGENTES NA TABELA agents_status ===')
    cur.execute('SELECT agent_id, loja_codigo, loja_nome, status, last_update, ip FROM agents_status ORDER BY last_update DESC LIMIT 10')
    rows = cur.fetchall()
    
    now_utc = datetime.utcnow().replace(tzinfo=timezone.utc)
    print(f'Now UTC: {now_utc}')
    print()
    
    for r in rows:
        print(f'Agent: {r["agent_id"]} | Status: {r["status"]} | IP: {r["ip"]}')
        print(f'  Last Update: {r["last_update"]}')
        
        # Calcula diferença de tempo
        lu = r['last_update']
        if lu:
            try:
                if isinstance(lu, str):
                    dt = datetime.strptime(lu, '%Y-%m-%d %H:%M:%S')
                    dt = dt.replace(tzinfo=timezone.utc)
                else:
                    dt = lu
                    if dt.tzinfo is None:
                        dt = dt.replace(tzinfo=timezone.utc)
                
                diff = (now_utc - dt).total_seconds()
                calc_status = 'online' if diff <= 120 else 'offline'
                print(f'  Diff: {diff:.1f}s | Calculated: {calc_status}')
            except Exception as e:
                print(f'  Erro ao calcular: {e}')
        print()
    
    # Verifica se há múltiplos registros
    print('=== VERIFICANDO MÚLTIPLOS REGISTROS ===')
    cur.execute('SELECT ip, COUNT(*) as count FROM agents_status WHERE ip IS NOT NULL GROUP BY ip HAVING COUNT(*) > 1')
    dups_ip = cur.fetchall()
    for d in dups_ip:
        print(f'IP {d["ip"]} tem {d["count"]} registros')
    
    cur.execute('SELECT agent_id, COUNT(*) as count FROM agents_status WHERE agent_id IS NOT NULL GROUP BY agent_id HAVING COUNT(*) > 1')
    dups_id = cur.fetchall()
    for d in dups_id:
        print(f'Agent_ID {d["agent_id"]} tem {d["count"]} registros')
    
    conn.close()
    
except Exception as e:
    print(f'Erro: {e}')
