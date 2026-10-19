// Párrafos extensos de El Principito 
const parrafosPrincipito = [
    // Parte 1
    "Cuando yo tenía seis años vi en un libro sobre la selva virgen que se titulaba Historias vividas, una magnífica lámina.Representaba una serpiente boa que se tragaba a una fiera. En el libro se afirmaba: La serpiente boa se traga su presa entera, sin masticarla. Luego ya no puede moverse y duerme durante los seis meses que dura su digestión. Reflexioné mucho en ese momento sobre las aventuras de la jungla y a mi vez logré trazar con un lápiz de colores mi primer dibujo. Mi dibujo número 1 era de esta manera. Enseñé mi obra de arte a las personas mayores y les pregunté si mi dibujo les daba miedo.",
       
    // Parte 2
    "—¿Por qué habría de asustar un sombrero? — me respondieron. Mi dibujo no representaba un sombrero. Representaba una serpiente boa que digiere un elefante. Dibujé entonces el interior de la serpiente boa a fin de que las personas mayores pudieran comprender. Siempre estas personas tienen necesidad de explicaciones. Mi dibujo número 2 era así. Las personas mayores me aconsejaron abandonar el dibujo de serpientes boas, ya fueran abiertas o cerradas, y poner más interés en la geografía, la historia, el cálculo y la gramática. De esta manera a la edad de seis años abandoné una magnífica carrera de pintor. Había quedado desilusionado por el fracaso de mis dibujos número 1 y número 2. Las personas mayores nunca pueden comprender algo por sí solas y es muy aburrido para los niños tener que darles una y otra vez explicaciones.",
    
    // Parte 3
    "Esto no podía asombrarme mucho. Sabía muy bien que aparte de los grandes planetas como la Tierra, Júpiter, Marte, Venus, a los cuales se les ha dado nombre, existen otros centenares de ellos tan pequeños a veces, que es difícil distinguirlos aun con la ayuda del telescopio. Cuando un astrónomo descubre uno de estos planetas, le da por nombre un número. Le llama, por ejemplo, el asteroide 3251. Tengo poderosas razones para creer que el planeta del cual venía el principito era el asteroide B612. Este asteroide ha sido visto sólo una vez con el telescopio en 1909, por un astrónomo turco.",
    
    // Parte 4
    "Aprendí bien pronto a conocer mejor esta flor. Siempre había habido en el planeta del principito flores muy simples adornadas con una sola fila de pétalos que apenas ocupaban sitio y a nadie molestaban. Aparecían entre la hierba una mañana y por la tarde se extinguían. Pero aquella había germinado un día de una semilla llegada de quién sabe dónde, y el principito había vigilado cuidadosamente desde el primer día aquella ramita tan diferente de las que él conocía. Podía ser una nueva especie de Baobab. Pero el arbusto cesó pronto de crecer y comenzó a echar su flor. El principito observó el crecimiento de un enorme capullo y tenía le convencimiento de que habría de salir de allí una aparición milagrosa; pero la flor no acababa de preparar su belleza al abrigo de su envoltura verde."
];

// Variable global del índice del párrafo actual (asegúrate de que tenga este mismo nombre)
let parrafoActual = 0;

function cambiarParrafo(indice) {
    // 1. Actualizar el índice global del párrafo
    indiceParrafo = indice;

    // 2. Volver a cargar el párrafo con formato interactivo (crea los span de cada letra)
    cargarParrafo();

    // 3. Devolver el foco al input invisible para que el teclado funcione al instante
    const entrada = document.getElementById('entrada-mecanografia');
    if (entrada) {
        entrada.focus();
    }
}
    
