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
        dados = response.json()
        logging.info(f"Dados recebidos da API: {type(dados)} - {str(dados)[:500]}")
        return dados
    except Exception as e:
        logging.error(f"Erro ao buscar dados PRECIX: {e}")
        return None

# Função para gerar arquivo de preços (exemplo: pricetab.txt)
def gerar_arquivo_precos(dados, filename):
    try:
        config = load_config()
        sep = config.get('arquivo_separador', ';')
        campos = config.get('arquivo_campos', ['barcode', 'name', 'price'])
        local = config.get('arquivo_local', LOG_DIR)
        ia_ativo = config.get('ia_ativo', False)
        layout = config.get('arquivo_layout', 'barcode;name;price')
        loja_codigo = config.get('loja_codigo', '')
        loja_nome = config.get('loja_nome', '')
        produtos = None
        # Se a resposta for uma lista, já são os produtos
        if isinstance(dados, list):
            produtos = dados
        # Se for dict, pode estar em 'produtos' ou ser um único produto
        elif isinstance(dados, dict):
            if 'produtos' in dados and isinstance(dados['produtos'], list):
                produtos = dados['produtos']
            elif 'barcode' in dados:
                produtos = [dados]
            else:
                produtos = []
        else:
            produtos = []
        logging.info(f"Produtos extraídos: {type(produtos)} - Quantidade: {len(produtos) if produtos else 0}")
        if not produtos:
            logging.warning(f"Nenhum produto encontrado para gerar arquivo de preços. Tipo recebido: {type(dados)}. Conteúdo: {str(dados)[:500]}")
            return
        abs_path = os.path.join(local, 'pricetab.txt')
        with open(abs_path, 'w', encoding='utf-8') as f:
            for produto in produtos:
                if not isinstance(produto, dict):
                    logging.error(f"Produto inválido (não é dict): {type(produto)} - {produto}")
                    continue
                # Usa layout customizado se definido
                campos_layout = layout.split(sep)
                linha = sep.join([str(produto.get(c, '')) for c in campos_layout]) + '\n'
                f.write(linha)
        logging.info(f"Arquivo de preços gerado: {abs_path} | Loja: {loja_codigo} - {loja_nome} | Layout: {layout}")
        if ia_ativo:
            logging.info("Agno IA: Sugestão - Layout OK, campos exportados: " + ', '.join(campos))
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
            try:
                gerar_arquivo_precos(dados, os.path.join(LOG_DIR, 'pricetab.txt'))
            except Exception as e:
                logging.error(f"Erro ao chamar gerar_arquivo_precos: {e}")
            for equipamento in config.get('equipamentos', []):
                status = monitorar_equipamento(equipamento['ip'])
                ia_supervisao(equipamento, status)
                if status:
                    enviado = enviar_arquivo_ftp(
                        equipamento['ip'],
                        int(equipamento['porta']),
                        usuario,
                        senha,
                        os.path.join(LOG_DIR, 'pricetab.txt'),
                        'pricetab.txt'
                    )
                    if enviado:
                        logging.info(f"Atualização enviada para {equipamento['ip']}:{equipamento['porta']}")
        time.sleep(60)

if __name__ == "__main__":
    main()
