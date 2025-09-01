# AUTOMAÇÕES E INTEGRAÇÃO IA (Agno/OpenAI)

## Visão Geral
O PRECIX integra automações inteligentes e orquestração via IA real (Agno, OpenAI, Ollama), permitindo notificações de eventos, sugestões, healthcheck, chat, logs e automação de rotinas críticas do sistema.

---

## Arquitetura e Fluxos
- **ai_agent_integration.py**: Centraliza integração com agente IA externo. Função `notify_ai_agent` envia eventos (sync, erro, import, export, chat, etc) para endpoint configurado, incluindo contexto customizado (prompt).
- **ia_event_log.py**: Loga todos os eventos IA, respostas, usuários, tempo de resposta. Expõe endpoints REST para consulta de eventos, healthcheck e chat IA.
- **Logs**: Todos os eventos, respostas e interações são salvos em `logs/ia_events.log` para auditoria e troubleshooting.

---

## Endpoints e Funções
- `/admin/ia-events` (GET): Lista eventos recentes da IA (JSON).
- `/admin/ia-health` (GET): Healthcheck da IA, retorna status online/offline.
- `/admin/ia-chat` (POST): Envia mensagem para IA, retorna resposta, loga interação, tempo de resposta e usuário.
- `notify_ai_agent(event_type, details)`: Função central para notificar IA de qualquer evento relevante do sistema.
- `log_ia_event(event_type, details, response, user, elapsed)`: Loga evento detalhado, resposta, usuário e tempo.

---

## Observações Técnicas
- Integração configurável via variáveis de ambiente (`PRECIX_IA_ENDPOINT`, `PRECIX_IA_TOKEN`, etc).
- Prompt customizado pode ser enviado em cada requisição para IA.
- Logs detalhados facilitam troubleshooting, auditoria e análise de performance.
- Endpoints REST permitem integração do painel admin com chat IA, healthcheck e consulta de eventos.
- Suporte a múltiplos tipos de evento: sync, erro, importação, exportação, sugestões, chat, etc.

---

## Exemplos de Uso
- Notificar início de sincronização: `notify_ai_agent('sync_start', {'source': 'backend'})`
- Logar evento de erro: `notify_ai_agent('error', {'details': 'Falha ao importar'})`
- Chat via painel admin: POST `/admin/ia-chat` com `{ "message": "Como corrigir erro X?" }`

---
# SCRIPTS DE AUTOMAÇÃO, MIGRAÇÃO E INTEGRAÇÃO

## Visão Geral
O sistema PRECIX inclui diversos scripts Python para automação de rotinas, migração de dados, integração entre bancos, importação/exportação de produtos, parser de arquivos TXT, e sincronização entre sistemas legados (Kiosk) e modernos (PRECIX).

---

## Principais Scripts

- **kiosk_to_precix_import.py**: Importa produtos do banco do Kiosk para o banco PRECIX, corrige encoding, converte preços, gera arquivo TXT de teste.
- **import_lojas.py**: Importa lojas de arquivo TXT para o banco via API REST, usando requests e CSV.
- **migrar_codigo_loja.py**: Adiciona coluna 'codigo' única na tabela stores, garante unicidade e cria índice único.
- **txt_parser.py**: Parser para importar/exportar arquivos TXT no formato do Kiosk, converte preços, valida campos, exporta para formato compatível.
- **sqlite_kiosk_export.py**: Exporta produtos do PRECIX para banco do Kiosk (tabela PRODUTO) e/ou para TXT compatível, converte preços para centavos.
- **sync_service.py**: Importa produtos de TXT para banco PRECIX, valida linhas, converte preços, integra com backend/database.
- **fix_integration_table.py / fix_integration_table_force.py**: Scripts de manutenção para garantir estrutura da tabela de integrações, adicionando coluna 'layout' se necessário.

---

## Fluxos e Observações Técnicas
- Scripts usam SQLite, CSV, requests, encoding defensivo, validação de campos e conversão de formatos.
- Permitem migração segura entre sistemas legados e PRECIX, sem perda de dados.
- Facilitam homologação, testes, manutenção e integração contínua.
- Podem ser adaptados para outros formatos e bancos conforme necessidade.

---

## Exemplos de Uso
- Importar produtos do Kiosk para PRECIX:
  `python kiosk_to_precix_import.py produto.db products.db`
- Exportar para TXT compatível:
  `python kiosk_to_precix_import.py produto.db precix_export.txt`
- Importar lojas via API:
  `python import_lojas.py`
- Migrar estrutura da tabela stores:
  `python migrar_codigo_loja.py`
- Sincronizar produtos de TXT para banco:
  `python sync_service.py`

---
# AGENTE LOCAL (Python, CLI/GUI)

## Visão Geral
O Agente Local PRECIX integra, processa e distribui dados de preços e equipamentos entre sistemas legados (PDVs, totens, automações antigas) e sistemas modernos (PWA, API, Banco de Dados). Permite migração gradual, operação híbrida e garante atualização correta para todos os equipamentos.

---

## Funcionalidades Principais
- **Fonte de Dados**: Seleção entre Arquivo, API REST externa ou Banco de Dados (SQLite, outros futuros). Configuração via `config.json`.
- **Geração de Arquivo Texto**: Sempre gera arquivo texto no formato legado, garantindo compatibilidade total.
- **Integração PWA**: Alimenta PWAs via API configurada, podendo buscar e servir dados conforme configuração.
- **Autenticação**: Suporte a Basic/Bearer Token para integração via API. Campos opcionais em `config.json`.
- **Configuração e Interface**: GUI compacta, abas para cada área, configurações salvas em `config.json`. Permite selecionar arquivos, layout, integração IA, etc.
- **Automação**: Intervalo de atualização automática, botão para forçar atualização manual.
- **Logs e Monitoramento**: Aba de logs para eventos e erros, monitoramento de status dos equipamentos.

