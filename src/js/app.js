const enlace = document.getElementById('file-infrome');
let ruta = '';

console.log(enlace.src);

ruta = enlace.src;

document.getElementById('Descargar').addEventListener('click', () =>{
    const enlaceNuevo = document.createElement('a');
    enlaceNuevo.href = ruta;
    enlaceNuevo.download = 'Informe.pdf';
    
    enlaceNuevo.click();
    
    console.log(enlaceNuevo);
});