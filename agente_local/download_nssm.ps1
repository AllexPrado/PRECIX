# Helper script for the build machine to download and extract NSSM (win64) to dist\nssm\win64
# Usage: Run on build machine (requires PowerShell 5+ and internet access)

$dest = Join-Path $PSScriptRoot 'dist\nssm\win64'
if (-Not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }

$url = 'https://nssm.cc/release/nssm-2.24.zip'
$out = Join-Path $env:TEMP 'nssm.zip'

Write-Host "Downloading NSSM from $url..."
Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing

Write-Host "Extracting..."
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory($out, $env:TEMP)

# The zip contains a folder like nssm-2.24\win64\nssm.exe - find it
$zipExtracted = Get-ChildItem $env:TEMP -Directory | Where-Object { $_.Name -like 'nssm-*' } | Select-Object -First 1
if ($zipExtracted) {
    $source = Join-Path $zipExtracted.FullName 'win64\nssm.exe'
    if (Test-Path $source) {
        Copy-Item $source -Destination $dest -Force
        Write-Host "Copied nssm.exe to $dest"
    } else {
        Write-Host "nssm.exe not found in extracted archive" -ForegroundColor Red
    }
} else {
    Write-Host "Failed to find extracted NSSM folder" -ForegroundColor Red
}

Remove-Item $out -Force
Write-Host "Done."
