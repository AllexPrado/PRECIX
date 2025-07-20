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

psftp visualmix@139.10.8.50 -pw 4913 -b C:\KIOSK\PRECOS\FTP.FTP

echo.
echo.
echo.
echo      ARQUIVOS COPIADOS
echo.
echo.
echo.


exit

