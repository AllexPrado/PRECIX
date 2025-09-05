-- Roteiro para importar todos os CSVs exportados do SQLite para o PostgreSQL
-- Execute cada comando no pgAdmin, ajustando o caminho se necessário

COPY products FROM 'D:/Sonda/Precix/sync/products.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
COPY admin_users FROM 'D:/Sonda/Precix/sync/admin_users.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
COPY stores FROM 'D:/Sonda/Precix/sync/stores.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
COPY devices FROM 'D:/Sonda/Precix/sync/devices.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
COPY audit_log FROM 'D:/Sonda/Precix/sync/audit_log_clean.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
COPY agents_status FROM 'D:/Sonda/Precix/sync/agents_status.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
COPY integration_configs FROM 'D:/Sonda/Precix/sync/integration_configs.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
COPY agent_devices FROM 'D:/Sonda/Precix/sync/agent_devices.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
COPY agent_stores FROM 'D:/Sonda/Precix/sync/agent_stores.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
COPY integration_runs FROM 'D:/Sonda/Precix/sync/integration_runs.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
