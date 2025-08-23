# Preflight check for AgentePRECIX installer
# Run this on the target machine after installation to verify service, HTTP admin, logs and ACK persistence.

param(
    [string]$AgentServiceName = "AgentePRECIX",
    [string]$HealthUrl = "http://127.0.0.1:8010/health",
    [string]$AcksUrl = "http://127.0.0.1:8010/acks",
    [string]$AckToken = "",
    [string]$ConfigPath = "$env:LOCALAPPDATA\AgentePRECIX\config.json",
    [string]$AcksPath = "$env:LOCALAPPDATA\AgentePRECIX\acks.jsonl"
)

Write-Host "== AgentePRECIX Preflight Check =="

# 1) Service status
Write-Host "Checking Windows service: $AgentServiceName"
$svc = Get-Service -Name $AgentServiceName -ErrorAction SilentlyContinue
if ($null -eq $svc) {
    Write-Host "Service not found: $AgentServiceName" -ForegroundColor Red
} else {
    Write-Host "Service found: $($svc.Status)"
}

# 2) Health endpoint
Write-Host "\nQuerying health endpoint: $HealthUrl"
try {
    $r = Invoke-WebRequest -Uri $HealthUrl -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host "Health status: $($r.StatusCode)"
    Write-Host $r.Content
} catch {
    Write-Host "Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# 3) List logs folder (if exists near executable)
Write-Host "\nChecking logs and config files"
Write-Host "Config path: $ConfigPath"
if (Test-Path $ConfigPath) {
    Get-Item $ConfigPath | Format-List
} else {
    Write-Host "Config file not found" -ForegroundColor Yellow
}

Write-Host "Acks file path: $AcksPath"
if (Test-Path $AcksPath) {
    Write-Host "Last 10 ACK lines:"
    Get-Content $AcksPath -Tail 10
} else {
    Write-Host "Acks file not found" -ForegroundColor Yellow
}

# 4) Post a test ACK (if token provided)
if ([string]::IsNullOrWhiteSpace($AckToken)) {
    Write-Host "\nNo ACK token provided; skipping test POST to /ack/update"
} else {
    Write-Host "\nPosting a test ACK to /ack/update"
    $body = @{ origin = 'preflight'; tipo = 'TEST'; cod = 'PRE_FLIGHT'; status = 'OK' } | ConvertTo-Json
    try {
        $headers = @{ 'X-ACK-Token' = $AckToken; 'Content-Type' = 'application/json' }
        $r = Invoke-WebRequest -Uri "$($AcksUrl)/update" -Method POST -Headers $headers -Body $body -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        Write-Host "ACK POST status: $($r.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "ACK POST failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "\nPreflight complete. If anything failed, inspect service, agent logs and ensure firewall allows local connections."
