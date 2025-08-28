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
    Write-Host "Not running as admin; relaunching with elevation via PowerShell 5.1..."
    Start-Process -FilePath powershell.exe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

$installDir = "C:\Program Files\AgentePRECIX"
$exeName = "ServicePRECIX.exe"
$exePath = Join-Path $installDir $exeName
$serviceName = "AgentePRECIX"
$programDataDir = "C:\ProgramData\AgentePRECIX"

Write-Host "Installing service $serviceName for $exePath"

if (-Not (Test-Path $exePath)) {
    Write-Host "Executable not found: $exePath" -ForegroundColor Red
    exit 1
}

# Ensure ProgramData config/log directory exists
New-Item -ItemType Directory -Force -Path $programDataDir | Out-Null

# Try to seed ProgramData\config.json from the most relevant source
$destCfg = Join-Path $programDataDir 'config.json'
if (-not (Test-Path $destCfg)) {
    Write-Host "Seeding config.json into $programDataDir"
    $candidates = @()
    # 1) Current user LocalAppData
    $userLocal = Join-Path $env:LOCALAPPDATA 'AgentePRECIX\config.json'
    if (Test-Path $userLocal) { $candidates += $userLocal }
    # 2) SystemProfile LocalAppData
    $sysLocal = "C:\\Windows\\System32\\config\\systemprofile\\AppData\\Local\\AgentePRECIX\\config.json"
    if (Test-Path $sysLocal) { $candidates += $sysLocal }
    # 3) Any user profile under C:\Users
    Get-ChildItem -Path "$env:SystemDrive\Users" -Directory -ErrorAction SilentlyContinue | ForEach-Object {
        $p = Join-Path $_.FullName 'AppData\Local\AgentePRECIX\config.json'
        if (Test-Path $p) { $candidates += $p }
    }
    # pick the newest file
    if ($candidates.Count -gt 0) {
        $newest = $candidates | Sort-Object { (Get-Item $_).LastWriteTime } -Descending | Select-Object -First 1
        try { Copy-Item -Force $newest $destCfg } catch {}
    }
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
& $nssm set $serviceName AppEnvironmentExtra "AGENTE_PRECIX_HOME=$programDataDir"
& $nssm set $serviceName AppStdout (Join-Path $programDataDir 'service.out.log')
& $nssm set $serviceName AppStderr (Join-Path $programDataDir 'service.err.log')
& $nssm set $serviceName AppRotateFiles 1
& $nssm set $serviceName AppRotateOnline 1
& $nssm set $serviceName AppRotateBytes 10485760
try {
    & $nssm start $serviceName
} catch {
    Write-Host "Warning: could not start service automatically. Check service status in Services.msc" -ForegroundColor Yellow
}

Write-Host "Service installation attempted. Check Windows Services or nssm for status."
Write-Host "Config dir: $programDataDir" -ForegroundColor Cyan
Write-Host "Logs: $(Join-Path $programDataDir 'agente.log') and NSSM: $(Join-Path $programDataDir 'service.out.log')" -ForegroundColor Cyan
