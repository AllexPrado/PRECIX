import psycopg2
import psycopg2.extras
import os
from typing import Optional, Dict
import logging
import bcrypt  # Adicionado para hash de senha
import tempfile
from pathlib import Path
from datetime import datetime

logging.basicConfig(level=logging.INFO)

# Configuração do PostgreSQL

PG_HOST = os.environ.get('PRECIX_PG_HOST', 'localhost')
PG_PORT = os.environ.get('PRECIX_PG_PORT', '5432')
PG_DB = os.environ.get('PRECIX_PG_DB', 'precix')
PG_USER = os.environ.get('PRECIX_PG_USER')
PG_PASS = os.environ.get('PRECIX_PG_PASS')

# Validação obrigatória de usuário e senha
if not PG_USER or not PG_PASS:
    raise RuntimeError("Variáveis de ambiente PRECIX_PG_USER e PRECIX_PG_PASS são obrigatórias. Configure no .env ou ambiente do sistema.")

# Força client encoding UTF-8 no libpq
os.environ.setdefault('PGCLIENTENCODING', 'UTF8')

_DUMMY_PASSFILE_PATH = None

def _ensure_dummy_passfile():
    """Cria um passfile dummy somente ASCII para evitar leitura de .pgpass com encoding inválido."""
    global _DUMMY_PASSFILE_PATH
    if _DUMMY_PASSFILE_PATH and Path(_DUMMY_PASSFILE_PATH).exists():
        return _DUMMY_PASSFILE_PATH
    try:
        tmpdir = Path(tempfile.gettempdir())
        pf = tmpdir / 'precix_dummy_pgpass'
        # Linha dummy (host:port:db:user:password) - todos ASCII
        pf.write_text(f"{PG_HOST}:{PG_PORT}:{PG_DB}:{PG_USER}:{PG_PASS}\n", encoding='utf-8')
        _DUMMY_PASSFILE_PATH = str(pf)
    except Exception as e:
        logging.warning(f"[DB] Falha ao criar dummy passfile: {e}")
    return _DUMMY_PASSFILE_PATH

def get_db_connection():
    """Abre conexão PostgreSQL com diagnóstico detalhado de encoding.

    Se ocorrer UnicodeDecodeError, loga os parâmetros em forma hex para inspeção.
    """
    # Garante passfile dummy seguro (evita .pgpass legado possivelmente Latin-1)
    passfile = _ensure_dummy_passfile()
    if passfile:
        os.environ['PGPASSFILE'] = passfile
    # Isola o libpq de arquivos/serviços externos com encoding duvidoso
    try:
        import tempfile as _tf
        os.environ.setdefault('PGSYSCONFDIR', _tf.gettempdir())
    except Exception:
        pass
    for _var in ('PGSERVICE', 'PGSERVICEFILE'):
        try:
            if _var in os.environ:
                os.environ.pop(_var, None)
        except Exception:
            pass
    params = {
        'host': PG_HOST,
        'port': PG_PORT,
        'dbname': PG_DB,
        'user': PG_USER,
        'password': PG_PASS,
        # Usa options para setar client_encoding pois client_encoding direto não é parâmetro oficial
        'options': '-c client_encoding=UTF8',
    }
    def _sanitize(v: str):
        if v is None:
            return v
        s = str(v)
        cleaned = ''.join(ch for ch in s if ord(ch) < 128)
        return cleaned
    sanitized = {}
    changed = False
    for k, v in params.items():
        sv = _sanitize(v)
        sanitized[k] = sv
        if sv != v:
            changed = True
            logging.warning(f"[DB][sanitize] Removidos caracteres não-ASCII em '{k}': original={repr(v)} -> usado={repr(sv)}")
    if changed:
        params = sanitized
    # Validação: todos devem ser str ASCII/UTF-8 codificáveis
    for k, v in params.items():
        try:
            if v is None:
                continue
            _ = str(v).encode('utf-8')
        except Exception as e:
            logging.error(f"[DB][param-encoding] Falha ao codificar {k}={repr(v)} -> {e}")
    # Temporarily scrub PG* env vars and force neutral locale to avoid libpq decoding surprises
    _backup_env = {}
    try:
        # Backup and remove PG* except the ones we just set/need
        for k in list(os.environ.keys()):
            ku = k.upper()
            if ku.startswith('PG') and ku not in ('PGCLIENTENCODING', 'PGPASSFILE', 'PGSYSCONFDIR'):
                _backup_env[k] = os.environ.pop(k)
        # Force neutral C locale for the connect call
        for loc in ('LC_ALL', 'LANG'):
            if loc in os.environ:
                _backup_env[loc] = os.environ[loc]
        os.environ['LC_ALL'] = 'C'
        os.environ['LANG'] = 'C'
    except Exception:
        pass
    try:
        logging.info('[DB][connect] Tentando conexão primária UTF8...')
        conn = psycopg2.connect(**params)
        conn.autocommit = True
        return conn
    except UnicodeDecodeError as ue:
        # Debug aprofundado
        debug_lines = ["[DB][connect][UnicodeDecodeError] Falha na tentativa UTF8. Parâmetros (hex):"]
        for k, v in params.items():
            sv = str(v)
            hex_repr = ' '.join(f"{ord(c):02x}" for c in sv)
            debug_lines.append(f"  {k}='{sv}' (hex: {hex_repr})")
        logging.error('\n'.join(debug_lines))
        logging.warning('[DB][connect] Fallback: tentando conexão com PGCLIENTENCODING=LATIN1 e depois forçando UTF8...')
        try:
            os.environ['PGCLIENTENCODING'] = 'LATIN1'
            # Isola configs externas
            os.environ.setdefault('PGSYSCONFDIR', tempfile.gettempdir())
            alt_params = dict(params)
            # Remove options para evitar forçar UTF8 antes de conectar
            alt_params.pop('options', None)
            conn = psycopg2.connect(**alt_params)
            conn.set_client_encoding('UTF8')
            conn.autocommit = True
            logging.info('[DB][connect] Conectado via fallback LATIN1->UTF8.')
            return conn
        except Exception as inner:
            logging.error(f'[DB][connect][fallback] Falha também no fallback: {inner}')
            print("[DB][connect][RAW EXCEPTION]", repr(inner))
            raise ue
    except Exception as e:
        logging.error(f"[DB][connect] Erro genérico na conexão: {e}")
        raise
    finally:
        # Restore environment
        try:
            for k, v in _backup_env.items():
                if v is None:
                    os.environ.pop(k, None)
                else:
                    os.environ[k] = v
        except Exception:
            pass

