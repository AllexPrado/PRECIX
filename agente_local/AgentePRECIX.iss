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
Source: "config.json"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\Agente Local PRECIX"; Filename: "{app}\AgentePRECIX.exe"
Name: "{{desktop}}\Agente Local PRECIX"; Filename: "{app}\AgentePRECIX.exe"

[Run]
Filename: "{app}\AgentePRECIX.exe"; Description: "Executar Agente Local PRECIX"; Flags: postinstall nowait skipifsilent
