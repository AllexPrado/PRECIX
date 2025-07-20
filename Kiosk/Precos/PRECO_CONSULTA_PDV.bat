@echo off
setlocal enabledelayedexpansion
echo .
echo .
echo BACTH RESPONSAVEL PELA COPIA O ARQUIVO PRODUTO.DB DO GATEWAY

echo INICIANDO COPIA DO GATEWAY
echo .
echo .
echo .
echo .
echo .
echo .

psftp root@139.10.8.105 -pw 1 -b C:\KIOSK\PRECOS\PDVFTP.FTP

echo.
echo.
echo.
echo      ARQUIVOS COPIADOS
echo.
echo.
echo.


exit

