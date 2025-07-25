; AgentePRECIX.iss - Script Inno Setup para instalador do Agente Local PRECIX
[Setup]
AppName=Agente Local PRECIX
AppVersion=1.0
DefaultDirName={pf}\AgentePRECIX
DefaultGroupName=Agente Local PRECIX
OutputDir=dist
OutputBaseFilename=AgentePRECIX_Setup
Compression=lzma
SolidCompression=yes

[Files]
Source: "dist\AgentePRECIX.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\AgentePRECIX_GUI.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "config.json"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\Agente Local PRECIX"; Filename: "{app}\AgentePRECIX.exe"
Name: "{userdesktop}\Agente Local PRECIX"; Filename: "{app}\AgentePRECIX.exe"
Name: "{group}\Agente Local PRECIX (Configuração)"; Filename: "{app}\AgentePRECIX_GUI.exe"
Name: "{userdesktop}\Agente Local PRECIX (Configuração)"; Filename: "{app}\AgentePRECIX_GUI.exe"

[Run]
Filename: "{app}\AgentePRECIX.exe"; Description: "Executar Serviço Agente Local PRECIX"; Flags: postinstall nowait skipifsilent
Filename: "{app}\AgentePRECIX_GUI.exe"; Description: "Abrir Interface Gráfica do Agente Local PRECIX"; Flags: postinstall nowait skipifsilent
