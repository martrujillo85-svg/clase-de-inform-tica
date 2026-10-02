// Banco de preguntas sobre la Ventana de Windows
// Banco de datos con rutas de imagen en la columna izquierda
const datos = [
    { id: 1, imagen: "img/barradekjktitulo.png", alt: "Barra de Título", funcion: "Muestra el nombre del documento activo y el nombre del programa." },
    { id: 2, imagen: "img/cinta-opcioioiones.png", alt: "Cinta de Opciones", funcion: "Agrupa pestañas y comandos organizados por categorías para realizar tareas." },
    { id: 3, imagen: "img/acceso-raooopido.png", alt: "Barra de Acceso Rápido", funcion: "Contiene atajos a comandos frecuentes como Guardar, Deshacer y Rehacer." },
    { id: 4, imagen: "img/area-trabaeeejo.png", alt: "Área de Trabajo", funcion: "Es la hoja en blanco donde se redacta, inserta y edita el contenido del texto." },
    { id: 5, imagen: "img/barra-estffado.png", alt: "Barra de Estado", funcion: "Ubicada en la parte inferior, muestra el número de página, palabras e idioma." },
    { id: 6, imagen: "img/zoonnnm.png", alt: "Barra de Zoom", funcion: "Permite acercar o alejar la vista del documento mediante un deslizador." }
];

let seleccionIzquierda = null;
let seleccionDerecha = null;
let aciertos = 0;

function mezclar(array) {
    let copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function iniciarJuego() {
    const colPartes = document.getElementById('col-partes');
    const colFunciones = document.getElementById('col-funciones');

    colPartes.innerHTML = '';
    colFunciones.innerHTML = '';
    aciertos = 0;

    let partes = datos.map(d => ({ id: d.id, imagen: d.imagen, alt: d.alt }));
    let funciones = mezclar(datos.map(d => ({ id: d.id, texto: d.funcion })));

    // Renderizar columna izquierda con imágenes
    partes.forEach(p => {
        let div = document.createElement('div');
        div.classList.add('item');
        div.dataset.id = p.id;
        div.dataset.columna = 'izquierda';

        let img = document.createElement('img');
        img.src = p.imagen;
        img.alt = p.alt;

        div.appendChild(img);
        div.addEventListener('click', manejarClic);
        colPartes.appendChild(div);
    });

    // Renderizar columna derecha con definiciones
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
    // Apunta al contenedor .item incluso si se hace clic en la etiqueta
    const elemento = e.target.closest('.item');
if (!elemento || elemento.classList.contains('correct')) return;

const columna = elemento.dataset.columna;

if (columna === 'izquierda') {
    if (seleccionIzquierda) seleccionIzquierda.classList.remove('selected');
    seleccionIzquierda = elemento;
} else {
    if (seleccionDerecha) seleccionDerecha.classList.remove('selected');
    seleccionDerecha = elemento;
}

elemento.classList.add('selected');

if (seleccionIzquierda && seleccionDerecha) {
    comprobarCoincidencia();
}

function comprobarCoincidencia() {
const idIzq = seleccionIzquierda.dataset.id;
const idDer = seleccionDerecha.dataset.id;
if (idIzq === idDer) {
    seleccionIzquierda.classList.remove('selected');
    seleccionIzquierda.classList.add('correct');
    seleccionDerecha.classList.remove('selected');
    seleccionDerecha.classList.add('correct');
    aciertos++;

    if (aciertos === datos.length) {
        document.getElementById('mensaje').style.display = 'block';
    }
} else {
    seleccionIzquierda.classList.add('incorrect');
    seleccionDerecha.classList.add('incorrect');

    let izq = seleccionIzquierda;
    let der = seleccionDerecha;

    setTimeout(() => {
        izq.classList.remove('selected', 'incorrect');
        der.classList.remove('selected', 'incorrect');
    }, 700);
}

seleccionIzquierda = null;
seleccionDerecha = null;
}

window.onload = iniciarJuego;