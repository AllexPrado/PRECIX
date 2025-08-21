# Documentação do Agente Local PRECIX

## Visão Geral
O Agente Local PRECIX é responsável por integrar, processar e distribuir dados de preços e equipamentos entre sistemas legados (PDVs, equipamentos antigos) e sistemas modernos (PWA, API, Banco de Dados). Ele permite migração gradual e operação híbrida, garantindo que todos os equipamentos recebam as atualizações corretas.

## Funcionalidades Principais

### 1. Fonte de Dados
- O usuário pode escolher a fonte principal de dados para atualização de preços:
  - **Arquivo**: Lê os dados de um arquivo texto local.
  - **API**: Busca os dados de uma API REST externa.
  - **Banco de Dados**: (Futuro) Busca os dados diretamente de um banco de dados.
- A escolha é feita na aba "Integração PRECIX" e salva no campo `tipo_integracao` do `config.json`.

### 2. Geração de Arquivo Texto
- Independentemente da fonte de dados escolhida, o sistema sempre gera o arquivo texto no formato esperado pelos equipamentos legados/PDVs.
- Isso garante que todos os equipamentos antigos continuem funcionando normalmente durante a migração.

### 3. Integração com Equipamentos PWA
- Os equipamentos PWA são alimentados diretamente pela API configurada (campo "URL da API externa").
- O sistema pode buscar dados da API e também servir dados para os PWAs, conforme configuração.

### 4. Autenticação
- Suporte a autenticação básica (usuário/senha) e Bearer Token para integração via API.
- Os campos de autenticação são opcionais e podem ser preenchidos conforme a necessidade da API do cliente.

### 5. Configuração e Interface
- Interface gráfica compacta e moderna, com abas para cada área de configuração.
- Todas as configurações são salvas em `config.json` no diretório do usuário.
- Permite selecionar arquivos de entrada e saída, configurar campos exportados, layout, integração IA, etc.

### 6. Automação
- Permite configurar intervalo de atualização automática.
- Botão para forçar atualização manual, que executa imediatamente o processamento da fonte de dados e gera o arquivo texto.

### 7. Logs e Monitoramento
- Aba de logs para visualização de eventos e erros.
- Monitoramento do status dos equipamentos.

## Fluxo de Atualização
1. O usuário escolhe a fonte de dados (Arquivo, API, Banco de Dados).
2. O sistema busca/prepara os dados a partir da fonte escolhida.
3. Sempre gera o arquivo texto para os equipamentos legados.
4. Os equipamentos PWA continuam sendo alimentados pela API.
5. O processo pode ser automático (timer) ou manual (botão).

## Observações
- O sistema está preparado para coexistência de tecnologias e migração gradual.
- Novas integrações (ex: Banco de Dados) podem ser implementadas facilmente.
- O arquivo texto nunca deixa de ser gerado, garantindo compatibilidade total.

---

## Comentários no Código
- O código está documentado com comentários explicando o fluxo de integração, geração de arquivo e lógica de escolha da fonte de dados.
- Veja as classes `ConfiguracaoArquivoWidget` e `IntegracaoPrecixWidget` para detalhes do fluxo híbrido.

---

Dúvidas ou sugestões? Entre em contato com o time de desenvolvimento PRECIX.

---

## Registro de alterações e atividades — 20/08/2025

Resumo das ações realizadas hoje:

