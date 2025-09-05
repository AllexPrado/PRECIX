-- Schema adaptado para PostgreSQL a partir do SQLite

CREATE TABLE products (
    barcode VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    promo VARCHAR
);

CREATE TABLE admin_users (
    username VARCHAR PRIMARY KEY,
    password VARCHAR NOT NULL,
    role VARCHAR DEFAULT 'admin',
    store_id INTEGER,
    permissoes VARCHAR
);

CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    status VARCHAR DEFAULT 'ativo',
    codigo VARCHAR
);

CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    store_id INTEGER REFERENCES stores(id),
    name VARCHAR NOT NULL,
    status VARCHAR DEFAULT 'ativo',
    last_sync TIMESTAMP,
    online INTEGER DEFAULT 0,
    identifier VARCHAR,
    last_catalog_sync TIMESTAMP,
    catalog_count INTEGER
);

CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    device_id INTEGER REFERENCES devices(id),
    device_name VARCHAR,
    action VARCHAR NOT NULL,
    details VARCHAR
);

CREATE TABLE agents_status (
    agent_id VARCHAR PRIMARY KEY,
    loja_codigo VARCHAR,
    loja_nome VARCHAR,
    status VARCHAR,
    last_update TIMESTAMP,
    ip VARCHAR
);

CREATE TABLE integration_configs (
    id SERIAL PRIMARY KEY,
    loja_id INTEGER,
    tipo VARCHAR,
    parametro1 VARCHAR,
    parametro2 VARCHAR,
    ativo INTEGER,
    layout VARCHAR,
    schedule_time VARCHAR,
    run_daily INTEGER DEFAULT 1,
    fanout_agents INTEGER DEFAULT 0
);

CREATE TABLE agent_devices (
    agent_id VARCHAR NOT NULL,
    identifier VARCHAR NOT NULL,
    name VARCHAR,
    tipo VARCHAR DEFAULT 'LEGACY',
    status VARCHAR,
    last_update TIMESTAMP,
    ip VARCHAR,
    last_catalog_sync TIMESTAMP,
    catalog_count INTEGER,
    store_code VARCHAR,
    store_name VARCHAR,
    PRIMARY KEY (agent_id, identifier)
);

CREATE TABLE agent_stores (
    agent_id VARCHAR NOT NULL,
    loja_codigo VARCHAR,
    loja_nome VARCHAR,
    PRIMARY KEY(agent_id, loja_codigo)
);

CREATE TABLE integration_runs (
    id SERIAL PRIMARY KEY,
    integration_id INTEGER REFERENCES integration_configs(id),
    started_at TIMESTAMP,
    finished_at TIMESTAMP,
    status VARCHAR,
    total INTEGER,
    inserted INTEGER,
    updated INTEGER,
    ignored INTEGER,
    error_message VARCHAR
);
