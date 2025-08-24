; AgentePRECIX.iss - Script Inno Setup para instalador do Agente Local PRECIX
[Setup]
AppName=Agente Local PRECIX
AppVersion=1.0
; GUID fixo para upgrades limpos (não alterar em releases futuros)
AppId={{7C4F9E25-7B8D-4E4D-9A39-9B0E0F9B9B61}}
; Instala em Program Files adequado à arquitetura
DefaultDirName={autopf}\AgentePRECIX
DefaultGroupName=Agente Local PRECIX
OutputDir=dist
OutputBaseFilename=SetupPRECIX
Compression=lzma
SolidCompression=yes
SetupIconFile=dist\logo-sonda.ico
; Boas práticas produção
PrivilegesRequired=admin
ArchitecturesAllowed=x64
ArchitecturesInstallIn64BitMode=x64
UninstallDisplayIcon={app}\PRECIX.exe
AppPublisher=Sonda Supermercados
VersionInfoCompany=Sonda Supermercados
SetupLogging=yes

[Tasks]
Name: "autostart"; Description: "Iniciar automaticamente com o Windows"; Flags: unchecked
Name: "service"; Description: "Instalar como Serviço do Windows (recomendado)"; Flags: unchecked

[Files]
Source: "dist\ServicePRECIX.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\PRECIX.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\logo-sonda.ico"; DestDir: "{app}"; Flags: ignoreversion
Source: "service_install.ps1"; DestDir: "{app}"; Flags: ignoreversion
Source: "service_install.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\nssm\*"; DestDir: "{app}\nssm"; Flags: recursesubdirs createallsubdirs ignoreversion
; Garante presença do nssm.exe em {app}\nssm\win64 para os scripts
Source: "dist\nssm\nssm-2.24-101-g897c7ad\win64\nssm.exe"; DestDir: "{app}\nssm\win64"; Flags: ignoreversion
; Instala o template de config em {app} (referência) e no LocalAppData (uso)
Source: "config.json"; DestDir: "{app}"; Flags: ignoreversion
Source: "config.json"; DestDir: "{localappdata}\AgentePRECIX"; Flags: ignoreversion onlyifdoesntexist

[Dirs]
; Garante diretório de dados do usuário
Name: "{localappdata}\AgentePRECIX"

[Icons]
Name: "{group}\PRECIX"; Filename: "{app}\PRECIX.exe"
Name: "{userdesktop}\PRECIX"; Filename: "{app}\PRECIX.exe"
Name: "{group}\Agente Local PRECIX (Serviço)"; Filename: "{app}\ServicePRECIX.exe"
Name: "{userdesktop}\Agente Local PRECIX (Serviço)"; Filename: "{app}\ServicePRECIX.exe"
; Autostart opcional
Name: "{userstartup}\Agente Local PRECIX"; Filename: "{app}\PRECIX.exe"; Tasks: autostart

[Run]
; Regra de firewall para HTTP admin local (8010)
Filename: "{sys}\netsh.exe"; Parameters: "advfirewall firewall add rule name=""Agente PRECIX 8010"" dir=in action=allow protocol=TCP localport=8010"; Flags: runhidden; StatusMsg: "Configurando firewall..."
Filename: "{app}\ServicePRECIX.exe"; Description: "Executar Serviço Agente Local PRECIX"; Flags: postinstall nowait skipifsilent
Filename: "{app}\PRECIX.exe"; Description: "Abrir Interface PRECIX"; Flags: postinstall nowait skipifsilent
; Instalar serviço automaticamente (opcional)
Filename: "powershell.exe"; Parameters: "-NoProfile -ExecutionPolicy Bypass -File ""{app}\service_install.ps1"""; Flags: postinstall skipifsilent; Tasks: service

[UninstallRun]
; Remover regra de firewall
Filename: "{cmd}"; Parameters: "/C netsh advfirewall firewall delete rule name=""Agente PRECIX 8010"""; Flags: runhidden
; Tentar remover serviço se existir
Filename: "{app}\nssm\win64\nssm.exe"; Parameters: "stop AgentePRECIX"; Flags: runhidden
Filename: "{app}\nssm\win64\nssm.exe"; Parameters: "remove AgentePRECIX confirm"; Flags: runhidden
