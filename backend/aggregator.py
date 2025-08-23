"""
Simple FastAPI-based aggregator for agent statuses and ACKs.
Run: python aggregator.py
Requires: fastapi, uvicorn, sqlite3 (builtin)
"""
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel
import sqlite3
import os
from typing import Optional
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), 'aggregator.db')
API_TOKEN = os.environ.get('AGGREGATOR_TOKEN', 'changeme')

app = FastAPI(title='PRECIX Aggregator')


def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def ensure_db():
    if not os.path.exists(DB_PATH):
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute('''
        CREATE TABLE agents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            agent_id TEXT UNIQUE,
            hostname TEXT,
            loja_codigo TEXT,
            status TEXT,
            ip TEXT,
            last_update TEXT
        )
        ''')
        cur.execute('''
        CREATE TABLE acks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            agent_id TEXT,
            type TEXT,
            payload TEXT,
            ts TEXT
        )
        ''')
        conn.commit()
        conn.close()


class AgentStatus(BaseModel):
    agent_id: str
    hostname: Optional[str]
    loja_codigo: Optional[str]
    status: Optional[str]
    last_update: Optional[str]
    ip: Optional[str]


class AckItem(BaseModel):
    agent_id: str
    type: str
    payload: dict
    ts: Optional[str]


def validate_token(x_api_token: Optional[str] = Header(None)):
    if not x_api_token or x_api_token != API_TOKEN:
        raise HTTPException(status_code=401, detail='Invalid token')


@app.on_event('startup')
def on_startup():
    ensure_db()


@app.post('/api/agents/status')
def post_status(payload: AgentStatus, x_api_token: Optional[str] = Header(None)):
    validate_token(x_api_token)
    conn = get_db()
    cur = conn.cursor()
    now = payload.last_update or datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
    cur.execute('INSERT OR REPLACE INTO agents(agent_id, hostname, loja_codigo, status, ip, last_update) VALUES (?, ?, ?, ?, ?, ?)',
                (payload.agent_id, payload.hostname, payload.loja_codigo, payload.status, payload.ip, now))
    conn.commit()
    return {'status': 'ok'}


@app.post('/api/agents/acks', status_code=201)
def post_ack(item: AckItem, x_api_token: Optional[str] = Header(None)):
    validate_token(x_api_token)
    conn = get_db()
    cur = conn.cursor()
    ts = item.ts or datetime.utcnow().isoformat()
    import json as _json
    cur.execute('INSERT INTO acks(agent_id, type, payload, ts) VALUES (?, ?, ?, ?)',
                (item.agent_id, item.type, _json.dumps(item.payload, ensure_ascii=False), ts))
    conn.commit()
    return {'status': 'created'}


@app.get('/api/agents')
def list_agents(x_api_token: Optional[str] = Header(None)):
    validate_token(x_api_token)
    conn = get_db()
    cur = conn.cursor()
    cur.execute('SELECT agent_id, hostname, loja_codigo, status, ip, last_update FROM agents')
    rows = [dict(r) for r in cur.fetchall()]
    return {'agents': rows}


@app.get('/api/agents/{agent_id}/acks')
def get_agent_acks(agent_id: str, limit: int = 100, x_api_token: Optional[str] = Header(None)):
    validate_token(x_api_token)
    conn = get_db()
    cur = conn.cursor()
    cur.execute('SELECT id, type, payload, ts FROM acks WHERE agent_id = ? ORDER BY id DESC LIMIT ?', (agent_id, limit))
    rows = [dict(r) for r in cur.fetchall()]
    return {'acks': rows}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('aggregator:app', host='0.0.0.0', port=9000, reload=False)
