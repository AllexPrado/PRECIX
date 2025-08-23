import time
import json
import requests
import os
import threading
import main


def start_server():
    main.start_http_server()


def test_ack_endpoints():
    # start server
    t = threading.Thread(target=start_server, daemon=True)
    t.start()
    time.sleep(0.5)
    cfg = main.load_config()
    port = int(cfg.get('http_port', 8010) or 8010)
    base = f'http://127.0.0.1:{port}'
    headers = {}
    if cfg.get('ack_token'):
        headers['X-ACK-Token'] = cfg.get('ack_token')

    # post update
    r1 = requests.post(base + '/ack/update', json={'device': 'TEST-UNIT', 'status': 'ok'}, headers=headers, timeout=5)
    assert r1.status_code == 200
    # post query
    r2 = requests.post(base + '/ack/price-query', json={'device': 'TEST-UNIT', 'query': '000'}, headers=headers, timeout=5)
    assert r2.status_code == 200
    # get acks
    r3 = requests.get(base + '/acks?lines=10', headers=headers, timeout=5)
    assert r3.status_code == 200
    j = r3.json()
    assert 'acks' in j
    # export
    r4 = requests.get(base + '/acks/export', headers=headers, timeout=5)
    assert r4.status_code == 200
    # clear
    r5 = requests.post(base + '/acks/clear', headers=headers, timeout=5)
    assert r5.status_code == 200
    # verify empty
    r6 = requests.get(base + '/acks?lines=10', headers=headers, timeout=5)
    assert r6.status_code == 200
    assert r6.json().get('acks', []) == []


if __name__ == '__main__':
    test_ack_endpoints()
    print('tests passed')
