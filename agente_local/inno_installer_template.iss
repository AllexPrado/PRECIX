; Inno Setup script template for AgentePRECIX
[Setup]
AppName=AgentePRECIX
AppVersion=1.0
DefaultDirName={pf}\AgentePRECIX
DefaultGroupName=AgentePRECIX
OutputBaseFilename=AgentePRECIX_Installer
Compression=lzma
SolidCompression=yes

[Files]
Source: "dist\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "config.json"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\AgentePRECIX"; Filename: "{app}\agente.exe"

[Run]
Filename: "{app}\agente.exe"; Description: "Start AgentePRECIX"; Flags: nowait postinstall skipifsilent

; Post-install notes: consider running service_install.ps1 as part of deployment automation
