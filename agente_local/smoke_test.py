import importlib.util
import os

MODULE_PATH = os.path.join(os.path.dirname(__file__), 'main.py')
spec = importlib.util.spec_from_file_location('agente_main', MODULE_PATH)
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

# Load config and force a single run
conf = m.load_config()
conf['automacao_intervalo'] = 0
conf['tipo_integracao'] = 'API'
api = conf.get('api_externa') or conf.get('api_url')
print('Using API URL:', api)

# Fetch data
try:
    dados = m.buscar_dados_precix(api) if api else None
    print('Fetched:', type(dados), 'length:', (len(dados) if hasattr(dados, '__len__') else 'n/a'))
except Exception as e:
    print('Error fetching data:', e)
    dados = None

# Target output
out = conf.get('arquivo_local') or os.path.join(os.getcwd(), 'pricetab.txt')
out = os.path.normpath(out)
print('Output path:', out)

try:
    m.gerar_arquivo_precos(dados, out)
    print('gerar_arquivo_precos completed')
except Exception as e:
    print('Error during gerar_arquivo_precos:', e)

print('Smoke test finished')
