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
import shutil
import sys

# Configuração inicial
USER_CONFIG_DIR = os.path.join(os.environ.get('LOCALAPPDATA', os.getcwd()), 'AgentePRECIX')
os.makedirs(USER_CONFIG_DIR, exist_ok=True)
CONFIG_PATH = os.path.join(USER_CONFIG_DIR, 'config.json')


# Caminho seguro para log
LOG_DIR = USER_CONFIG_DIR
os.makedirs(LOG_DIR, exist_ok=True)
LOG_PATH = os.path.join(LOG_DIR, 'agente.log')
# Configura logging global já no início
logging.basicConfig(
    filename=LOG_PATH,
    level=logging.INFO,
    format='%(asctime)s %(levelname)s:%(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# Se não houver StreamHandler, adiciona um para exibir logs no console (útil em builds de debug)
root_logger = logging.getLogger()
if not any(isinstance(h, logging.StreamHandler) for h in root_logger.handlers):
    try:
        sh = logging.StreamHandler(stream=sys.stdout)
        sh.setLevel(logging.INFO)
        sh.setFormatter(logging.Formatter('%(asctime)s %(levelname)s:%(message)s'))
        root_logger.addHandler(sh)
    except Exception:
        pass


# Tratador global para exceções não capturadas - garante log antes do processo encerrar
def _global_excepthook(exc_type, exc_value, exc_tb):
    try:
        logging.critical('Unhandled exception', exc_info=(exc_type, exc_value, exc_tb))
        # também grava em arquivo separado rápido para visibilidade imediata
        try:
            with open(LOG_PATH + '.fatal', 'a', encoding='utf-8') as fh:
                fh.write(f"{datetime.now().isoformat()} UNHANDLED: {exc_type} {exc_value}\n")
        except Exception:
            pass
    except Exception:
        pass

sys.excepthook = _global_excepthook


def load_config():
    try:
        if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                return json.load(f)
        # fallback: try to copy default config next to the app
        default_path = os.path.join(os.path.dirname(__file__), 'config.json')
        if os.path.exists(default_path):
            try:
                shutil.copy(default_path, CONFIG_PATH)
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception:
                pass
    except Exception:
        logging.exception('Falha ao carregar config')
    # default minimal config
    return {"lojas": [], "equipamentos": []}


def cadastrar_equipamento(ip, porta, descricao):
    config = load_config()
    if 'equipamentos' not in config:
        config['equipamentos'] = []
    config['equipamentos'].append({"ip": ip, "porta": porta, "descricao": descricao})
    with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2)
    logging.info(f"Equipamento cadastrado: {ip}:{porta} - {descricao}")


def buscar_dados_precix(api_url):
    try:
        logging.info(f"[API] Buscando dados de preços em: {api_url}")
        response = requests.get(api_url, timeout=20)
        response.raise_for_status()
        logging.info(f"[API] Conteúdo bruto retornado (preview): {response.text[:1000]}")
        dados = response.json()
        logging.info(f"[API] Dados recebidos: {type(dados)} - {str(dados)[:500]}")
        return dados
    except Exception as e:
        logging.error(f"Erro ao buscar dados PRECIX: {e}")
        return None