---

## Fluxo de Atualização
1. Usuário escolhe fonte de dados (Arquivo, API, Banco).
2. Sistema busca/prepara dados da fonte escolhida.
3. Sempre gera arquivo texto para equipamentos legados.
4. PWAs continuam alimentados pela API.
5. Processo pode ser automático (timer) ou manual (botão).

---

## Arquitetura e Classes
- **main.py**: Orquestra o fluxo, carrega config, executa automação, integra com backend/API, gera arquivos, monitora logs.
- **ConfiguracaoArquivoWidget / IntegracaoPrecixWidget**: Gerenciam interface e fluxo híbrido.
- **smoke_test.py / smoke_health_test.py**: Scripts de teste automatizado para validar integração, geração de arquivos, healthcheck, logs.

---

## Testes e Diagnóstico
- Scripts de smoke test simulam todos os modos (arquivo, API, banco), geram fixtures e validam saída.
- Healthcheck HTTP integrado para monitoramento e diagnóstico.
- Logs detalhados para troubleshooting, incluindo parsing, caminhos, número de registros, erros.

---

## Roadmap e Pendências
- Suporte a múltiplos bancos (MySQL, Postgres, Oracle) via SQLAlchemy.
- Autenticação avançada em `enviar_para_api` (Basic/Bearer, headers dinâmicos).
- Diagnóstico de falhas em leitura de arquivos e integração.
- Testes E2E com terminais legados e simulação de envio FTP/TCP.
- Expansão de automações IA e integração com painel admin.

---

## Observações Técnicas
- Código defensivo, preparado para coexistência de tecnologias e migração gradual.
- Arquivo texto nunca deixa de ser gerado, garantindo compatibilidade total.
- Logging detalhado para diagnóstico e auditoria.
- Configuração flexível via `config.json`, fácil de adaptar para novos cenários.
- Scripts de teste e automação facilitam validação e homologação.

---
# FRONTEND (PWA Vue 3)

## Visão Geral
O frontend do PRECIX é uma Progressive Web App (PWA) em Vue 3, projetada para funcionar online e offline, identificar dispositivos por UUID, sincronizar produtos, consultar preços, exibir banners e garantir alta disponibilidade em PDVs e totens.

---
## Arquitetura
- **App.vue**: Ponto de entrada, monta os componentes principais (`PriceCheck`, `Carousel`), gerencia UUID do dispositivo via IndexedDB.
- **main.js**: Inicializa Vue, importa CSS, garante UUID único do dispositivo, sincroniza com IndexedDB e localStorage, busca loja vinculada ao device.
- **indexeddb.js**: Utilitário para persistência local, armazena produtos, device UUID, dados de loja. Implementa CRUD completo para produtos e device info.

---
## Identificação de Dispositivo
- **UUID**: Gerado conforme RFC4122, salvo em IndexedDB e localStorage. Usado como identificador único em todas as integrações, heartbeats e cadastros.
- **Funções**: `generateUUID`, `saveDeviceUUID`, `getDeviceUUID` garantem persistência e recuperação do identificador.
- **Fluxo**: Ao iniciar, busca UUID no IndexedDB; se não existir, gera e salva. Sincroniza com localStorage para fallback.

---
## IndexedDB
- **Estrutura**: Banco `precix_db` com stores `products` (key: barcode) e `device_info` (key: 'uuid').
- **Funções**:
  - `saveProducts`, `clearProducts`, `getProduct`, `saveProduct`: CRUD de produtos offline.
  - `saveDeviceUUID`, `getDeviceUUID`: Persistência do identificador do dispositivo.
- **Offline**: Permite consulta e sincronização de produtos mesmo sem conexão.

---
## Integração Backend
- **Sincronização**: Busca loja vinculada ao UUID via endpoint `/device/store/{deviceId}`.
- **Heartbeat**: Envia pings periódicos para backend, marcando dispositivo como online.
- **Fallback**: Se offline, consulta produtos e dados do IndexedDB/localStorage.

---
## Componentes Principais
- **PriceCheck.vue**: Consulta de preços, integração com backend e IndexedDB.
- **Carousel.vue**: Exibição de banners, integração com backend e cache local.

---
## Observações Técnicas
- Código modular, fácil de expandir para novos componentes e integrações.
- Garantia de unicidade e persistência do identificador do dispositivo.
- Suporte total a operação offline, fallback de dados, sincronização automática.
- Integração transparente com backend para todos os fluxos críticos.
- IndexedDB usado para alta performance e resiliência em PDVs.

---
# ADMIN (Painel Web - Vue 3)

## Visão Geral
O painel admin do PRECIX é uma SPA (Single Page Application) desenvolvida em Vue 3, utilizando PrimeVue para UI profissional, roteamento dinâmico, autenticação JWT, controle granular de permissões, integração direta com o backend e IA. Permite gestão completa do sistema: produtos, banners, integrações, agentes, dispositivos, lojas, usuários, logs e automações.

---

