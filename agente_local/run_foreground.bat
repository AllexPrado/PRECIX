@echo off
REM Executa o agente em foreground (Python) para debug. Mantem janela aberta.
cd /d %~dp0
python main.py
echo.
echo Pressione qualquer tecla para sair...
pause >nul