def gerar_arquivo_precos(dados, filename, incluir_cabecalho=None):
    try:
        logging.info(f"[DEBUG] gerar_arquivo_precos: tipo(dados)={type(dados)}, preview={str(dados)[:500]}")
        produtos = []
        if isinstance(dados, list):
            produtos = [p for p in dados if isinstance(p, dict)]
        elif isinstance(dados, dict):
            if 'produtos' in dados and isinstance(dados['produtos'], list):
                produtos = [p for p in dados['produtos'] if isinstance(p, dict)]
            elif 'products' in dados and isinstance(dados['products'], list):
                produtos = [p for p in dados['products'] if isinstance(p, dict)]
            elif any(k in dados for k in ('barcode', 'name', 'price')):
                produtos = [dados]
        logging.info(f"[DEBUG] gerar_arquivo_precos: produtos extraidos tipo={type(produtos)}, quantidade={len(produtos)}")
        sep = '|'
        config_path = os.path.join(os.environ.get('LOCALAPPDATA', os.getcwd()), 'AgentePRECIX', 'config.json')
        incluir_cabecalho_flag = False
        if os.path.exists(config_path):
            try:
                with open(config_path, 'r', encoding='utf-8') as f:
                    config = json.load(f)
                sep = config.get('arquivo_separador', '|')
                incluir_cabecalho_flag = config.get('arquivo_incluir_cabecalho', False)
            except Exception:
                pass
        if incluir_cabecalho is not None:
            incluir_cabecalho_flag = incluir_cabecalho
        colunas_esperadas = ['barcode', 'name', 'price']
        colunas_faltando = set()
        for produto in produtos:
            for col in colunas_esperadas:
                if col not in produto:
                    colunas_faltando.add(col)
        if colunas_faltando:
            logging.warning(f"[AVISO] Algumas colunas esperadas não existem nos dados: {colunas_faltando}. Primeiros produtos: {produtos[:3]}")
        # Garante diretório do arquivo
        if filename:
            os.makedirs(os.path.dirname(filename), exist_ok=True)
        else:
            raise ValueError('Nome de arquivo de saída inválido')
        logging.info(f"[DEBUG] Caminho final do arquivo de saída (corrigido): {filename}")
        with open(filename, 'w', encoding='utf-8') as f:
            if incluir_cabecalho_flag:
                f.write(sep.join(colunas_esperadas) + '\n')
            if not produtos:
                logging.warning(f"[AVISO] Nenhum produto válido para gerar arquivo de preços. Dados recebidos: {str(dados)[:500]}")
            for i, produto in enumerate(produtos):
                linha = sep.join([
                    str(produto.get('barcode', '')),
                    str(produto.get('name', '')),
                    str(produto.get('price', ''))
                ]) + '\n'
                f.write(linha)
                if i < 5:
                    logging.info(f"[DEBUG] Linha {i}: {linha.strip()}")
        logging.info(f"[OK] Arquivo de preços gerado: {filename} | Quantidade de produtos: {len(produtos)} | Delimitador: {sep} | Cabecalho: {incluir_cabecalho_flag}")
        print(f"[OK] Arquivo de preços gerado: {filename} | Quantidade de produtos: {len(produtos)} | Delimitador: {sep} | Cabecalho: {incluir_cabecalho_flag}")
    except Exception as e:
        logging.exception(f"[ERRO] Erro ao gerar arquivo de preços: {e}")
        print(f"[ERRO] Erro ao gerar arquivo de preços: {e}")


def enviar_arquivo_automatico(filepath):
    """Envia o arquivo de preços conforme configuração da aba Envio (FTP/TCP/LOCAL)."""
    import traceback
    try:
        config = load_config()
    except Exception as e:
        logging.exception('Falha ao ler config no envio automático')
        return
    metodo = config.get('envio_metodo', 'LOCAL')
    host = config.get('envio_host', '')
    porta = int(config.get('envio_porta', 21) or 21)
    usuario = config.get('envio_usuario', '')
    senha = config.get('envio_senha', '')
    logging.info(f'Iniciando envio automático: metodo={metodo}, host={host}, porta={porta}, usuario={usuario}, arquivo={filepath}')
    if metodo == 'FTP':
        try:
            ftp = ftplib.FTP()
            ftp.connect(host, porta, timeout=10)
            ftp.login(usuario, senha)
            try:
                ftp.cwd('/dist')
            except Exception:
                pass
            with open(filepath, 'rb') as f:
                ftp.storbinary(f'STOR {os.path.basename(filepath)}', f)
            ftp.quit()
            logging.info('Upload FTP realizado com sucesso')
        except Exception:
            logging.exception('Falha ao enviar via FTP; fallback para LOCAL')
            return
    elif metodo == 'TCP':
        try:
            with open(filepath, 'rb') as f:
                data = f.read()
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect((host, porta))
            s.sendall(data)
            s.close()
            logging.info('Envio TCP realizado com sucesso')
        except Exception:
            logging.exception('Falha ao enviar via TCP')
    else:
        logging.info('Modo LOCAL: arquivo mantido localmente')


