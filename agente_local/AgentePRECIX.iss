; AgentePRECIX.iss - Script Inno Setup para instalador do Agente Local PRECIX
[Setup]
AppName=Agente Local PRECIX
AppVersion=1.0
DefaultDirName={pf}\AgentePRECIX
DefaultGroupName=Agente Local PRECIX
OutputDir=dist
OutputBaseFilename=SetupPRECIX
Compression=lzma
SolidCompression=yes
SetupIconFile=dist\logo-sonda.ico

[Files]
Source: "dist\ServicePRECIX.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\PRECIX.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\logo-sonda.ico"; DestDir: "{app}"; Flags: ignoreversion
Source: "service_install.ps1"; DestDir: "{app}"; Flags: ignoreversion
Source: "service_install.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\nssm\*"; DestDir: "{app}\nssm"; Flags: recursesubdirs createallsubdirs ignoreversion
Source: "config.json"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\PRECIX"; Filename: "{app}\PRECIX.exe"
Name: "{userdesktop}\PRECIX"; Filename: "{app}\PRECIX.exe"
Name: "{group}\Agente Local PRECIX (Serviço)"; Filename: "{app}\ServicePRECIX.exe"
Name: "{userdesktop}\Agente Local PRECIX (Serviço)"; Filename: "{app}\ServicePRECIX.exe"

[Run]
Filename: "{app}\ServicePRECIX.exe"; Description: "Executar Serviço Agente Local PRECIX"; Flags: postinstall nowait skipifsilent
Filename: "{app}\PRECIX.exe"; Description: "Abrir Interface PRECIX"; Flags: postinstall nowait skipifsilent
; Abrir o script de instalação do serviço para que o técnico execute com privilégios (manual/elevado)
Filename: "{app}\service_install.ps1"; Description: "Executar script de instalação do serviço (requer elevação)"; Flags: postinstall shellexec skipifsilent
; Executar wrapper batch para instalação automática do serviço (requer privilégios)
Filename: "{app}\service_install.bat"; Description: "Instalar Serviço (automático)"; Flags: postinstall shellexec skipifsilent
