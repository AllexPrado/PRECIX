[Setup]
AppName=AgentePRECIX
AppVersion=1.0
DefaultDirName={pf}\AgentePRECIX
DefaultGroupName=AgentePRECIX
DisableProgramGroupPage=yes

[Files]
Source: "{#MyAppExe}"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs

[Run]
Filename: "{app}\service_install.bat"; Flags: runhidden
