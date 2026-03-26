// Diccionario para guardar la posición de cada carrusel por separado
let posiciones = {};
let total_tarjetas = {};

function moverCarrusel(idTrack, direccion) {
    const track = document.getElementById(idTrack);
    const tarjetas = track.querySelectorAll('.tarjeta-producto');
    
    if (tarjetas.length === 0) return; // Si no hay productos, no hacer nada
    
    const anchoTarjeta = tarjetas[0].offsetWidth + 20; 

    // Si es la primera vez que movemos este carrusel, lo inicializamos en 0
    if (!posiciones[idTrack]) posiciones[idTrack] = 0;

    // Limite derecho
    total_tarjetas[idTrack] = 0; // valor numerico 
    total_tarjetas[idTrack] = total_tarjetas[idTrack] - (tarjetas.length * anchoTarjeta);

    posiciones[idTrack] -= direccion * anchoTarjeta;

    if (posiciones[idTrack] === total_tarjetas[idTrack]) {
        posiciones[idTrack] = posiciones[idTrack] + anchoTarjeta;
    }

    // Límite izquierdo
    if (posiciones[idTrack] > 0) posiciones[idTrack] = 0;

    // Aplicar movimiento
    track.style.transform = `translateX(${posiciones[idTrack]}px)`;
}

let lastScrollTop = 0;
const header = document.getElementById("main-header");

window.addEventListener("scroll", function() {
let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

if (scrollTop > lastScrollTop) {
    // Scroll hacia abajo
    header.classList.add("header-hidden");
} else {
    // Scroll hacia arriba
    header.classList.remove("header-hidden");
}

// Actualizamos la posición para la siguiente comparación
lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
}, false);
const registroImagenes = document.querySelectorAll('.img-plan').length;
const fuente = document.querySelectorAll('.img-plan');
const seguidor = document.querySelectorAll('.info');

const monitor = new ResizeObserver(entries => {
  for (let entry of entries) {
    // entry.contentRect.width nos da el ancho sin bordes ni padding
    // borderBoxSize nos da el ancho total
    const nuevoAncho = entry.borderBoxSize[0].inlineSize;
    seguidor.forEach(s => {
      s.style.width = `${nuevoAncho}px`;
    });
  }
});

monitor.observe(registroImagenes > 0 ? fuente[0] : null);
