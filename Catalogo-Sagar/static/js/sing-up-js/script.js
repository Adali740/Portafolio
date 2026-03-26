function cargar() {
    const usuario = localStorage.getItem("usuario_login");
    if (!usuario) {
        console.log("No hay usuario en sesión");
        return;
    }

    window.location.href = "/";
}

async function acceder() {
    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");
    const inputChk = document.getElementById("termino-chk");

    const nombre = nombreInput ? nombreInput.value.trim() : "";
    const telefono = telefonoInput ? telefonoInput.value.trim() : "";

    if (!inputChk || !inputChk.checked) {
        alert("Acepte los términos y condiciones.");
        return;
    }

    if (!nombre || !telefono) {
        alert("Ingrese un valor en los campos.");
        return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("telefono", telefono);

    try {
        const response = await fetch("/registrar_usuario", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            console.error("Error al registrar usuario", response.status);
            alert("Hubo un problema al registrar el usuario. Intente de nuevo.");
            return;
        }

        const datos = await response.json();

        if (!datos || !datos.usuario) {
            console.error("Respuesta inválida del servidor", datos);
            alert("No se pudo obtener el usuario registrado.");
            return;
        }

        localStorage.setItem("usuario_login", datos.usuario);
        window.location.href = "/";
        console.log("Usuario:", datos.usuario);
    } catch (error) {
        console.error("Error en la petición de registro:", error);
        alert("Ocurrió un error al registrar. Intente de nuevo más tarde.");
    }
}

cargar();

function autenticaradmin() {
    const dialog = document.getElementById("dialog");
    if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
    }
}

function Cerrar() {
    const dialog = document.getElementById("dialog");
    if (dialog) {
        dialog.close();
    }
}