// Mapa de teclado QWERTY español con indicación del dedo correspondiente
const mapaTeclado = [
    [
        { k: '|', d: 'dedo-menique-izq', desc: 'Mano izquierda - Dedo meñique' },
        { k: '1', d: 'dedo-menique-izq', desc: 'Mano izquierda - Dedo meñique' },
        { k: '2', d: 'dedo-anular-izq',  desc: 'Mano izquierda - Dedo anular' },
        { k: '3', d: 'dedo-medio-izq',   desc: 'Mano izquierda - Dedo medio' },
        { k: '4', d: 'dedo-indice-izq',  desc: 'Mano izquierda - Dedo índice' },
        { k: '5', d: 'dedo-indice-izq',  desc: 'Mano izquierda - Dedo índice' },
        { k: '6', d: 'dedo-indice-der',  desc: 'Mano derecha - Dedo índice' },
        { k: '7', d: 'dedo-indice-der',  desc: 'Mano derecha - Dedo índice' },
        { k: '8', d: 'dedo-medio-der',   desc: 'Mano derecha - Dedo medio' },
        { k: '9', d: 'dedo-anular-der',  desc: 'Mano derecha - Dedo anular' },
        { k: '0', d: 'dedo-menique-der', desc: 'Mano derecha - Dedo meñique' },
        { k: 'Backspace', d: 'dedo-menique-der', desc: 'Mano derecha - Dedo meñique', c: 'larga', t: 'Borrar' }
    ],
    [
        { k: 'Tab', d: 'dedo-menique-izq', desc: 'Mano izquierda - Dedo meñique', c: 'mediana', t: 'Tab' },
        { k: 'q', d: 'dedo-menique-izq', desc: 'Mano izquierda - Dedo meñique' },
        { k: 'w', d: 'dedo-anular-izq',  desc: 'Mano izquierda - Dedo anular' },
        { k: 'e', d: 'dedo-medio-izq',   desc: 'Mano izquierda - Dedo medio' },
        { k: 'r', d: 'dedo-indice-izq',  desc: 'Mano izquierda - Dedo índice' },
        { k: 't', d: 'dedo-indice-izq',  desc: 'Mano izquierda - Dedo índice' },
        { k: 'y', d: 'dedo-indice-der',  desc: 'Mano derecha - Dedo índice' },
        { k: 'u', d: 'dedo-indice-der',  desc: 'Mano derecha - Dedo índice' },
        { k: 'i', d: 'dedo-medio-der',   desc: 'Mano derecha - Dedo medio' },
        { k: 'o', d: 'dedo-anular-der',  desc: 'Mano derecha - Dedo anular' },
        { k: 'p', d: 'dedo-menique-der', desc: 'Mano derecha - Dedo meñique' }
    ],
    [
        { k: 'CapsLock', d: 'dedo-menique-izq', desc: 'Mano izquierda - Dedo meñique', c: 'larga', t: 'Bloq Mayús' },
        { k: 'a', d: 'dedo-menique-izq', desc: 'Mano izquierda - Dedo meñique' },
        { k: 's', d: 'dedo-anular-izq',  desc: 'Mano izquierda - Dedo anular' },
        { k: 'd', d: 'dedo-medio-izq',   desc: 'Mano izquierda - Dedo medio' },
        { k: 'f', d: 'dedo-indice-izq',  desc: 'Mano izquierda - Dedo índice' },
        { k: 'g', d: 'dedo-indice-izq',  desc: 'Mano izquierda - Dedo índice' },
        { k: 'h', d: 'dedo-indice-der',  desc: 'Mano derecha - Dedo índice' },
        { k: 'j', d: 'dedo-indice-der',  desc: 'Mano derecha - Dedo índice' },
        { k: 'k', d: 'dedo-medio-der',   desc: 'Mano derecha - Dedo medio' },
        { k: 'l', d: 'dedo-anular-der',  desc: 'Mano derecha - Dedo anular' },
        { k: 'ñ', d: 'dedo-menique-der', desc: 'Mano derecha - Dedo meñique' }
    ],
    [
        { k: 'Shift', d: 'dedo-menique-izq', desc: 'Mano izquierda - Dedo meñique', c: 'larga', t: 'Mayús' },
        { k: 'z', d: 'dedo-menique-izq', desc: 'Mano izquierda - Dedo meñique' },
        { k: 'x', d: 'dedo-anular-izq',  desc: 'Mano izquierda - Dedo anular' },
        { k: 'c', d: 'dedo-medio-izq',   desc: 'Mano izquierda - Dedo medio' },
        { k: 'v', d: 'dedo-indice-izq',  desc: 'Mano izquierda - Dedo índice' },
        { k: 'b', d: 'dedo-indice-izq',  desc: 'Mano izquierda - Dedo índice' },
        { k: 'n', d: 'dedo-indice-der',  desc: 'Mano derecha - Dedo índice' },
        { k: 'm', d: 'dedo-indice-der',  desc: 'Mano derecha - Dedo índice' },
        { k: ',', d: 'dedo-medio-der',   desc: 'Mano derecha - Dedo medio' },
        { k: '.', d: 'dedo-anular-der',  desc: 'Mano derecha - Dedo anular' },
        { k: '-', d: 'dedo-menique-der', desc: 'Mano derecha - Dedo meñique' }
    ],
    [
        { k: ' ', d: 'dedo-pulgar', desc: 'Cualquier mano - Dedo pulgar', c: 'espacio', t: 'Espacio' }
    ]
];

