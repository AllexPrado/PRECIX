AgentePRECIX - Installer & Service Technician Checklist

Purpose
- Consolidate the installer and Windows service registration steps for the Agente Local PRECIX.
- Describe a minimal, repeatable flow so technicians can install the agent as a Windows Service with NSSM.

Preconditions (build machine)
- Python 3.11+ and PyInstaller installed.
- Inno Setup (ISCC.exe) installed to compile the .iss script if you want an installer EXE.
- Internet access (optional) to download NSSM via `download_nssm.ps1` or include NSSM in `dist\nssm\win64`.

Build flow (developer)
1. From project root (PowerShell):

```powershell
# Clean and build
cd <project-root>\agente_local
.
# Example: build script will run pyinstaller and try to compile Inno Setup
powershell -ExecutionPolicy Bypass -File .\build_installer.ps1
```

2. Verify `dist` contains:
- `PRECIX.exe` (GUI)
- `ServicePRECIX.exe` (service wrapper)
- `nssm\win64\nssm.exe` (or ensure `service_install.ps1` will find NSSM)
- `logo-sonda.ico` and `config.json` (template)

3. Compile `AgentePRECIX.iss` using Inno Setup Compiler (ISCC.exe) if not produced by script.

Installer contents and behavior
- The Inno script `AgentePRECIX.iss` copies the executables under `{app}` and includes `service_install.ps1` and `service_install.bat`.
- The installer will offer postinstall actions allowing the technician to run the service install scripts (requires elevation).

Service installation (technician)
- Preferred: Run `service_install.ps1` as Administrator. This script will try to use the bundled `nssm` under the installed application folder (`{app}\nssm\win64\nssm.exe`).
- Alternative: Run `service_install.bat` from an elevated command prompt located in the installed `{app}` folder.

Commands (Admin PowerShell)
```powershell
# Example: run from elevated PowerShell
Set-Location 'C:\Program Files\AgentePRECIX'
# If using the provided PS1 script (it will relaunch itself elevated if needed)
powershell -ExecutionPolicy Bypass -File .\service_install.ps1
# Or manually with NSSM
.\nssm\win64\nssm.exe install AgentePRECIX .\ServicePRECIX.exe
.\nssm\win64\nssm.exe set AgentePRECIX Start SERVICE_AUTO_START
.\nssm\win64\nssm.exe start AgentePRECIX
```

Post-install checklist (technician)
- Confirm service `AgentePRECIX` exists and is `Running` in Services.msc.
- Confirm `C:\Program Files\AgentePRECIX\config.json` exists and contains production values.
  - Set `ack_enabled: true` and `ack_token: <strong random token>` if you want to protect local admin endpoints.
  - Set `backend_token` to a valid token if the backend expects bearer authentication for product writes.
- Confirm `http_port` (default 8010) bound on localhost only.
- Validate endpoints:
  - http://127.0.0.1:8010/health
  - http://127.0.0.1:8010/logs?lines=20
  - POST http://127.0.0.1:8010/ack/update with header `X-ACK-Token: <token>` to verify ACK persistence.

Security notes
- Do NOT expose the admin HTTP port externally. If remote access is required, use a secure tunnel or VPN and restrict sources.
- Use strong random tokens for `ack_token` and `backend_token` (e.g., Python: `import secrets; secrets.token_urlsafe(32)`).

Troubleshooting
- If NSSM is missing, copy a compatible `nssm.exe` to `dist\nssm\win64` before running the installer or place `nssm` in `C:\nssm\win64`.
- If service fails to start, check `agente.log` in the installation folder and the Windows Event Log.

Contact
- Dev team: Allex

---

## Trabalho realizado (resumo)

Data: 2025-08-23

Resumo das alterações realizadas no agente local e na GUI durante o ciclo de implementação e depuração:

