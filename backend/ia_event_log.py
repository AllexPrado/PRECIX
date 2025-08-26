import os
import json
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from datetime import datetime
import time
try:
    from .ai_agent_integration import notify_ai_agent
except ImportError:
    from ai_agent_integration import notify_ai_agent

router = APIRouter()
LOG_FILE = os.path.join(os.path.dirname(__file__), 'logs', 'ia_events.log')
os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

# Novo: log detalhado incluindo usuário, tempo de resposta e tipo de interação

def log_ia_event(event_type, details, response=None, user=None, elapsed=None):
    entry = {
        'timestamp': datetime.now().isoformat(),
        'event_type': event_type,
        'details': details,
        'response': response,
        'user': user,
        'elapsed': elapsed
    }
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(json.dumps(entry, ensure_ascii=False) + '\n')

def get_ia_events(limit=100):
    if not os.path.exists(LOG_FILE):
        return []
    with open(LOG_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()[-limit:]
        return [json.loads(line) for line in lines]

@router.get('/admin/ia-events')
def api_get_ia_events(limit: int = 100):
    return JSONResponse(get_ia_events(limit))

# Endpoint healthcheck da IA
@router.get('/admin/ia-health')
def ia_health():
    try:
        resp = notify_ai_agent('ping', {'timestamp': time.time()})
        online = bool(resp)
        return {"online": online, "timestamp": time.strftime('%Y-%m-%dT%H:%M:%S')}
    except Exception:
        return {"online": False, "timestamp": time.strftime('%Y-%m-%dT%H:%M:%S')}

# Endpoint de chat com a IA
@router.post('/admin/ia-chat')
async def ia_chat(request: Request):
    data = await request.json()
    message = data.get('message')
    user = data.get('user', 'anon')
    if not message:
        return JSONResponse({"error": "Mensagem não informada."}, status_code=400)
    start = time.time()
    resp = notify_ai_agent('chat', {'message': message})
    elapsed = round(time.time() - start, 3)
    reply = resp.get('reply') if resp else None
    log_ia_event('chat', {'message': message}, resp, user=user, elapsed=elapsed)
    return {"reply": reply or "Sem resposta da IA."}