- Ajustes e correções no agente local (`main.py`) para harmonizar comportamento entre GUI (PRECIX) e CLI/service:
  - Corrigi leitura de origem do tipo *Arquivo* para suportar arquivos sem cabeçalho usando o campo `arquivo_layout` e o separador (`arquivo_separador`). Antes o leitor exigia cabeçalho, o que produzia arquivos em branco quando o cliente fornecia layout posicional.
  - Enderecei inconsistências de chaves em `config.json` (ex.: `db_nome` vs `db_path`, `db_sql` vs `db_query`) — agora `buscar_dados_do_banco()` aceita `db_nome`/`db_path` e `db_sql`/`db_query` e resolve caminhos relativos (procura em `dist/`, diretório do agente, cwd).
  - Implementei `enviar_para_api(dados)` que faz POST para o endpoint configurado (chaves possíveis: `api_update`, `api_destino`, `backend_url`, `api_externa`, `api_url`).
  - Integrei o fluxo para que, após gerar o arquivo texto, o agente tente enviar os dados para a API e execute o envio automático (FTP/TCP/LOCAL) conforme configuração.
  - Adicionei logging mais detalhado para diagnóstico (linhas iniciais do arquivo, caminhos resolvidos, número de registros lidos).

- Testes e observações feitas hoje:
  - Geração via API: OK — o agente buscou os dados pela API e gerou o `pricetab.txt` corretamente (23.470 produtos no teste).
  - Geração via Arquivo: falhou inicialmente com saída em branco em testes anteriores — implantei melhoria de parsing hoje; após essa mudança, por favor repita o teste (o cliente reportou que, nos testes realizados hoje, o arquivo ainda ficou em branco; é provável que o teste de leitura tenha sido executado antes das correções ou haja formatos de entrada não previstos; ver abaixo próximos passos de diagnóstico).
  - Geração via Banco de Dados (SQLite): a UI mostrou conexão, mas o arquivo não foi atualizado inicialmente porque as chaves do `config.json` não batiam com as esperadas pela função (agora ajustada). Após as correções, é necessário executar novo teste forçado para validar leitura da DB.

Decisões e mudanças de código relevantes:
  - `gerar_arquivo_precos()` foi endurecida para aceitar ambos formatos (list/dict), ignorar campos ausentes e sempre garantir criação do diretório de saída.
  - `buscar_dados_do_banco()` agora procura por `db_nome`/`db_path` e tenta localizar o arquivo em caminhos comuns (incluindo `dist/`). Só implementamos SQLite nesta versão; logs informam se outro SGBD for solicitado.

Problemas ainda a verificar (pendências):
  - Confirmar por que o teste via Arquivo produziu `pricetab.txt` em branco no ambiente do cliente mesmo após as correções: coletar um sample do arquivo de entrada e log de execução (últimas linhas de `agente.log`).
  - Autenticação em `enviar_para_api` (Basic/Bearer) ainda precisa ser implementada caso a API exija headers; atualmente a função faz POST sem headers.
  - Suporte a outros bancos (MySQL/Postgres/SQL Server/Oracle) será adicionado quando houver necessidade; considerar SQLAlchemy para unificar adaptadores.

Próximos passos para 21/08/2025 (prioridade):
 1. Repetir testes forçados com `tipo_integracao='Arquivo'` e `tipo_integracao='Banco de Dados'` após sincronizar as mudanças (rodar a versão debug para capturar logs completos). Coletar `agente.log` (últimas 200 linhas) para análise.
 2. Implementar suporte a autenticação em `enviar_para_api` (opções: `none`, `basic`, `bearer`) e atualizar `config.json` com `api_auth_type`, `api_user`, `api_password`, `api_token`.
 3. Criar scripts de smoke test automatizado para os três modos (arquivo, api, banco) que gerem fixtures (CSV e SQLite) e executem um `forcar_atualizacao_manual()` verificando saída.
 4. Se o cliente migrar para outro SGBD, adicionar driver e adaptador (preferencialmente via SQLAlchemy).
 5. Rodar testes E2E com um terminal legado (ou simulação) para validar envio FTP/TCP e comportamento do equipamento.

Commit e deploy
 - Hoje foi preparado o código e gerados builds (incluindo `PRECIX.exe` e `ServicePRECIX.exe`). Foi solicitado commit deste documento e das mudanças no repositório.
 - Observação: o push para o remoto depende de credenciais do Git local; caso o push falhe, o commit ficará local e eu deixarei as instruções para você finalizar o push.

---

Arquivo atualizado: 20/08/2025 — equipe PRECIX