## Arquitetura
- **App.vue**: Ponto de entrada, renderiza o router-view.
- **main.js**: Inicializa Vue, aplica PrimeVue (tema Aura), monta o app, importa CSS e router.
- **router.js**: Define todas as rotas do painel, incluindo login, dashboard, banners, IA logs, agentes, lojas, dispositivos, eventos, auditoria, usuários, integrações. Implementa checagem de token JWT, role e permissões via localStorage.
- **Layouts/MainLayout.vue**: Layout principal, navegação, slots para conteúdo das rotas.

---

## Rotas e Permissões
- Rotas protegidas por JWT, role e permissões (usuário, operador, admin).
- Permissões são carregadas do backend e salvas no localStorage, usadas para exibir/ocultar menus e telas.
- Funções utilitárias para extrair role e permissões do token JWT.

---

## Componentes e Views
- **Dashboard.vue**: Exibe resumo do sistema (produtos, status, última sync, backup), consulta `/admin/status` via Axios, formata datas com dayjs.
- **IntegrationConfig.vue**: Tela avançada para gerenciar integrações de preço (arquivo, API, banco), checklist visual, modais para adicionar/editar, layout customizado, teste de API, logs de importação, feedback dinâmico, validação de campos, dropdowns dinâmicos, exclusão segura, integração direta com backend.
- **BannerManager.vue**: Upload, listagem, exclusão de banners, vinculação por loja, preview, logs.
- **AgentManager.vue**: Gerencia agentes locais, status, devices, heartbeat, logs.
- **DeviceManager.vue**: CRUD de equipamentos, status online/offline, heartbeat, auditoria.
- **StoreManager.vue**: CRUD de lojas, vinculação com agentes, status.
- **UserManager.vue**: CRUD de usuários, roles, permissões, vinculação de loja.
- **AuditLog.vue**: Consulta e exibe logs de auditoria do sistema.
- **IALogView.vue**: Exibe logs e sugestões da IA, integra com backend.
- **DeviceEvents.vue**: Exibe eventos recentes de dispositivos (consultas, syncs, health).

---

## Integração Backend e IA
- Todas as operações CRUD, importações, uploads, logs, automações e integrações são feitas via Axios para endpoints REST do backend.
- Teste de API, importação de preços, logs e feedback são integrados em tempo real.
- Painel exibe status do sistema, sugestões da IA, automações e logs.

---

## UI/UX
- PrimeVue: DataTable, Dialog, Dropdown, Panel, Message, Toast, Skeleton, Chips, etc.
- Layout responsivo, checklist visual, feedback dinâmico, validação de campos, modais profissionais.
- Cores, fontes e espaçamentos padronizados conforme identidade do cliente.

---

## Observações Técnicas
- Código modular, fácil de expandir novas telas e integrações.
- Permissões e roles são dinâmicas, permitindo granularidade de acesso.
- Checklist visual e feedback em todas as operações críticas.
- Teste de API e layout customizado para integrações.
- Logs e auditoria integrados em todas as ações relevantes.
- Suporte a múltiplos tipos de integração, layouts customizados, automações IA.

---
# INTEGRAÇÃO IA (backend/ai_agent_integration.py)

## Visão Geral
Este módulo integra o PRECIX com agentes de IA externos (Agno, Ollama, etc), permitindo notificações de eventos do sistema para automação, análise e sugestões inteligentes.

### Funções
- `notify_ai_agent(event_type, details)`: Envia evento para o endpoint de IA configurado, incluindo contexto customizado (prompt) e token de autenticação se necessário. Loga resposta e falhas.
- `get_ia_prompt()`: Lê prompt customizado do arquivo `prompt_supermercado.txt` para contextualizar a IA.

### Parâmetros
- `IA_ENDPOINT`, `IA_TOKEN`, `IA_TIMEOUT`: Configuráveis por variável de ambiente.

### Observações
- Usado em todo backend para notificar eventos críticos, sincronizações, falhas, sugestões, etc.

---

# MIDDLEWARE FRONTEND (backend/static_middleware.py)

## Visão Geral
Permite servir o frontend (build Vue/PWA) diretamente pelo backend FastAPI, montando a pasta de build como rota estática (`/app`).

### Funções
- `mount_frontend(app, frontend_dir)`: Monta a pasta do frontend como rota `/app` usando FastAPI StaticFiles.

---

# IMPORTADOR DE PREÇOS (backend/importador_precos.py)

## Visão Geral
Responsável por importar e atualizar preços no banco a partir das integrações configuradas (arquivo, API, banco de dados).

### Funções
- `importar_todos_precos()`: Executa importação para todas as integrações ativas, chamando a função específica conforme o tipo.
- `importar_arquivo(config)`: Importa preços de arquivo texto/CSV conforme layout salvo.
- `importar_api(config)`, `importar_banco(config)`: Importam preços de API ou banco externo (implementação pode ser expandida).

### Observações
- Loga falhas, atualizações e integra com auditoria.
- Suporta múltiplos tipos de integração e layouts customizados.

---

# CONFIGURAÇÃO DE INTEGRAÇÕES (backend/integration_config.py)

## Visão Geral
Gerencia as configurações de integração de preços do sistema, permitindo cadastrar, editar, consultar e remover integrações por loja ou globalmente.

### Estrutura da Tabela
- `integration_configs`: id, loja_id, tipo, parametro1, parametro2, layout, ativo

### Funções
- `create_integration_table()`: Cria a tabela se não existir.
- `upsert_integration()`: Adiciona ou atualiza configuração.
- `get_integrations(loja_id=None)`: Consulta integrações cadastradas.
- `update_integration_by_id()`, `delete_integration()`: Atualiza ou remove integração por id.

### Observações
- Suporta integrações por arquivo, API, banco de dados.
- Utilizado pelos endpoints REST do backend e pelo painel admin.

