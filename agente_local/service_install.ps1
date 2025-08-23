<#
service_install.ps1
Automated installation of AgentePRECIX as Windows Service using bundled nssm.
This script attempts to self-elevate (UAC) if not running as Admin, then uses the
nssm binary included under the installed application folder to create and start the service.

It assumes the application is installed to "C:\Program Files\AgentePRECIX" by the installer.
#>

function Test-IsAdmin {
    $id = [System.Security.Principal.WindowsIdentity]::GetCurrent()
    $p = New-Object System.Security.Principal.WindowsPrincipal($id)
    return $p.IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Test-IsAdmin)) {
    Write-Host "Not running as admin; relaunching with elevation..."
    Start-Process -FilePath pwsh -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

$installDir = "C:\Program Files\AgentePRECIX"
$exeName = "ServicePRECIX.exe"
$exePath = Join-Path $installDir $exeName
$serviceName = "AgentePRECIX"

Write-Host "Installing service $serviceName for $exePath"

if (-Not (Test-Path $exePath)) {
    Write-Host "Executable not found: $exePath" -ForegroundColor Red
    exit 1
}

# prefer bundled nssm shipped in installer at {app}\nssm\win64\nssm.exe
$bundled = Join-Path $installDir "nssm\win64\nssm.exe"
if (Test-Path $bundled) {
    $nssm = $bundled
} else {
    # fallback to common system location
    $nssm = "C:\nssm\win64\nssm.exe"
}

if (-Not (Test-Path $nssm)) {
    Write-Host "nssm not found at $nssm. Please include nssm in the installer or install nssm manually." -ForegroundColor Red
    exit 1
}

& $nssm install $serviceName $exePath
& $nssm set $serviceName Start SERVICE_AUTO_START
& $nssm set $serviceName AppDirectory (Split-Path $exePath -Parent)
try {
    & $nssm start $serviceName
} catch {
    Write-Host "Warning: could not start service automatically. Check service status in Services.msc" -ForegroundColor Yellow
}

Write-Host "Service installation attempted. Check Windows Services or nssm for status."
