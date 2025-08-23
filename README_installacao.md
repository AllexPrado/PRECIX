Instalação mínima do Agente PRECIX (Windows)

Pré-requisitos:
- Python 3.11 (só para ambiente de desenvolvimento) ou usar o EXE gerado com PyInstaller
- Inno Setup (opcional, para gerar instalador)
- NSSM (https://nssm.cc/) para registrar o serviço no Windows

Passos rápidos para gerar o instalador e registrar serviço:

1) Gerar EXE (PyInstaller) — já deve existir em dist\
   pyinstaller --onefile --noconsole --name AgentePRECIX main.py

2) Baixar NSSM e colocar em dist\\nssm (ou usar o helper nssm-download.ps1):
   .\\nssm-download.ps1

3) Gerar o script Inno e rodar ISCC:
   .\\build_installer.ps1
   "C:\\Program Files (x86)\\Inno Setup 6\\ISCC.exe" .\\AgentePRECIX_installer.iss

4) O instalador inclui um `service_install.bat` que registra o serviço usando NSSM.

5) Após instalar, configurar o `config.json` em `%LOCALAPPDATA%\\AgentePRECIX\\config.json` com:

{
  "api_update": "http://<backend-host>:8000/admin/products/bulk",
  "backend_token": "<JWT_TOKEN>",
  "tipo_integracao": "API",
  "automacao_intervalo": 1,
  "arquivo_local": "pricetab.txt"
}

6) Reiniciar serviço Windows ou executar manualmente o agente:
   sc start AgentePRECIX

Se quiser, eu ajusto o `service_install.bat` para seu ambiente (caminho do executável no dist).
