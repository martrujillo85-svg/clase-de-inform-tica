// Banco de zonas a identificar
const missions = [
    { id: 'escape', text: "La tecla Escape (Esc)" },
    { id: 'funcion', text: "Las Teclas de Función (F1-F12)" },
    { id: 'tabulador', text: "El Tabulador (Tab)" },
    { id: 'bloqmayus', text: "Bloq Mayús" },
    { id: 'alfanumerico', text: "El Teclado Alfanumérico" },
    { id: 'backspace', text: "Back Space (Borrar)" },
    { id: 'windows', text: "El Botón Windows" },
    { id: 'space', text: "La Barra Espaciadora (Space)" },
    { id: 'enter', text: "La tecla Enter" },
    { id: 'navegacion', text: "Las Teclas de Desplazamiento" },
    { id: 'numerico', text: "El Teclado Numérico" }
];

let remainingMissions = [...missions];
let currentMission = null;
let score = 0;

const targetNameEl = document.getElementById('target-name');
const feedbackEl = document.getElementById('feedback-msg');
const scoreEl = document.getElementById('score');
const allZones = document.querySelectorAll('.key-zone');

// Desordena las preguntas para que el juego sea diferente cada vez
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadMission() {
    // Limpiar estilos anteriores
    allZones.forEach(zone => {
        zone.classList.remove('correct-zone', 'wrong-zone');
        zone.style.pointerEvents = 'auto'; // Reactivar clics
    });
    feedbackEl.textContent = "";

    if (remainingMissions.length === 0) {
        targetNameEl.textContent = "¡Juego Terminado!";
        feedbackEl.style.color = "#16a34a";
        feedbackEl.style.backgroundColor = "#dcfce7";
        feedbackEl.textContent = "🎉 ¡Felicidades! Lograste identificar todas las partes del teclado.";
        return;
    }

    currentMission = remainingMissions.pop();
    targetNameEl.textContent = currentMission.text;
}

function checkZone(selectedId) {
    if (!currentMission) return;

    // Desactivar clics temporalmente para evitar spam
    allZones.forEach(zone => zone.style.pointerEvents = 'none');
    
    const element = document.querySelector(`[data-id="${selectedId}"]`);

    if (selectedId === currentMission.id) {
        // Acierto
        score += 100;
        scoreEl.textContent = score;
        feedbackEl.style.color = "#16a34a";
        feedbackEl.style.backgroundColor = "#dcfce7";
        feedbackEl.textContent = "✅ ¡Excelente! Encontraste " + currentMission.text + ".";
        
        element.classList.add('correct-zone');

        // Pasar a la siguiente misión tras 1.5 segundos
        setTimeout(() => {
            loadMission();
        }, 1500);

    } else {
        // Error
        feedbackEl.style.color = "#dc2626";
        feedbackEl.style.backgroundColor = "#fee2e2";
        feedbackEl.textContent = "❌ Ese no es. Estás buscando: " + currentMission.text;
        
        element.classList.add('wrong-zone');
        
        // Penalización opcional (quitar puntos si se equivocan)
        if (score > 0) score -= 20;
        scoreEl.textContent = score;

        // Permitir volver a intentar tras un breve retraso
        setTimeout(() => {
            element.classList.remove('wrong-zone');
            allZones.forEach(zone => zone.style.pointerEvents = 'auto');
            feedbackEl.textContent = "";
        }, 1200);
    }
}

// Iniciar el juego
shuffle(remainingMissions);
loadMission();