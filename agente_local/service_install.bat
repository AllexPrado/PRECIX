@echo off
REM service_install.bat - wrapper to install AgentePRECIX service using bundled nssm
SET APPDIR=%~dp0
SET NSSM=%APPDIR%nssm\win64\nssm.exe
SET SERVICE_EXE=%APPDIR%ServicePRECIX.exe
SET SERVICENAME=AgentePRECIX

if not exist "%SERVICE_EXE%" (
  echo Service executable not found: %SERVICE_EXE%
  exit /b 1
)

if not exist "%NSSM%" (
  echo NSSM not found at %NSSM%. Service will not be installed.
  exit /b 2
)

echo Installing service %SERVICENAME% using %NSSM%
"%NSSM%" install %SERVICENAME% "%SERVICE_EXE%"
"%NSSM%" set %SERVICENAME% Start SERVICE_AUTO_START
"%NSSM%" set %SERVICENAME% AppDirectory "%~dp0"
"%NSSM%" start %SERVICENAME%

echo Service installation attempted. Check Windows Services for status.
exit /b 0
