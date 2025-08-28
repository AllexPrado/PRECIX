# CHANGELOG — 28/08/2025

Este registro documenta tudo o que fizemos hoje no projeto PRECIX.

## Admin (Vue 3 + Vite)
- Integração do PrimeVue (tema Aura) e ajustes de build: adicionados `primevue`, `@primevue/themes`, `primeicons`, `primeflex` em `admin/package.json` e inicialização em `admin/src/main.js`.
- Overrides de tema claro (contraste/legibilidade) em `admin/src/style.css`:
  - Campos nativos (input/select/textarea) e componentes PrimeVue forçados para fundo claro, texto escuro e realces da marca (#ff6600).
  - DataTable com cabeçalhos bege claro e conteúdo em fundo branco; dropdowns/menus legíveis.
- DeviceEvents (`admin/src/views/DeviceEvents.vue`):
  - Cabeçalhos renomeados: Data/Hora | Evento | Dispositivo (ID) | Informações.
  - Pílulas não quebram linha; adicionada label “Saúde” para events de health; colunas com largura e truncamento adequados; cabeçalho sticky e linhas zebras.
- DeviceManager (`admin/src/views/DeviceManager.vue`):
  - Melhor contraste de textos e inputs; cartões com texto escuro.
  - Status “Online/Offline” preservado com verde/vermelho e alta especificidade; separação de “Status” x “Perfil (Ativo/Inativo)” em linhas chave:valor (kv-row).
  - Melhor organização das seções “Último sinal” e “Catálogo” com tempos relativos; badges de ID com azul legível.
  - Modal de edição com campos claros e rótulos legíveis.
- AgentManager (`admin/src/views/AgentManager.vue`):
  - Normalização de status de device (devStatus) para ‘online’/‘offline’ com fallback por frescor do last_update (≤120s). Correções de contrastes na tabela.
- AuditLog (`admin/src/views/AuditLog.vue`):
  - Campos de filtro com fundo branco/texto escuro; melhorias de contraste em títulos e detalhes.
- Login (`admin/src/views/Login.vue`):
  - Alternância de senha com ícone (olho) e melhor acessibilidade; correções de autofill para fundo claro; layout responsivo preservado.
- IntegrationConfig (`admin/src/views/IntegrationConfig.vue`):
  - Refactor visual com PrimeVue (DataTable/Dialog/Dropdown/Buttons/Panel/Message), mantendo a lógica existente.
  - Opções de loja derivadas; conversões seguras de `loja_id`; feedbacks mais claros; inputs e diálogos com tema claro.
- UserManager (`admin/src/views/UserManager.vue`):
  - Checkboxes e diálogos forçados ao tema claro; cores de texto ajustadas para legibilidade.

## Backend (FastAPI + SQLite)
- SQLite com melhor concorrência: `busy_timeout=5000`, `journal_mode=WAL`, `synchronous=NORMAL` em `backend/database.py`.
- Deduplicação e saneamento de agentes/devices:
  - `dedupe_agents_by_ip()`: colapsa múltiplos agentes do mesmo IP no canônico (mais recente) e migra relacionamentos.
  - `reassign_orphan_agent_devices_by_ip()`: reatribui devices órfãos para o agent_id canônico baseado no IP do próprio device.
  - `get_latest_agent_by_ip()`: resolve o agent mais recente por IP.
- Endpoints mais robustos:
  - IP real do cliente via `X-Forwarded-For`/`X-Real-IP` (proxy-aware) e preferência pelo IP do request.
  - No upsert de status/devices/heartbeat, normaliza o `agent_id` para o canônico pelo IP e roda dedupe/reassign pós-upsert.
  - Novo endpoint `POST /admin/devices/events/health`: registra eventos de saúde (‘online’/‘offline’) reportados pelo Agente Local.
- Startup hardening (em `backend/main.py`): roda `dedupe_agents()`, `dedupe_agents_by_ip()`, `reassign_orphan_agent_devices_by_ip()` no início.
- Utilitário novo `backend/inspect_db.py`: ajuda a inspecionar rapidamente tabelas de agentes/devices no SQLite.

## Agente Local (Python + GUI PyQt5)
- Estabilidade de identificação do agente:
  - `ensure_agent_id()`: ancora ID estável via ENV, arquivo `agent_id.txt` em APP_HOME ou config; persiste em ambos para evitar duplicidade no painel.
  - URL unificada `DEFAULT_BACKEND_STATUS_URL` usada em status e devices.
- Publicação de dispositivos com veracidade:
  - Health check TCP (porta do equipamento, timeout configurável) e opcional ICMP (ping) via `health_check` no config.
  - Status padronizado ‘online’/‘offline’ enviado ao backend; emissão de eventos de saúde em transições; persistência do status no `config.json` para refletir no Monitoramento.
- GUI
  - Monitoramento: leitura resiliente de JSONs (config/acks/agent_status.json), mapeamento de rótulos para ‘online/offline’ e cores coerentes.
  - Equipamentos: correção do bug de salvar/ler config (evita “name 'config' is not defined”); combo “Loja vinculada” repovoada ao exibir, mais larga e visível; preenchimento de formulário seguro.
  - Integração Precix: escrita do `config.json` com replace atômico, preservando chaves não-editadas; mensagens claras de sucesso/erro.

## Outros
- Atualização do `backend/agents_status.json` (exemplo) para refletir último update.

## Benefícios
- Sem duplicidade de agentes; devices corretamente agrupados e reatribuídos por IP.
- Monitoramento mais fiel (online/offline) e rastreabilidade via eventos de saúde.
- Admin com contraste/legibilidade padronizados, mantendo a paleta do cliente e sem perder funcionalidades existentes.
- Agente local robusto em IO de config e identificação, reduzindo erros de GUI e inconsistências.

## Próximos passos sugeridos
- Validar no ambiente com proxy reverso os cabeçalhos de IP real.
- Adicionar testes básicos de API para health events e dedupe.
- Aplicar o mesmo padrão de contraste nas demais telas que ainda herdarem estilos antigos.
