<#
service_install.ps1
Automated installation of AgentePRECIX as Windows Service using bundled nssm.
This script elevates to admin if needed and creates/starts the service.
#>
function Test-IsAdmin {
  $id = [System.Security.Principal.WindowsIdentity]::GetCurrent()
  $p  = New-Object System.Security.Principal.WindowsPrincipal($id)
  return $p.IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Test-IsAdmin)) {
  Write-Host "Not running as admin; relaunching with elevation..."
  Start-Process -FilePath powershell.exe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `""$PSCommandPath""`" -Verb RunAs
  exit
}

$installDir = "C:\Program Files\AgentePRECIX"
$exeName = "AgentePRECIX.exe"
$exePath = Join-Path $installDir $exeName
$serviceName = "AgentePRECIX"
$nssm = Join-Path $installDir 'nssm.exe'

Write-Host "Installing service $serviceName for $exePath"
if (-not (Test-Path $exePath)) { throw "Executable not found: $exePath" }
if (-not (Test-Path $nssm))   { throw "nssm.exe not found in $installDir" }

& $nssm install $serviceName $exePath | Out-Host
& $nssm set $serviceName AppDirectory $installDir | Out-Host
& $nssm set $serviceName Start SERVICE_AUTO_START | Out-Host
& $nssm set $serviceName AppStopMethodSkip 6 | Out-Host
& $nssm set $serviceName AppStdout "C:\ProgramData\AgentePRECIX\service.log" | Out-Host
& $nssm set $serviceName AppStderr "C:\ProgramData\AgentePRECIX\service.log" | Out-Host

# Ensure config folder exists
New-Item -Path "$env:LOCALAPPDATA\AgentePRECIX" -ItemType Directory -Force | Out-Null

# Start service
& $nssm start $serviceName | Out-Host
Write-Host "Service $serviceName installed and started."
