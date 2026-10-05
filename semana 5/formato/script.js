// Array con las 8 parejas de herramientas de Word (Imagen y Texto)
const herramientas = [
    { id: 'negrita', contenido: 'img/negrita.png', tipo: 'imagen' },
    { id: 'negrita', contenido: 'Negrita', tipo: 'texto' },

    { id: 'cursiva', contenido: 'img/cursiva.png', tipo: 'imagen' },
    { id: 'cursiva', contenido: 'Cursiva', tipo: 'texto' },

    { id: 'alineacion', contenido: 'img/izq.png', tipo: 'imagen' },
    { id: 'alineacion', contenido: 'Alinear a la izquierda', tipo: 'texto' },

    { id: 'guardar', contenido: 'img/guardar.png', tipo: 'imagen' },
    { id: 'guardar', contenido: 'Guardar', tipo: 'texto' },

    { id: 'centrar', contenido: 'img/centrar.png', tipo: 'imagen' },
    { id: 'centrar', contenido: 'Centrar', tipo: 'texto' },

    { id: 'mayusmin', contenido: 'img/mayusmin.png', tipo: 'imagen' },
    { id: 'mayusmin', contenido: 'Mayúsculas y minúsculas', tipo: 'texto' },

    { id: 'color', contenido: 'img/color.png', tipo: 'imagen' },
    { id: 'color', contenido: 'Color de fuente', tipo: 'texto' },

    { id: 'fuente', contenido: 'img/fuente.png', tipo: 'imagen' },
    { id: 'fuente', contenido: 'Fuente / Tipo de letra', tipo: 'texto' }
];

let cartasMezcladas = [];
let primeraCarta = null;
let segundaCarta = null;
let bloqueaTablero = false;
let paresEncontrados = 0;
let movimientos = 0;

// Elementos del DOM
const contenedorTablero = document.getElementById('tablero-memorama');
const spanMovimientos = document.getElementById('movimientos');
const spanPares = document.getElementById('pares-encontrados');
const mensajeVictoria = document.getElementById('mensaje-victoria');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Asignar evento al botón de reiniciar
if (btnReiniciar) {
    btnReiniciar.addEventListener('click', iniciarJuego);
}

// Función para mezclar aleatoriamente el array de cartas (Fisher-Yates)
function mezclarCartas(array) {
    let copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function iniciarJuego() {
    primeraCarta = null;
    segundaCarta = null;
    bloqueaTablero = false;
    paresEncontrados = 0;
    movimientos = 0;

    spanMovimientos.textContent = movimientos;
    spanPares.textContent = paresEncontrados;
    mensajeVictoria.classList.add('oculto');
    contenedorTablero.innerHTML = '';

    cartasMezcladas = mezclarCartas(herramientas);
    crearTablero();
}

function crearTablero() {
    cartasMezcladas.forEach(cartaDatos => {
        const divCarta = document.createElement('div');
        divCarta.classList.add('carta');
        divCarta.dataset.id = cartaDatos.id;

        const caraFrontal = document.createElement('div');
        caraFrontal.classList.add('cara', 'frontal');
        
        const caraTrasera = document.createElement('div');
        caraTrasera.classList.add('cara', 'trasera');

        const contenidoDiv = document.createElement('div');
        contenidoDiv.classList.add('contenido-carta', `tipo-${cartaDatos.tipo}`);
        
        if (cartaDatos.tipo === 'imagen') {
            const img = document.createElement('img');
            img.src = cartaDatos.contenido;
            img.alt = cartaDatos.id;
            img.onerror = function() {
                console.warn("No se encontró la imagen: " + cartaDatos.contenido);
            };
            contenidoDiv.appendChild(img);
        } else {
            contenidoDiv.textContent = cartaDatos.contenido;
        }

        caraFrontal.appendChild(contenidoDiv);
        divCarta.appendChild(caraFrontal);
        divCarta.appendChild(caraTrasera);

        divCarta.addEventListener('click', voltearCarta);
        contenedorTablero.appendChild(divCarta);
    });
}

function voltearCarta() {
    if (bloqueaTablero || this === primeraCarta || this.classList.contains('emparejada')) {
        return;
    }

    this.classList.add('volteada');

    if (!primeraCarta) {
        primeraCarta = this;
        return;
    }

    segundaCarta = this;
    movimientos++;
    spanMovimientos.textContent = movimientos;
    
    comprobarPareja();
}

function comprobarPareja() {
    const esPareja = primeraCarta.dataset.id === segundaCarta.dataset.id;
    bloqueaTablero = true; 

    if (esPareja) {
        primeraCarta.classList.add('emparejada');
        segundaCarta.classList.add('emparejada');
        
        primeraCarta.removeEventListener('click', voltearCarta);
        segundaCarta.removeEventListener('click', voltearCarta);
        
        paresEncontrados++;
        spanPares.textContent = paresEncontrados;

        if (paresEncontrados === (herramientas.length / 2)) {
            setTimeout(() => {
                mensajeVictoria.classList.remove('oculto');
            }, 500);
        }
        
        resetearTurno();
    } else {
        setTimeout(() => {
            primeraCarta.classList.remove('volteada');
            segundaCarta.classList.remove('volteada');
            resetearTurno();
        }, 1000);
    }
}

function resetearTurno() {
    primeraCarta = null;
    segundaCarta = null;
    bloqueaTablero = false;
}

window.onload = iniciarJuego;