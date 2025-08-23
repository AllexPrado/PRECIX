AgentePRECIX - Guia de implantação mínima (produção)

Objetivo: preparar o agente local para implantação rápida em cliente, garantindo segurança mínima e operação automática como serviço.

Passos resumidos

1) Gerar binário
- Utilize PyInstaller para empacotar `main.py` (e dependências) em `agente.exe` dentro de `dist\`.

2) Preparar instalador
- Use `inno_installer_template.iss` com InnoSetup e inclua a pasta `dist` e `config.json`.

3) Configuração inicial (no host cliente)
- Abra `C:\Users\<user>\AppData\Local\AgentePRECIX\config.json` ou o `config.json` instalado em `{app}` e ajuste:
  - `ack_enabled`: true
  - `ack_token`: defina um token forte (ex.: gerar via `python -c "import secrets; print(secrets.token_urlsafe(32))"`)
  - `http_host`: 127.0.0.1 (recomendado)
  - `http_port`: 8010
  - `arquivo_local`: caminho onde o `pricetab.txt` será escrito
  - Se usar `Banco de Dados`, use caminho absoluto para `db_nome`.

4) Instalar como serviço (Windows)
- Recomendo usar `nssm` para instalar o serviço. Há um exemplo em `service_install.ps1`.
- Execute o PowerShell como Administrador:
  - Ajuste o caminho de `agente.exe` no script e execute: `.\service_install.ps1`

5) Firewall e segurança
- Bloquear a porta admin no firewall se não for acessada remotamente (ex.: `New-NetFirewallRule -DisplayName "AgentePRECIX admin" -Direction Inbound -LocalPort 8010 -Action Block`)
- Se precisar de acesso remoto, abra apenas fontes seguras e use `ack_token` forte.

6) Validação pós-instalação
- Verifique serviço em execução
- Acesse `http://127.0.0.1:8010/health` — deve retornar `{"status":"ok","last_generated":...}`
- Acesse `http://127.0.0.1:8010/logs?lines=50` para tail dos logs
- Teste POST de ACKs com header `X-ACK-Token: <token>` para confirmar persistência em `acks.jsonl`.

Silent install (for technician automation)
- To run the produced installer silently and automatically install service (requires admin):

```powershell
Start-Process -FilePath 'C:\path\to\SetupPRECIX.exe' -ArgumentList '/VERYSILENT /SUPPRESSMSGBOXES /NORESTART' -Verb RunAs
```

The installer includes `nssm` and a postinstall step that will attempt to install the service automatically; the user must accept UAC for service registration.

7) Logs e retenção
- O agente já rotaciona logs (máx 5MB por arquivo, 5 backups). Monitorar espaço e configurar políticas de limpeza se necessário.

8) Serviços adicionais (opcional)
- Implementar TLS proxy (stunnel/nginx) se expor admin ou configurar VPN/ACL.
- Implementar retry/backoff para envios FTP/TCP/API (recomendado).

Contato
- Equipe de desenvolvimento: Allex
