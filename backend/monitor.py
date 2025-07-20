import logging
import os
from datetime import datetime

# Configuração do logger
LOG_DIR = os.path.join(os.path.dirname(__file__), 'logs')
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, f'monitor_{datetime.now().strftime("%Y%m%d")}.log')

logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

def log_event(event: str, level: str = 'info'):
    if level == 'info':
        logging.info(event)
    elif level == 'warning':
        logging.warning(event)
    elif level == 'error':
        logging.error(event)
    else:
        logging.debug(event)

def log_sync_start():
    log_event('Sincronização iniciada.')

def log_sync_success():
    log_event('Sincronização concluída com sucesso.')

def log_sync_failure(error_msg: str):
    log_event(f'Falha na sincronização: {error_msg}', level='error')

def log_import_event(status: str, details: str = ''):
    log_event(f'Importação: {status}. {details}')

def log_export_event(status: str, details: str = ''):
    log_event(f'Exportação: {status}. {details}')

# Exemplo de uso:
if __name__ == '__main__':
    log_sync_start()
    log_import_event('sucesso', 'Produtos importados do Kiosk')
    log_sync_failure('Timeout ao acessar banco de dados')
    log_sync_success()