---

# BACKUP E RESTORE (backend/backup_restore.py)

## Visão Geral
Permite download e upload (restore) do banco de dados SQLite via endpoints protegidos para administradores.

### Funções
- `download_backup`: Permite download do arquivo atual do banco (apenas admin).
- `restore_backup`: Permite upload de novo arquivo de banco (apenas admin).
- `save_last_backup`, `get_last_backup`: Gerenciam metadados do último backup/restore.
- `require_admin`: Protege endpoints usando JWT e role admin.

### Observações
- Todos os endpoints são protegidos por autenticação JWT e role admin.
- Operações são logadas e metadados salvos para auditoria.

---
# AUTENTICAÇÃO JWT (backend/auth_jwt.py)

## Visão Geral
O arquivo `backend/auth_jwt.py` implementa a autenticação baseada em JWT (JSON Web Token) para o sistema PRECIX. Ele é responsável por gerar e validar tokens de acesso, garantindo segurança e controle de sessão para o painel admin e APIs sensíveis.

---

## Funções e Parâmetros
- **SECRET_KEY**: Chave secreta forte para assinatura dos tokens (em produção, deve ser variável de ambiente).
- **ALGORITHM**: Algoritmo de assinatura (HS256).
- **ACCESS_TOKEN_EXPIRE_MINUTES**: Tempo de expiração padrão do token (60 minutos).

### Funções
- `create_access_token(data, expires_delta=None)`: Gera um token JWT assinado, incluindo claims customizadas e expiração.
  - `data`: dicionário com claims (ex: sub, role, etc).
  - `expires_delta`: timedelta opcional para customizar expiração.
- `verify_access_token(token)`: Decodifica e valida o token JWT, retorna o username (sub) se válido, ou None se inválido/expirado.

---

## Segurança e Integração
- Tokens são usados para proteger endpoints sensíveis do backend (admin, integrações, uploads, etc).
- O backend exige token válido para operações administrativas e de integração.
- O uso de JWT permite autenticação stateless, renovação de sessão e granularidade de permissões (claims).
- A chave secreta deve ser protegida e nunca exposta em repositórios públicos.

---
# BANCO DE DADOS E LÓGICA DE NEGÓCIO (backend/database.py)

## Visão Geral
O arquivo `backend/database.py` centraliza toda a lógica de persistência, modelos de dados, integrações com SQLite, deduplicação, autenticação, auditoria, CRUD de lojas, dispositivos, agentes, integrações e usuários admin. Ele é o núcleo de dados do PRECIX, garantindo integridade, consistência e automação defensiva.

---

## Estrutura das Tabelas
- **products**: Produtos (barcode, name, price, promo)
- **admin_users**: Usuários admin (username, password, role, store_id, permissoes)
- **stores**: Lojas (id, codigo, name, status)
- **devices**: Equipamentos (id, store_id, name, status, last_sync, online, identifier, last_catalog_sync, catalog_count)
- **audit_log**: Auditoria (id, timestamp, device_id, device_name, action, details)
- **agent_devices**: Dispositivos legados por agente (agent_id, identifier, name, tipo, status, last_update, ip, ...)
- **agents_status**: Status dos agentes locais (agent_id, loja_codigo, loja_nome, status, last_update, ip)
- **agent_stores**: Lojas vinculadas a agentes (agent_id, loja_codigo, loja_nome)

---

## Funções e Fluxos Principais

### Inicialização e Migração
- `init_db()`: Cria todas as tabelas, garante colunas novas (migração), loga usuários admin existentes.
- `populate_example_data()`: Popula produtos e admin padrão para testes/homologação.

### Produtos
- `get_product_by_barcode(barcode)`: Busca produto por código de barras.
- `upsert_products(products)`: Insere/atualiza produtos em lote, retorna contadores.
- `export_products_to_txt()`: Exporta todos os produtos para arquivo texto.

### Usuários Admin
- `hash_password`, `verify_password`: Hash e verificação de senha (bcrypt).
- `authenticate_admin`: Autentica usuário, aceita hash e texto puro (retrocompatível).
- CRUD completo: adicionar, atualizar, deletar, listar usuários, roles, permissões, store_id.

### Auditoria
- `add_audit_log`, `get_audit_logs`, `get_device_audit_logs`: Registra e consulta logs de ações críticas, por device ou geral.

### Lojas
- CRUD completo: adicionar (com código), atualizar, deletar, buscar por código, listar todas.

### Dispositivos
- CRUD completo: adicionar (com identifier único), atualizar (com verificação de unicidade), deletar, listar todos (com cálculo de online/offline por last_sync), buscar por identifier.
- `set_device_online`, `set_device_offline`: Marca dispositivo online/offline, atualiza last_sync, audita eventos.
- `update_device_catalog_sync`: Atualiza info de catálogo sincronizado por identifier.

### Agentes Locais e Integração
- `upsert_agent_status`, `update_agent_status`, `delete_agent_status`, `get_all_agents_status`: Gerencia status dos agentes locais, normaliza IDs, deduplica, atualiza por IP.
- `replace_agent_stores`, `get_agent_stores`: Gerencia lojas vinculadas a agentes.
- `dedupe_agents`, `dedupe_agents_by_ip`: Deduplicação defensiva de agentes por ID e IP, migrando devices/lojas e removendo duplicados.
- `get_latest_agent_by_ip`, `get_recent_agent_by_ip`: Busca agent_id mais recente por IP, com ou sem janela de tempo.
- `reassign_orphan_agent_devices_by_ip`: Reatribui devices órfãos para o agent_id canônico por IP.

