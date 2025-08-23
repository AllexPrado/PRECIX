@echo off
:: Service install using NSSM (expects nssm.exe in the same folder)
set NSSM=%~dp0\dist\nssm\nssm-2.24\win64\nssm.exe
set APP=%~dp0\dist\AgentePRECIX.exe
set SERVICE_NAME=AgentePRECIX
"%NSSM%" install %SERVICE_NAME% "%APP%"
"%NSSM%" set %SERVICE_NAME% Start SERVICE_AUTO_START
"%NSSM%" start %SERVICE_NAME%
