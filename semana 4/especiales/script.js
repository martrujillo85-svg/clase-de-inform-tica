// Datos de la actividad
const datos = [
    { id: 1, imagen: "img/enter.png", alt: "Enter", funcion: "Confirma un comando o baja a la siguiente línea de texto" },
    { id: 2, imagen: "img/back.jpg", alt: "Backspace", funcion: "Borra el carácter que está a la izquierda del cursor." },
    { id: 3, imagen: "img/supr.jpg", alt: "Suprimir", funcion: "Borra el carácter que está a la derecha del cursor." },
    { id: 4, imagen: "img/shift.png", alt: "Shift", funcion: "Se usa en combinación con otras letras para escribirlas en mayúscula." },
    { id: 5, imagen: "img/bloq.png", alt: "Bloq Mayús", funcion: "Bloquea el teclado para escribir todo en letras mayúsculas." },
    { id: 6, imagen: "img/esc.png", alt: "Esc", funcion: "Cancela una operación o cierra cuadros de diálogo." },
    { id: 7, imagen: "img/alt.jpg", alt: "Alt", funcion: "sirve como un modificador que, al combinarse con otras teclas, permite ejecutar atajos ALt+f4" },
    { id: 8, imagen: "img/control.png", alt: "Control", funcion: "sirve para activar atajos o comandos rápidos que facilitan el trabajo en la computadora al combinarla con otras teclas" }
];

let seleccionIzquierda = null;
let seleccionDerecha = null;
let paresCorrectos = 0;

// Función para mezclar arreglos (Algoritmo Fisher-Yates)
function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function iniciarJuego() {
    const colTeclas = document.getElementById('col-teclas');
    const colFunciones = document.getElementById('col-funciones');

    // Preparar arreglos separados y mezclar las funciones para que no estén alineadas
    let teclas = datos.map(d => ({ id: d.id, imagen: d.imagen, alt: d.alt }))
    let funciones = datos.map(d => ({ id: d.id, texto: d.funcion }));
    funciones = mezclar(funciones);

    // Generar HTML para teclas
   teclas.forEach(t => {
        let div = document.createElement('div');
        div.classList.add('item');
        div.dataset.id = t.id;
        div.dataset.columna = 'izquierda';
        
        let img = document.createElement('img');
        img.src = t.imagen;
        img.alt = t.alt;
        
        div.appendChild(img);
        div.addEventListener('click', manejarClic);
        colTeclas.appendChild(div);
    });

    // Generar HTML para funciones
    funciones.forEach(f => {
        let div = document.createElement('div');
        div.classList.add('item');
        div.textContent = f.texto;
        div.dataset.id = f.id;
        div.dataset.columna = 'derecha';
        div.addEventListener('click', manejarClic);
        colFunciones.appendChild(div);
    });
}

function manejarClic(e) {
    const elemento = e.target;
    const columna = elemento.dataset.columna;

    // Si el elemento ya es correcto, ignorar
    if (elemento.classList.contains('correct')) return;

    // Desmarcar selección previa de la misma columna
    if (columna === 'izquierda') {
        if (seleccionIzquierda) seleccionIzquierda.classList.remove('selected');
        seleccionIzquierda = elemento;
    } else {
        if (seleccionDerecha) seleccionDerecha.classList.remove('selected');
        seleccionDerecha = elemento;
    }

    elemento.classList.add('selected');

    // Verificar si hay uno seleccionado en cada columna
    if (seleccionIzquierda && seleccionDerecha) {
        comprobarCoincidencia();
    }
}

function comprobarCoincidencia() {
    const idIzq = seleccionIzquierda.dataset.id;
    const idDer = seleccionDerecha.dataset.id;

    if (idIzq === idDer) {
        // Correcto
        seleccionIzquierda.classList.remove('selected');
        seleccionIzquierda.classList.add('correct');
        seleccionDerecha.classList.remove('selected');
        seleccionDerecha.classList.add('correct');
        paresCorrectos++;

        if (paresCorrectos === datos.length) {
            document.getElementById('mensaje').style.display = 'block';
        }
    } else {
        // Incorrecto
        seleccionIzquierda.classList.add('incorrect');
        seleccionDerecha.classList.add('incorrect');

        let izq = seleccionIzquierda;
        let der = seleccionDerecha;

        setTimeout(() => {
            izq.classList.remove('selected', 'incorrect');
            der.classList.remove('selected', 'incorrect');
        }, 800);
    }

    // Reiniciar selecciones temporales
    seleccionIzquierda = null;
    seleccionDerecha = null;
}

// Iniciar la actividad al cargar la página
window.onload = iniciarJuego;