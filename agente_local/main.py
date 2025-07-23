"""
Agente Local PRECIX - Integração de Equipamentos Legados

Este agente é responsável por:
- Cadastrar IPs/portas dos terminais legados
- Buscar dados de preços do PRECIX (API/view/arquivo texto)
- Gerar e enviar arquivos de preços via FTP/TCP
- Monitorar, registrar logs e alertar
- Integrar IA para automação e correção de erros
"""

import json
import time
import logging
import requests
import ftplib
import socket
import os
from datetime import datetime

# Configuração inicial
CONFIG_PATH = 'config.json'

# Caminho seguro para log
LOG_DIR = os.path.join(os.environ.get('LOCALAPPDATA', os.getcwd()), 'AgentePRECIX')
os.makedirs(LOG_DIR, exist_ok=True)
LOG_PATH = os.path.join(LOG_DIR, 'agente.log')

# Função para carregar configuração

def load_config():
    try:
        with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return {"equipamentos": []}

# Função para cadastrar novo equipamento

def cadastrar_equipamento(ip, porta, descricao):
    config = load_config()
    config["equipamentos"].append({"ip": ip, "porta": porta, "descricao": descricao})
    with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2)
    print(f"Equipamento cadastrado: {ip}:{porta} - {descricao}")

# Função para buscar dados do PRECIX (API)
def buscar_dados_precix(api_url):
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        logging.error(f"Erro ao buscar dados PRECIX: {e}")
        return None

# Função para gerar arquivo de preços (exemplo: pricetab.txt)
def gerar_arquivo_precos(dados, filename):
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            for produto in dados.get('produtos', []):
                linha = f"{produto['codigo']};{produto['descricao']};{produto['preco']}\n"
                f.write(linha)
        logging.info(f"Arquivo de preços gerado: {filename}")
    except Exception as e:
        logging.error(f"Erro ao gerar arquivo de preços: {e}")

# Função para enviar arquivo via FTP
def enviar_arquivo_ftp(ip, porta, usuario, senha, localfile, remotefile):
    try:
        with ftplib.FTP() as ftp:
            ftp.connect(ip, porta, timeout=10)
            ftp.login(usuario, senha)
            with open(localfile, 'rb') as f:
                ftp.storbinary(f'STOR {remotefile}', f)
        logging.info(f"Arquivo enviado via FTP para {ip}:{porta}")
        return True
    except Exception as e:
        logging.error(f"Erro ao enviar arquivo FTP: {e}")
        return False

# Função para monitorar equipamentos (ping)
def monitorar_equipamento(ip):
    try:
        socket.setdefaulttimeout(2)
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = s.connect_ex((ip, 80))
        s.close()
        return result == 0
    except Exception:
        return False

# Função de IA embarcada (estrutura inicial)
def ia_supervisao(equipamento, status):
    # Exemplo: ações automáticas e sugestão de correções
    if not status:
        logging.warning(f"Falha detectada no equipamento {equipamento['ip']}:{equipamento['porta']}")
        # Aqui pode-se implementar ações corretivas automáticas
        # Exemplo: reiniciar serviço, reenviar arquivo, alertar suporte
        # ...
    else:
        logging.info(f"Equipamento OK: {equipamento['ip']}:{equipamento['porta']}")

# Função principal expandida
def main():
    logging.basicConfig(filename=LOG_PATH, level=logging.INFO)
    print("Agente Local PRECIX iniciado.")
    config = load_config()
    api_url = config.get('api_url', 'http://localhost:8000/api/produtos')
    usuario = config.get('ftp_usuario', 'user')
    senha = config.get('ftp_senha', 'pass')
    while True:
        dados = buscar_dados_precix(api_url)
        if dados:
            gerar_arquivo_precos(dados, 'pricetab.txt')
            for equipamento in config.get('equipamentos', []):
                status = monitorar_equipamento(equipamento['ip'])
                ia_supervisao(equipamento, status)
                if status:
                    enviado = enviar_arquivo_ftp(
                        equipamento['ip'],
                        int(equipamento['porta']),
                        usuario,
                        senha,
                        'pricetab.txt',
                        'pricetab.txt'
                    )
                    if enviado:
                        logging.info(f"Atualização enviada para {equipamento['ip']}:{equipamento['porta']}")
        time.sleep(60)

if __name__ == "__main__":
    main()
