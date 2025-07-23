# Integração de Equipamentos Legados Honeywell com PRECIX

## Objetivo
Garantir a atualização automática e confiável dos preços nos terminais legados Honeywell, eliminando falhas e dependências do software Kiosk, e permitindo migração gradual para tablets/web.

---

## Visão Geral do Processo
1. **PRECIX (nuvem):** Gerencia produtos, preços, lojas e equipamentos.
2. **Agente Local:** Instalado em cada servidor local do cliente, cadastra IPs dos terminais legados e comunica com PRECIX.
3. **Terminais Legados:** Recebem arquivos de preços via FTP/TCP, salvam localmente e consultam a cada escaneamento.

---

## Tecnologias Utilizadas
- **PRECIX Backend:** Python (FastAPI), Node.js ou similar.
- **Agente Local:** Python (recomendado), C# ou Node.js (Windows Service).
- **Comunicação:** FTP/TCP (para envio dos arquivos), HTTP/REST (para comunicação com PRECIX).
- **Monitoramento:** Logs centralizados, alertas de falha, dashboard de status.

---

## Checklist de Integração
- [ ] Mapear todos os terminais legados (IP, porta, loja, descrição)
- [ ] Validar formato dos arquivos de preços (`pricetab.txt`, `produto.db`, etc.)
- [ ] Implementar exportação dos arquivos no PRECIX
- [ ] Desenvolver agente local para:
    - [ ] Buscar dados do PRECIX (API/view/arquivo texto)
    - [ ] Enviar arquivos para os terminais via FTP/TCP
    - [ ] Monitorar sucesso/falha da atualização
    - [ ] Registrar logs e alertas
- [ ] Testar atualização em ambiente real
- [ ] Documentar todo o processo para suporte e manutenção
- [ ] Planejar migração gradual para tablets/web

---

## Passo a Passo Detalhado

### 1. Levantamento dos Equipamentos
- Solicitar ao cliente a lista de lojas, IPs, portas e descrição dos terminais legados.
- Cadastrar essas informações no PRECIX e no agente local.

### 2. Validação dos Arquivos de Preços
- Analisar os arquivos gerados pelo Kiosk (`pricetab.txt`, `produto.db`, etc.).
- Garantir que o PRECIX exporte os arquivos no mesmo formato.

### 3. Desenvolvimento do Agente Local
- Criar um serviço em Python (ou C#/Node.js) que:
    - Consome dados do PRECIX (API/view/arquivo texto)
    - Gera os arquivos de preços
    - Envia os arquivos via FTP/TCP para os terminais
    - Monitora e registra logs de atualização
    - Permite configuração dos IPs/portas dos terminais

### 4. Comunicação e Atualização
- Configurar o agente para rodar periodicamente (ex: a cada X minutos ou sob demanda).
- Garantir que os arquivos sejam transferidos e salvos corretamente nos terminais.
- Implementar verificação de sucesso/falha e alertas automáticos.

### 5. Testes e Validação
- Realizar testes em ambiente real, simulando atualização de preços.
- Validar se os terminais exibem os preços corretos após atualização.
- Ajustar intervalos, formatos e rotinas conforme necessário.

### 6. Monitoramento e Suporte
- Centralizar logs e status das atualizações no PRECIX.
- Implementar dashboard para acompanhamento em tempo real.
- Documentar procedimentos de suporte e contingência.

### 7. Migração Gradual para Tablets/Web
- Preparar o PRECIX para funcionar tanto com terminais legados quanto com tablets/web.
- Permitir que lojas migrem gradualmente, sem impacto no backend.

---

## Como o Kiosk Atualiza os Preços dos Equipamentos Legados

### Funcionamento do Kiosk
- O Kiosk é instalado localmente em cada loja.
- Os dados de produtos e preços são gerados em arquivos texto ou binários (`pricetab.txt`, `produto.db`, etc.)
- O Kiosk cadastra os terminais legados (consultores Honeywell) via IP e porta.
- Scripts `.bat` são usados para transferir os arquivos de preços para os terminais via FTP/TCP, utilizando programas como `psftp.exe`.
- Os arquivos são salvos localmente nos terminais, que consultam o arquivo a cada escaneamento de produto.
- A atualização depende do Kiosk estar aberto e dos scripts funcionarem corretamente. Falhas nos scripts ou no software causam problemas de atualização.
- Logs são gerados localmente, dificultando monitoramento centralizado.

---

## Como o PRECIX Vai Atualizar os Equipamentos Legados

### Funcionamento do PRECIX
- O PRECIX é centralizado na nuvem, gerenciando todos os produtos, preços, lojas e equipamentos.
- Um agente local é instalado em cada loja, cadastra os IPs/portas dos terminais legados e comunica com o PRECIX.
- O agente recebe os dados do PRECIX (via API, view do banco ou arquivo texto) e gera os arquivos de preços no formato esperado.
- O agente transfere os arquivos para os terminais via FTP/TCP, sem depender de scripts .bat ou do Kiosk aberto.
- O agente monitora o sucesso/falha da atualização, registra logs e envia alertas para o PRECIX.
- O PRECIX centraliza o monitoramento, permitindo acompanhamento em tempo real e suporte proativo.
- Permite migração gradual para tablets/web, sem impacto no backend.

---

## Diferenças e Melhorias
- **PRECIX elimina dependência de scripts .bat e do Kiosk aberto.**
- **Monitoramento centralizado e logs na nuvem.**
- **Atualização automática, confiável e escalável.**
- **Flexibilidade para consumir dados via API, view ou arquivo texto.**
- **Preparado para migração gradual para tablets/web.**

---

## Presença e Gestão da IA no Agente Local

- O agente de IA do PRECIX estará embarcado no agente local instalado em cada loja.
- A IA irá monitorar continuamente o funcionamento dos equipamentos legados, identificar falhas, sugerir correções e otimizar rotinas de atualização.
- Toda a gestão do agente local será supervisionada pela IA, incluindo:
    - Monitoramento dos logs e status dos terminais
    - Detecção automática de problemas de comunicação ou atualização
    - Ações proativas para garantir 100% de disponibilidade
    - Alertas inteligentes para equipe de suporte
    - Sugestão de melhorias e automações conforme o uso
- A IA já está integrada ao backend PRECIX e será embarcada também no agente local, garantindo inteligência distribuída e centralizada.
- O objetivo é que a IA seja responsável por toda a gestão, automação e suporte dos equipamentos legados, tornando o PRECIX autônomo e confiável em todos os cenários.
- **Além de monitorar, a IA irá corrigir automaticamente qualquer erro detectado nos equipamentos ou no agente local, realizando ações corretivas sem intervenção humana sempre que possível.**

---

## Observação sobre Lojas com Tablets
- As lojas que já utilizam tablets permanecem com o funcionamento atual, acessando o PRECIX via web/PWA, sem necessidade de agente local ou integração com equipamentos legados.
- O sistema PRECIX está preparado para operar simultaneamente com terminais legados (via agente) e tablets/web, permitindo migração gradual e sem impacto no backend.

---

## Nome do arquivo
`INTEGRACAO_EQUIPAMENTOS_LEGADOS.md`

---

**Dúvidas ou ajustes? Solicite revisão deste documento!**