- Corrigido comportamento da GUI para evitar criação de widgets no momento da importação.
  - Arquivo principal modificado: `agente_local/gui.py`.
  - A classe `IntegracaoPrecixWidget` foi reindentada para que toda a criação de widgets ocorra somente dentro de `__init__`.
  - Adicionados helpers UI: `_gerar_token_into` e `_copy_to_clipboard` para geração e cópia de tokens.
  - Corrigidos callbacks que causavam `AttributeError` ao clicar em botões Gerar/Copiar.

- Persistência e fluxos do agente:
  - Implementações e hardening para persistência de ACKs em `acks.jsonl` e sinalizadores de status (`api_write_supported`, `api_write_error`) no serviço principal (alterações já integradas no agente/service codebase).

- Instalador e scripts de serviço:
  - Inno Setup script `AgentePRECIX.iss` foi preparado para incluir `PRECIX.exe`, `ServicePRECIX.exe` e scripts de instalação do serviço (`service_install.ps1` / `service_install.bat`).
  - Criado script técnico `preflight_check.ps1` para verificação pós-instalação.
  - Observação: o binário NSSM para registro de serviço deve ser incluído em `dist\nssm\win64\nssm.exe` para permitir instalação offline; atualmente o repositório pode conter apenas um README nessa pasta — ver próximos passos.

- Diagnósticos e validações:
  - Adicionado um utilitário temporário de diagnóstico `_diag_import_runner.py` (na raiz do projeto) que detecta tentativas de criação de QWidgets antes da inicialização do `QApplication`.
  - `py_compile` foi executado sobre `agente_local/gui.py` para garantir sintaxe válida.

Notas operacionais:
- O usuário (técnico) realizou edições manuais em `C:\Users\<user>\AppData\Local\AgentePRECIX\config.json` e em `d:\Sonda\Precix\agente_local\gui.py` — essas mudanças foram respeitadas; a documentação e o instalador assumem que o `config.json` final será o usado em produção.

## Como testar localmente (rápido)

1. Verificar que Python 3.11+ e dependências (PyQt5) estão instaladas.
2. Do diretório `agente_local`, executar a GUI diretamente para validar interações:

```powershell
python gui.py
```

3. Na aba "API" (Integração):
  - Usar os botões "Gerar" para popular `ack_token` e `backend_token`.
  - Usar "Copiar" para colocar o token no clipboard.
  - Salvar configuração e confirmar que `CONFIG_PATH` (local do config.json) contém os valores.

4. Testar endpoints de admin (após rodar o agente em modo serviço ou em background):
  - GET http://127.0.0.1:8010/health
  - POST http://127.0.0.1:8010/ack/update com header `X-ACK-Token: <ack_token>` para validar persistência de ACKs.

## Próximos passos sugeridos

1. Gerar o instalador Inno Setup (criando `SetupPRECIX.exe`) e testar instalação numa VM limpa.
   - Garanta que `dist\nssm\win64\nssm.exe` esteja presente antes de executar a instalação offline, ou modifique `service_install.ps1` para baixar NSSM dinamicamente se permitido.
2. Executar `preflight_check.ps1` no sistema de destino após instalação e antes de concluir o suporte ao cliente.
3. Executar um teste de serviço: instalar o serviço via `service_install.ps1` e confirmar `AgentePRECIX` em Services.msc com estado `Running`.
4. Automatizar um teste de integração leves:
   - Teste de import do módulo GUI sem `QApplication` (passou com o runner diagnóstico).
   - Teste funcional que inicia a GUI, clica nos botões Gerar/Copiar (pode ser um teste manual ou automatizado via ferramentas de GUI).
5. Incluir o binário NSSM no artefato `dist/` para instalações offline ou documentar explicitamente o requisito de conectividade para download de NSSM.

## Commit e versão

As mudanças atuais serão commitadas no branch `main` com mensagem clara (veja abaixo). Se quiser, eu também posso criar um branch específico para essas alterações.

---

<!-- AUTO: summary appended by automation on 2025-08-23 -->

