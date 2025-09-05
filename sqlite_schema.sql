CREATE TABLE products (
            barcode TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            promo TEXT
        );

CREATE TABLE admin_users (
            username TEXT PRIMARY KEY,
            password TEXT NOT NULL
        , role TEXT DEFAULT 'admin', store_id INTEGER, permissoes TEXT);

CREATE TABLE stores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            status TEXT DEFAULT 'ativo'
        , codigo TEXT);

CREATE TABLE devices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            store_id INTEGER,
            name TEXT NOT NULL,
            status TEXT DEFAULT 'ativo',
            last_sync TEXT,
            online INTEGER DEFAULT 0, identifier TEXT, last_catalog_sync TEXT, catalog_count INTEGER,
            FOREIGN KEY(store_id) REFERENCES stores(id)
        );

CREATE TABLE audit_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            device_id INTEGER,
            device_name TEXT,
            action TEXT NOT NULL,
            details TEXT,
            FOREIGN KEY(device_id) REFERENCES devices(id)
        );

CREATE TABLE agents_status (
            agent_id TEXT PRIMARY KEY,
            loja_codigo TEXT,
            loja_nome TEXT,
            status TEXT,
            last_update TEXT,
            ip TEXT
        );

CREATE TABLE integration_configs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        loja_id INTEGER,
        tipo TEXT,
        parametro1 TEXT,
        parametro2 TEXT,
        ativo INTEGER,
        layout TEXT
    , schedule_time TEXT, run_daily INTEGER DEFAULT 1, fanout_agents INTEGER DEFAULT 0);

CREATE TABLE agent_devices (
            agent_id TEXT NOT NULL,
            identifier TEXT NOT NULL,
            name TEXT,
            tipo TEXT DEFAULT 'LEGACY',
            status TEXT,
            last_update TEXT,
            ip TEXT,
            last_catalog_sync TEXT,
            catalog_count INTEGER, store_code TEXT, store_name TEXT,
            PRIMARY KEY (agent_id, identifier)
        );

CREATE TABLE agent_stores (
            agent_id TEXT NOT NULL,
            loja_codigo TEXT,
            loja_nome TEXT,
            PRIMARY KEY(agent_id, loja_codigo)
        );

CREATE TABLE integration_runs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            integration_id INTEGER,
            started_at TEXT,
            finished_at TEXT,
            status TEXT,
            total INTEGER,
            inserted INTEGER,
            updated INTEGER,
            ignored INTEGER,
            error_message TEXT,
            FOREIGN KEY(integration_id) REFERENCES integration_configs(id)
        );