def enviar_para_api(dados):
    """Enviar dados para uma API configurada (atualiza PWA / backend)."""
    try:
        if not dados:
            logging.info('enviar_para_api: nenhum dado para enviar')
            return
        config = load_config()
        # busca chaves possíveis para endpoint de atualização
        api_destino = config.get('api_update') or config.get('api_destino') or config.get('backend_url') or config.get('api_externa') or config.get('api_url')
        if not api_destino:
            logging.info('Nenhum endpoint de API configurado para envio de preços (api_update/api_destino/backend_url)')
            return
        logging.info(f'enviar_para_api: enviando para {api_destino} | quantidade={len(dados) if isinstance(dados, list) else 1}')
        try:
            resp = requests.post(api_destino, json=dados, timeout=15)
            resp.raise_for_status()
            logging.info(f'enviar_para_api: envio concluido, status={resp.status_code}')
        except Exception:
            logging.exception('enviar_para_api: falha ao enviar dados para API')
    except Exception:
        logging.exception('enviar_para_api: erro inesperado')


def buscar_dados_do_banco(config):
    """Lê dados de preços de uma fonte de banco (SQLite) quando configurado.
    Espera chaves em config: 'db_path' (caminho sqlite) e opcionalmente 'db_query'.
    Retorna lista de dicionários ou None.
    """
    try:
        db_tipo = (config.get('db_tipo') or 'SQLite').lower()
        # Por enquanto, só implementamos SQLite local. Outros SGBDs serão adicionados conforme necessidade.
        if db_tipo != 'sqlite' and db_tipo != 'sqlite3':
            logging.info(f'buscar_dados_do_banco: tipo de BD solicitado ({db_tipo}) não suportado nesta versão')
            return None

        # aceitar várias chaves que a UI pode gravar
        db_path = config.get('db_path') or config.get('db_nome') or config.get('db_file')
        query = config.get('db_query') or config.get('db_sql') or "SELECT barcode, name, price FROM preco_view"

        if not db_path:
            logging.info('buscar_dados_do_banco: db_path/db_nome não configurado')
            return None

        # resolver caminhos relativos: tentamos valores absolutos e locais comuns
        candidates = [db_path]
        if not os.path.isabs(db_path):
            base = os.path.dirname(__file__)
            candidates.append(os.path.join(base, db_path))
            candidates.append(os.path.join(base, 'dist', db_path))
            candidates.append(os.path.join(os.getcwd(), db_path))
            # também procurar no diretório de dados do usuário
            candidates.append(os.path.join(os.path.dirname(CONFIG_PATH), db_path))

        found = None
        for p in candidates:
            try:
                if p and os.path.exists(p):
                    found = p
                    break
            except Exception:
                continue

        if not found:
            logging.info(f'buscar_dados_do_banco: arquivo sqlite não encontrado em candidatos: {candidates}')
            return None

        import sqlite3
        conn = sqlite3.connect(found)
        cur = conn.cursor()
        cur.execute(query)
        cols = [c[0] for c in cur.description] if cur.description else []
        rows = cur.fetchall()
        resultados = []
        for r in rows:
            linha = {cols[i]: r[i] for i in range(len(cols))}
            resultados.append(linha)
        conn.close()
        logging.info(f'buscar_dados_do_banco: registros lidos={len(resultados)} from {found}')
        return resultados
    except Exception:
        logging.exception('buscar_dados_do_banco: erro ao ler banco de dados')
        return None


