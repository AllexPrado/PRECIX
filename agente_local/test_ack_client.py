import time
import json
import requests
import threading

# start the HTTP admin server from main
import main

print('Starting HTTP admin server...')
main.start_http_server()
# wait a moment for server to bind
time.sleep(0.5)

cfg = {}
try:
    cfg = main.load_config()
except Exception:
    pass
port = int(cfg.get('http_port', 8010) or 8010)
base = f'http://127.0.0.1:{port}'
headers = {}
if cfg.get('ack_token'):
    headers['X-ACK-Token'] = cfg.get('ack_token')

print('Posting /ack/update...')
p = requests.post(base + '/ack/update', json={'device': 'TEST-1', 'status': 'received'}, headers=headers, timeout=5)
print('->', p.status_code, p.text[:200])
print('Posting /ack/price-query...')
q = requests.post(base + '/ack/price-query', json={'device': 'TEST-2', 'query': '12345'}, headers=headers, timeout=5)
print('->', q.status_code, q.text[:200])

print('Fetching /acks...')
a = requests.get(base + '/acks?lines=20', headers=headers, timeout=5)
print('->', a.status_code)
try:
    print(json.dumps(a.json(), indent=2, ensure_ascii=False)[:2000])
except Exception as e:
    print('Failed parse JSON:', e)

print('Fetching /logs...')
l = requests.get(base + '/logs?lines=50', headers=headers, timeout=5)
print('->', l.status_code)
try:
    print(json.dumps(l.json(), indent=2, ensure_ascii=False)[:2000])
except Exception as e:
    print('Failed parse JSON:', e)

print('Done')
