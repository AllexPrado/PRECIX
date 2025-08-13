"""
Módulo: importador_precos.py
---------------------------
Responsável por importar e atualizar preços no banco de dados a partir das integrações configuradas.
Suporta múltiplos tipos de integração: arquivo, API, banco de dados.
Cada função é comentada para facilitar manutenção e evolução.
"""

import os
import json
import sqlite3
import requests
from integration_config import get_integrations
from database import get_db_connection
from datetime import datetime

# Função principal: executa a importação para todas as integrações ativas
def importar_todos_precos():
    """
    Percorre todas as integrações ativas e executa a importação de preços conforme o tipo.
    """
    integracoes = get_integrations()
    for config in integracoes:
        if not config.get('ativo'):
            continue
        tipo = config.get('tipo')
        if tipo == 'arquivo':
            importar_arquivo(config)
        elif tipo == 'api':
            importar_api(config)
        elif tipo == 'banco':
            importar_banco(config)
        # Adicionar outros tipos no futuro

# Importação via arquivo de texto/csv
def importar_arquivo(config):
    """
    Importa preços de um arquivo conforme layout salvo na configuração.
    """
    caminho = config.get('parametro1')
    layout = json.loads(config.get('layout') or '{}')
    if not caminho or not os.path.exists(caminho):
        log_importacao(config, False, 'Arquivo não encontrado')
        return
    try:
        with open(caminho, 'r', encoding='utf-8') as f:
            linhas = f.readlines()
        sep = layout.get('separador', ';')
        colunas = [c.strip() for c in layout.get('colunas', 'codigo;descricao;preco').split('\n')]
        atualizados = 0
        for linha in linhas:
            partes = linha.strip().split(sep)
            if len(partes) < len(colunas):
                continue
            dados = dict(zip(colunas, partes))
            if atualizar_preco(dados, config.get('loja_id')):
                atualizados += 1
        log_importacao(config, True, f'{atualizados} preços atualizados')
    except Exception as e:
        log_importacao(config, False, f'Erro: {e}')

# Importação via API REST
def importar_api(config):
    """
    Importa preços de uma API REST conforme parâmetros e layout.
    """
    url = config.get('parametro1')
    token = config.get('parametro2')
    layout = json.loads(config.get('layout') or '{}')
    headers = {'Authorization': f'Bearer {token}'} if token else {}
    try:
        resp = requests.get(url, headers=headers, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        atualizados = 0
        for item in data:
            if atualizar_preco(item, config.get('loja_id')):
                atualizados += 1
        log_importacao(config, True, f'{atualizados} preços atualizados')
    except Exception as e:
        log_importacao(config, False, f'Erro: {e}')

# Importação via banco de dados externo (exemplo simplificado)
def importar_banco(config):
    """
    Importa preços de uma view/tabela externa (exemplo: sqlite, pode ser expandido).
    """
    conn_str = config.get('parametro1')
    layout = json.loads(config.get('layout') or '{}')
    try:
        # Exemplo: conectar em outro sqlite
        ext_conn = sqlite3.connect(conn_str)
        cur = ext_conn.cursor()
        cur.execute('SELECT * FROM precos')
        rows = cur.fetchall()
        colunas = [desc[0] for desc in cur.description]
        atualizados = 0
        for row in rows:
            dados = dict(zip(colunas, row))
            if atualizar_preco(dados, config.get('loja_id')):
                atualizados += 1
        ext_conn.close()
        log_importacao(config, True, f'{atualizados} preços atualizados')
    except Exception as e:
        log_importacao(config, False, f'Erro: {e}')

# Atualiza o preço de um produto no banco local
def atualizar_preco(dados, loja_id):
    """
    Atualiza o preço de um produto no banco local, conforme dados e loja.
    Retorna True se atualizado com sucesso.
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        # Exemplo: atualizar tabela products (ajustar conforme modelo real)
        cur.execute('''UPDATE products SET preco = ? WHERE codigo = ? AND (store_id = ? OR ? IS NULL)''',
                    (dados.get('preco'), dados.get('codigo'), loja_id, loja_id))
        conn.commit()
        conn.close()
        return cur.rowcount > 0
    except Exception:
        return False


# Log de importação: salva também na tabela de auditoria para integração com painel
def log_importacao(config, sucesso, mensagem):
    """
    Registra log da importação: salva na tabela de auditoria (audit_log) e imprime para debug.
    """
    from database import add_audit_log, get_store_name
    loja_id = config.get('loja_id')
    tipo = config.get('tipo')
    status = 'IMPORT_OK' if sucesso else 'IMPORT_FAIL'
    detalhes = f"[{tipo}] {mensagem}"
    # device_id e device_name ficam None para logs de importação
    add_audit_log(None, get_store_name(loja_id) if loja_id else 'Global', status, detalhes)
    print(f"[{datetime.now()}] Loja {loja_id or 'Global'} - {tipo} - Sucesso: {sucesso} - {mensagem}")

# Exemplo de execução manual
if __name__ == '__main__':
    importar_todos_precos()
