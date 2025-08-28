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
from wsgiref.simple_server import make_server
from urllib.parse import parse_qs, urlparse
from logging.handlers import RotatingFileHandler

# Configuração inicial (unificar diretório entre EXE e Serviço)
def _is_windows_service_context() -> bool:
    try:
        import getpass
        user = (getpass.getuser() or '').lower()
        if user in ('system', 'localsystem'):
            return True
        # Sessões de serviço no Windows costumam ter SESSIONNAME='Services'
        if os.environ.get('SESSIONNAME', '').lower() == 'services':
            return True
    except Exception:
        pass
    return False

def _is_dir_writable(path: str) -> bool:
    try:
        os.makedirs(path, exist_ok=True)
        test = os.path.join(path, f'.permtest_{os.getpid()}')
        with open(test, 'a', encoding='utf-8') as fh:
            fh.write('')
        try:
            os.remove(test)
        except Exception:
            pass
        return True
    except Exception:
        return False

def _resolve_app_home() -> str:
    # 1) Variável de ambiente (permite override corporativo)
    env_home = os.environ.get('AGENTE_PRECIX_HOME') or os.environ.get('AGENTE_PRECIX_DIR')
    if env_home:
        p = os.path.abspath(env_home)
        try:
            os.makedirs(p, exist_ok=True)
        except Exception:
            pass
        return p
    # 2) ProgramData quando em serviço (ou já existir)
    program_data = os.path.join(os.environ.get('PROGRAMDATA', r'C:\ProgramData'), 'AgentePRECIX')
    if _is_windows_service_context():
        try:
            os.makedirs(program_data, exist_ok=True)
        except Exception:
            pass
        return program_data
    # 3) Padrão usuário (quando rodando interativo)
    local_app = os.path.join(os.environ.get('LOCALAPPDATA', os.getcwd()), 'AgentePRECIX')
    try:
        os.makedirs(local_app, exist_ok=True)
    except Exception:
        pass
    return local_app

APP_HOME = _resolve_app_home()
CONFIG_PATH = os.path.join(APP_HOME, 'config.json')