### Dispositivos Legados (agent_devices)
- `upsert_agent_device`, `bulk_upsert_agent_devices`, `get_agent_devices`, `delete_agent_device`: CRUD e sincronização de devices legados por agente, cálculo de status online/offline por last_update.

### Utilitários
- `normalize_agent_id`, `_parse_dt`: Normalização e parsing de datas/IDs.
- `debug_list_device_identifiers`: Loga todos os devices para debug.

---

## Regras de Negócio e Segurança
- **Unicidade**: Identificadores de devices e agentes são normalizados e deduplicados.
- **Auditoria**: Todas as ações críticas são logadas.
- **Permissões**: Usuários admin possuem roles e permissões customizadas.
- **Senhas**: Hash seguro (bcrypt), retrocompatível.
- **Migração**: Funções garantem que bancos antigos recebam novas colunas sem perder dados.
- **Automação**: Deduplicação, reatribuição de órfãos, atualização de status e sincronização são automáticas.

---

## Observações Técnicas
- O arquivo é altamente defensivo: trata exceções, loga operações, evita duplicidade e inconsistências.
- Suporta coexistência de dispositivos legados e modernos.
- Pronto para expansão de integrações, automações e novas regras de negócio.
- Todas as funções são utilizadas diretamente pelos endpoints do backend.

---
# BACKEND (backend/main.py)

## Visão Geral
O arquivo `backend/main.py` implementa toda a API backend do PRECIX, incluindo endpoints REST para agentes, dispositivos, produtos, integrações, auditoria, automações IA, autenticação JWT, uploads, logs e monitoramento. Ele integra múltiplos módulos auxiliares e faz uso intensivo de funções do `database.py` para persistência e lógica de negócio.

---

## Estrutura e Fluxos Principais

### 1. Inicialização e Imports
- Importa módulos padrão, FastAPI, middlewares, segurança, utilitários e todos os módulos internos (database, IA, integração, autenticação, backup, etc).
- Executa deduplicação de agentes e reatribuição de devices órfãos ao iniciar.
- Cria tabelas de integração e inicializa logs.

### 2. Endpoints de Agentes Locais
- `/admin/agents` (GET): Lista agentes, normaliza IDs, calcula status online/offline, anexa lojas e devices vinculados.
- `/admin/agents/status` (POST): Recebe heartbeat/status do agente local, normaliza e persiste, deduplica, atualiza lojas vinculadas.
- `/admin/agents/summary` (GET): Retorna resumo de agentes online/offline.
- Edição, exclusão, devices por agente, heartbeat de devices, remoção de devices, todos com normalização e deduplicação.

### 3. Eventos de Dispositivos
- Registra consultas de preço, sincronizações de catálogo, eventos de saúde (online/offline), todos auditados e armazenados em memória e banco.

### 4. Integrações e Importação
- Endpoints para listar, salvar, testar e deletar integrações de preço (API, arquivo, etc).
- Importação manual de preços e logs de importação.

### 5. Banners
- Upload, listagem, deleção e download de banners, com metadados por loja e controle de permissões.

### 6. Produtos
- Bulk upsert de produtos, listagem completa, busca por código de barras, exportação para TXT.

### 7. Administração
- CRUD completo de usuários admin, com roles, permissões, store_id, autenticação JWT, refresh de token, proteção de endpoints por permissão.
- CRUD de lojas e dispositivos.

### 8. Heartbeat e Status
- Heartbeat de dispositivos (PWA/legacy), marca online, integra com IA.
- Endpoints de status do sistema, healthcheck, favicon, etc.

### 9. Automação e IA
- Rotinas automáticas de limpeza, correção de dados, detecção de outliers, healthcheck de endpoints, sugestões de otimização, logs de ações autônomas.
- Notificações para agente IA em eventos críticos.

### 10. Auditoria
- Endpoints para logs gerais e por dispositivo.

### 11. Montagem do Frontend
- Serve o build do frontend se existir, via middleware.

### 12. CORS e Configuração
- Middleware CORS liberado para integração com frontend/admin.

---

## Detalhamento Técnico de Funções e Endpoints

Cada função/endpoint possui:
- **Validação de entrada** (campos obrigatórios, tipos, normalização).
- **Acesso ao banco** via funções do `database.py`.
- **Tratamento de exceções** e respostas HTTP apropriadas.
- **Auditoria** e logs para ações críticas.
- **Integração com IA** para eventos relevantes.
- **Permissões**: uso de JWT, roles e permissões customizadas para proteger endpoints sensíveis.

---

## Integração com Outros Módulos

- **database.py**: Toda persistência, queries, deduplicação, autenticação, CRUD.
- **ai_agent_integration.py**: Notificações e comandos para IA/Agno.
- **auth_jwt.py**: Criação e verificação de tokens JWT.
- **static_middleware.py**: Servir frontend.
- **importador_precos.py**: Importação de preços.
- **integration_config.py**: CRUD de integrações.
- **backup_restore.py**: Rotinas de backup e restore.
- **device_store_router.py**: Rotas auxiliares de devices/lojas.

---

## Segurança

- **JWT**: Protege endpoints sensíveis, renovação de token, roles e permissões.
- **CORS**: Liberado para integração, mas pode ser restrito em produção.
- **Hash de senha**: Uso de bcrypt.
- **Logs e auditoria**: Todas as ações críticas são auditadas.

---

## Observações

