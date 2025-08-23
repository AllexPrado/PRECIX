import time
import requests
import main

main.start_http_server()
time.sleep(0.5)
try:
    resp = requests.get('http://127.0.0.1:8010/health', timeout=2)
    print('health', resp.status_code, resp.text)
    resp = requests.get('http://127.0.0.1:8010/logs?lines=5', timeout=2)
    print('logs', resp.status_code, resp.text[:400])
except Exception as e:
    print('erro', e)