# Caminho seguro para log (compartilhado entre EXE e Serviço)
LOG_DIR = APP_HOME
os.makedirs(LOG_DIR, exist_ok=True)
LOG_PATH = os.path.join(LOG_DIR, 'agente.log')
# Configura logging global já no início com rotação
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s:%(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
# RotatingFileHandler para não encher disco
try:
    rh = RotatingFileHandler(LOG_PATH, maxBytes=5 * 1024 * 1024, backupCount=5, encoding='utf-8')
    rh.setLevel(logging.INFO)
    rh.setFormatter(logging.Formatter('%(asctime)s %(levelname)s:%(message)s', datefmt='%Y-%m-%d %H:%M:%S'))
    root_logger = logging.getLogger()
    # remove duplicate handlers if any
    has_file = any(isinstance(h, RotatingFileHandler) for h in root_logger.handlers)
    if not has_file:
        root_logger.addHandler(rh)
except Exception:
    pass

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
    """Carrega config priorizando APP_HOME; com fallbacks e migração automática.
    Ordem:
      1) APP_HOME/config.json
      2) LocalAppData/config.json (se diferente do APP_HOME)
      3) config.json ao lado do script
    Se encontrar em fallback e não existir em APP_HOME, copia para APP_HOME.
    """
    try:
        # 1) APP_HOME
        if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
            with open(CONFIG_PATH, 'r', encoding='utf-8-sig') as f:
                return json.load(f)

        # 2) LocalAppData do usuário (pode conter config usado no modo EXE)
        user_local_dir = os.path.join(os.environ.get('LOCALAPPDATA', os.getcwd()), 'AgentePRECIX')
        user_cfg = os.path.join(user_local_dir, 'config.json')
        if os.path.abspath(user_cfg) != os.path.abspath(CONFIG_PATH) and os.path.exists(user_cfg) and os.path.getsize(user_cfg) > 0:
            try:
                os.makedirs(os.path.dirname(CONFIG_PATH), exist_ok=True)
                shutil.copy(user_cfg, CONFIG_PATH)
                with open(CONFIG_PATH, 'r', encoding='utf-8-sig') as f:
                    return json.load(f)
            except Exception:
                pass

        # 3) Default ao lado do app (bundle)
        default_path = os.path.join(os.path.dirname(__file__), 'config.json')
        if os.path.exists(default_path) and os.path.getsize(default_path) > 0:
            try:
                os.makedirs(os.path.dirname(CONFIG_PATH), exist_ok=True)
                shutil.copy(default_path, CONFIG_PATH)
                with open(CONFIG_PATH, 'r', encoding='utf-8-sig') as f:
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
        # Use config unificado em APP_HOME
        config_path = CONFIG_PATH
        incluir_cabecalho_flag = False
        if os.path.exists(config_path):
            try:
                with open(config_path, 'r', encoding='utf-8-sig') as f:
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
        # Garante diretório do arquivo e escrita atômica (temp -> replace)
        if not filename:
            raise ValueError('Nome de arquivo de saída inválido')
        filename = os.path.normpath(filename)
        dirpath = os.path.dirname(filename)
        os.makedirs(dirpath, exist_ok=True)
        logging.info(f"[DEBUG] Caminho final do arquivo de saída (corrigido): {filename}")
        tmpname = filename + '.tmp'
        try:
            with open(tmpname, 'w', encoding='utf-8') as f:
                if incluir_cabecalho_flag:
                    f.write(sep.join(colunas_esperadas) + '\n')
                if not produtos:
                    logging.warning(f"[AVISO] Nenhum produto válido para gerar arquivo de preços. Dados recebidos: {str(dados)[:1000]}")
                    # Em produção não escrevemos marcadores no arquivo final; gravamos amostra no log e deixamos o arquivo vazio
                    # para manter compatibilidade com leitores que esperam apenas linhas de produto.
                    sample = None
                    try:
                        sample = str(dados)[:2000]
                        logging.info(f"[DIAG_SAMPLE] {sample}")
                    except Exception:
                        pass
                else:
                    for i, produto in enumerate(produtos):
                        linha = sep.join([
                            str(produto.get('barcode', '')),
                            str(produto.get('name', '')),
                            str(produto.get('price', ''))
                        ]) + '\n'
                        f.write(linha)
                        if i < 5:
                            logging.info(f"[DEBUG] Linha {i}: {linha.strip()}")
            # Substitui de forma atômica
            try:
                os.replace(tmpname, filename)
            except Exception:
                # fallback para sistemas que não suportam replace atômico
                shutil.move(tmpname, filename)
        finally:
            # garante que não fica .tmp se algo falhou
            try:
                if os.path.exists(tmpname):
                    os.remove(tmpname)
            except Exception:
                pass
        logging.info(f"[OK] Arquivo de preços gerado: {filename} | Quantidade de produtos: {len(produtos)} | Delimitador: {sep} | Cabecalho: {incluir_cabecalho_flag}")
        print(f"[OK] Arquivo de preços gerado: {filename} | Quantidade de produtos: {len(produtos)} | Delimitador: {sep} | Cabecalho: {incluir_cabecalho_flag}")
        try:
            update_agent_status({'last_generated': datetime.now().isoformat(), 'last_generated_count': len(produtos), 'last_generated_file': filename})
            # registra ACK de geração para aparecer no Monitoramento (GUI)
            try:
                append_ack({
                    'type': 'generate',
                    'payload': {
                        'file': filename,
                        'count': len(produtos),
                        'separator': sep,
                        'header': incluir_cabecalho_flag
                    },
                    'ts': datetime.now().isoformat()
                })
            except Exception:
                pass
            # also persist into config for backward compatibility
            try:
                if os.path.exists(CONFIG_PATH):
                    with open(CONFIG_PATH, 'r', encoding='utf-8') as fh:
                        cfg = json.load(fh) or {}
                else:
                    cfg = {}
                cfg['ultima_atualizacao'] = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
                with open(CONFIG_PATH, 'w', encoding='utf-8') as fh:
                    json.dump(cfg, fh, indent=2)
            except Exception:
                pass
        except Exception:
            pass
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
    max_attempts = int(config.get('envio_retries', 3))
    backoff_base = float(config.get('envio_backoff', 2))
    success = False
    last_err = None
    for attempt in range(1, max_attempts + 1):
        try:
            if metodo == 'FTP':
                host = config.get('envio_host')
                user = config.get('envio_usuario')
                passwd = config.get('envio_senha')
                ftp_remote_name = config.get('envio_arquivo_remoto') or os.path.basename(filepath)
                with ftplib.FTP(host, timeout=10) as ftp:
                    ftp.login(user, passwd)
                    with open(filepath, 'rb') as f:
                        ftp.storbinary(f'STOR {ftp_remote_name}', f)
                    logging.info('[OK] Enviado por FTP')
                success = True
            elif metodo == 'TCP':
                with open(filepath, 'rb') as f:
                    data = f.read()
                s = socket.create_connection((host, porta), timeout=10)
                s.sendall(data)
                s.close()
                logging.info('Envio TCP realizado com sucesso')
                success = True
            elif metodo == 'API':
                # enviar para endpoint configurado
                api_dest = config.get('api_update') or config.get('api_destino') or config.get('backend_url')
                if api_dest:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as fh:
                        text = fh.read()
                    resp = requests.post(api_dest, data=text.encode('utf-8'), timeout=15)
                    resp.raise_for_status()
                    logging.info('Envio via API realizado com sucesso')
                    success = True
                else:
                    logging.error('Envio via API selecionado, mas api_update/api_destino não configurado')
                    break
            else:
                logging.info('Modo LOCAL: arquivo mantido localmente')
                success = True
        except ftplib.error_perm as perm_err:
            last_err = perm_err
            logging.error(f"[FTP_ERRO] Permissão/Autenticação falhou: {perm_err}")
            # perm errors are unlikely to change with retries
            break
        except Exception as e:
            last_err = e
            logging.exception(f'Erro ao enviar arquivo (attempt {attempt}): {e}')
            # backoff
            if attempt < max_attempts:
                wait = backoff_base ** (attempt - 1)
                logging.info(f'Waiting {wait}s before retry')
                time.sleep(wait)
            continue
        finally:
            if success:
                update_agent_status({'last_send': datetime.now().isoformat(), 'last_send_method': metodo})
                # ACK de entrega/envio bem-sucedido
                try:
                    append_ack({
                        'type': 'delivery',
                        'payload': {
                            'method': metodo,
                            'host': host,
                            'port': porta,
                            'path': filepath
                        },
                        'ts': datetime.now().isoformat()
                    })
                except Exception:
                    pass
                break

    if not success:
        logging.error(f'Falha ao enviar arquivo apos {max_attempts} tentativas: {last_err}')
        update_agent_status({'last_send_error': str(last_err) if last_err else 'unknown'})
        try:
            append_ack({
                'type': 'delivery_error',
                'payload': {
                    'method': metodo,
                    'host': host,
                    'port': porta,
                    'path': filepath,
                    'error': str(last_err) if last_err else 'unknown'
                },
                'ts': datetime.now().isoformat()
            })
        except Exception:
            pass


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
        # Avoid spamming a read-only endpoint: try POST, if 405 then try PUT once.
        logging.info(f'enviar_para_api: tentando enviar para {api_destino} | quantidade={len(dados) if isinstance(dados, list) else 1}')
        # helpers for token refresh
        def _base_from_url(u):
            try:
                pr = urlparse(u)
                if not pr.scheme or not pr.netloc:
                    return (u or '').split('/admin/')[0]
                return f"{pr.scheme}://{pr.netloc}"
            except Exception:
                return (u or '').split('/admin/')[0]

        def _persist_token(new_token: str):
            if not new_token:
                return
            try:
                ex = {}
                if os.path.exists(CONFIG_PATH):
                    with open(CONFIG_PATH, 'r', encoding='utf-8') as fh:
                        try:
                            ex = json.load(fh) or {}
                        except Exception:
                            ex = {}
                ex['backend_token'] = new_token
                with open(CONFIG_PATH, 'w', encoding='utf-8') as fh:
                    json.dump(ex, fh, indent=2)
            except Exception:
                logging.exception('Falha ao persistir novo token')

        def _try_refresh_token(cfg):
            try:
                base = _base_from_url(cfg.get('api_update') or cfg.get('backend_url') or cfg.get('api_externa') or cfg.get('api_url') or '')
                old_token = cfg.get('backend_token') or cfg.get('api_token') or cfg.get('api_update_token')
                headers = {'Authorization': f'Bearer {old_token}'} if old_token else {}
                # 1) try refresh endpoint
                if base:
                    refresh_url = base.rstrip('/') + '/admin/token/refresh'
                    try:
                        r = requests.post(refresh_url, headers=headers, timeout=8)
                        if r.status_code in (200, 201):
                            try:
                                jj = r.json()
                            except Exception:
                                jj = {}
                            new_token = jj.get('access_token') or jj.get('token') or jj.get('jwt')
                            if new_token:
                                _persist_token(new_token)
                                logging.info('Token renovado via /admin/token/refresh')
                                return new_token
                    except Exception:
                        logging.exception('Falha ao chamar /admin/token/refresh')
                # 2) fallback: login
                user = cfg.get('backend_user') or cfg.get('api_usuario') or cfg.get('user')
                pwd = cfg.get('backend_pass') or cfg.get('api_senha') or cfg.get('password')
                if base and user and pwd:
                    login_url = base.rstrip('/') + '/admin/login'
                    try:
                        r2 = requests.post(login_url, json={'username': user, 'password': pwd}, timeout=8)
                        if r2.status_code in (200, 201):
                            try:
                                jj = r2.json()
                            except Exception:
                                jj = {}
                            new_token = jj.get('access_token') or jj.get('token') or jj.get('jwt')
                            if new_token:
                                _persist_token(new_token)
                                logging.info('Token obtido via /admin/login')
                                return new_token
                    except Exception:
                        logging.exception('Falha ao chamar /admin/login')
            except Exception:
                logging.exception('Erro no fluxo de renovação de token')
            return None
        try:
            # prepare headers: include Bearer token if configured
            headers = {}
            token = config.get('backend_token') or config.get('api_token') or config.get('api_update_token')
            if token:
                headers['Authorization'] = f'Bearer {token}'
            resp = requests.post(api_destino, json=dados, timeout=15, headers=headers)
            if resp.status_code == 401:
                logging.warning('enviar_para_api: 401 no POST. Tentando renovar token e reenviar...')
                new_tk = _try_refresh_token(config)
                if new_tk:
                    headers['Authorization'] = f'Bearer {new_tk}'
                    resp = requests.post(api_destino, json=dados, timeout=15, headers=headers)
            if resp.status_code == 405:
                logging.warning('enviar_para_api: POST retornou 405 Method Not Allowed, tentando PUT como fallback...')
                try:
                    resp_put = requests.put(api_destino, json=dados, timeout=15, headers=headers)
                    if resp_put.status_code == 401:
                        logging.warning('enviar_para_api: 401 no PUT. Tentando renovar token e reenviar...')
                        new_tk = _try_refresh_token(config)
                        if new_tk:
                            headers['Authorization'] = f'Bearer {new_tk}'
                            resp_put = requests.put(api_destino, json=dados, timeout=15, headers=headers)
                    resp_put.raise_for_status()
                    logging.info(f'enviar_para_api: PUT concluido, status={resp_put.status_code}')
                    # mark supported
                    try:
                        update_agent_status({'api_write_supported': True, 'api_write_error': None})
                    except Exception:
                        pass
                    # ACK de escrita via API bem-sucedida
                    try:
                        append_ack({
                            'type': 'api',
                            'payload': {
                                'dest': api_destino,
                                'method': 'PUT',
                                'status': resp_put.status_code,
                                'count': len(dados) if isinstance(dados, list) else 1
                            },
                            'ts': datetime.now().isoformat()
                        })
                    except Exception:
                        pass
                    return
                except Exception:
                    logging.exception('enviar_para_api: PUT falhou')
                    # fall through to handling below
            else:
                resp.raise_for_status()
                logging.info(f'enviar_para_api: POST/PUT envio concluido, status={resp.status_code}')
                try:
                    update_agent_status({'api_write_supported': True, 'api_write_error': None})
                except Exception:
                    pass
                # ACK de escrita via API bem-sucedida
                try:
                    append_ack({
                        'type': 'api',
                        'payload': {
                            'dest': api_destino,
                            'method': 'POST',
                            'status': resp.status_code,
                            'count': len(dados) if isinstance(dados, list) else 1
                        },
                        'ts': datetime.now().isoformat()
                    })
                except Exception:
                    pass
                return
            # If we reach here, both POST and PUT failed or returned non-success
            logging.error('enviar_para_api: tentativa de escrita via API falhou (POST/PUT). Marcando api_write_supported=false e mantendo fallback local.')
            try:
                update_agent_status({'api_write_supported': False, 'api_write_error': 'post_or_put_failed'})
            except Exception:
                pass
            try:
                append_ack({
                    'type': 'api_error',
                    'payload': {'dest': api_destino, 'error': 'post_or_put_failed'},
                    'ts': datetime.now().isoformat()
                })
            except Exception:
                pass
            return
        except requests.exceptions.HTTPError as http_err:
            logging.exception(f'enviar_para_api: HTTP error ao enviar dados para API: {http_err}')
            try:
                update_agent_status({'api_write_supported': False, 'api_write_error': str(http_err)})
            except Exception:
                pass
            try:
                append_ack({
                    'type': 'api_error',
                    'payload': {'dest': api_destino, 'error': str(http_err)},
                    'ts': datetime.now().isoformat()
                })
            except Exception:
                pass
        except Exception:
            logging.exception('enviar_para_api: falha ao enviar dados para API')
            try:
                update_agent_status({'api_write_supported': False, 'api_write_error': 'exception'})
            except Exception:
                pass
            try:
                append_ack({
                    'type': 'api_error',
                    'payload': {'dest': api_destino, 'error': 'exception'},
                    'ts': datetime.now().isoformat()
                })
            except Exception:
                pass
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

        # resolver caminhos relativos: tentamos valores absolutos e locais comuns (inclui sync/ e backend)
        candidates = [db_path]
        if not os.path.isabs(db_path):
            base = os.path.dirname(__file__)
            candidates.append(os.path.join(base, db_path))
            candidates.append(os.path.join(base, 'dist', db_path))
            candidates.append(os.path.join(os.getcwd(), db_path))
            candidates.append(os.path.join(os.path.dirname(__file__), '..', 'sync', db_path))
            candidates.append(os.path.join(os.path.dirname(__file__), '..', 'backend', db_path))
            # também procurar no diretório de dados do usuário
            candidates.append(os.path.join(os.path.dirname(CONFIG_PATH), db_path))

        found = None
        for p in candidates:
            try:
                if not p:
                    continue
                pnorm = os.path.normpath(p)
                if os.path.exists(pnorm):
                    # ignore files vazios (possível artifacto de build)
                    try:
                        if os.path.getsize(pnorm) == 0:
                            logging.warning(f'buscar_dados_do_banco: candidato encontrado mas está vazio: {pnorm}')
                            continue
                    except Exception:
                        pass
                    found = pnorm
                    logging.info(f'buscar_dados_do_banco: usando arquivo sqlite: {found}')
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

# Acks persistence
ACKS_PATH = os.path.join(APP_HOME, 'acks.jsonl')
STATUS_PATH = os.path.join(APP_HOME, 'agent_status.json')

def append_ack(record: dict):
    try:
        os.makedirs(os.path.dirname(ACKS_PATH), exist_ok=True)
        with open(ACKS_PATH, 'a', encoding='utf-8') as fh:
            fh.write(json.dumps(record, ensure_ascii=False) + '\n')
        # Rotate/compact ACKs if limits exceeded (lines/bytes)
        try:
            cfg = load_config()
        except Exception:
            cfg = {}
        try:
            max_lines = int(cfg.get('acks_max_lines', 5000) or 5000)
        except Exception:
            max_lines = 5000
        try:
            max_bytes = int(cfg.get('acks_max_bytes', 5 * 1024 * 1024) or (5 * 1024 * 1024))
        except Exception:
            max_bytes = 5 * 1024 * 1024
        need_compact = False
        try:
            if os.path.getsize(ACKS_PATH) > max_bytes:
                need_compact = True
        except Exception:
            pass
        if not need_compact:
            try:
                with open(ACKS_PATH, 'r', encoding='utf-8', errors='ignore') as fh:
                    cnt = sum(1 for _ in fh)
                if cnt > max_lines:
                    need_compact = True
            except Exception:
                need_compact = False
        if need_compact:
            try:
                with open(ACKS_PATH, 'r', encoding='utf-8', errors='ignore') as fh:
                    lines = [l for l in fh if l.strip()]
                if len(lines) > max_lines:
                    lines = lines[-max_lines:]
                with open(ACKS_PATH, 'w', encoding='utf-8') as fh:
                    fh.writelines(lines)
            except Exception:
                pass
        # update quick status for monitoramento
        try:
            update_agent_status({'last_ack': datetime.now().isoformat()})
        except Exception:
            pass
    except Exception:
        logging.exception('Falha ao persistir ACK')
    # optional forward to aggregator
    try:
        cfg = load_config()
        agg_url = cfg.get('backend_aggregator_url')
        agg_token = cfg.get('backend_aggregator_token')
        if agg_url:
            try:
                headers = {}
                if agg_token:
                    headers['X-Api-Token'] = agg_token
                # send as POST /api/agents/acks
                payload = {
                    'agent_id': cfg.get('agente_id') or str(uuid.getnode()),
                    'type': record.get('type'),
                    'payload': record.get('payload'),
                    'ts': record.get('ts')
                }
                requests.post(agg_url.rstrip('/') + '/api/agents/acks', json=payload, headers=headers, timeout=5)
            except Exception:
                logging.exception('Falha ao encaminhar ACK para agregador')
    except Exception:
        pass


def update_agent_status(data: dict):
    """Merge basic status fields into STATUS_PATH JSON for /health and UI."""
    try:
        os.makedirs(os.path.dirname(STATUS_PATH), exist_ok=True)
        existing = {}
        if os.path.exists(STATUS_PATH):
            try:
                with open(STATUS_PATH, 'r', encoding='utf-8') as fh:
                    existing = json.load(fh) or {}
            except Exception:
                existing = {}
        existing.update(data)
        existing['updated_at'] = datetime.now().isoformat()
        with open(STATUS_PATH, 'w', encoding='utf-8') as fh:
            json.dump(existing, fh, ensure_ascii=False, indent=2)
    except Exception:
        logging.exception('Falha ao atualizar STATUS_PATH')


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
        # além de salvar o status local a cada 10s, envia heartbeat ao backend (~30s)
        last_sent = 0
        last_devices_sent = 0
        # loga uma batida de vida a cada ~60s para diagnóstico
        last_alive_log = 0
        while True:
            try:
                salvar_status_agente()
            except Exception:
                logging.exception('Erro ao salvar status no heartbeat')

            # envia ping para o backend com um intervalo curto para manter painel online
            try:
                now = time.time()
                # tornar intervalos configuráveis, com padrão de 30s
                try:
                    cfg = load_config()
                except Exception:
                    cfg = {}
                try:
                    hb_interval = int(cfg.get('agent_heartbeat_sec', 30) or 30)
                except Exception:
                    hb_interval = 30
                try:
                    devices_interval = int(cfg.get('devices_push_interval_sec', 30) or 30)
                except Exception:
                    devices_interval = 30
                # log inicial dos intervalos
                if last_alive_log == 0:
                    logging.info(f"[HEARTBEAT] Thread iniciada. hb_interval={hb_interval}s devices_interval={devices_interval}s")

                if now - last_sent >= hb_interval:
                    try:
                        logging.info('[HEARTBEAT] Enviando status do agente...')
                        enviar_status_agente()
                        logging.info('[HEARTBEAT] Status enviado.')
                    except Exception:
                        logging.exception('Erro ao enviar heartbeat para backend')
                    last_sent = now
                # envia lista de dispositivos legados no mesmo compasso do heartbeat (padrão 30s)
                if now - last_devices_sent >= devices_interval:
                    try:
                        logging.info('[DEVICES] Enviando lista de dispositivos legados...')
                        enviar_dispositivos_legados()
                        logging.info('[DEVICES] Dispositivos enviados.')
                    except Exception:
                        logging.exception('Erro ao enviar dispositivos legados para backend')
                    last_devices_sent = now
                # log de vida periódico
                if now - last_alive_log >= 60:
                    logging.info('[ALIVE] Loop de heartbeat ativo.')
                    last_alive_log = now
            except Exception:
                # nunca deixa o loop morrer, mas registra o erro
                logging.exception('Erro inesperado no loop de heartbeat')

            time.sleep(10)

    t = threading.Thread(target=loop, daemon=True)
    t.start()


def _wsgi_app(environ, start_response):
    try:
        path = environ.get('PATH_INFO', '')
        method = environ.get('REQUEST_METHOD', 'GET')
        query = parse_qs(environ.get('QUERY_STRING', ''))
        # simple in-memory rate limiter per IP for admin endpoints (allow bursts)
        try:
            if not hasattr(_wsgi_app, '_rate'): _wsgi_app._rate = {}
            ip = environ.get('REMOTE_ADDR', 'local')
            now_ts = time.time()
            bucket = _wsgi_app._rate.get(ip, [])
            # keep only last 60s
            bucket = [t for t in bucket if now_ts - t < 60]
            if len(bucket) > 200:
                start_response('429 Too Many Requests', [('Content-Type', 'application/json')])
                return [json.dumps({'error': 'rate_limited'}).encode('utf-8')]
            bucket.append(now_ts)
            _wsgi_app._rate[ip] = bucket
        except Exception:
            pass

        # load runtime config for auth settings
        try:
            cfg = load_config()
        except Exception:
            cfg = {}
        ack_enabled = bool(cfg.get('ack_enabled', False))
        ack_token = cfg.get('ack_token')

        # simple /logs endpoint
        if path == '/logs' and method == 'GET':
            lines = int(query.get('lines', ['200'])[0])
            try:
                with open(LOG_PATH, 'r', encoding='utf-8', errors='ignore') as fh:
                    content = fh.read().splitlines()
                out = content[-lines:]
            except Exception:
                out = []
            payload = json.dumps({'lines': out}, ensure_ascii=False).encode('utf-8')
            start_response('200 OK', [('Content-Type', 'application/json; charset=utf-8')])
            return [payload]

        # health endpoint
        if path == '/health' and method == 'GET':
            try:
                # basic health info
                last_generated = None
                try:
                    if os.path.exists(CONFIG_PATH):
                        with open(CONFIG_PATH, 'r', encoding='utf-8-sig') as fh:
                            cfg = json.load(fh)
                            last_generated = cfg.get('ultima_atualizacao') or cfg.get('automacao_ultima')
                except Exception:
                    last_generated = None
                # include agent status file contents if available
                status_info = {}
                try:
                    if os.path.exists(STATUS_PATH):
                        with open(STATUS_PATH, 'r', encoding='utf-8') as fh:
                            status_info = json.load(fh) or {}
                except Exception:
                    status_info = {}
                # avoid duplicate keys: expose detailed status under 'agent_status'
                payload_obj = {'status': 'ok', 'last_generated': last_generated, 'agent_status': status_info}
                payload = json.dumps(payload_obj, ensure_ascii=False).encode('utf-8')
                start_response('200 OK', [('Content-Type', 'application/json; charset=utf-8')])
                return [payload]
            except Exception:
                start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
                return [json.dumps({'status': 'error'}).encode('utf-8')]

        # read persisted ACKs
        if path == '/acks' and method == 'GET':
            try:
                lines = int(query.get('lines', ['200'])[0])
                ack_type = query.get('type', [None])[0]
                out = []
                try:
                    if os.path.exists(ACKS_PATH):
                        with open(ACKS_PATH, 'r', encoding='utf-8', errors='ignore') as fh:
                            all_lines = [l.strip() for l in fh if l.strip()]
                        selected = all_lines[-lines:]
                        for l in selected:
                            try:
                                obj = json.loads(l)
                                if ack_type and obj.get('type') != ack_type:
                                    continue
                                out.append(obj)
                            except Exception:
                                continue
                except Exception:
                    out = []
                payload = json.dumps({'acks': out}, ensure_ascii=False).encode('utf-8')
                start_response('200 OK', [('Content-Type', 'application/json; charset=utf-8')])
                return [payload]
            except Exception:
                start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
                return [json.dumps({'status': 'error'}).encode('utf-8')]

        # helper: validate token when ACKs protection active
        def _validate_ack_auth():
            if not ack_enabled:
                return True
            if not ack_token:
                # configured to require ack but no token present => deny
                logging.error('ACK endpoint enabled but no ack_token configured; denying access')
                return False
            provided = None
            try:
                provided = environ.get('HTTP_X_ACK_TOKEN') or environ.get('HTTP_AUTHORIZATION')
                if provided and isinstance(provided, str) and provided.lower().startswith('bearer '):
                    provided = provided.split(' ', 1)[1]
            except Exception:
                provided = None
            if not provided or provided != ack_token:
                return False
            return True

        # ack endpoints
        if path == '/ack/update' and method == 'POST':
            try:
                if not _validate_ack_auth():
                    remote = environ.get('REMOTE_ADDR', 'unknown')
                    logging.warning(f"Unauthorized ACK access attempt to /ack/update from {remote}")
                    start_response('401 Unauthorized', [('Content-Type', 'application/json')])
                    return [json.dumps({'status': 'unauthorized'}).encode('utf-8')]
                size = int(environ.get('CONTENT_LENGTH') or 0)
                body = environ['wsgi.input'].read(size).decode('utf-8')
                obj = json.loads(body)
                obj['_received_at'] = datetime.now().isoformat()
                logging.info(f"[ACK_UPDATE] {obj}")
                append_ack({'type': 'update', 'payload': obj, 'ts': datetime.now().isoformat()})
                start_response('200 OK', [('Content-Type', 'application/json')])
                return [json.dumps({'status': 'ok'}).encode('utf-8')]
            except Exception:
                logging.exception('Falha ao processar /ack/update')
                start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
                return [json.dumps({'status': 'error'}).encode('utf-8')]

        if path == '/ack/price-query' and method == 'POST':
            try:
                if not _validate_ack_auth():
                    remote = environ.get('REMOTE_ADDR', 'unknown')
                    logging.warning(f"Unauthorized ACK access attempt to /ack/price-query from {remote}")
                    start_response('401 Unauthorized', [('Content-Type', 'application/json')])
                    return [json.dumps({'status': 'unauthorized'}).encode('utf-8')]
                size = int(environ.get('CONTENT_LENGTH') or 0)
                body = environ['wsgi.input'].read(size).decode('utf-8')
                obj = json.loads(body)
                obj['_received_at'] = datetime.now().isoformat()
                logging.info(f"[ACK_QUERY] {obj}")
                append_ack({'type': 'query', 'payload': obj, 'ts': datetime.now().isoformat()})
                start_response('200 OK', [('Content-Type', 'application/json')])
                return [json.dumps({'status': 'ok'}).encode('utf-8')]
            except Exception:
                logging.exception('Falha ao processar /ack/price-query')
                start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
                return [json.dumps({'status': 'error'}).encode('utf-8')]

        # export persisted ACKs as a downloadable blob
        if path == '/acks/export' and method == 'GET':
            try:
                # require auth if acks are protected
                if not _validate_ack_auth():
                    start_response('401 Unauthorized', [('Content-Type', 'application/json')])
                    return [json.dumps({'status': 'unauthorized'}).encode('utf-8')]
                if not os.path.exists(ACKS_PATH):
                    start_response('200 OK', [('Content-Type', 'application/octet-stream'), ('Content-Disposition', 'attachment; filename="acks.jsonl"')])
                    return [b'']
                with open(ACKS_PATH, 'rb') as fh:
                    data = fh.read()
                headers = [('Content-Type', 'application/octet-stream'), ('Content-Disposition', 'attachment; filename="acks.jsonl"')]
                start_response('200 OK', headers)
                return [data]
            except Exception:
                logging.exception('Falha ao exportar ACKs')
                start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
                return [json.dumps({'status': 'error'}).encode('utf-8')]

        # clear persisted ACKs (destructive) - requires auth when enabled
        if path == '/acks/clear' and method == 'POST':
            try:
                if not _validate_ack_auth():
                    start_response('401 Unauthorized', [('Content-Type', 'application/json')])
                    return [json.dumps({'status': 'unauthorized'}).encode('utf-8')]
                try:
                    # truncate the file
                    open(ACKS_PATH, 'w', encoding='utf-8').close()
                except Exception:
                    # fallback: remove file
                    try:
                        if os.path.exists(ACKS_PATH):
                            os.remove(ACKS_PATH)
                    except Exception:
                        logging.exception('Erro ao remover arquivo de ACKs')
                logging.info('ACKs persisted cleared via /acks/clear')
                start_response('200 OK', [('Content-Type', 'application/json')])
                return [json.dumps({'status': 'ok'}).encode('utf-8')]
            except Exception:
                logging.exception('Falha ao processar /acks/clear')
                start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
                return [json.dumps({'status': 'error'}).encode('utf-8')]

        start_response('404 Not Found', [('Content-Type', 'application/json')])
        return [json.dumps({'error': 'not_found'}).encode('utf-8')]
    except Exception:
        logging.exception('Erro no WSGI app')
        start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
        return [json.dumps({'error': 'internal'}).encode('utf-8')]


def start_http_server():
    import threading
    cfg = load_config()
    port = int(cfg.get('http_port', 8010) or 8010)
    host = str(cfg.get('http_host', '127.0.0.1') or '127.0.0.1')

    def run():
        try:
            httpd = make_server(host, port, _wsgi_app)
            logging.info(f'HTTP admin server listening on {host}:{port}')
            httpd.serve_forever()
        except Exception:
            logging.exception('Falha ao iniciar HTTP admin server')

    t = threading.Thread(target=run, daemon=True)
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
    # Resolve caminho de saída de maneira robusta: aceita diretório ou caminho completo
    def resolve_pricetab_path(value):
        if not value:
            return os.path.join(os.getcwd(), 'pricetab.txt')
        v = os.path.normpath(value)
        # Se for um diretório existente, junta o nome do arquivo
        if os.path.isdir(v):
            return os.path.join(v, 'pricetab.txt')
        # Se terminar com separador, trata como diretório
        if value.endswith(os.sep) or value.endswith('/') or value.endswith('\\'):
            return os.path.join(v, 'pricetab.txt')
        # Se contém mais de uma ocorrência de pricetab.txt, remove duplicações
        lower = v.lower()
        if lower.count('pricetab.txt') > 1:
            parts = v.split('pricetab.txt')
            base = ''.join(parts[:-1])
            return os.path.join(base, 'pricetab.txt')
        return v

    arquivo_saida = resolve_pricetab_path(config.get('arquivo_local'))
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
        # aceita tanto 'nome' quanto 'name' vindos da UI
        loja_nome = loja_nome or (loja.get('nome') or loja.get('name'))
    status_payload = {
        "agent_id": agent_id,
        "status": "online",
        "last_update": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    if loja_codigo:
        status_payload["loja_codigo"] = loja_codigo
    if loja_nome:
        status_payload["loja_nome"] = loja_nome
    # Envia lista completa de lojas vinculadas, se houver
    try:
        lojas_cfg = config.get('lojas') or []
        lojas_slim = []
        for lj in lojas_cfg:
            if not isinstance(lj, dict):
                continue
            cod = lj.get('codigo')
            nom = lj.get('nome') or lj.get('name')
            if not cod and not nom:
                continue
            lojas_slim.append({'codigo': cod, 'nome': nom})
        if lojas_slim:
            status_payload['lojas'] = lojas_slim
    except Exception:
        pass
    try:
        # post to configured backend URL
        try:
            resp = requests.post(backend_url, json=status_payload, timeout=5)
            logging.info(f"[HEARTBEAT] POST {backend_url} -> {resp.status_code}")
        except Exception:
            logging.exception('Erro ao enviar status para backend_url primário')
        # optional forward to aggregator service
        agg_url = config.get('backend_aggregator_url')
        agg_token = config.get('backend_aggregator_token')
        if agg_url:
            try:
                headers = {}
                if agg_token:
                    headers['X-Api-Token'] = agg_token
                agg_payload = {
                    'agent_id': agent_id,
                    'hostname': socket.gethostname(),
                    'loja_codigo': loja_codigo,
                    'status': 'online',
                    'last_update': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    'ip': get_local_ip()
                }
                r2 = requests.post(agg_url.rstrip('/') + '/api/agents/status', json=agg_payload, headers=headers, timeout=5)
                logging.info(f"[HEARTBEAT] Aggregator POST -> {r2.status_code}")
            except Exception:
                logging.exception('Erro ao enviar status para agregador')
    except Exception:
        logging.exception('Erro ao enviar status do agente local')

def _backend_base_from_status_url(url: str) -> str:
    try:
        u = (url or '').rstrip('/')
        suffix = '/admin/agents/status'
        if u.endswith(suffix):
            return u[:-len(suffix)]
        return u
    except Exception:
        return url or ''

def enviar_dispositivos_legados():
    """Envia a lista de dispositivos (legados) do agente para o backend.
    Backend: POST {base}/admin/agents/{agent_id}/devices  Body: { devices: [ {identifier, name?, tipo?, status?, ip?, last_update?} ] }
    """
    config = load_config()
    backend_status_url = config.get('backend_url') or 'http://127.0.0.1:8000/admin/agents/status'
    base = _backend_base_from_status_url(backend_status_url)
    agent_id = config.get('agente_id') or str(uuid.getnode())
    devices_url = f"{base}/admin/agents/{agent_id}/devices"
    equipamentos = config.get('equipamentos', []) or []
    payload_devices = []
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    for eq in equipamentos:
        try:
            ip = str(eq.get('ip') or '').strip()
            porta = str(eq.get('porta') or '').strip()
            desc = (eq.get('descricao') or eq.get('name') or '').strip()
            status = (eq.get('status') or 'online').strip()
            loja_cod = eq.get('loja') or eq.get('loja_codigo') or None
            loja_nom = eq.get('loja_nome') or None
            # catalago (se a GUI estiver preenchendo)
            last_cat = eq.get('last_catalog_sync') or None
            cat_count = eq.get('catalog_count') or None
            if not ip:
                continue
            identifier = f"{ip}:{porta}" if porta else ip
            payload_devices.append({
                'identifier': identifier,
                'name': desc or identifier,
                'tipo': 'LEGACY',
                'status': status or 'online',
                'ip': ip,
                'last_update': now_str,
                'store_code': loja_cod,
                'store_name': loja_nom,
                'last_catalog_sync': last_cat,
                'catalog_count': cat_count
            })
        except Exception:
            continue
    try:
        if not payload_devices:
            logging.info('[DEVICES] Nenhum dispositivo legado configurado para enviar.')
            return
        logging.info(f"[DEVICES] POST {devices_url} (count={len(payload_devices)})")
        resp = requests.post(devices_url, json={'devices': payload_devices}, timeout=8)
        logging.info(f"[DEVICES] Resposta -> {resp.status_code}")
    except Exception:
        logging.exception('Falha ao enviar dispositivos legados')


def main():
    print("Agente Local PRECIX iniciado.")
    try:
        iniciar_status_heartbeat()
    except Exception:
        logging.exception('Falha ao iniciar heartbeat')
    try:
        start_http_server()
    except Exception:
        logging.exception('Falha ao iniciar servidor HTTP admin')

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
                arquivo_cfg = config.get('arquivo_origem') or config.get('arquivo_entrada') or config.get('arquivo_entrada_arquivo') or config.get('arquivo_entrada_path') or ''
                sep = config.get('arquivo_separador') or config.get('arquivo_separador_custom') or '|'
                layout = config.get('arquivo_layout') or 'barcode|name|price'

                # resolver input de forma tolerante: tenta variações e pastas comuns
                def resolve_input_file(cfg_value):
                    if not cfg_value:
                        return None
                    cand = os.path.normpath(cfg_value)
                    # caminho direto
                    try:
                        if os.path.exists(cand) and os.path.getsize(cand) > 0:
                            logging.info(f"Arquivo de entrada encontrado (direto): {cand}")
                            return cand
                    except Exception:
                        pass
                    # variações de nomes comuns
                    base = os.path.dirname(cand) or os.getcwd()
                    name = os.path.basename(cand)
                    alt_names = [name, name.replace('.txt', '_entrada.txt'), name.replace('.txt', 'entrada.txt'), 'pricetab_entrada.txt', 'pricetab.txt']
                    for an in alt_names:
                        p = os.path.join(base, an)
                        try:
                            if os.path.exists(p) and os.path.getsize(p) > 0:
                                logging.info(f"Arquivo de entrada encontrado (variação): {p}")
                                return p
                        except Exception:
                            continue
                    # se cfg for diretório, procurar por arquivos compatíveis
                    try:
                        if os.path.isdir(cand):
                            for fn in os.listdir(cand):
                                if fn.lower().startswith('pricetab') and fn.lower().endswith('.txt'):
                                    p = os.path.join(cand, fn)
                                    try:
                                        if os.path.getsize(p) > 0:
                                            logging.info(f"Arquivo de entrada encontrado na pasta: {p}")
                                            return p
                                    except Exception:
                                        continue
                    except Exception:
                        pass
                    # procurar em pastas comuns do projeto
                    common = [os.path.join(os.path.dirname(__file__), '..', 'sync', name), os.path.join(os.path.dirname(__file__), '..', 'backend', name), os.path.join(os.getcwd(), name)]
                    for p in common:
                        p = os.path.normpath(p)
                        try:
                            if os.path.exists(p) and os.path.getsize(p) > 0:
                                logging.info(f"Arquivo de entrada encontrado em pasta comum: {p}")
                                return p
                        except Exception:
                            continue
                    return None

                arquivo = resolve_input_file(arquivo_cfg)
                # se encontramos um arquivo alternativo, persiste para evitar procura repetida
                try:
                    if arquivo and arquivo != (arquivo_cfg or ''):
                        try:
                            # write directly to CONFIG_PATH
                            existing = {}
                            if os.path.exists(CONFIG_PATH):
                                with open(CONFIG_PATH, 'r', encoding='utf-8') as fh:
                                    try:
                                        existing = json.load(fh) or {}
                                    except Exception:
                                        existing = {}
                            existing['arquivo_entrada'] = arquivo
                            with open(CONFIG_PATH, 'w', encoding='utf-8') as fh:
                                json.dump(existing, fh, indent=2)
                            logging.info(f"arquivo de entrada resolvido e salvo em config: {arquivo}")
                        except Exception:
                            logging.exception('Falha interna ao persistir arquivo_entrada no config')
                except Exception:
                    logging.exception('Falha ao persistir arquivo_entrada resolvido no config')
                if arquivo:
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
                    logging.info(f'Arquivo de origem não informado ou não encontrado (config: {arquivo_cfg}).')
            elif fonte == 'Banco de Dados':
                # exige configuração explícita do banco em produção
                db_path = config.get('db_path') or config.get('db_nome') or config.get('db_file')
                if not db_path:
                    logging.error('[ERRO] Modo "Banco de Dados" selecionado, mas nenhum caminho de DB foi informado (db_nome/db_path). Em produção, configure o caminho absoluto no config.json para evitar heurísticas.')
                    dados = None
                else:
                    # se o path não for absoluto, avisar (mas ainda permitir)
                    if not os.path.isabs(db_path):
                        logging.warning(f'[AVISO] db_path não está em formato absoluto: {db_path} - recomenda-se usar caminho absoluto para produção')
                    try:
                        dados = buscar_dados_do_banco(config)
                    except Exception:
                        logging.exception('Erro ao buscar dados do banco (fluxo principal)')
                        dados = None

            # resolve path robustamente (aceita diretório ou arquivo)
            def resolve_pricetab_path(value):
                if not value:
                    return os.path.join(os.getcwd(), 'pricetab.txt')
                v = os.path.normpath(value)
                if os.path.isdir(v):
                    return os.path.join(v, 'pricetab.txt')
                if value.endswith(os.sep) or value.endswith('/') or value.endswith('\\'):
                    return os.path.join(v, 'pricetab.txt')
                lower = v.lower()
                if lower.count('pricetab.txt') > 1:
                    parts = v.split('pricetab.txt')
                    base = ''.join(parts[:-1])
                    return os.path.join(base, 'pricetab.txt')
                return v

            arquivo_saida = resolve_pricetab_path(config.get('arquivo_local'))
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
                        # Após gerar, também envia para API (atualizar PWA) e conforme método configurado (FTP/TCP/LOCAL/API)
                        try:
                            enviar_para_api(dados)
                        except Exception:
                            logging.exception('Erro ao enviar dados para API (loop regular)')
                        try:
                            enviar_arquivo_automatico(arquivo_saida)
                        except Exception:
                            logging.exception('Erro ao executar envio automático (loop regular)')
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


