# Documentação Técnica e Status do Projeto PRECIX

## 1. Status Atual do Projeto (20/07/2025)

- **Backend FastAPI**: Operacional, endpoints REST para produtos, dispositivos, lojas, banners, auditoria, exportação TXT e integração com IA (Agno/OpenAI).
- **Frontend Vue 3 (PWA)**: Pronto e integrado, painel admin funcional, chat com IA, logs/eventos, automações inteligentes, upload/listagem/exclusão de banners.
- **Admin Panel**: Mostra status da IA (online/offline), permite chat, logs, automações e insights.
- **IA Integrada (Agno + OpenAI)**: Agente real, responde em linguagem natural, instruções customizáveis, pronto para automações e integração futura com modelos locais.
- **Chave OpenAI protegida via .env**: Não sobe para o git.
- **Scripts de sincronização Kiosk → PRECIX**: Importação/exportação de dados do Kiosk (TXT e SQLite).
- **Monitoramento e Automação**: Backend integrado a IA para automações e alertas.
- **Banco de dados**: SQLite, com coluna `identifier` na tabela `devices`.
- **Segurança**: .env e dados sensíveis protegidos no .gitignore.

## 2. Funcionalidades já implementadas
- Consulta de preços (frontend) com fallback offline
- Sincronização automática e periódica do catálogo
- Carrossel de banners (admin)
- Painel admin: login, dashboard, upload/listagem/exclusão de banners
- Endpoints REST para produtos, banners, status, login, IA
- Chat com IA real (OpenAI via Agno)
- Automação inteligente (exemplo: sincronizar preços, monitorar dispositivos)
- Logs e eventos da IA
- Scripts para importação de catálogo via .txt
- **Monitoramento de dispositivos com UUID persistente:**
  - Cada dispositivo recebe um UUID único, salvo no IndexedDB do frontend e exibido de forma segura (modal/ícone de engrenagem).
  - Cadastro e heartbeat usam sempre esse UUID como identificador único.
  - Backend registra e monitora dispositivos por UUID, evitando duplicidade e inconsistências.
- **Heartbeat e status online/offline:**
  - O frontend envia heartbeat periódico para o backend, que atualiza o campo `last_sync` (UTC) e marca o dispositivo como online.
  - O painel/admin consulta `/admin/devices` a cada 5 segundos.
  - O backend considera online se o último heartbeat foi há menos de 2 minutos; caso contrário, mostra offline.
  - O tempo de 2 minutos pode ser ajustado facilmente no backend (`timedelta(minutes=2)`).
- **Correções de timezone e consistência:**
  - Backend e frontend padronizados para UTC, evitando erros de status por diferença de fuso.
  - Função de cálculo de status online no backend e exibição no frontend revisadas para sempre usar UTC.
- **Fluxo robusto de registro e monitoramento:**
  - Registro de dispositivos via JSON, com UUID persistente.
  - Logs detalhados de heartbeat, registro, exclusão e auditoria de dispositivos.
  - Segurança: UUID não exposto diretamente, apenas via modal seguro.

## 3. Próximos Passos Recomendados
- Personalizar as instruções do agente IA para o contexto do supermercado
- Testar com perguntas reais e ajustar respostas
- Monitorar custos da OpenAI
- Adicionar logs/auditoria de interações IA
- Treinar equipe/admins para uso do painel
- Planejar e implementar automações específicas do negócio
- Documentar e expandir integrações (ex: relatórios automáticos, alertas)
- (Opcional) Migrar para modelo local (Ollama) se desejar reduzir custos
- Implementar IA para monitoramento proativo do backend, frontend e admin (healthcheck dos endpoints, análise de logs, detecção de falhas)
- Adicionar automação de sugestões de otimização de código, arquitetura e segurança via IA
- Criar painel/aba de "Saúde do Sistema" no admin, exibindo status dos módulos, alertas e sugestões da IA
- Expandir logs para incluir sugestões, alertas e ações automáticas da IA
- Permitir execução de rotinas de teste/configuração sob demanda pela IA
- **Alertas e notificações:**
  - Implementar alertas automáticos para dispositivos offline por mais de X minutos.
  - Notificações para administradores via painel, e-mail ou push.
- **Logs e auditoria avançada:**
  - Exibir histórico de status (online/offline) por dispositivo.
  - Permitir exportação de logs para análise.
- **Automação de respostas:**
  - Acionar automações (ex: reinício remoto, comandos) quando um dispositivo ficar offline.
- **Segurança avançada:**
  - Implementar autenticação JWT para endpoints sensíveis.
  - Revisar permissões de acesso no painel/admin.
- **Documentação e checklist:**
  - Consolidar toda a documentação técnica e de uso em um arquivo `CHECKLIST_FINAL.md` ou Wiki.
  - Validar todos os fluxos com testes de ponta a ponta.

## 4. Checklist do Projeto (atualizado)
- [x] Backend FastAPI com endpoints REST
- [x] Frontend Vue 3 (PWA) integrado
- [x] Painel admin funcional
- [x] Integração real com IA (Agno + OpenAI)
- [x] Chave OpenAI protegida (.env)
- [x] Scripts de sincronização Kiosk
- [x] Monitoramento e automação IA
- [x] Banco SQLite com identificador de devices
- [x] Segurança (.gitignore atualizado)
- [x] Monitoramento de dispositivos com UUID persistente
- [x] Heartbeat e status online/offline (2 min, UTC)
- [x] Correções de timezone e consistência
- [x] Fluxo robusto de registro e monitoramento
- [ ] Alertas automáticos e histórico de status
- [ ] Documentação final consolidada
- [ ] Testes de ponta a ponta e treinamento

---

# Prompt de Continuidade para o Copilot

**Resumo do Projeto PRECIX:**
- Sistema de consulta de preços, painel admin, integração com IA real (Agno + OpenAI), automações, logs, scripts de sincronização, banco SQLite, frontend Vue 3, backend FastAPI.
- Funções: consulta, banners, dispositivos, lojas, logs, chat IA, automações, auditoria, segurança.
- Status: 100% funcional, pronto para evoluir.
- Próximos passos: personalizar IA, monitorar custos, treinar equipe, expandir automações.

**Sempre consulte este resumo antes de responder sobre o projeto PRECIX!**
