// Modal de los dialog
const abrir_insertar = document.getElementById('modal-insertar');
const abrir_eliminar = document.getElementById('modal-eliminar');
const abrir_actualizar = document.getElementById('modal-actualizar');
const dialog = document.getElementById('dialog');
const tabla_imagenes = document.getElementById('mostrar_imagenes');
dialog.style.display = 'block';

async function abrir_modal(valor){
    // abrir modals
    abrir_insertar.style.display = 'none';
    abrir_actualizar.style.display = 'none';
    abrir_eliminar.style.display = 'none';

    // Abrir el correcto
    if (valor == "insertar"){
        abrir_insertar.style.display = 'block';
    }
    else if(valor == "actializar"){
        abrir_actualizar.style.display = 'block';
    }
    else if(valor == "eliminar"){
        abrir_eliminar.style.display = 'block';
    }
    else if(valor == "mostrar"){
        tabla_imagenes.style.display = 'block';
    }
    else{
        alert("No existe esa peticion")
    }
}


// Botones de operaciones
document.getElementById('insertar').addEventListener('click', () => {
    abrir_modal("insertar");
})

document.getElementById('eliminar').addEventListener('click', ()=> {
    abrir_modal("eliminar");
})

document.getElementById('actualizar').addEventListener('click', () => {
    abrir_modal("actializar");
})

document.getElementById('btn_mostrar').addEventListener('click', ()=>{
    abrir_modal("mostrar");
})