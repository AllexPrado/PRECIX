"""
Simple smoke test for the Agente Local price file generation.
Runs gerar_arquivo_precos with a small sample payload and writes to ./pricetab_test.txt
"""
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))
from main import gerar_arquivo_precos

sample = [
    {'barcode': '1234567890123', 'name': 'Produto Teste A', 'price': 9.99},
    {'barcode': '9876543210987', 'name': 'Produto Teste B', 'price': 5.5},
]

out = os.path.join(os.path.dirname(__file__), 'pricetab_test.txt')
if os.path.exists(out):
    try:
        os.remove(out)
    except Exception:
        pass

print('Gerando arquivo de teste em', out)
gerar_arquivo_precos(sample, out, incluir_cabecalho=True)
print('OK')
