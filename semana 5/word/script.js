// Banco de preguntas con IMAGEN y 4 opciones
const preguntas = [
    {
        pregunta: "¿Qué parte de la ventana es la que se muestra en la imagen?",
        imagen: "img/barradetitulo.png",
        opciones: [
            "Barra de Título",
            "Barra de Estado",
            "Cinta de Opciones",
            "Barra de Desplazamiento"
        ],
        correcta: 0
    },
    {
        pregunta: "¿Cómo se llama el elemento señalado en esta imagen?",
        imagen: "img/cintaopciones.png",
        opciones: [
            "Barra de Acceso Rápido",
            "Cinta de Opciones",
            "Barra de Estado",
            "Vistas del Documento"
        ],
        correcta: 1
    },
    {
        pregunta: "¿Qué función tienen los botones mostrados?",
        imagen: "img/botonescontrol.png",
        opciones: [
            "Guardar el documento",
            "Minimizar, maximizar o cerrar",
            "Cambiar el tamaño de letra",
            "Desplazar la página"
        ],
        correcta: 1
    },
    {
        pregunta: "¿Qué herramienta representa la siguiente imagen?",
        imagen: "img/barradesplazamiento.png",
        opciones: [
            "Regla",
            "Área de Trabajo",
            "Barra de Desplazamiento",
            "Barra de Zoom"
        ],
        correcta: 2
    },
    {
        pregunta: "Identifica la barra ubicada en la parte inferior de la ventana:",
        imagen: "img/barraestado.png",
        opciones: [
            "Barra de Estado",
            "Barra de Título",
            "Barra de Menú",
            "Cinta de Opciones"
        ],
        correcta: 0
    },
    {
        pregunta: "¿Qué elemento para cambiar el tamaño de vista es este?",
        imagen: "img/zoom.png",
        opciones: [
            "Barra de Navegación",
            "Barra de Zoom",
            "Regla",
            "Botón Inicio"
        ],
        correcta: 1
    },
    {
        pregunta: "Muestra la hoja del documento",
        imagen: "img/areatrabajo.png",
        opciones: [
            "Zoom",
            "Barra de Opciones",
            "Regla",
            "Área de trabajo"
        ],
        correcta: 3
    },
    {
        pregunta: "Identifica la barra superior derecha",
        imagen: "img/barraaccesorapido.png",
        opciones: [
            "Barra de estado",
            "Barra de acceso rápido",
            "Barra de desplazamiento",
            "Área de trabajo"
        ],
        correcta: 1
    },
    {
        pregunta: "Permite medir y alinear el documento",
        imagen: "img/regla.png",
        opciones: [
            "Vistas",
            "Regla",
            "Área de trabajo",
            "Barra de estado"
        ],
        correcta: 1
    },
    {
        pregunta: "Cambia la forma en que se muestra un documento en la pantalla",
        imagen: "img/vista.png",
        opciones: [
            "Zoom",
            "Regla",
            "Barra de acceso rápido",
            "Vistas"
        ],
        correcta: 3
    },

];

// Variables de control
let indicePreguntaActual = 0;
let puntos = 0;
let tiempoRestante = 15;
let temporizador = null;
const TIEMPO_MAXIMO = 15;
let preguntasMezcladas = [];

// Elementos del DOM
const pantallaInicio = document.getElementById('pantalla-inicio');
const pantallaJuego = document.getElementById('pantalla-juego');
const pantallaResultados = document.getElementById('pantalla-resultados');

const btnInicio = document.getElementById('btn-inicio');
const btnSiguiente = document.getElementById('btn-siguiente');
const btnReiniciar = document.getElementById('btn-reiniciar');

const textoPregunta = document.getElementById('texto-pregunta');
const imagenPregunta = document.getElementById('imagen-pregunta');
const botonesOpciones = document.querySelectorAll('.opcion-btn');
const contadorPregunta = document.getElementById('contador-pregunta');
const puntuacionElem = document.getElementById('puntuacion');
const barraTiempo = document.getElementById('barra-tiempo');
const puntajeFinal = document.getElementById('puntaje-final');
const mensajeRetroalimentacion = document.getElementById('mensaje-retroalimentacion');

