@echo off

setlocal enabledelayedexpansion

:: Cambiar al disco y carpeta indicados
cd /d "C:\Users\Proyeccion-Emanuel\Documents\server"

:: Iniciar el servidor de Node en una ventana nueva para que no bloquee el proceso
start cmd /k "node server.js"

:: Esperar unos segundos para que el servidor arranque
timeout /t 5

:: 1. Iniciar cloudflared y guardar los logs en un archivo temporal
echo Iniciando tunel y capturando URL...
start /b "" .\cloudflared-windows-amd64.exe tunnel --url http://localhost:3000 > tunnel.log 2>&1

:: 2. Esperar unos segundos a que se genere la URL (dale tiempo a conectar)
timeout /t 7 > nulo

:: 3. Buscar la URL en el archivo de log
for /f "tokens=*" %%a in ('findstr /c:"https://" tunnel.log') do (
    set "linea=%%a"
    
    :: Extraer solo la parte de la URL (esto busca la parte que empieza por https://)
    for %%b in (!linea!) do (
        echo %%b | findstr "https://" > nul
        if !errorlevel! == 0 (
            set "mi_url=%%b"
        )
    )
)

:: 4. Mostrar el resultado
if defined mi_url (
    echo ========================================
    echo TU URL ES: !mi_url!
    echo ========================================
    
    start !mi_url!
) else (
    echo No se pudo encontrar la URL. Revisa tunnel.log
)

pause