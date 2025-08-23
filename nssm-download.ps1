# Baixa NSSM (versão win64) para a pasta dist/nssm
$dest = Join-Path $PSScriptRoot 'dist\nssm'
New-Item -Path $dest -ItemType Directory -Force | Out-Null
$url = 'https://nssm.cc/release/nssm-2.24.zip'
$zip = Join-Path $env:TEMP 'nssm.zip'
Write-Host "Baixando NSSM de $url..."
Invoke-WebRequest -Uri $url -OutFile $zip
Write-Host "Extraindo para $dest..."
Expand-Archive -LiteralPath $zip -DestinationPath $dest -Force
Write-Host "NSSM baixado e extraído em $dest"