let indiceParrafo = 0;
let caracterIdx = 0;
let errores = 0;
let totalTecleado = 0;
let tiempoInicio = null;
let temporizador = null;
let juegoIniciado = false;

// DOM
const visorTexto = document.getElementById('visor-texto');
const entrada = document.getElementById('entrada-mecanografia');
const elemTiempo = document.getElementById('tiempo');
const elemWpm = document.getElementById('wpm');
const elemPrecision = document.getElementById('precision');
const elemProgreso = document.getElementById('progreso');
const indicadorDedo = document.getElementById('indicador-dedo');
const tecladoVirtual = document.getElementById('teclado-virtual');
const btnSiguiente = document.getElementById('btn-siguiente');
const btnReiniciar = document.getElementById('btn-reiniciar');

visorTexto.addEventListener('click', () => entrada.focus());

btnSiguiente.addEventListener('click', () => {
    indiceParrafo = (indiceParrafo + 1) % parrafosPrincipito.length;
    cargarParrafo();
});

btnReiniciar.addEventListener('click', cargarParrafo);

function generarTeclado() {
    tecladoVirtual.innerHTML = '';
    mapaTeclado.forEach(fila => {
        const divFila = document.createElement('div');
        divFila.className = 'fila-teclado';
        fila.forEach(tecla => {
            const divTecla = document.createElement('div');
            divTecla.className = `tecla \({tecla.d}\){tecla.c || ''}`;
            divTecla.dataset.key = tecla.k.toLowerCase();
            divTecla.textContent = tecla.t || tecla.k.toUpperCase();
            divFila.appendChild(divTecla);
        });
        tecladoVirtual.appendChild(divFila);
    });
}

