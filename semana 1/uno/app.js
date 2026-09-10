// Preguntas con definicion de funciones para 4º Grado
const questions = [
    {
        question: "¿Cuál es la función del Gabinete / CPU en la computadora?",
        image: "img/cpu.png",
        options: [
            "Procesar los datos y ser el 'Cerebro' de la computadora",
            "Mostrar la imagen y videos en la pantalla",
            "Escribir textos e instrucciones",
            "Escuchar los sonidos de los juegos"
        ],
        correct: 0
    },
    {
        question: "¿Para qué sirve el Teclado?",
        image: "img/teclado.png",
        options: [
            "Para escuchar música y audios",
            "Es un dispositivo de entrada para escribir letras y números",
            "Para capturar fotos e imágenes",
            "Para procesar y guardar los archivos"
        ],
        correct: 1
    },
    {
        question: "¿Cuál es la función principal del Monitor o Pantalla?",
        image: "img/monitor.png",
        options: [
            "Grabar nuestra voz",
            "Mover el puntero o flecha en la pantalla",
            "Dispositivo de salida que muestra las imágenes y texto",
            "Imprimir hojas en papel"
        ],
        correct: 2
    },
    {
        question: "¿Cuál es la función de las Bocinas o Altavoces?",
        image: "img/bocinas.png",
        options: [
            "Ingresar texto a la computadora",
            "Dispositivo de salida para reproducir sonidos y música",
            "Guardar archivos cuando se apaga el equipo",
            "Capturar video en vivo"
        ],
        correct: 1
    },
    {
        question: "¿Para qué utilizamos el Micrófono?",
        image: "img/microfono.png",
        options: [
            "Dispositivo de entrada para ingresar nuestra voz y sonidos",
            "Para ver películas e imágenes",
            "Para hacer clic en los íconos",
            "Para imprimir dibujos"
        ],
        correct: 0
    },
    {
        question: "¿Qué función cumple el Mouse o Ratón?",
        image: "img/mouse.png",
        options: [
            "Procesar toda la información",
            "Permite seleccionar elementos y mover el cursor en la pantalla",
            "Pasar hojas de papel a la computadora",
            "Emitir el sonido del sistema"
        ],
        correct: 1
    }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timerId = null;

const questionEl = document.getElementById('question-text');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const qNumEl = document.getElementById('question-number');

// Cargar la pregunta actual
function loadQuestion() {
    clearInterval(timerId);
    timeLeft = 15;
    timerEl.textContent = timeLeft;

    const q = questions[currentIndex];
    
    // 1. Mostrar número de pregunta y enunciado
    qNumEl.textContent = `Pregunta ${currentIndex + 1} de ${questions.length}`;
    questionEl.textContent = q.question;

    // 2. Cargar la imagen del componente actual
    const imgEl = document.getElementById('question-image');
    if (imgEl && q.image) {
        imgEl.src = q.image;
    }

    // 3. Cargar las opciones en los botones
    for (let i = 0; i < 4; i++) {
        const optSpan = document.getElementById(`opt${i}`);
        if (optSpan) {
            optSpan.textContent = q.options[i];
        }
    }

    // 4. Iniciar temporizador
    timerId = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            checkAnswer(-1);
        }
    }, 1000);
}

// Evaluar respuesta elegida
function checkAnswer(selectedIndex) {
    clearInterval(timerId);
    const q = questions[currentIndex];

    if (selectedIndex === q.correct) {
        score += 500 + (timeLeft * 20);
        scoreEl.textContent = score;
    }

    currentIndex++;

    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Pantalla final
function showResults() {
    document.getElementById('quiz-card').classList.add('hidden');
    document.getElementById('result-card').classList.remove('hidden');
    document.getElementById('final-score').textContent = score;
}

// Reiniciar actividad
function restartGame() {
    currentIndex = 0;
    score = 0;
    scoreEl.textContent = score;
    document.getElementById('quiz-card').classList.remove('hidden');
    document.getElementById('result-card').classList.add('hidden');
    loadQuestion();
}

// Llamada inicial para arrancar la primera pregunta
loadQuestion();