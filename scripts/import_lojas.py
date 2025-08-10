# Script para importar lojas do arquivo LOJAs.txt para o banco via API
import requests
import csv

API_URL = 'http://localhost:8000/admin/stores/import'

lojas = []
with open('d:/Document/Sonda/LOJAs.txt', encoding='utf-8') as f:
    reader = csv.DictReader(f, delimiter='\t')
    for row in reader:
        lojas.append({'codigo': row['COD'], 'name': row['LOJA'], 'status': 'ativo'})

resp = requests.post(API_URL, json={'lojas': lojas})
print('Importação:', resp.status_code, resp.json())
