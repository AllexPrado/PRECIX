import json
import socket
from datetime import datetime

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "-"

def write_agent_status_json():
    agent = {
        "id": "kiosk-001",  # Substitua por identificador único real
        "identifier": "kiosk-001",
        "nome": "Agente Kiosk 001",
        "loja": "Sonda Santo Amaro",
        "ip": get_local_ip(),
        "ultima_atualizacao": datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
    }
    with open("agents_status.json", "w", encoding="utf-8") as f:
        json.dump([agent], f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    write_agent_status_json()