- O backend é altamente defensivo: deduplica agentes, normaliza IDs, trata exceções, audita tudo.
- Suporta coexistência de dispositivos legados e modernos.
- Pronto para automação e monitoramento via IA.
- Modular, fácil de expandir integrações e automações.

---
# Documentação Completa do Sistema PRECIX

## Sumário
- [Visão Geral](#visão-geral)
- [Arquitetura de Pastas](#arquitetura-de-pastas)
- [Backend (FastAPI)](#backend-fastapi)
  - [Endpoints e Rotas](#endpoints-e-rotas)
  - [Banco de Dados e Modelos](#banco-de-dados-e-modelos)
  - [Lógica de Negócio](#lógica-de-negócio)
  - [Automação IA e Monitoramento](#automação-ia-e-monitoramento)
- [Frontend (PWA)](#frontend-pwa)
- [Admin (Vue 3)](#admin-vue-3)
- [Agente Local (Python)](#agente-local-python)
- [Integração com IA (Agno)](#integração-com-ia-agno)
- [Scripts e Utilitários](#scripts-e-utilitários)
- [Segurança e Autenticação](#segurança-e-autenticação)
- [Fluxos de Integração e Atualização](#fluxos-de-integração-e-atualização)
- [Referências e Contatos](#referências-e-contatos)

---

## Visão Geral
O PRECIX é um sistema completo para gestão, monitoramento e automação de consultas de preços em supermercados, integrando dispositivos modernos (PWA), legados (via agente local), painel administrativo, automações de IA (Agno), e múltiplos fluxos de integração (API, arquivo, banco, etc).

## Arquitetura de Pastas
- **backend/**: API FastAPI, lógica de negócio, banco de dados, integrações, automações IA, endpoints.
- **frontend/**: PWA para consulta de preços, integração IndexedDB, interface para dispositivos.
- **admin/**: Painel administrativo (Vue 3), gestão de integrações, dispositivos, agentes, banners, logs.
- **agente_local/**: Agente Python para integração com dispositivos legados.
- **agno/**: Orquestrador de IA open-source (Agno), automações, integrações LLM.
- **sync/**, **scripts_backup/**, **Kiosk/**: Utilitários, scripts, backups, integração com sistemas legados.

## Backend (FastAPI)
### Endpoints e Rotas
#### Agentes Locais
- `GET /admin/agents`: Lista todos os agentes locais, status, lojas e devices vinculados.
- `POST /admin/agents/status`: Recebe heartbeat/status do agente local (JSON: agent_id, status, loja, ip, etc).
- `GET /admin/agents/summary`: Resumo de agentes online/offline.
- `DELETE /admin/agents/{agent_id}`: Remove agente local.
- `PUT /admin/agents/{agent_id}`: Edita dados do agente local.
- `POST /admin/agents/{agent_id}/devices`: Recebe lista de devices legados de um agente local.
- `POST /admin/agents/{agent_id}/devices/heartbeat`: Marca device legado como online.
- `GET /admin/agents/{agent_id}/devices`: Lista devices de um agente.
- `DELETE /admin/agents/{agent_id}/devices/{identifier}`: Remove device legado de um agente.

#### Dispositivos e Eventos
- `POST /admin/devices/events/price-query`: Registra consulta de preço por equipamento.
- `POST /admin/devices/events/catalog-sync`: Registra sincronização de catálogo por PWA.
- `GET /admin/devices/events`: Lista eventos recentes de dispositivos.
- `POST /admin/devices/events/health`: Registra eventos de saúde de dispositivos (online/offline).

#### Integração de Preços
- `POST /admin/importar-precos`: Aciona manualmente importação de preços para todas integrações ativas.
- `GET /admin/importar-precos/logs`: Retorna logs recentes de importação.
- `GET /admin/integracoes`: Lista integrações de preço cadastradas (filtro por loja).
- `POST /admin/integracoes`: Adiciona/atualiza integração de preço (API, arquivo, etc).
- `POST /admin/integracoes/testar-api`: Testa integração do tipo API (retorna status, sample, etc).

#### Dispositivos (Cadastro)
- `POST /admin/devices/register`: Registra novo equipamento vinculado a uma loja.

#### Banners
- `GET /admin/banners`: Lista banners cadastrados (filtro por loja).
- `GET /admin/banners/{filename}`: Retorna banner individual.
- `DELETE /admin/banners/{filename}`: Remove banner.
- `POST /admin/banners/upload`: Upload de novo banner (com metadados).

#### Produtos
- `POST /admin/products/bulk`: Upsert em lote de produtos (lista, objeto, JSON string).

#### Status e Monitoramento
- `GET /admin/status`: Status geral do sistema (produtos, dispositivos, backup, online).
- `GET /health`: Healthcheck simples.
- `GET /status`: Status detalhado do sistema.
- `GET /admin/ia-health-dashboard`: Dashboard de healthcheck e otimizações IA.

#### Notificações e IA
- `POST /notify-ai-agent/`: Notifica o agente IA sobre eventos do sistema.

### Banco de Dados e Modelos
- **SQLite** com tabelas: `products`, `admin_users`, `stores`, `devices`, `audit_log`, `agent_devices`, `agents_status`, `agent_stores`.
- Migrações automáticas para garantir colunas novas.
- Funções CRUD para produtos, lojas, dispositivos, agentes, auditoria, integrações.
- Hash de senha com bcrypt, compatível com senhas antigas.

### Lógica de Negócio
- Deduplicação de agentes por ID e IP.
- Reatribuição de devices órfãos para agentes canônicos.
- Heartbeat e monitoramento de dispositivos (online/offline por janela de tempo).
- Auditoria detalhada de todas as ações (criação, exclusão, sync, etc).
- Exportação de produtos para TXT.

### Automação IA e Monitoramento
- **Ações autônomas IA**: monitoramento de devices, limpeza de logs, correção de dados, detecção de outliers.
- **Healthcheck proativo**: monitora endpoints críticos, notifica IA em caso de falha.
- **Dashboard IA**: últimos healthchecks, sugestões de otimização, logs de automação.

---


## Admin (Vue 3)
### Estrutura e Rotas
- SPA moderna usando Vue 3, PrimeVue e Vite.
- Rotas protegidas por autenticação JWT e permissões por usuário/role.
- Telas principais:
  - Login
  - Dashboard (painel geral)
  - Gerenciamento de Banners
  - Logs da IA
  - Gerenciamento de Lojas
  - Gerenciamento de Equipamentos
  - Eventos de Equipamentos
  - Auditoria
  - Gerenciamento de Usuários
  - Gerenciamento de Agentes Locais
  - Configuração de Integrações (API, Arquivo, Banco)

#### Permissões e Segurança
- Cada rota/tela pode ser restrita por permissões (armazenadas no JWT/localStorage).
- Usuários não-admin só acessam telas permitidas.

#### Tela de Integrações
- Permite cadastrar, editar, excluir e testar integrações de preços por loja ou global.
- Suporta tipos: API (endpoint + token), Arquivo (caminho + layout), Banco (string conexão + query).
- Checklist visual para cada tipo, validação de campos, exemplos e feedbacks.
- Logs de importação exibidos em painel dedicado.

#### UI/UX
- Utiliza PrimeVue para componentes profissionais, responsivos e acessíveis.
- Layouts e estilos customizados para clareza e usabilidade.

---

## Frontend (PWA)
### Estrutura e Fluxos
- Aplicação Vue 3, PWA, com IndexedDB para persistência offline.
- Cada dispositivo recebe e armazena um UUID único (IndexedDB/localStorage).
- Consulta de preços e banners via componentes dedicados.
- Heartbeat periódico para backend, marcando dispositivo como online.
- Sincronização de catálogo e eventos de consulta registrados no backend.
- Suporte a funcionamento offline (IndexedDB, service worker opcional).

#### IndexedDB
- Banco local `precix_db` com stores para produtos e device_info (UUID).
- Funções para salvar, buscar, limpar produtos e UUID do dispositivo.

#### Fluxo de Identificação
1. Ao iniciar, busca UUID no IndexedDB/localStorage.
2. Se não existir, gera e salva um novo UUID.
3. Usa UUID para identificar o dispositivo em todas as operações.
4. Busca loja vinculada ao UUID via API.
5. Heartbeat periódico para `/device/heartbeat/{UUID}`.

#### Monitoramento de Conectividade
- Pinga periodicamente `/index.html` para detectar retorno do frontend e forçar reload se necessário.

---

## Agente Local (Python)
### Função
- Integra dispositivos legados (Kiosk, Windows, etc) ao backend PRECIX.
- Executável Windows (PyInstaller/Inno Setup), pode rodar como GUI ou serviço.
- Lê configurações, busca dados de preços via API ou arquivo, gera arquivo local para dispositivos legados.
- Heartbeat e monitoramento de saúde via endpoints HTTP.

### Scripts de Teste
- `smoke_test.py`: Testa integração API, gera arquivo de preços, valida fluxo principal.
- `smoke_health_test.py`: Sobe servidor HTTP local, testa endpoints de health/logs.

### Compatibilidade
- Suporte a múltiplos modos de integração: API, arquivo, banco, legado.
- Automatiza importação, geração de arquivos e atualização de dispositivos.

---

## Scripts e Utilitários
- Scripts de migração, backup, restore, integração, automação e monitoramento.
- Utilitários para exportação/importação de produtos, logs, auditoria, etc.

---

## Fluxos de Integração e Atualização
- Integração pode ser feita por API, arquivo, banco ou agente local.
- Após importação, PWAs/dispositivos são atualizados via heartbeat/sync.
- Admin pode acionar importação manualmente e acompanhar logs.
- Não há conflito entre integração via admin e agente local: ambos atualizam banco central.

---

## Segurança e Autenticação
- JWT para autenticação de admin e usuários.
- Hash de senha (bcrypt), permissões por role.
- CORS habilitado para integração frontend/admin.

---

## IA/Agno
- Orquestrador de IA open-source integrado ao backend.
- Automação proativa: monitora saúde, sugere otimizações, executa correções autônomas.
- Notificações e logs de eventos IA disponíveis no painel admin.

---

## Observações Finais
- Toda a lógica, endpoints, integrações, automações, scripts, UI e fluxos estão documentados.
- Para detalhes de cada função, consulte os arquivos fonte correspondentes.
- O sistema está pronto para produção, cobrindo todos os cenários de integração, monitoramento e automação.

> **Nota:** Esta documentação cobre o backend em detalhes. As próximas seções abordarão frontend, admin, agente local, IA/Agno, integrações, scripts e fluxos completos do sistema.

---
# SUPORTE, TROUBLESHOOTING E REFERÊNCIAS

## Troubleshooting (Resolução de Problemas)

### Backend/API
- **Erro 401/403 em endpoints protegidos:** Verifique se o token JWT está presente e válido. Renove o login no painel admin.
- **Falha ao importar preços:** Cheque logs de importação (`/admin/importar-precos/logs`), valide layout e encoding do arquivo/API.
- **Dispositivo não aparece como online:** Confirme heartbeat periódico, UUID correto e conectividade com backend.
- **Erro de banco de dados (SQLite):** Verifique permissões de arquivo, espaço em disco e integridade do banco (`products.db`).
- **Problemas de CORS:** Confirme configuração do middleware CORS no backend.
- **Falha na integração IA:** Cheque variáveis de ambiente (`PRECIX_IA_ENDPOINT`, `PRECIX_IA_TOKEN`), logs de eventos IA e conectividade externa.

### Frontend/PWA
- **PWA não sincroniza produtos:** Verifique conexão, UUID salvo, IndexedDB e status do backend.
- **Problemas de cache:** Limpe cache do navegador, force reload (Ctrl+F5).
- **Banners não carregam:** Confirme uploads, permissões e vinculação por loja.

### Admin
- **Permissões insuficientes:** Revise roles e permissões do usuário no painel admin.
- **Falha ao salvar integração:** Valide campos obrigatórios, formato de API/arquivo/banco e teste conexão.

### Agente Local
- **Arquivo texto não gerado:** Cheque logs do agente, permissões de pasta e configuração de fonte de dados.
- **Falha ao integrar com API:** Valide URL, token, autenticação e conectividade.
- **Logs não aparecem:** Confirme caminho de logs e permissões de escrita.

### Scripts
- **Erro de encoding:** Use UTF-8, valide arquivos de entrada/saída.
- **Migração falha:** Confirme estrutura das tabelas, permissões e backups antes de rodar scripts.

## Exemplos de Payloads

### Cadastro de Produto (Bulk Upsert)
```json
[
  {"barcode": "7891234567890", "name": "Arroz 5kg", "price": 19.99, "promo": false},
  {"barcode": "7899876543210", "name": "Feijão 1kg", "price": 7.49, "promo": true}
]
```

### Heartbeat de Dispositivo
```json
{
  "identifier": "uuid-do-device",
  "status": "online",
  "last_sync": "2024-06-01T12:00:00Z"
}
```

### Integração de Preço (API)
```json
{
  "tipo": "api",
  "parametro1": "https://api.exemplo.com/produtos",
  "parametro2": "Bearer <token>",
  "layout": "default",
  "ativo": true
}
```

### Evento IA (Notificação)
```json
{
  "event_type": "sync_start",
  "details": {"source": "backend"}
}
```

## Recomendações de Boas Práticas
- Sempre use tokens JWT válidos e renove sessões periodicamente.
- Faça backup regular do banco (`products.db`) e salve em local seguro.
- Teste integrações (API, arquivo, banco) antes de ativar em produção.
- Use logs detalhados para troubleshooting e auditoria.
- Mantenha scripts e agentes atualizados conforme roadmap.
- Proteja variáveis de ambiente e arquivos sensíveis.
- Documente customizações e layouts de integração.

## Roadmap (Próximos Passos)
- Suporte a múltiplos bancos (MySQL, Postgres, Oracle) via SQLAlchemy.
- Integração com outros ERPs e sistemas de retaguarda.
- Expansão de automações IA (sugestões, correções autônomas, chat avançado).
- Dashboard de monitoramento em tempo real (admin).
- Testes E2E e homologação com terminais legados.
- Integração com sistemas de pagamento e promoções.
- Internacionalização (i18n) e multi-loja.

## FAQ (Perguntas Frequentes)

**1. Como cadastrar um novo dispositivo?**
Use o endpoint `/admin/devices/register` com o UUID do equipamento e vincule a uma loja.

**2. Como restaurar um backup do banco?**
Use o endpoint `/admin/restore-backup` (admin) e envie o arquivo `.db`.

**3. Como adicionar uma nova integração de preço?**
Via painel admin, tela de integrações, selecione tipo (API, arquivo, banco), preencha campos e teste conexão.

**4. Como consultar logs de auditoria?**
Via painel admin (AuditLog) ou endpoint `/admin/audit-logs`.

**5. Como integrar com IA/Agno?**
Configure variáveis de ambiente (`PRECIX_IA_ENDPOINT`, `PRECIX_IA_TOKEN`), use endpoints de notificação e consulte logs IA.

**6. O sistema funciona offline?**
Sim, o frontend PWA opera offline via IndexedDB; sincronização ocorre ao restabelecer conexão.

**7. Como atualizar produtos em lote?**
Use o endpoint `/admin/products/bulk` com payload JSON de produtos.

**8. Como deduplicar agentes e devices?**
O backend executa deduplicação automática ao iniciar e via endpoints de manutenção.

## Glossário
- **PWA**: Progressive Web App, app web que funciona offline.
- **UUID**: Identificador único universal, usado para devices.
- **Agente Local**: Aplicativo Python que integra dispositivos legados ao PRECIX.
- **Heartbeat**: Sinal periódico de que o device está online.
- **Deduplicação**: Processo de remover registros duplicados (agentes/devices).
- **Layout de Integração**: Formato customizado de arquivo/API para importação/exportação de preços.
- **IndexedDB**: Banco de dados local do navegador usado pelo frontend.
- **JWT**: JSON Web Token, usado para autenticação.
- **IA/Agno**: Orquestrador de IA integrado ao PRECIX.
- **Audit Log**: Registro de ações críticas para auditoria.
- **Bcrypt**: Algoritmo de hash seguro para senhas.
- **API REST**: Interface de integração baseada em HTTP.

---
**FIM DA DOCUMENTAÇÃO COMPLETA PRECIX**
