# Remove uma configuração de integração por ID
def delete_integration(integration_id: int):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('DELETE FROM integration_configs WHERE id = ?', (integration_id,))
    conn.commit()
    conn.close()
"""
Módulo: integration_config.py
----------------------------
Responsável por gerenciar as configurações de integração de preços do sistema PreciX.
Permite cadastrar, editar e consultar integrações por loja ou globalmente, suportando múltiplos tipos:
- Arquivo (ex: TXT/CSV por loja ou global)
- API (REST, SOAP, etc)
- Banco de Dados (view/tabela externa)

Cada configuração pode ser associada a uma loja específica (loja_id) ou ser global (loja_id=None).

Estrutura da tabela (integration_configs):
- id: identificador único
- loja_id: id da loja (ou NULL para global)
- tipo: tipo de integração ('arquivo', 'api', 'banco')
- parametro1: caminho do arquivo, endpoint, string de conexão, etc
- parametro2: parâmetro adicional (token, diretório, etc)
- ativo: se a integração está ativa (1) ou não (0)

Funções principais:
- create_integration_table(): cria a tabela se não existir
- upsert_integration(): adiciona ou atualiza uma configuração
- get_integrations(): consulta integrações cadastradas

Exemplo de uso:
---------------
# Cria a tabela (executado automaticamente no backend)
create_integration_table()

# Adiciona integração por arquivo para a loja 1
upsert_integration(1, 'arquivo', 'precos_loja_001.txt', '/import/loja_001/')

# Adiciona integração global por API
upsert_integration(None, 'api', 'https://api.exemplo.com/precos', 'token123')

# Consulta todas as integrações
configs = get_integrations()

# Consulta integrações de uma loja específica
configs_loja1 = get_integrations(1)

Este módulo é utilizado pelos endpoints REST do backend para permitir configuração via painel admin.
Todas as funções são comentadas para facilitar manutenção e integração futura.
"""

import sqlite3
from typing import Optional, List, Dict

DB_PATH = r'd:\Sonda\Precix\sync\products.db'  # Caminho do banco de dados principal

# Criação da tabela de integrações, se não existir
def create_integration_table():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS integration_configs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            loja_id INTEGER,
            tipo TEXT NOT NULL, -- arquivo, api, banco
            parametro1 TEXT,    -- caminho do arquivo, endpoint, string de conexão
            parametro2 TEXT,    -- token, diretório, etc
            layout TEXT,        -- layout do arquivo de preços (JSON ou texto)
            ativo INTEGER DEFAULT 1,
            UNIQUE(loja_id, tipo)
        )
    ''')
    conn.commit()
    conn.close()

# Adiciona ou atualiza uma configuração de integração
def upsert_integration(loja_id: Optional[int], tipo: str, parametro1: str, parametro2: str, ativo: int = 1, layout: Optional[str] = None):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('''
        INSERT INTO integration_configs (loja_id, tipo, parametro1, parametro2, layout, ativo)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(loja_id, tipo) DO UPDATE SET
            parametro1=excluded.parametro1,
            parametro2=excluded.parametro2,
            layout=excluded.layout,
            ativo=excluded.ativo
    ''', (loja_id, tipo, parametro1, parametro2, layout, ativo))
    conn.commit()
    conn.close()

# Consulta integrações cadastradas
def get_integrations(loja_id: Optional[int] = None) -> List[Dict]:
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    if loja_id is not None:
        cur.execute('SELECT * FROM integration_configs WHERE loja_id = ?', (loja_id,))
    else:
        cur.execute('SELECT * FROM integration_configs')
    rows = cur.fetchall()
    conn.close()
    # Converte para lista de dicionários
    columns = ['id', 'loja_id', 'tipo', 'parametro1', 'parametro2', 'layout', 'ativo']
    return [dict(zip(columns, row)) for row in rows]

# Exemplo de uso (remover em produção)
if __name__ == '__main__':
    create_integration_table()
    upsert_integration(1, 'arquivo', 'precos_loja_001.txt', '/import/loja_001/')
    upsert_integration(None, 'api', 'https://api.exemplo.com/precos', 'token123')
    print(get_integrations())
