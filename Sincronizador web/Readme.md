## Descripción

* Proyecto de solución de conectividad para entorno comunitario.*

Este proyecto nació para resolver un problema logístico en una iglesia local: la falta de cableado físico para conectar el audio (consola) con el video (datashow).

* **Tecnologías:** Node.js, Socket.io, HTML5/CSS3.
* **Logro Técnico:** Implementé una arquitectura **Servidor-Cliente** mediante WebSockets. El sistema permite que un dispositivo móvil controle la reproducción de video en una PC remota de forma sincronizada vía Wi-Fi.
* **Funcionalidades:** Reproducción sincronizada, control de eventos en tiempo real (`io.emit`), y manejo de estados del reproductor.

---

## Ejecución:

* Ejecutar **Sincrinizador-video.bat** como administrador.
Es un fichero que ejecuta el servidor.

* El fichero Manda una url **via wifi**, Un túnel cifrado.
como ejemplo: **https://genesis-station-feedback-duo.trycloudflare.com** y crea un ventana web en la pc.

* Use la url en distintos dispositivos, y al reproducirse se sincronizara en todos los dispositivos.

## Nota:

No esta lista para un entorno en producción el cambio de video se hace manual.

* Editar al index.html.
* buscar <video id="myVideo" src="./d.mp4"></video>
* Cambiar  src="./d.mp4" por cualquier video en la carpeta public.