# Função para obter status do sistema (quantidade de produtos e última sincronização)
def get_system_status():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT COUNT(*) FROM products')
    total_products = cur.fetchone()[0]
    # Última sincronização: pega o maior last_sync dos devices
    cur.execute('SELECT MAX(last_sync) FROM devices WHERE last_sync IS NOT NULL')
    last_sync = cur.fetchone()[0]
    cur.close()
    conn.close()
    return {
        'total_products': total_products,
        'last_sync': last_sync
    }

"""Removido código legado SQLite (DB_PATH, _resolve_db_path, segunda get_db_connection)."""

# Utilitário: normaliza identificadores de agente para evitar duplicidade por case/espacos
def normalize_agent_id(agent_id: str) -> str:
    try:
        return str(agent_id or '').strip().lower()
    except Exception:
        return ''

def get_product_by_barcode(barcode: str) -> Optional[Dict]:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    try:
        cur.execute('SELECT barcode, name, price, promo FROM products WHERE barcode = %s', (barcode,))
        row = cur.fetchone()
        if row:
            try:
                return dict(row)
            except Exception as e:
                logging.error(f"[DB][get_product_by_barcode] Erro ao decodificar linha: {row} - {e}")
                return None
        return None
    except Exception as e:
        logging.error(f"[DB][get_product_by_barcode] Erro na query: {e}")
        return None
    finally:
        cur.close()
        conn.close()


def upsert_products(products: list):
    """Insere ou atualiza produtos em lote.

    products: lista de dicionários com, pelo menos, 'barcode' e 'price'.
    Retorna um dicionário com contadores: inserted, updated, ignored.
    """
    if not products:
        return {'inserted': 0, 'updated': 0, 'ignored': 0}
    conn = get_db_connection()
    cur = conn.cursor()
    inserted = 0
    updated = 0
    ignored = 0
    for p in products:
        try:
            if not isinstance(p, dict):
                ignored += 1
                continue
            barcode = str(p.get('barcode') or p.get('codigo') or '').strip()
            if not barcode:
                ignored += 1
                continue
            name = p.get('name') or p.get('nome') or ''
            try:
                price = float(p.get('price') if p.get('price') is not None else 0)
            except Exception:
                price = 0.0
            promo = p.get('promo') or p.get('promocao') or None
            # detecta presença
            cur.execute('SELECT 1 FROM products WHERE barcode = %s', (barcode,))
            if cur.fetchone():
                cur.execute('UPDATE products SET name = %s, price = %s, promo = %s WHERE barcode = %s', (name, price, promo, barcode))
                updated += 1
            else:
                cur.execute('INSERT INTO products (barcode, name, price, promo) VALUES (%s, %s, %s, %s)', (barcode, name, price, promo))
                inserted += 1
        except Exception:
            ignored += 1
            continue
    conn.commit()
    conn.close()
    return {'inserted': inserted, 'updated': updated, 'ignored': ignored}


# Função para inicializar o banco (criação das tabelas)
def init_db():
    # No PostgreSQL, o schema deve ser criado e migrado via scripts SQL externos.
    # Esta função pode ser usada apenas para logar a conexão.
    conn = get_db_connection()
    logging.info(f"[DB] Conectado ao banco PostgreSQL: {PG_DB} em {PG_HOST}:{PG_PORT}")
    conn.close()

# Função para popular o banco com dados de exemplo
def populate_example_data():
    conn = get_db_connection()
    cur = conn.cursor()
    # Loga antes de inserir admin
    cur.execute('SELECT * FROM admin_users')
    logging.info(f"[DB] Usuários admin antes de popular: {cur.fetchall()}")
    example_products = [
        ('7891234567890', 'Arroz Sonda 5kg', 22.99, 'Leve 2 pague 1'),
        ('7899876543210', 'Feijão Preto 1kg', 8.49, None),
        ('7891112223334', 'Óleo de Soja 900ml', 6.99, 'Desconto 10%'),
        ('7895556667778', 'Açúcar Refinado 1kg', 4.59, None),
        ('7894443332221', 'Café Tradicional 500g', 13.99, 'Brinde Caneca'),
    ]
    for prod in example_products:
        try:
            cur.execute('INSERT INTO products (barcode, name, price, promo) VALUES (%s, %s, %s, %s) ON CONFLICT (barcode) DO NOTHING', prod)
        except Exception:
            pass
    # Usuário admin padrão: admin / admin123
    try:
        cur.execute('INSERT INTO admin_users (username, password) VALUES (%s, %s) ON CONFLICT (username) DO NOTHING', ('admin', 'admin123'))
    except Exception:
        pass
    # Loga depois de inserir admin
    cur.execute('SELECT * FROM admin_users')
    logging.info(f"[DB] Usuários admin após popular: {cur.fetchall()}")
    conn.commit()
    conn.close()

# Função utilitária para gerar hash de senha
# Documentação: https://pypi.org/project/bcrypt/
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
    except Exception:
        return False

# Função para autenticar usuário admin
# Compatível com senhas antigas (texto puro) e novas (hash)
def authenticate_admin(username: str, password: str) -> bool:
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM admin_users WHERE username = %s', (username,))
    user = cur.fetchone()
    conn.close()
    if not user:
        return False
    stored = user['password']
    # Compatibilidade: aceita hash bcrypt ou senha texto puro
    if stored.startswith('$2b$') or stored.startswith('$2a$'):
        return verify_password(password, stored)
    else:
        return password == stored


