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
from datetime import datetime

# Suporte a import dual-mode (pacote ou script)
try:
    from .integration_config import get_integrations
    from .database import get_db_connection
except ImportError:  # quando carregado fora de pacote (ex: reloader)
    from integration_config import get_integrations
    from database import get_db_connection

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

# Atualiza o preço de um produto no banco local (compatível com nosso schema products)
def atualizar_preco(dados, loja_id):
    """
    Atualiza ou insere preço no schema atual:
    - Tabela products(barcode TEXT PK, name TEXT, price REAL, promo TEXT)
    - Mapeia campos de entrada flexíveis: codigo|barcode, descricao|name, preco|price, promocao|promo
    Retorna True se houve update/insert.
    """
    try:
        # Normaliza campos
        barcode = str(dados.get('barcode') or dados.get('codigo') or '').strip()
        if not barcode:
            return False
        name = dados.get('name') or dados.get('descricao') or dados.get('produto') or ''
        try:
            price = float(dados.get('price') if dados.get('price') is not None else dados.get('preco'))
        except Exception:
            # tenta converter strings com vírgula
            raw = dados.get('price') or dados.get('preco')
            try:
                price = float(str(raw).replace(',', '.'))
            except Exception:
                price = None
        promo = dados.get('promo') or dados.get('promocao')

        if price is None:
            return False

        conn = get_db_connection()
        cur = conn.cursor()
        # Verifica existência
        cur.execute('SELECT 1 FROM products WHERE barcode = ?', (barcode,))
        exists = cur.fetchone() is not None
        if exists:
            # Atualiza somente o que veio
            if name:
                cur.execute('UPDATE products SET name = ?, price = ?, promo = COALESCE(?, promo) WHERE barcode = ?', (name, price, promo, barcode))
            else:
                cur.execute('UPDATE products SET price = ?, promo = COALESCE(?, promo) WHERE barcode = ?', (price, promo, barcode))
        else:
            cur.execute('INSERT INTO products (barcode, name, price, promo) VALUES (?, ?, ?, ?)', (barcode, name or f'Produto {barcode}', price, promo))
        conn.commit()
        conn.close()
        return True
    except Exception:
        return False


# Log de importação: salva também na tabela de auditoria para integração com painel
def log_importacao(config, sucesso, mensagem):
    """
    Registra log da importação na tabela audit_log e imprime para debug.
    Evita dependência de função inexistente get_store_name: busca nome/código diretamente.
    """
    try:
        try:
            from .database import add_audit_log, get_db_connection
        except ImportError:
            from database import add_audit_log, get_db_connection
        loja_id = config.get('loja_id')
        tipo = config.get('tipo')
        status = 'IMPORT_OK' if sucesso else 'IMPORT_FAIL'
        # Resolve nome/código da loja se houver loja_id
        store_label = 'Global'
        if loja_id is not None:
            try:
                conn = get_db_connection()
                cur = conn.cursor()
                cur.execute('SELECT codigo, name FROM stores WHERE id = ?', (loja_id,))
                row = cur.fetchone()
                conn.close()
                if row:
                    store_label = f"{row['codigo']}-{row['name']}"
                else:
                    store_label = f"Loja {loja_id}"
            except Exception:
                store_label = f"Loja {loja_id}"
        detalhes = f"[{tipo}] {mensagem}"
        # device_id e device_name ficam None para logs de importação
        add_audit_log(None, store_label, status, detalhes)
        print(f"[{datetime.now()}] {store_label} - {tipo} - Sucesso: {sucesso} - {mensagem}")
    except Exception:
        # fallback de print apenas
        print(f"[{datetime.now()}] IMPORT_LOG (falha ao salvar em audit_log): {mensagem}")

# Exemplo de execução manual
if __name__ == '__main__':
    importar_todos_precos()
