Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$root = 'd:\Sonda\Precix'
$venv = Join-Path $root '.venv-agent'
$mainPy = Join-Path $root 'agente_local\main.py'

Write-Host "[BUILD] Criando venv em $venv"
python -m venv $venv

$pip = Join-Path $venv 'Scripts\pip.exe'
$pyinstaller = Join-Path $venv 'Scripts\pyinstaller.exe'

Write-Host "[BUILD] Atualizando pip e instalando dependências"
& $pip install --upgrade pip | Write-Host
& $pip install pyinstaller requests | Write-Host

Write-Host "[BUILD] Empacotando agente com PyInstaller"
& $pyinstaller --noconfirm --clean -F -n AgentePRECIX $mainPy

$exePath = Join-Path $root 'dist\AgentePRECIX.exe'
if (Test-Path $exePath) {
  Write-Host "[BUILD] OK: executável gerado em $exePath"
} else {
  Write-Error "[BUILD] Falha: executável não encontrado em $exePath"
  exit 1
}
