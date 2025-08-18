# Funções CRUD para lojas
def editar_loja(codigo, novo_nome):
    config = load_config()
    lojas = config.get('lojas', [])
    for loja in lojas:
        if loja.get('codigo') == codigo:
            loja['nome'] = novo_nome
            logging.info(f"Loja editada: {codigo} -> {novo_nome}")
            break
    else:
        logging.warning(f"Loja não encontrada para edição: {codigo}")
    config['lojas'] = lojas
    with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2)

def excluir_loja(codigo):
    config = load_config()
    lojas = config.get('lojas', [])
    novas_lojas = [l for l in lojas if l.get('codigo') != codigo]
    if len(novas_lojas) < len(lojas):
        logging.info(f"Loja excluída: {codigo}")
    else:
        logging.warning(f"Loja não encontrada para exclusão: {codigo}")
    config['lojas'] = novas_lojas
    with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2)

# Funções CRUD para equipamentos
def editar_equipamento(ip, porta, novo_ip=None, nova_porta=None, nova_descricao=None):
    config = load_config()
    equipamentos = config.get('equipamentos', [])
    for eq in equipamentos:
        if eq.get('ip') == ip and str(eq.get('porta')) == str(porta):
            if novo_ip:
                eq['ip'] = novo_ip
            if nova_porta:
                eq['porta'] = nova_porta
            if nova_descricao:
                eq['descricao'] = nova_descricao
            logging.info(f"Equipamento editado: {ip}:{porta} -> {eq}")
            break
    else:
        logging.warning(f"Equipamento não encontrado para edição: {ip}:{porta}")
    config['equipamentos'] = equipamentos
    with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2)

def excluir_equipamento(ip, porta):
    config = load_config()
    equipamentos = config.get('equipamentos', [])
    novos_equip = [eq for eq in equipamentos if not (eq.get('ip') == ip and str(eq.get('porta')) == str(porta))]
    if len(novos_equip) < len(equipamentos):
        logging.info(f"Equipamento excluído: {ip}:{porta}")
    else:
        logging.warning(f"Equipamento não encontrado para exclusão: {ip}:{porta}")
    config['equipamentos'] = novos_equip
    with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2)
def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "-"

# Caminho do arquivo de status no backend
AGENTS_STATUS_PATH = r'd:\Sonda\Precix\backend\agents_status.json'

def salvar_status_agente():
    status = {
        "id": str(uuid.uuid4()),
        "identifier": socket.gethostname(),
        "nome": "Agente Local",
        "loja": "",
        "ip": get_local_ip(),
        "ultima_atualizacao": datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
    }
    try:
        with open(AGENTS_STATUS_PATH, 'w', encoding='utf-8') as f:
            json.dump([status], f, ensure_ascii=False, indent=2)
    except Exception as e:
        logging.error(f"Erro ao salvar status do agente: {e}")

# Exemplo de uso: salve o status a cada 10 segundos em thread separada
def iniciar_status_heartbeat():
    import threading
    def loop():
        while True:
            salvar_status_agente()
            time.sleep(10)
    t = threading.Thread(target=loop, daemon=True)
    t.start()

# No início do main, chame iniciar_status_heartbeat()
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
import uuid
from datetime import datetime

# Configuração inicial
USER_CONFIG_DIR = os.path.join(os.environ.get('LOCALAPPDATA', os.getcwd()), 'AgentePRECIX')
os.makedirs(USER_CONFIG_DIR, exist_ok=True)
CONFIG_PATH = os.path.join(USER_CONFIG_DIR, 'config.json')

# Caminho seguro para log
LOG_DIR = USER_CONFIG_DIR
os.makedirs(LOG_DIR, exist_ok=True)
LOG_PATH = os.path.join(LOG_DIR, 'agente.log')

# Função para carregar configuração

def load_config():
    try:
        with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        # Se não existir, copia config.json padrão do diretório do programa
        default_path = os.path.join(os.path.dirname(__file__), 'config.json')
        if os.path.exists(default_path):
            try:
                import shutil
                shutil.copy(default_path, CONFIG_PATH)
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception:
                pass
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
        # Correção: garantir layout e campos válidos
        if not layout:
            layout = 'barcode;name;price'
        if not campos or not isinstance(campos, list):
            campos = ['barcode', 'name', 'price']
        campos_layout = layout.split(sep)
        logging.info(f"Produtos extraídos: {type(produtos)} - Quantidade: {len(produtos) if produtos else 0}")
        if not produtos or len(produtos) == 0:
            logging.error(f"Nenhum produto válido para gerar arquivo de preços. Dados recebidos: {str(dados)[:500]}")
            return
        abs_path = os.path.join(local, 'pricetab.txt')
        with open(abs_path, 'w', encoding='utf-8') as f:
            for produto in produtos:
                if not isinstance(produto, dict):
                    logging.error(f"Produto inválido (não é dict): {type(produto)} - {produto}")
                    continue
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
def monitorar_equipamento(ip, porta):
    try:
        socket.setdefaulttimeout(2)
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = s.connect_ex((ip, porta))
        s.close()
        if result == 0:
            return 'OK'
        # Removido subprocesso de ping para evitar prompt
        return 'Desconhecido'
    except Exception:
        return 'Desconhecido'

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

