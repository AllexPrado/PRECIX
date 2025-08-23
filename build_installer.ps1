# Script mínimo para construir e criar instalador e registrar serviço com NSSM
# Requisitos: Inno Setup instalado, PyInstaller build já gerado em ./dist
# Uso: abra PowerShell como Administrador e execute este script
param(
    [string]$DistDir = "$PSScriptRoot\\dist",
    [string]$NssmDir = "$PSScriptRoot\\dist\\nssm",
    [string]$InnoPath = "C:\\Program Files (x86)\\Inno Setup 6\\ISCC.exe",
    [string]$AppName = "AgentePRECIX"
)
if (-not (Test-Path $InnoPath)) {
    Write-Host "Aviso: ISCC não encontrado em $InnoPath. Ajuste o path ou instale Inno Setup." -ForegroundColor Yellow
}
# Exemplo de copiar NSSM binários para dist\nssm (assume nssm.exe já disponível)
if (-not (Test-Path $NssmDir)) { New-Item -ItemType Directory -Path $NssmDir -Force }
Write-Host "Preparando instalador (não fará upload automático)." -ForegroundColor Green
# Gera arquivo .iss simples
$iss = @"
[Setup]
AppName={0}
AppVersion=1.0
DefaultDirName={{pf}}\{0}
DefaultGroupName={0}
DisableProgramGroupPage=yes

[Files]
Source: "{1}\*"; DestDir: "{{app}}"; Flags: recursesubdirs createallsubdirs

[Run]
Filename: "{{app}}\service_install.bat"; Flags: runhidden
"@ -f $AppName, $DistDir
$issPath = Join-Path $PSScriptRoot ("{0}_installer.iss" -f $AppName)
$iss | Out-File -Encoding UTF8 -FilePath $issPath
Write-Host "Inno script gerado: $issPath" -ForegroundColor Green
Write-Host "Próximo passo: executar ISCC com o .iss gerado para criar o instalador." -ForegroundColor Green
Write-Host "Opcional: colocar nssm.exe na pasta $NssmDir para o instalador incluir o utilitário." -ForegroundColor Yellow
