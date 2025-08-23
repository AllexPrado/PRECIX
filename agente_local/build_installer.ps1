# Build script: empacota o agente e cria o instalador (requer PyInstaller e InnoSetup)
# Ajuste caminhos e execute em PowerShell com ambiente apropriado.

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
Push-Location $projectRoot

Write-Host "Limpando build/dist..."
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "dist" "build" "agente.spec"

Write-Host "Executando PyInstaller..."
# Exemplo de comando; ajuste hiddenimports se necessário
# Build GUI executable
pyinstaller --onefile --noconsole --add-data "config.json;." --name PRECIX main.py
# Build service executable (assumes a service wrapper script exists named service_wrapper.py)
if (Test-Path "service_wrapper.py") {
    pyinstaller --onefile --noconsole --name ServicePRECIX service_wrapper.py
} else {
    Write-Host "service_wrapper.py não encontrado; certifique-se de ter gerado ServicePRECIX.exe anteriormente" -ForegroundColor Yellow
}

# Ensure NSSM is present under dist\nssm\win64
if (Test-Path "download_nssm.ps1") {
    Write-Host "Downloadando NSSM para dist\\nssm\\win64..."
    .\download_nssm.ps1
} else {
    Write-Host "download_nssm.ps1 não encontrado; coloque nssm em dist\\nssm\\win64 manualmente se necessário" -ForegroundColor Yellow
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "PyInstaller falhou" -ForegroundColor Red
    Pop-Location
    exit 1
}

Write-Host "Gerar instalador InnoSetup (usuário precisa do InnoSetup instalado)." 
# Assume inno setup script in inno_installer_template.iss
# Try to find ISCC.exe
$iscc = 'C:\Program Files (x86)\Inno Setup 6\ISCC.exe'
if (Test-Path $iscc) {
    Write-Host "Compilando Inno Setup script..."
    & $iscc "$projectRoot\AgentePRECIX.iss"
} else {
    Write-Host "ISCC.exe não encontrado. Compile 'AgentePRECIX.iss' manualmente com o Inno Setup Compiler." -ForegroundColor Yellow
}

Pop-Location
Write-Host "Build concluído. Verifique a pasta dist\ para agente.exe e ajuste o template .iss antes de compilar o instalador."
