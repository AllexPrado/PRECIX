param(
  [Parameter(Mandatory=$true)] [string]$LojaCodigo,
  [Parameter(Mandatory=$true)] [string]$LojaNome,
  [Parameter(Mandatory=$true)] [string]$BackendUrl,
  [Parameter(Mandatory=$true)] [string]$AckToken,
  [Parameter(Mandatory=$false)] [string]$AgentId,
  [Parameter(Mandatory=$false)] [int]$HttpPort = 8010,
  [Parameter(Mandatory=$false)] [string]$HttpHost = '127.0.0.1',
  [Parameter(Mandatory=$false)] [string]$TipoIntegracao = 'Arquivo',
  [Parameter(Mandatory=$false)] [string]$ArquivoLocal = 'C:/PRECIX/pricetab.txt',
  [Parameter(Mandatory=$false)] [string]$ApiUrl = '',
  [Parameter(Mandatory=$false)] [string]$DbPath = '',
  [Parameter(Mandatory=$false)] [string]$EnvioMetodo = 'LOCAL',
  [Parameter(Mandatory=$false)] [string]$EnvioHost = '',
  [Parameter(Mandatory=$false)] [int]$EnvioPorta = 21
)

$ErrorActionPreference = 'Stop'
$cfgDir = Join-Path $env:LOCALAPPDATA 'AgentePRECIX'
$cfgPath = Join-Path $cfgDir 'config.json'
$template = Join-Path $PSScriptRoot '..\templates\config-template.json'

Write-Host "== Provisionando agente para loja $LojaCodigo - $LojaNome =="
New-Item -ItemType Directory -Force -Path $cfgDir | Out-Null
if (-not (Test-Path $template)) { throw "Template não encontrado: $template" }

# Carrega template
$raw = Get-Content -Raw -Path $template
$cfg = $raw | ConvertFrom-Json

# Preenche campos
$cfg.loja_codigo = $LojaCodigo
$cfg.loja_nome = $LojaNome
$cfg.backend_url = $BackendUrl.TrimEnd('/')
$cfg.ack_enabled = $true
$cfg.ack_token = $AckToken
$cfg.http_port = $HttpPort
$cfg.http_host = $HttpHost
$cfg.tipo_integracao = $TipoIntegracao
$cfg.arquivo_local = $ArquivoLocal
if ($ApiUrl) { $cfg.api_url = $ApiUrl; $cfg.api_externa = $ApiUrl }
if ($DbPath) { $cfg.db_path = $DbPath }
$cfg.envio_metodo = $EnvioMetodo
$cfg.envio_host = $EnvioHost
$cfg.envio_porta = $EnvioPorta

# Define agente_id
if ($AgentId) {
  $cfg.agente_id = $AgentId
} else {
  # Gera agente_id estável por máquina
  try { $cfg.agente_id = (Get-CimInstance Win32_ComputerSystemProduct).UUID } catch { }
}

# Salva config
$cfg | ConvertTo-Json -Depth 6 | Out-File -FilePath $cfgPath -Encoding utf8
Write-Host "Config salvo em $cfgPath"

# Cria pasta do arquivo local
$destDir = Split-Path -Path $cfg.arquivo_local -Parent
New-Item -ItemType Directory -Force -Path $destDir | Out-Null

# Reinicia serviço se existir
$svc = Get-Service -Name 'AgentePRECIX' -ErrorAction SilentlyContinue
if ($svc) {
  Write-Host 'Reiniciando serviço AgentePRECIX...'
  Restart-Service -Name 'AgentePRECIX' -Force -ErrorAction SilentlyContinue
  Start-Sleep -Seconds 3
}

# Preflight: health e heartbeat
try {
  $health = Invoke-WebRequest -Uri 'http://127.0.0.1:8010/health' -UseBasicParsing -TimeoutSec 5
  Write-Host "Health: $($health.StatusCode)"
} catch { Write-Host "Health falhou: $($_.Exception.Message)" -ForegroundColor Yellow }

try {
  $body = @{ agent_id = $cfg.agente_id; status = 'online'; last_update = (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'); loja_codigo = $cfg.loja_codigo; loja_nome = $cfg.loja_nome; ip = '127.0.0.1' } | ConvertTo-Json
  $hbUrl = $cfg.backend_url
  if (-not $hbUrl) { throw 'backend_url não configurado' }
  if ($hbUrl -match '/admin/agents/status$') {
    # já é a URL completa
    $target = $hbUrl
  } else {
    # assume host/base e anexa o caminho
    $target = ($hbUrl.TrimEnd('/')) + '/admin/agents/status'
  }
  $resp = Invoke-WebRequest -Uri $target -Method POST -Body $body -ContentType 'application/json' -UseBasicParsing -TimeoutSec 5
  Write-Host "Heartbeat: $($resp.StatusCode)"
} catch { Write-Host "Heartbeat falhou: $($_.Exception.Message)" -ForegroundColor Yellow }

Write-Host 'Provisionamento concluído.'