# Funções de auditoria/log (definidas primeiro para evitar erros de import)
def add_audit_log(device_id: int = None, device_name: str = None, action: str = '', details: str = ''):
    from datetime import datetime
    conn = get_db_connection()
    cur = conn.cursor()
    timestamp = datetime.utcnow().isoformat()
    cur.execute('INSERT INTO audit_log (timestamp, device_id, device_name, action, details) VALUES (%s, %s, %s, %s, %s)', 
                (timestamp, device_id, device_name, action, details))
    conn.commit()
    conn.close()

def get_audit_logs(limit: int = 50):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM audit_log ORDER BY timestamp DESC LIMIT %s', (limit,))
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_device_audit_logs(device_id: int, limit: int = 20):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM audit_log WHERE device_id = %s ORDER BY timestamp DESC LIMIT %s', (device_id, limit))
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]


# CRUD de lojas
def get_all_stores():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM stores ORDER BY codigo')
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def add_store(name: str, status: str = 'ativo'):
    conn = get_db_connection()
    cur = conn.cursor()
    # Novo: exige código
    raise Exception('Use add_store_with_code(codigo, name, status)')

def add_store_with_code(codigo: str, name: str, status: str = 'ativo'):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO stores (codigo, name, status) VALUES (%s, %s, %s)', (codigo, name, status))
    conn.commit()
    conn.close()

