import requests
import os

# Configurações para IA real (Agno/Ollama)
IA_ENDPOINT = os.getenv('PRECIX_IA_ENDPOINT', os.environ.get('AI_AGENT_URL', 'http://localhost:8080/event'))
IA_TOKEN = os.getenv('PRECIX_IA_TOKEN', None)
IA_TIMEOUT = int(os.getenv('PRECIX_IA_TIMEOUT', '10'))

PROMPT_PATH = os.path.join(os.path.dirname(__file__), 'prompt_supermercado.txt')
def get_ia_prompt():
    try:
        with open(PROMPT_PATH, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception:
        return None

def notify_ai_agent(event_type, details=None):
    """
    Envia um evento para o agente de IA real (Agno, Ollama, etc).
    event_type: str - tipo do evento (ex: 'sync_start', 'sync_success', 'sync_failure', 'import', 'export', 'error', etc)
    details: dict - informações adicionais do evento
    """
    payload = {
        'event_type': event_type,
        'details': details or {}
    }
    # Adiciona o prompt customizado em todas as requisições
    prompt = get_ia_prompt()
    if prompt:
        payload['context'] = prompt
    headers = {'Content-Type': 'application/json'}
    if IA_TOKEN:
        headers['Authorization'] = f'Bearer {IA_TOKEN}'
    try:
        response = requests.post(IA_ENDPOINT, json=payload, headers=headers, timeout=IA_TIMEOUT)
        response.raise_for_status()
        resp_json = response.json()
        # Importa log_ia_event apenas dentro da função para evitar import circular
        try:
            from ia_event_log import log_ia_event
            log_ia_event(event_type, details, resp_json)
        except Exception as logerr:
            print(f"[AI_AGENT] Falha ao logar evento IA: {logerr}")
        return resp_json
    except Exception as e:
        print(f"[AI_AGENT] Falha ao notificar agente IA: {e}")
        try:
            from ia_event_log import log_ia_event
            log_ia_event(event_type, details, {'error': str(e)})
        except Exception as logerr:
            print(f"[AI_AGENT] Falha ao logar erro IA: {logerr}")
        return None

# Exemplo de uso:
if __name__ == '__main__':
    notify_ai_agent('sync_start', {'source': 'backend', 'info': 'Sincronização iniciada'})