document.addEventListener('keydown', (e) => {
    if (['Alt', 'Control', 'CapsLock', 'Tab'].includes(e.key)) return;

    const caracteres = visorTexto.querySelectorAll('.caracter');
    if (caracterIdx >= caracteres.length) return;

    if (!juegoIniciado) {
        iniciarCronometro();
        juegoIniciado = true;
    }

    const teclaPresionada = e.key;
    const caracterEsperado = caracteres[caracterIdx].textContent;

    if (teclaPresionada === 'Backspace') {
        if (caracterIdx > 0) {
            caracteres[caracterIdx].classList.remove('actual');
            caracterIdx--;
            caracteres[caracterIdx].classList.remove('correcto', 'incorrecto');
            caracteres[caracterIdx].classList.add('actual');
        }
        actualizarGuiaTecla();
        return;
    }

    if (teclaPresionada.length !== 1) return;

    totalTecleado++;

    if (teclaPresionada === caracterEsperado) {
        caracteres[caracterIdx].classList.remove('actual', 'incorrecto');
        caracteres[caracterIdx].classList.add('correcto');
    } else {
        caracteres[caracterIdx].classList.remove('actual');
        caracteres[caracterIdx].classList.add('incorrecto');
        errores++;
    }

    caracterIdx++;

    if (caracterIdx < caracteres.length) {
        caracteres[caracterIdx].classList.add('actual');
        caracteres[caracterIdx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        clearInterval(temporizador);
        indicadorDedo.textContent = "🎉 ¡Excelente! Párrafo completado.";
    }

    actualizarGuiaTecla();
    calcularMetricas();
});

function cargarParrafo() {
    clearInterval(temporizador);
    juegoIniciado = false;
    caracterIdx = 0;
    errores = 0;
    totalTecleado = 0;

    elemTiempo.textContent = '0';
    elemWpm.textContent = '0';
    elemPrecision.textContent = '100';
    elemProgreso.textContent = '0';

    visorTexto.innerHTML = '';
    const textoActual = parrafosPrincipito[indiceParrafo];

    textoActual.split('').forEach((char, idx) => {
        const span = document.createElement('span');
        span.classList.add('caracter');
        if (idx === 0) span.classList.add('actual');
        span.textContent = char;
        visorTexto.appendChild(span);
    });

    generarTeclado();
    actualizarGuiaTecla();
    entrada.focus();
}

function actualizarGuiaTecla() {
    const caracteres = visorTexto.querySelectorAll('.caracter');
    document.querySelectorAll('.tecla').forEach(t => t.classList.remove('activa'));

    if (caracterIdx >= caracteres.length) return;

    let charEsperado = caracteres[caracterIdx].textContent.toLowerCase();
    
    // Buscar la tecla correspondiente en el mapa
    let infoTecla = null;
    for (const fila of mapaTeclado) {
        infoTecla = fila.find(t => t.k.toLowerCase() === charEsperado);
        if (infoTecla) break;
    }

    if (infoTecla) {
        const nombreTecla = charEsperado === ' ' ? 'ESPACIO' : charEsperado.toUpperCase();
        
        // Construcción limpia de la cadena sin colisión de caracteres o comillas
        indicadorDedo.textContent = '👉 Tecla: "' + nombreTecla + '" ➔ ' + infoTecla.desc;
        
        // Resaltar la tecla en el teclado virtual usando un selector seguro
        const teclaElem = tecladoVirtual.querySelector("[data-key='" + charEsperado + "']");
        if (teclaElem) teclaElem.classList.add('activa');
    } else {
        indicadorDedo.textContent = '👉 Presiona la tecla: "' + charEsperado.toUpperCase() + '"';
    }
}

function iniciarCronometro() {
    tiempoInicio = Date.now();
    temporizador = setInterval(() => {
        const segundos = Math.floor((Date.now() - tiempoInicio) / 1000);
        elemTiempo.textContent = segundos;
        calcularMetricas();
    }, 1000);
}

function calcularMetricas() {
    const segundos = Math.max(1, Math.floor((Date.now() - (tiempoInicio || Date.now())) / 1000));
    const totalCaracteres = visorTexto.querySelectorAll('.caracter').length;

    // PPM / WPM (1 palabra = 5 caracteres)
    const palabrasCorrectas = (caracterIdx - errores) / 5;
    const wpm = Math.max(0, Math.round((palabrasCorrectas / segundos) * 60));
    elemWpm.textContent = wpm;

    // Precisión
    if (totalTecleado > 0) {
        const precision = Math.max(0, Math.round(((totalTecleado - errores) / totalTecleado) * 100));
        elemPrecision.textContent = precision;
    }

    // Progreso %
    const porcentaje = Math.round((caracterIdx / totalCaracteres) * 100);
    elemProgreso.textContent = porcentaje;
}

window.onload = cargarParrafo;
