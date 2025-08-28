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

---

## Atualizações adicionais (tarde)

### Admin — Integrações (UI/UX e correções)
- Paginador e Dropdowns 100% claros: overlay do seletor de página e painéis de dropdown forçados para fundo branco com highlight da marca (evita menus escuros).
- Logs de importação: estado vazio (“Sem eventos recentes.”), bloco monoespaçado, melhor espaçamento/legibilidade.
- Botões padronizados e compactos: topo (Adicionar/Importar), modal (Selecionar pasta/Layout/Cancelar/Salvar), tabela (Editar/Excluir) e ação “Atualizar” dos logs.
- Modal profissionalizado para API:
  - Cabeçalho com tags (pill) de Tipo e Loja/Global.
  - Grupos de campos segmentados em caixas com fundo claro (Contexto e Detalhes).
  - Campos compactos e dicas de uso (endpoint/token).
  - Ação “Testar API” ao lado do endpoint, com feedback no topo (“API OK (N itens)”).
- Correções de comportamento:
  - Persistência do campo “Ativo” como 0/1 ao salvar (resolvido caso de continuar ativo mesmo desmarcado).
  - O Tipo não é mais apagado na gravação; validação leve para exigir Tipo e Parâmetro 1.
  - Normalização defensiva ao carregar lista (loja_id null/numérico, tipo em lower, ativo em 0/1).

Arquivos relevantes:
- `admin/src/views/IntegrationConfig.vue`: modal reestruturado, dropdowns com `dropdown-light`, compactações e bugfixes.
- `admin/src/style.css`: utilitário `.btn-compact`, refino das regras de `.p-button` (não força text/link/secondary), overlays claros globais.

### Backend — Integrações (API)
- Novo endpoint: `POST /admin/integracoes/testar-api`
  - Faz GET na URL informada (Bearer opcional), valida JSON e retorna resumo: `success`, `status`, `count` e `sample` (quando aplicável).
  - Suporta testes rápidos direto do modal, preparando a operação via API para produção.
- Endpoint `POST /admin/integracoes` já coerente com `loja_id` vindo do UI (string/null/numérico) e aceita `ativo` como 0/1.

### Resultados visíveis
- Modal exibe “Editar Integração · API” (ou tipo correspondente) e Loja/Global em destaque.
- Teste de API mostra feedback “API OK (NNNN itens).” (validado nos prints do painel).
- Itens de menu do seletor de página e dropdowns aparecem claros e alinhados à paleta do cliente.

### Recomendações para produção (integração via API)
- Import agendado (cron/tarefa) com backoff e timeouts (ex.: 10–15s) e retries (ex.: 2–3).
- Paginação/streaming: se a API retornar grandes volumes, implementar paginação incremental no importador.
- Segurança: manter token no Parâmetro 2; avaliar rotacionamento; usar HTTPS quando disponível.
- Mapeamento flexível: hoje suportamos `barcode|codigo`, `name|descricao`, `price|preco`; se necessário, expor mapeamento avançado no layout.
- Observabilidade: logs de import mais sucintos no painel e detalhados em arquivo/servidor; status de última execução por integração.