def update_store(store_id: int, name: str, status: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE stores SET name = %s, status = %s WHERE id = %s', (name, status, store_id))
    conn.commit()
    conn.close()

def update_store_code(store_id: int, codigo: str, name: str, status: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE stores SET codigo = %s, name = %s, status = %s WHERE id = %s', (codigo, name, status, store_id))
    conn.commit()
    conn.close()
def get_store_by_code(codigo: str):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM stores WHERE codigo = %s', (codigo,))
    row = cur.fetchone()
    conn.close()
    return dict(row) if row else None
    conn.commit()
    conn.close()

def delete_store(store_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    logging.info(f"[DB] Deletando loja id={store_id}")
    cur.execute('DELETE FROM stores WHERE id = %s', (store_id,))
    conn.commit()
    conn.close()

# CRUD de equipamentos
def get_all_devices():
    from datetime import datetime, timedelta
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM devices')
    rows = cur.fetchall()
    conn.close()
    devices = []
    from datetime import timezone
    now = datetime.now(timezone.utc).replace(microsecond=0)
    for row in rows:
        device = dict(row)
        last_sync = device.get('last_sync')
        dt = None
        if last_sync:
            try:
                # Aceita datetime, string ISO, string sem microsegundos, string com timezone, etc
                if isinstance(last_sync, str):
                    try:
                        dt = datetime.fromisoformat(last_sync)
                    except Exception:
                        # Tenta remover microsegundos se houver
                        if '.' in last_sync:
                            base, rest = last_sync.split('.', 1)
                            rest = rest.split('+')[0].split('Z')[0].split('-')[0]
                            last_sync_clean = base
                            if '+' in last_sync:
                                last_sync_clean += '+' + last_sync.split('+')[1]
                            elif 'Z' in last_sync:
                                last_sync_clean += 'Z'
                            dt = datetime.fromisoformat(last_sync_clean)
                        else:
                            raise
                elif hasattr(last_sync, 'isoformat'):
                    dt = last_sync
                if dt:
                    if dt.tzinfo is None:
                        dt = dt.replace(tzinfo=timezone.utc)
                    dt = dt.astimezone(timezone.utc).replace(microsecond=0)
                    diff = (now - dt).total_seconds()
                    device['online'] = int(diff < 120)  # Padronizado para 120s como agentes
                    logging.debug(f"[ONLINE-CHECK] Device {device.get('identifier')} diff={diff}s now={now.isoformat()} last_sync={dt.isoformat()} online={device['online']}")
                else:
                    device['online'] = 0
            except Exception as e:
                logging.warning(f"[ONLINE-CHECK] Erro ao calcular online para {device.get('identifier')}: {e} | last_sync={last_sync}")
                device['online'] = 0
        else:
            device['online'] = 0
        # Garante que online seja sempre 0 ou 1
        device['online'] = int(bool(device.get('online', 0)))
        devices.append(device)
    return devices

def add_device(store_id: int, name: str, status: str = 'ativo', last_sync: str = None, online: int = 0, identifier: str = None):
    conn = get_db_connection()
    cur = conn.cursor()
    # Usa o identifier fornecido ou gera um novo se não vier
    if not identifier:
        import uuid
        identifier = str(uuid.uuid4())
    cur.execute('INSERT INTO devices (store_id, name, status, last_sync, online, identifier) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id', (store_id, name, status, last_sync, online, identifier))
    device_id = cur.fetchone()[0]
    conn.commit()
    conn.close()
    # Log de auditoria
    add_audit_log(device_id, name, 'DEVICE_CREATED', f'Dispositivo criado na loja ID {store_id}')
    return device_id

def update_device(device_id: int, name: str = None, status: str = None, last_sync: str = None, online: int = None, store_id: int = None, identifier: str = None):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    # Busca valores atuais
    cur.execute('SELECT name, status, store_id, identifier FROM devices WHERE id = %s', (device_id,))
    row = cur.fetchone()
    current_name = row['name'] if row else ''
    current_status = row['status'] if row else ''
    current_store_id = row['store_id'] if row else None
    current_identifier = row['identifier'] if row else None
    # Permite atualizar identifier para vazio ou null explicitamente
    if identifier == "null":
        identifier = None
    # Se for para atualizar o identifier, verifica unicidade (não pode duplicar)
    if identifier not in (None, '', current_identifier):
        conn_check = get_db_connection()
        cur_check = conn_check.cursor()
        cur_check.execute('SELECT id FROM devices WHERE identifier = %s', (identifier,))
        found = cur_check.fetchone()
        conn_check.close()
        if found and (found[0] if not isinstance(found, dict) else found['id']) != device_id:
            raise Exception(f"Já existe outro equipamento com o identificador {identifier}.")
    # Nunca remove ou sobrescreve identifier de outro device
    name = name if name not in (None, '') else current_name
    status = status if status not in (None, '') else current_status
    store_id = store_id if store_id not in (None, '') else current_store_id
    if identifier is None:
        identifier = current_identifier
    elif identifier == '':
        identifier = ''
    else:
        identifier = identifier
    if online is not None:
        cur.execute('UPDATE devices SET name = %s, status = %s, last_sync = %s, online = %s, store_id = %s, identifier = %s WHERE id = %s', (name, status, last_sync, online, store_id, identifier, device_id))
    else:
        cur.execute('UPDATE devices SET name = %s, status = %s, last_sync = %s, store_id = %s, identifier = %s WHERE id = %s', (name, status, last_sync, store_id, identifier, device_id))
    conn.commit()
    conn.close()
# Novo endpoint: atualizar status online (heartbeat)
def set_device_online(identifier: str):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT id FROM devices WHERE identifier = %s', (identifier,))
    row = cur.fetchone()
    from datetime import datetime
    now = datetime.utcnow().isoformat()
    if row:
        device_id = row['id']
        # Atualiza apenas last_sync e online, preservando nome/status e identifier
        update_device(device_id, last_sync=now, online=1)
        logging.info(f"[HEARTBEAT] Device online: id={device_id}, identifier={identifier}")
    else:
        # Não existe device com esse identifier, cria novo
        logging.warning(f"[HEARTBEAT] Device NOT FOUND for identifier={identifier}. Criando novo device.")
        default_name = f"Novo Equipamento {identifier[:8]}"
        cur.execute('SELECT id FROM stores ORDER BY id LIMIT 1')
        store_row = cur.fetchone()
        default_store_id = (store_row['id'] if store_row else None)
        add_device(default_store_id, default_name, identifier=identifier, last_sync=now, online=1)
    conn.close()

def set_device_offline(device_id: int):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT name FROM devices WHERE id = %s', (device_id,))
    result = cur.fetchone()
    device_name = result['name'] if result else f'Device {device_id}'
    conn.close()
    update_device(device_id, name='', status='', last_sync=None, online=0)
    add_audit_log(device_id, device_name, 'DEVICE_OFFLINE', 'Dispositivo ficou offline')

def delete_device(device_id: int):
    # Busca nome do device antes de deletar
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    
    try:
        cur.execute('SELECT name FROM devices WHERE id = %s', (device_id,))
        result = cur.fetchone()
        device_name = result['name'] if result else f'Device {device_id}'
        logging.info(f"[DB] Deletando device id={device_id} nome={device_name}")
        
        # Primeiro adiciona o log de auditoria antes de deletar o device
        cur.execute('INSERT INTO audit_log (timestamp, device_id, device_name, action, details) VALUES (%s, %s, %s, %s, %s)', 
                   (datetime.utcnow(), device_id, device_name, 'DEVICE_DELETED', 'Dispositivo removido do sistema'))
        
        # Depois deleta todos os logs de auditoria relacionados ao device
        cur.execute('DELETE FROM audit_log WHERE device_id = %s', (device_id,))
        
        # Finalmente deleta o device
        cur.execute('DELETE FROM devices WHERE id = %s', (device_id,))
        
        conn.commit()
        logging.info(f"[DB] Device {device_id} ({device_name}) deletado com sucesso")
        
    except Exception as e:
        conn.rollback()
        logging.error(f"[DB] Erro ao deletar device {device_id}: {e}")
        raise e
    finally:
        conn.close()


# Helpers de devices
def get_device_by_identifier(identifier: str) -> Optional[Dict]:
    """Retorna um device pelo identifier ou None."""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        cur.execute('SELECT * FROM devices WHERE identifier = %s', (identifier,))
        row = cur.fetchone()
        return dict(row) if row else None
    finally:
        conn.close()

def update_device_catalog_sync(identifier: str, total_products: int = 0, timestamp: Optional[str] = None):
    """Atualiza métricas de catálogo de um device PWA.
    - Garante last_sync/online via set_device_online
    - Tenta atualizar catalog_count e last_catalog_sync (se colunas existirem). Ignora se não existirem.
    """
    from datetime import datetime as _dt
    ts = timestamp or _dt.utcnow().isoformat()
    # Garante presença do device + last_sync/online
    try:
        set_device_online(identifier)
    except Exception:
        pass
    # Atualiza métricas opcionais
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        # Primeiro tenta com last_catalog_sync/catalog_count
        try:
            cur.execute(
                'UPDATE devices SET last_catalog_sync = %s, catalog_count = %s WHERE identifier = %s',
                (ts, int(total_products or 0), identifier)
            )
            conn.commit()
        except Exception:
            # Fallback: atualiza apenas last_sync
            try:
                cur.execute('UPDATE devices SET last_sync = %s WHERE identifier = %s', (ts, identifier))
                conn.commit()
            except Exception:
                pass
    finally:
        try:
            conn.close()
        except Exception:
            pass


# Exportador de produtos para .txt
def export_products_to_txt(txt_path: str = 'produtos.txt'):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT barcode, name, price, promo FROM products')
    rows = cur.fetchall()
    conn.close()
    with open(txt_path, 'w', encoding='utf-8') as f:
        for row in rows:
            barcode = row['barcode']
            name = row['name']
            price = row['price']
            promo = row['promo'] if row['promo'] else ''
            f.write(f'{barcode};{name};{price};{promo}\n')
    return txt_path

def debug_list_device_identifiers():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT id, identifier, name FROM devices')
    rows = cur.fetchall()
    conn.close()
    for row in rows:
        logging.info(f"[DEBUG] Device: id={row['id']}, identifier={row['identifier']}, name={row['name']}")

def upsert_agent_status(agent_id: str, loja_codigo: str = None, loja_nome: str = None, status: str = None, last_update: str = None, ip: str = None):
    try:
        from datetime import datetime, timezone
        agent_id = normalize_agent_id(agent_id)
        # Força uso de UTC para last_update
        if not last_update:
            last_update = datetime.utcnow().replace(tzinfo=timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
        else:
            # Tenta converter para UTC se vier em outro formato
            try:
                dt = None
                for fmt in ('%Y-%m-%d %H:%M:%S', '%Y-%m-%dT%H:%M:%S', '%d/%m/%Y, %H:%M:%S'):
                    try:
                        dt = datetime.strptime(str(last_update), fmt)
                        break
                    except Exception:
                        continue
                if dt:
                    last_update = dt.astimezone(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
            except Exception:
                pass
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('''
            INSERT INTO agents_status (agent_id, loja_codigo, loja_nome, status, last_update, ip)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (agent_id) DO UPDATE SET
                loja_codigo=EXCLUDED.loja_codigo,
                loja_nome=EXCLUDED.loja_nome,
                status=EXCLUDED.status,
                last_update=EXCLUDED.last_update,
                ip=EXCLUDED.ip
        ''', (agent_id, loja_codigo, loja_nome, status, last_update, ip))
        conn.commit()
        # Diagnóstico: verifica múltiplos registros por IP/agent_id
        cur.execute('SELECT COUNT(*) FROM agents_status WHERE agent_id = %s', (agent_id,))
        count_id = cur.fetchone()[0]
        if count_id > 1:
            logging.warning(f"[DB][upsert_agent_status] Múltiplos registros para agent_id={agent_id}")
        if ip:
            cur.execute('SELECT COUNT(*) FROM agents_status WHERE ip = %s', (ip,))
            count_ip = cur.fetchone()[0]
            if count_ip > 1:
                logging.warning(f"[DB][upsert_agent_status] Múltiplos registros para ip={ip}")
        conn.close()
    except Exception as e:
        logging.error(f"[DB][upsert_agent_status] Erro ao inserir/atualizar agente: {e}")
        raise

def replace_agent_stores(agent_id: str, lojas: list):
    """Substitui a lista de lojas vinculadas a um agente."""
    try:
        agent_id = normalize_agent_id(agent_id)
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM agent_stores WHERE agent_id = %s', (agent_id,))
        for lj in lojas or []:
            if not isinstance(lj, dict):
                continue
            codigo = (lj.get('codigo') or '').strip()
            nome = (lj.get('nome') or lj.get('name') or '').strip()
            if not codigo and not nome:
                continue
            cur.execute(
                'INSERT INTO agent_stores (agent_id, loja_codigo, loja_nome) VALUES (%s, %s, %s) '
                'ON CONFLICT (agent_id, loja_codigo) DO UPDATE SET loja_nome = EXCLUDED.loja_nome',
                (agent_id, codigo or None, nome or None)
            )
        conn.commit()
        conn.close()
    except Exception as e:
        logging.error(f"[DB][replace_agent_stores] {e}")
        raise

def get_agent_stores(agent_id: str):
    agent_id = normalize_agent_id(agent_id)
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT loja_codigo, loja_nome FROM agent_stores WHERE agent_id = %s ORDER BY loja_codigo', (agent_id,))
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_all_agents_status():
    from datetime import datetime, timezone
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM agents_status')
    rows = cur.fetchall()
    conn.close()
    # Normaliza agent_id no retorno para consumo unificado
    out = []
    now_utc = datetime.utcnow().replace(tzinfo=timezone.utc)
    for row in rows:
        d = dict(row)
        d['agent_id'] = normalize_agent_id(d.get('agent_id'))
        # Diagnóstico: loga atraso de heartbeat
        lu = d.get('last_update')
        try:
            dt = None
            for fmt in ('%Y-%m-%d %H:%M:%S', '%Y-%m-%dT%H:%M:%S', '%d/%m/%Y, %H:%M:%S'):
                try:
                    dt = datetime.strptime(str(lu), fmt)
                    break
                except Exception:
                    continue
            if dt:
                dt = dt.replace(tzinfo=timezone.utc)
                diff = (now_utc - dt).total_seconds()
                if diff > 120:
                    logging.warning(f"[DB][get_all_agents_status] agent_id={d['agent_id']} atrasado {diff:.1f}s (offline)")
        except Exception:
            pass
        out.append(d)
    return out

def delete_agent_status(agent_id: str):
    agent_id = normalize_agent_id(agent_id)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM agents_status WHERE agent_id = %s', (agent_id,))
    conn.commit()
    conn.close()

def update_agent_status(agent_id: str, loja_codigo: str = None, loja_nome: str = None, status: str = None, ip: str = None, last_update: str = None):
    agent_id = normalize_agent_id(agent_id)
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    # Busca valores atuais
    cur.execute('SELECT loja_codigo, loja_nome, status, last_update, ip FROM agents_status WHERE agent_id = %s', (agent_id,))
    row = cur.fetchone()
    if not row:
        # Se não existir, cria com os dados fornecidos
        conn.close()
        upsert_agent_status(agent_id, loja_codigo=loja_codigo, loja_nome=loja_nome, status=status, last_update=last_update, ip=ip)
        return
    current = dict(row)
    new_loja_codigo = loja_codigo if loja_codigo is not None else current.get('loja_codigo')
    new_loja_nome = loja_nome if loja_nome is not None else current.get('loja_nome')
    new_status = status if status is not None else current.get('status')
    new_last_update = last_update if last_update is not None else current.get('last_update')
    new_ip = ip if ip is not None else current.get('ip')
    cur.execute('''
            UPDATE agents_status
                 SET loja_codigo = %s, loja_nome = %s, status = %s, last_update = %s, ip = %s
             WHERE agent_id = %s
    ''', (new_loja_codigo, new_loja_nome, new_status, new_last_update, new_ip, agent_id))
    conn.commit()
    conn.close()

def _parse_dt(dt_str: str):
    from datetime import datetime as _dt
    if not dt_str:
        return None
    for fmt in ('%Y-%m-%d %H:%M:%S', '%Y-%m-%dT%H:%M:%S', '%d/%m/%Y, %H:%M:%S'):
        try:
            return _dt.strptime(str(dt_str), fmt)
        except Exception:
            continue
    # try ISO flexible
    try:
        return _dt.fromisoformat(str(dt_str))
    except Exception:
        return None

def dedupe_agents():
    """Normaliza e deduplica registros de agentes e referencias.
    - Canonicaliza agent_id para lower().strip()
    - Mantem apenas 1 registro por agent_id (o de last_update mais recente)
    - Migra agent_stores e agent_devices para o agent_id canônico
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cur.execute('SELECT agent_id, loja_codigo, loja_nome, status, last_update, ip FROM agents_status')
        rows = cur.fetchall()
        # Agrupa por id normalizado
        groups = {}
        for row in rows:
            raw_id = row['agent_id']
            norm = normalize_agent_id(raw_id)
            groups.setdefault(norm, []).append(dict(row))
        for norm_id, lst in groups.items():
            if norm_id == '':
                # limpa entradas inválidas
                cur.execute("DELETE FROM agents_status WHERE agent_id IS NULL OR TRIM(agent_id) = ''")
                continue
            # Seleciona registro vencedor pelo last_update mais recente
            best = None
            best_dt = None
            for rec in lst:
                dt = _parse_dt(rec.get('last_update'))
                if dt and (best_dt is None or dt > best_dt):
                    best_dt = dt
                    best = rec
                elif best is None:
                    best = rec
            # Garante registro canônico
            if best:
                upsert_agent_status(norm_id, best.get('loja_codigo'), best.get('loja_nome'), best.get('status'), best.get('last_update'), best.get('ip'))
            # Migra children e remove duplicados com ids divergentes
            raw_values = set([r.get('agent_id') for r in lst if r.get('agent_id')])
            for raw in list(raw_values):
                if not raw or normalize_agent_id(raw) == norm_id:
                    continue
                # Atualiza agent_stores
                cur.execute('UPDATE agent_stores SET agent_id = %s WHERE agent_id = %s', (norm_id, raw))
                # Atualiza agent_devices
                cur.execute('UPDATE agent_devices SET agent_id = %s WHERE agent_id = %s', (norm_id, raw))
                # Remove antigo em agents_status
                cur.execute('DELETE FROM agents_status WHERE agent_id = %s', (raw,))
        conn.commit()
        conn.close()
    except Exception as e:
        logging.error(f"[DB][dedupe_agents] {e}")
        # não propaga para não derrubar startup

def _latest_agent_id_for_ip(ip: str):
    """Retorna (agent_id, last_update) mais recente para um IP, sem janela de tempo."""
    try:
        if not ip:
            return None, None
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cur.execute('SELECT agent_id, last_update FROM agents_status WHERE ip = %s', (ip,))
        rows = cur.fetchall()
        conn.close()
        if not rows:
            return None, None
        best_id = None
        best_dt = None
        for r in rows:
            dt = _parse_dt(r['last_update'])
            if dt and (best_dt is None or dt > best_dt):
                best_dt = dt
                best_id = normalize_agent_id(r['agent_id'])
        return best_id, best_dt
    except Exception as e:
        logging.error(f"[DB][_latest_agent_id_for_ip] {e}")
        return None, None

def dedupe_agents_by_ip():
    """
    Colapsa agentes com o mesmo IP em um único agent_id canônico (o mais recente),
    migrando agent_stores e agent_devices e removendo duplicados em agents_status.
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(
            "SELECT ip, COUNT(*) as c FROM agents_status "
            "WHERE ip IS NOT NULL AND TRIM(ip) <> '' "
            "GROUP BY ip HAVING COUNT(*) > 1"
        )
        groups = cur.fetchall()
        for g in groups:
            ip = g['ip'] if isinstance(g, dict) else g[0]
            # Determina id canônico
            cur.execute('SELECT agent_id, last_update FROM agents_status WHERE ip = %s', (ip,))
            rows = cur.fetchall()
            canonical_id = None
            best_dt = None
            for r in rows:
                dt = _parse_dt(r['last_update'] if isinstance(r, dict) else r[1])
                aid = normalize_agent_id(r['agent_id'] if isinstance(r, dict) else r[0])
                if dt and (best_dt is None or dt > best_dt):
                    best_dt = dt
                    canonical_id = aid
                elif canonical_id is None:
                    canonical_id = aid
            if not canonical_id:
                continue
            # Garante registro canônico atualizado
            cur.execute(
                'SELECT loja_codigo, loja_nome, status, last_update, ip FROM agents_status WHERE agent_id = %s',
                (canonical_id,)
            )
            best = cur.fetchone()
            if best:
                upsert_agent_status(
                    canonical_id,
                    (best['loja_codigo'] if isinstance(best, dict) else best[0]),
                    (best['loja_nome'] if isinstance(best, dict) else best[1]),
                    (best['status'] if isinstance(best, dict) else best[2]),
                    (best['last_update'] if isinstance(best, dict) else best[3]),
                    (best['ip'] if isinstance(best, dict) else best[4])
                )
            # Migra filhos e remove duplicados com segurança (evita UNIQUE conflicts)
            cur.execute('SELECT agent_id FROM agents_status WHERE ip = %s', (ip,))
            others = cur.fetchall()
            for r in others:
                raw = r['agent_id'] if isinstance(r, dict) else r[0]
                if not raw:
                    continue
                if normalize_agent_id(raw) == canonical_id:
                    continue
                # Copia lojas da origem para o canônico (upsert por (agent_id, loja_codigo))
                cur.execute('SELECT loja_codigo, loja_nome FROM agent_stores WHERE agent_id = %s', (raw,))
                stores_rows = cur.fetchall()
                for s in stores_rows or []:
                    sc = s if isinstance(s, dict) else {'loja_codigo': s[0], 'loja_nome': s[1]}
                    cur.execute(
                        'INSERT INTO agent_stores (agent_id, loja_codigo, loja_nome) VALUES (%s, %s, %s) '
                        'ON CONFLICT (agent_id, loja_codigo) DO UPDATE SET loja_nome = EXCLUDED.loja_nome',
                        (canonical_id, sc['loja_codigo'], sc['loja_nome'])
                    )
                # Copia devices da origem para o canônico (upsert por (agent_id, identifier))
                cur.execute('SELECT identifier, name, tipo, status, last_update, ip, last_catalog_sync, catalog_count, store_code, store_name FROM agent_devices WHERE agent_id = %s', (raw,))
                dev_rows = cur.fetchall()
                for d in dev_rows or []:
                    dd = d if isinstance(d, dict) else {
                        'identifier': d[0], 'name': d[1], 'tipo': d[2], 'status': d[3], 'last_update': d[4], 'ip': d[5],
                        'last_catalog_sync': d[6], 'catalog_count': d[7], 'store_code': d[8], 'store_name': d[9]
                    }
                    cur.execute(
                        'INSERT INTO agent_devices (agent_id, identifier, name, tipo, status, last_update, ip, last_catalog_sync, catalog_count, store_code, store_name) '
                        'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) '
                        'ON CONFLICT (agent_id, identifier) DO UPDATE SET '
                        'name=EXCLUDED.name, tipo=EXCLUDED.tipo, status=EXCLUDED.status, last_update=EXCLUDED.last_update, '
                        'ip=EXCLUDED.ip, last_catalog_sync=EXCLUDED.last_catalog_sync, catalog_count=EXCLUDED.catalog_count, '
                        'store_code=EXCLUDED.store_code, store_name=EXCLUDED.store_name',
                        (canonical_id, dd['identifier'], dd['name'], dd['tipo'], dd['status'], dd['last_update'], dd['ip'], dd['last_catalog_sync'], dd['catalog_count'], dd['store_code'], dd['store_name'])
                    )
                # Remove origem após copiar
                cur.execute('DELETE FROM agent_stores WHERE agent_id = %s', (raw,))
                cur.execute('DELETE FROM agent_devices WHERE agent_id = %s', (raw,))
                cur.execute('DELETE FROM agents_status WHERE agent_id = %s', (raw,))
        conn.commit()
        conn.close()
    except Exception as e:
        logging.error(f"[DB][dedupe_agents_by_ip] {e}")

def get_latest_agent_by_ip(ip: str):
    """Retorna o agent_id mais recente para um IP, sem limitar por janela de tempo."""
    aid, _ = _latest_agent_id_for_ip(ip)
    return aid

def get_recent_agent_by_ip(ip: str, window_seconds: int = 300) -> Optional[str]:
    """Retorna o agent_id mais recente para um IP dentro de uma janela de tempo.
    Usado para unificar múltiplos processos (GUI/Serviço) rodando na mesma máquina.
    """
    try:
        if not ip:
            return None
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute('SELECT agent_id, last_update FROM agents_status WHERE ip = %s', (ip,))
        rows = cur.fetchall()
        conn.close()
        if not rows:
            return None
        from datetime import datetime, timedelta
        now = datetime.now()
        best_id = None
        best_dt = None
        for r in rows:
            dt = _parse_dt(r['last_update'])
            if not dt:
                continue
            if (now - dt) <= timedelta(seconds=window_seconds):
                if best_dt is None or dt > best_dt:
                    best_dt = dt
                    best_id = normalize_agent_id(r['agent_id'])
        return best_id
    except Exception as e:
        logging.error(f"[DB][get_recent_agent_by_ip] {e}")
        return None

def get_all_users():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM admin_users')
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# --- Reatribuição de devices órfãos para o agente canônico por IP ---
def reassign_orphan_agent_devices_by_ip():
    """Move registros de agent_devices cujo agent_id não existe mais em agents_status
    para o agent_id canônico determinado pelo IP do próprio device.

    Estratégia segura: para cada device órfão, faz INSERT OR REPLACE no canônico
    e depois remove o registro antigo, evitando falhas de UNIQUE.
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        # Seleciona devices cujo agent_id não está presente em agents_status
        cur.execute(
            'SELECT d.agent_id, d.identifier, d.name, d.tipo, d.status, d.last_update, d.ip, '
            '       d.last_catalog_sync, d.catalog_count, d.store_code, d.store_name '
            '  FROM agent_devices d '
            '  LEFT JOIN agents_status a ON a.agent_id = d.agent_id '
            ' WHERE a.agent_id IS NULL'
        )
        rows = cur.fetchall()
        moved = 0
        for r in rows or []:
            ip = (r['ip'] or '').strip()
            if not ip:
                continue
            canonical_id = get_latest_agent_by_ip(ip)
            if not canonical_id:
                continue
            if normalize_agent_id(canonical_id) == normalize_agent_id(r['agent_id']):
                continue
            # Copia para o canônico e remove origem
            cur.execute(
                'INSERT INTO agent_devices '
                ' (agent_id, identifier, name, tipo, status, last_update, ip, last_catalog_sync, catalog_count, store_code, store_name) '
                ' VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) '
                'ON CONFLICT (agent_id, identifier) DO UPDATE SET '
                'name=EXCLUDED.name, tipo=EXCLUDED.tipo, status=EXCLUDED.status, last_update=EXCLUDED.last_update, '
                'ip=EXCLUDED.ip, last_catalog_sync=EXCLUDED.last_catalog_sync, catalog_count=EXCLUDED.catalog_count, store_code=EXCLUDED.store_code, store_name=EXCLUDED.store_name',
                (normalize_agent_id(canonical_id), r['identifier'], r['name'], r['tipo'], r['status'], r['last_update'], r['ip'], r['last_catalog_sync'], r['catalog_count'], r['store_code'], r['store_name'])
            )
            cur.execute('DELETE FROM agent_devices WHERE agent_id = %s AND identifier = %s', (r['agent_id'], r['identifier']))
            moved += 1
        if moved:
            conn.commit()
        conn.close()
    except Exception as e:
        logging.error(f"[DB][reassign_orphan_agent_devices_by_ip] {e}")

# --- Agent Devices (legacy) ---
def upsert_agent_device(agent_id: str, identifier: str, name: str = None, tipo: str = 'LEGACY', status: str = None, last_update: str = None, ip: str = None, last_catalog_sync: str = None, catalog_count: int = None, store_code: str = None, store_name: str = None):
    agent_id = normalize_agent_id(agent_id)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
    INSERT INTO agent_devices (agent_id, identifier, name, tipo, status, last_update, ip, last_catalog_sync, catalog_count, store_code, store_name)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (agent_id, identifier) DO UPDATE SET
            name=COALESCE(EXCLUDED.name, agent_devices.name),
            tipo=COALESCE(EXCLUDED.tipo, agent_devices.tipo),
            status=COALESCE(EXCLUDED.status, agent_devices.status),
            last_update=COALESCE(EXCLUDED.last_update, agent_devices.last_update),
            ip=COALESCE(EXCLUDED.ip, agent_devices.ip),
            last_catalog_sync=COALESCE(EXCLUDED.last_catalog_sync, agent_devices.last_catalog_sync),
            catalog_count=COALESCE(EXCLUDED.catalog_count, agent_devices.catalog_count),
            store_code=COALESCE(EXCLUDED.store_code, agent_devices.store_code),
            store_name=COALESCE(EXCLUDED.store_name, agent_devices.store_name)
    ''', (agent_id, identifier, name, tipo, status, last_update, ip, last_catalog_sync, catalog_count, store_code, store_name))
    conn.commit()
    conn.close()

def bulk_upsert_agent_devices(agent_id: str, devices: list):
    from datetime import datetime
    agent_id = normalize_agent_id(agent_id)
    # Usa horário local para compatibilidade com cálculo em get_agent_devices
    now = datetime.now().isoformat()
    for d in devices or []:
        upsert_agent_device(
            agent_id=agent_id,
            identifier=str(d.get('identifier') or '').strip(),
            name=d.get('name'),
            tipo=d.get('tipo') or 'LEGACY',
            status=d.get('status') or 'online',
            last_update=d.get('last_update') or now,
            ip=d.get('ip'),
            last_catalog_sync=d.get('last_catalog_sync'),
            catalog_count=d.get('catalog_count'),
            store_code=d.get('store_code') or d.get('loja') or d.get('loja_codigo'),
            store_name=d.get('store_name') or d.get('loja_nome')
        )

def get_agent_devices(agent_id: str):
    """Lista dispositivos de um agente com status calculado por frescor de last_update.
    Regra: online se last_update dentro da janela de 120s (mesma lógica do PWA/heartbeat).
    """
    agent_id = normalize_agent_id(agent_id)
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM agent_devices WHERE agent_id = %s ORDER BY name, identifier', (agent_id,))
    rows = cur.fetchall()
    conn.close()
    devices = []
    try:
        from datetime import datetime, timedelta
        # Usa horário local para comparar com last_update enviado pelo agente (também local)
        now = datetime.now()
    except Exception:
        now = None
    for row in rows:
        d = dict(row)
        # normaliza status textual legado
        raw_status = (d.get('status') or '').strip().lower()
        mapped = None
        if raw_status in ('ok', 'online', 'ligado', 'ativo', 'sucesso'):
            mapped = 'online'
        elif raw_status in ('desconhecido', 'unknown', 'offline', 'desligado', 'inativo', 'falha', 'erro'):
            mapped = 'offline'
        # Regra: se mapeado explicitamente como offline/unknown, respeita isso.
        # Caso contrário, usa frescor de last_update para decidir online/offline.
        final_status = mapped
        if final_status != 'offline':
            lu = d.get('last_update')
            if lu and now:
                try:
                    # aceita ISO 8601 ou 'YYYY-mm-dd HH:MM:SS'
                    try:
                        dt = datetime.fromisoformat(str(lu))
                    except Exception:
                        from datetime import datetime as _dt
                        dt = _dt.strptime(str(lu), '%Y-%m-%d %H:%M:%S')
                    final_status = 'online' if (now - dt) <= timedelta(seconds=120) else 'offline'
                except Exception:
                    pass
        # aplica cálculo (fallback para valor já salvo)
        d['status'] = final_status or (d.get('status') or 'offline')
        # opcional: booleano para facilitar UI futuras
        d['online'] = 1 if (d.get('status') or '').lower() == 'online' else 0
        devices.append(d)
    return devices

def delete_agent_device(agent_id: str, identifier: str):
    agent_id = normalize_agent_id(agent_id)
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM agent_devices WHERE agent_id = %s AND identifier = %s', (agent_id, identifier))
    conn.commit()
    conn.close()

def add_user(username: str, password: str, role: str = 'operador', store_id: int = None, permissoes: str = None):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO admin_users (username, password, role, store_id, permissoes) VALUES (%s, %s, %s, %s, %s) ON CONFLICT (username) DO NOTHING',
                (username, password, role, store_id, permissoes))
    conn.commit()
    conn.close()

def update_user(username: str, password: str = None, role: str = None, store_id: int = None, permissoes: str = None):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    # Busca valores atuais
    cur.execute('SELECT password, role, store_id, permissoes FROM admin_users WHERE username = %s', (username,))
    row = cur.fetchone()
    current_password = row['password'] if row else None
    current_role = row['role'] if row else None
    current_store_id = row['store_id'] if row else None
    current_permissoes = row['permissoes'] if row else None
    password = password if password else current_password
    role = role if role else current_role
    store_id = store_id if store_id is not None else current_store_id
    permissoes = permissoes if permissoes is not None else current_permissoes
    cur.execute('UPDATE admin_users SET password = %s, role = %s, store_id = %s, permissoes = %s WHERE username = %s',
                (password, role, store_id, permissoes, username))
    conn.commit()
    conn.close()

def delete_user(username: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM admin_users WHERE username = %s', (username,))
    conn.commit()
    conn.close()