def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "-"


AGENTS_STATUS_PATH = os.path.join(os.path.dirname(__file__), '..', 'backend', 'agents_status.json')


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
        os.makedirs(os.path.dirname(AGENTS_STATUS_PATH), exist_ok=True)
        with open(AGENTS_STATUS_PATH, 'w', encoding='utf-8') as f:
            json.dump([status], f, ensure_ascii=False, indent=2)
    except Exception:
        logging.exception('Erro ao salvar status do agente')


def iniciar_status_heartbeat():
    import threading

    def loop():
        while True:
            try:
                salvar_status_agente()
            except Exception:
                logging.exception('Erro ao salvar status no heartbeat')
            time.sleep(10)

    t = threading.Thread(target=loop, daemon=True)
    t.start()


def ia_supervisao(equipamento, status):
    if not status:
        logging.warning(f"Falha detectada no equipamento {equipamento.get('ip')}:{equipamento.get('porta')}")
    else:
        logging.info(f"Equipamento OK: {equipamento.get('ip')}:{equipamento.get('porta')}")


def forcar_atualizacao_manual():
    config = load_config()
    api_url = config.get('api_externa') or config.get('api_url')
    if not api_url:
        logging.error('[ERRO] Nenhuma URL de API configurada no config.json!')
        return
    dados = buscar_dados_precix(api_url)
    arquivo_saida = config.get('arquivo_local')
    if arquivo_saida and arquivo_saida.count('pricetab.txt') > 1:
        partes = arquivo_saida.split('pricetab.txt')
        arquivo_saida = ''.join(partes[:-1]) + 'pricetab.txt'
    logging.info(f"[DEBUG] Caminho final do arquivo de saída: {arquivo_saida}")
    try:
        if arquivo_saida and os.path.exists(arquivo_saida):
            os.remove(arquivo_saida)
    except Exception:
        logging.warning('Não foi possível remover arquivo antigo')
    if dados:
        try:
            os.makedirs(os.path.dirname(arquivo_saida), exist_ok=True)
            gerar_arquivo_precos(dados, arquivo_saida)
            # Após gerar o arquivo, enviar para a API e para o método configurado (FTP/TCP/LOCAL)
            try:
                enviar_para_api(dados)
            except Exception:
                logging.exception('Erro ao enviar dados para API (forcar_atualizacao_manual)')
            try:
                enviar_arquivo_automatico(arquivo_saida)
            except Exception:
                logging.exception('Erro ao executar envio automático (forcar_atualizacao_manual)')
        except Exception:
            logging.exception('Erro ao gerar arquivo (forçar)')
        equipamentos = config.get('equipamentos', [])
        for equipamento in equipamentos:
            ia_supervisao(equipamento, None)
        config['equipamentos'] = equipamentos
        config['ultima_atualizacao'] = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2)


def enviar_status_agente():
    config = load_config()
    backend_url = config.get('backend_url') or 'http://192.168.18.7:8000/admin/agents/status'
    agent_id = config.get('agente_id') or str(uuid.getnode())
    loja_codigo = config.get('loja_codigo')
    loja_nome = config.get('loja_nome')
    if (not loja_codigo or not loja_nome) and isinstance(config.get('lojas'), list) and len(config.get('lojas', [])) > 0:
        loja = config['lojas'][0]
        loja_codigo = loja_codigo or loja.get('codigo')
        loja_nome = loja_nome or loja.get('nome')
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
    except Exception:
        logging.exception('Erro ao enviar status do agente local')


