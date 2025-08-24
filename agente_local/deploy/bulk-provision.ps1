param(
  [Parameter(Mandatory=$true)] [string]$CsvPath
)

$ErrorActionPreference = 'Stop'
if (-not (Test-Path $CsvPath)) { throw "CSV não encontrado: $CsvPath" }

$rows = Import-Csv -Path $CsvPath
foreach ($r in $rows) {
  Write-Host "-- Loja $($r.LojaCodigo) - $($r.LojaNome) --" -ForegroundColor Cyan
  $args = @(
    '-LojaCodigo', $r.LojaCodigo,
    '-LojaNome', $r.LojaNome,
    '-BackendUrl', $r.BackendUrl,
    '-AckToken', $r.AckToken
  )
  if ($r.TipoIntegracao) { $args += @('-TipoIntegracao', $r.TipoIntegracao) }
  if ($r.ArquivoLocal) { $args += @('-ArquivoLocal', $r.ArquivoLocal) }
  if ($r.ApiUrl) { $args += @('-ApiUrl', $r.ApiUrl) }
  if ($r.DbPath) { $args += @('-DbPath', $r.DbPath) }
  if ($r.EnvioMetodo) { $args += @('-EnvioMetodo', $r.EnvioMetodo) }
  if ($r.EnvioHost) { $args += @('-EnvioHost', $r.EnvioHost) }
  if ($r.EnvioPorta) { $args += @('-EnvioPorta', [int]$r.EnvioPorta) }

  & (Join-Path $PSScriptRoot 'provision-store.ps1') @args
}

Write-Host "Bulk provision concluído."
