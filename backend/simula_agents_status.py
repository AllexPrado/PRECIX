import json
import socket
import threading
import time
from datetime import datetime

# Simulação de múltiplos agentes locais
AGENTS = [
    {
        "id": "kiosk-001",
        "identifier": "kiosk-001",
        "nome": "Agente Kiosk 001",
        "loja": "Sonda Santo Amaro"
    },
    {
        "id": "kiosk-002",
        "identifier": "kiosk-002",
        "nome": "Agente Kiosk 002",
        "loja": "Sonda Morumbi"
    }
]

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "-"

def update_agents_status():
    while True:
        agents_status = []
        now = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
        ip = get_local_ip()
        for agent in AGENTS:
            agent_status = agent.copy()
            agent_status["ip"] = ip
            agent_status["ultima_atualizacao"] = now
            agents_status.append(agent_status)
        with open("agents_status.json", "w", encoding="utf-8") as f:
            json.dump(agents_status, f, ensure_ascii=False, indent=2)
        time.sleep(10)  # Atualiza a cada 10 segundos

if __name__ == "__main__":
    print("Simulando atualização automática de múltiplos agentes...")
    t = threading.Thread(target=update_agents_status)
    t.daemon = True
    t.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Encerrando simulação.")
