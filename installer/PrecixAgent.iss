; PrecixAgent.iss - Inno Setup script for Agente PRECIX
#define MyAppName "Agente PRECIX"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Sonda"
#define MyAppExeName "AgentePRECIX.exe"
#define MyInstallDir "{pf}\AgentePRECIX"

[Setup]
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={#MyInstallDir}
DefaultGroupName={#MyAppName}
DisableDirPage=no
DisableProgramGroupPage=yes
OutputBaseFilename=AgentePRECIX_Setup
Compression=lzma2
SolidCompression=yes
ArchitecturesInstallIn64BitMode=x64
PrivilegesRequired=admin

[Languages]
Name: "portuguese"; MessagesFile: "compiler:Languages\BrazilianPortuguese.isl"

[Dirs]
Name: "{#MyInstallDir}"; Flags: uninsalwaysuninstall
Name: "{localappdata}\AgentePRECIX"

[Files]
Source: "d:\Sonda\Precix\dist\AgentePRECIX.exe"; DestDir: "{#MyInstallDir}"; Flags: ignoreversion
; Optional default config (copy only if not exists)
Source: "d:\Sonda\Precix\agente_local\config.json"; DestDir: "{localappdata}\AgentePRECIX"; Flags: onlyifdoesntexist; DestName: "config.json"
; Bundle nssm for service install
Source: "d:\Sonda\Precix\installer\nssm.exe"; DestDir: "{#MyInstallDir}"; Flags: ignoreversion
Source: "d:\Sonda\Precix\installer\service_install.ps1"; DestDir: "{#MyInstallDir}"; Flags: ignoreversion

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{#MyInstallDir}\{#MyAppExeName}"
Name: "{autostart}\{#MyAppName}"; Filename: "{#MyInstallDir}\{#MyAppExeName}"; WorkingDir: "{#MyInstallDir}"

[Run]
; Open firewall for local admin http (8010)
Filename: "{cmd}"; Parameters: "/C netsh advfirewall firewall add rule name=\"Agente PRECIX 8010\" dir=in action=allow protocol=TCP localport=8010"; Flags: runhidden; StatusMsg: "Configurando firewall..."
; Start agent after install
Filename: "{#MyInstallDir}\{#MyAppExeName}"; Flags: nowait postinstall skipifsilent; Description: "Iniciar {#MyAppName}"

[UninstallRun]
Filename: "{cmd}"; Parameters: "/C netsh advfirewall firewall delete rule name=\"Agente PRECIX 8010\""; Flags: runhidden

[Code]
function FileExists(const FileName: string): Boolean;
begin
  Result := FileSearch(ExtractFileName(FileName), ExtractFileDir(FileName)) <> '';
end;

// Ensure config exists in LocalAppData and not under Program Files
procedure InitializeWizard;
var
  AppDataConfig: string;
begin
  AppDataConfig := ExpandConstant('{localappdata}\AgentePRECIX\config.json');
  if not FileExists(AppDataConfig) then begin
    if FileExists(ExpandConstant('{src}\agente_local\config.json')) then begin
      FileCopy(ExpandConstant('d:\Sonda\Precix\agente_local\config.json'), AppDataConfig, false);
    end;
  end;
end;
