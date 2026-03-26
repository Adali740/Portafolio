document.getElementById('volver_inicio').addEventListener('click', () =>{
    signOut(auth).then(() => {
        console.log("Sesión cerrada");
        window.location.href = "/";
    }).catch((error) => {
        console.log("Error al cerrar sesión:", error);
    });
});

document.getElementById('btn_insertar').addEventListener('click', async () => {
    const user = auth.currentUser;
    
    // Verificar autenticacion
    if (!user) {
        alert('iniciar sesion');
        document.location.href = '/';
    }

    const ADMINS = ['admin@apartadossagar.com'];
  
    if (!ADMINS.includes(user.email)) {
        alert('permiso no autorizado');
        return;
    }

    try {

        const select_area = document.getElementById('select_area').value;
        const select_genero = document.getElementById('select_genero').value;
        const file_image = document.getElementById('file_image').files[0];
        const text_descripcion = document.getElementById('text_descripcion').value;
        const nombre_file = file_image.name;

        if (!file_image || !file_image.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen válido.');
            return;
        }
        // Si el valor es "null" o no hay selección, que sea un string vacío
        const prefijo = (select_genero === "null" || !select_genero) ? "" : select_genero + "/";
        const url_image = prefijo + nombre_file;

        const formData = new FormData();

        formData.append("sector", select_area);
        formData.append("url_image", url_image);
        formData.append("text_descripcion", text_descripcion);
        formData.append("imagen", file_image);
        formData.append("genero", select_genero);
        
        const response = await fetch('/insertar_plantilla',{
            method: 'POST',
            body: formData
        });

        // 1. Verificar si la respuesta fue exitosa
        if (!response.ok) {
            console.error("Error en la respuesta:", response.status);
            return;
        }

        // 2. Convertir la respuesta a JSON
        const data = await response.json();
        operacion = data.operacion;

        // 3. Usar los datos que te devolvió el backend
        console.log("Respuesta del backend:", operacion);
        alert("Se Registro su solicitud")

    } catch (error) {
        console.log('Error no se envio:', error);
    }
});