// Eventos de botones
if (btnInicio) btnInicio.addEventListener('click', iniciarJuego);
if (btnSiguiente) btnSiguiente.addEventListener('click', siguientePregunta);
if (btnReiniciar) btnReiniciar.addEventListener('click', iniciarJuego);

botonesOpciones.forEach((boton, idx) => {
    boton.addEventListener('click', () => seleccionarRespuesta(idx));
});

// Función para aleatorizar preguntas
function mezclar(array) {
    let copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function iniciarJuego() {
    puntos = 0;
    indicePreguntaActual = 0;
    preguntasMezcladas = mezclar(preguntas);

    pantallaInicio.classList.add('oculto');
    pantallaResultados.classList.add('oculto');
    pantallaJuego.classList.remove('oculto');

    actualizarPuntuacion();
    cargarPregunta();
}

function cargarPregunta() {
    clearInterval(temporizador);
    btnSiguiente.classList.add('oculto');

    const preg = preguntasMezcladas[indicePreguntaActual];
    contadorPregunta.textContent = `Pregunta ${indicePreguntaActual + 1}/${preguntasMezcladas.length}`;
    textoPregunta.textContent = preg.pregunta;

    // Cargar la imagen correspondiente a la pregunta
    imagenPregunta.src = preg.imagen;

    // Configurar el texto de los 4 botones
    botonesOpciones.forEach((boton, idx) => {
        boton.className = `opcion-btn ${obtenerClaseColor(idx)}`;
        boton.querySelector('.texto-opcion').textContent = preg.opciones[idx];
    });

    tiempoRestante = TIEMPO_MAXIMO;
    actualizarBarraTiempo();
    temporizador = setInterval(contarTiempo, 1000);
}

function obtenerClaseColor(idx) {
    return ['opcion-roja', 'opcion-azul', 'opcion-amarilla', 'opcion-verde'][idx];
}

function contarTiempo() {
    tiempoRestante--;
    actualizarBarraTiempo();

    if (tiempoRestante <= 0) {
        clearInterval(temporizador);
        tiempoAgotado();
    }
}

function actualizarBarraTiempo() {
    const porcentaje = (tiempoRestante / TIEMPO_MAXIMO) * 100;
    barraTiempo.style.width = `${porcentaje}%`;
    barraTiempo.style.background = porcentaje <= 30 ? '#ff4757' : 'linear-gradient(90deg, #38ef7d, #11998e)';
}

function seleccionarRespuesta(indiceSeleccionado) {
    clearInterval(temporizador);

    const preg = preguntasMezcladas[indicePreguntaActual];
    const esCorrecto = (indiceSeleccionado === preg.correcta);

    botonesOpciones.forEach((boton, idx) => {
        boton.classList.add('desactivada');
        if (idx === preg.correcta) {
            boton.classList.add('correcta');
        } else if (idx === indiceSeleccionado && !esCorrecto) {
            boton.classList.add('incorrecta');
        }
    });

    if (esCorrecto) {
        puntos += 500 + (tiempoRestante * 35);
        actualizarPuntuacion();
    }

    btnSiguiente.classList.remove('oculto');
}

function tiempoAgotado() {
    const preg = preguntasMezcladas[indicePreguntaActual];
    botonesOpciones.forEach((boton, idx) => {
        boton.classList.add('desactivada');
        if (idx === preg.correcta) boton.classList.add('correcta');
    });
    btnSiguiente.classList.remove('oculto');
}

function actualizarPuntuacion() {
    puntuacionElem.textContent = `⭐ ${puntos} pts`;
}

function siguientePregunta() {
    indicePreguntaActual++;
    if (indicePreguntaActual < preguntasMezcladas.length) {
        cargarPregunta();
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    pantallaJuego.classList.add('oculto');
    pantallaResultados.classList.remove('oculto');

    puntajeFinal.textContent = puntos;
    if (puntos >= 4000) {
        mensajeRetroalimentacion.textContent = "🏆 ¡Increíble! Eres un experto identificando la ventana de Windows.";
    } else if (puntos >= 2000) {
        mensajeRetroalimentacion.textContent = "👏 ¡Muy bien! Identificaste la mayoría de las partes.";
    } else {
        mensajeRetroalimentacion.textContent = "💪 ¡Buen intento! Sigue practicando para mejorar.";
    }
}