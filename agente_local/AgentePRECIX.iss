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

[Files]
Source: "dist\ServicePRECIX.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\PRECIX.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "config.json"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\PRECIX"; Filename: "{app}\PRECIX.exe"
Name: "{userdesktop}\PRECIX"; Filename: "{app}\PRECIX.exe"
Name: "{group}\Agente Local PRECIX (Serviço)"; Filename: "{app}\ServicePRECIX.exe"
Name: "{userdesktop}\Agente Local PRECIX (Serviço)"; Filename: "{app}\ServicePRECIX.exe"

[Run]
Filename: "{app}\ServicePRECIX.exe"; Description: "Executar Serviço Agente Local PRECIX"; Flags: postinstall nowait skipifsilent
Filename: "{app}\PRECIX.exe"; Description: "Abrir Interface PRECIX"; Flags: postinstall nowait skipifsilent