def main():
    print("Agente Local PRECIX iniciado.")
    try:
        iniciar_status_heartbeat()
    except Exception:
        logging.exception('Falha ao iniciar heartbeat')

    while True:
        try:
            config = load_config()
            intervalo = int(config.get('automacao_intervalo', 1))
            forcar = config.get('forcar_atualizacao', False)
            enviar_status_agente()
            fonte = config.get('tipo_integracao', 'Arquivo')
            dados = None
            if fonte == 'API':
                api_url = config.get('api_externa') or config.get('api_url')
                if api_url:
                    dados = buscar_dados_precix(api_url)
                else:
                    logging.error('[ERRO] Nenhuma URL de API configurada no config.json!')
            elif fonte == 'Arquivo':
                # aceita várias chaves possíveis que a UI pode gravar
                arquivo = config.get('arquivo_origem') or config.get('arquivo_entrada') or config.get('arquivo_entrada_arquivo') or ''
                sep = config.get('arquivo_separador') or config.get('arquivo_separador_custom') or '|'
                layout = config.get('arquivo_layout') or 'barcode|name|price'
                if arquivo and os.path.exists(arquivo):
                    try:
                        # Ler manualmente para suportar arquivos sem cabeçalho
                        with open(arquivo, 'r', encoding='utf-8', errors='ignore') as f:
                            lines = [ln.rstrip('\n') for ln in f if ln.strip()]
                        dados_temp = []
                        cols = [c.strip() for c in layout.split(sep)]
                        for i, line in enumerate(lines):
                            parts = [p for p in line.split(sep)]
                            # pular header se for igual ao layout
                            if i == 0 and [p.strip().lower() for p in parts] == [c.lower() for c in cols]:
                                continue
                            # construir dicionário baseado no layout por posição
                            row = {}
                            for idx, col in enumerate(cols):
                                row[col] = parts[idx].strip() if idx < len(parts) else ''
                            dados_temp.append(row)
                        dados = dados_temp
                    except Exception:
                        logging.exception('Erro ao ler/processar arquivo de origem')
                else:
                    logging.info('Arquivo de origem não informado ou não encontrado.')
            elif fonte == 'Banco de Dados':
                # usa a função implementada para leitura de DB (SQLite por enquanto)
                try:
                    dados = buscar_dados_do_banco(config)
                except Exception:
                    logging.exception('Erro ao buscar dados do banco (fluxo principal)')
                    dados = None

            arquivo_saida = config.get('arquivo_local') or os.path.join(os.getcwd(), 'pricetab.txt')
            arquivo_saida = os.path.normpath(arquivo_saida)
            if arquivo_saida.lower().count('pricetab.txt') > 1:
                arquivo_saida = arquivo_saida.lower().split('pricetab.txt')[-2] + 'pricetab.txt'
            logging.info(f"[DEBUG] Caminho final do arquivo de saída (normalizado): {arquivo_saida}")
            os.makedirs(os.path.dirname(arquivo_saida), exist_ok=True)

            if forcar:
                try:
                    if dados:
                        gerar_arquivo_precos(dados, arquivo_saida)
                        # Após gerar o arquivo automático, enviar para API e enviar conforme método
                        try:
                            enviar_para_api(dados)
                        except Exception:
                            logging.exception('Erro ao enviar dados para API (loop principal)')
                        try:
                            enviar_arquivo_automatico(arquivo_saida)
                        except Exception:
                            logging.exception('Erro ao executar envio automático (loop principal)')
                        logging.info('Atualização manual forçada executada com sucesso.')
                except Exception:
                    logging.exception('Erro ao executar atualização manual forçada')
                config['forcar_atualizacao'] = False
                with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                    json.dump(config, f, indent=2)
            else:
                if dados:
                    try:
                        gerar_arquivo_precos(dados, arquivo_saida)
                    except Exception:
                        logging.exception('Erro ao chamar gerar_arquivo_precos')

        except Exception:
            logging.exception('Erro inesperado no loop principal')

        try:
            time.sleep(intervalo * 60)
        except Exception:
            time.sleep(60)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrompido pelo usuário')
    except Exception:
        logging.exception('Falha fatal ao iniciar o Agente')


