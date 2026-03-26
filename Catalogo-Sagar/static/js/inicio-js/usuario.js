const nombre = localStorage.getItem('usuario_login');

if(nombre){
    let Usuario = document.getElementById('id_usuario');
    Usuario.innerText = nombre;
    console.log("usuario: " + Usuario)
}