# Função para forçar atualização manual
def forcar_atualizacao_manual():
    """Força a geração e envio do pricetab.txt para todos os equipamentos."""
    config = load_config()
    api_url = config.get('api_url', 'http://localhost:8000/api/produtos')
    usuario = config.get('ftp_usuario', 'user')
    senha = config.get('ftp_senha', 'pass')
    dados = buscar_dados_precix(api_url)
    historico = []
    if dados:
        try:
            gerar_arquivo_precos(dados, os.path.join(LOG_DIR, 'pricetab.txt'))
        except Exception as e:
            logging.error(f"Erro ao chamar gerar_arquivo_precos (manual): {e}")
        equipamentos = config.get('equipamentos', [])
        for equipamento in equipamentos:
            status = monitorar_equipamento(equipamento['ip'], int(equipamento['porta']))
            equipamento['status'] = status
            ia_supervisao(equipamento, status)
            if status == 'OK' or status == 'OK (ping)':
                enviado = enviar_arquivo_ftp(
                    equipamento['ip'],
                    int(equipamento['porta']),
                    usuario,
                    senha,
                    os.path.join(LOG_DIR, 'pricetab.txt'),
                    'pricetab.txt'
                )
                if enviado:
                    historico.append(f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} - Atualização enviada para {equipamento['ip']}:{equipamento['porta']} [{status}]")
                    logging.info(f"Atualização enviada para {equipamento['ip']}:{equipamento['porta']} [{status}]")
                else:
                    historico.append(f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} - Falha ao enviar para {equipamento['ip']}:{equipamento['porta']} [{status}]")
            else:
                historico.append(f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} - Equipamento offline {equipamento['ip']}:{equipamento['porta']} [{status}]")
        # Salva status e histórico no config.json
        config['equipamentos'] = equipamentos
        config['historico_atualizacoes'] = '\n'.join(historico)
        config['ultima_atualizacao'] = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2)
    else:
        logging.error("Falha ao buscar dados PRECIX para atualização manual.")

# Função para enviar status do agente local para o backend PRECIX
def enviar_status_agente():
    """Envia status do agente local para o backend PRECIX."""
    config = load_config()
    backend_url = config.get('backend_url')
    if not backend_url:
        backend_url = 'http://192.168.18.7:8000/admin/agents/status'
    agent_id = config.get('agente_id') or str(uuid.getnode())
    # Busca loja_codigo e loja_nome direto ou do primeiro item de 'lojas'
    loja_codigo = config.get('loja_codigo')
    loja_nome = config.get('loja_nome')
    if (not loja_codigo or not loja_nome) and 'lojas' in config and isinstance(config['lojas'], list) and len(config['lojas']) > 0:
        loja = config['lojas'][0]
        if not loja_codigo:
            loja_codigo = loja.get('codigo')
        if not loja_nome:
            loja_nome = loja.get('nome')
    status_payload = {
        "agent_id": agent_id,
        "status": "online",
        "last_update": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    if loja_codigo:
        status_payload["loja_codigo"] = loja_codigo
    if loja_nome:
        status_payload["loja_nome"] = loja_nome
    try:
        requests.post(backend_url, json=status_payload, timeout=5)
    except Exception as e:
        logging.error(f"Erro ao enviar status do agente local: {e}")

# Função principal expandida
def main():
    logging.basicConfig(filename=LOG_PATH, level=logging.INFO)
    print("Agente Local PRECIX iniciado.")
    while True:
        config = load_config()
        intervalo = int(config.get('automacao_intervalo', 1))  # em minutos
        forcar = config.get('forcar_atualizacao', False)
        enviar_status_agente()  # Envia status a cada ciclo
        if forcar:
            try:
                forcar_atualizacao_manual()
                logging.info("Atualização manual forçada executada com sucesso.")
            except Exception as e:
                logging.error(f"Erro ao executar atualização manual forçada: {e}")
            # Sempre zera a flag, mesmo em caso de erro
            config['forcar_atualizacao'] = False
            with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                json.dump(config, f, indent=2)
        else:
            api_url = config.get('api_url', 'http://192.168.18.7:8000/product/all')
            usuario = config.get('ftp_usuario', 'user')
            senha = config.get('ftp_senha', 'pass')
            dados = buscar_dados_precix(api_url)
            if dados:
                try:
                    gerar_arquivo_precos(dados, os.path.join(LOG_DIR, 'pricetab.txt'))
                except Exception as e:
                    logging.error(f"Erro ao chamar gerar_arquivo_precos: {e}")
                historico = []
                equipamentos = config.get('equipamentos', [])
                for equipamento in equipamentos:
                    status = monitorar_equipamento(equipamento['ip'], int(equipamento['porta']))
                    equipamento['status'] = status
                    ia_supervisao(equipamento, status)
                    if status == 'OK' or status == 'OK (ping)':
                        enviado = enviar_arquivo_ftp(
                            equipamento['ip'],
                            int(equipamento['porta']),
                            usuario,
                            senha,
                            os.path.join(LOG_DIR, 'pricetab.txt'),
                            'pricetab.txt'
                        )
                        if enviado:
                            historico.append(f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} - Atualização enviada para {equipamento['ip']}:{equipamento['porta']} [{status}]")
                            logging.info(f"Atualização enviada para {equipamento['ip']}:{equipamento['porta']} [{status}]")
                        else:
                            historico.append(f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} - Falha ao enviar para {equipamento['ip']}:{equipamento['porta']} [{status}]")
                    else:
                        historico.append(f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')} - Equipamento offline {equipamento['ip']}:{equipamento['porta']} [{status}]")
                # Salva status e histórico no config.json
                config['equipamentos'] = equipamentos
                config['historico_atualizacoes'] = '\n'.join(historico)
                config['ultima_atualizacao'] = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
                with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                    json.dump(config, f, indent=2)
        time.sleep(intervalo * 60)

if __name__ == "__main__":
    # Garante que só roda como serviço
    iniciar_status_heartbeat()
    main()
