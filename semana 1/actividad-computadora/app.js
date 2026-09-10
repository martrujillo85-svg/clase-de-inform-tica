// Lista de elementos a identificar
const parts = [
    { id: 'monitor', name: 'Monitor / Pantalla' },
    { id: 'teclado', name: 'Teclado' },
    { id: 'mouse', name: 'Mouse / Ratón' },
    { id: 'cpu', name: 'Gabinete / CPU' },
    { id: 'bocinas', name: 'Bocinas / Altavoces' },
    { id: 'webcam', name: 'Cámara Web / Webcam' },
    { id: 'microfono', name: 'Micrófono' },
    { id: 'impresora', name: 'Impresora' }
];

let remainingParts = [...parts];
let currentPart = null;
let score = 0;

const promptEl = document.getElementById('target-prompt');
const scoreEl = document.getElementById('score');
const hitboxes = document.querySelectorAll('.hitbox');

// Función para sintetizar la orden por voz (ideal para primaria)
//function speak(text) {
    //if ('speechSynthesis' in window) {
       // const utterance = new SpeechSynthesisUtterance(text);
       // utterance.lang = 'es-MX';
       // window.speechSynthesis.cancel(); // Detener audios anteriores
       // window.speechSynthesis.speak(utterance);
   // }
//}//comentar lo anterior si no se desea la voz

function nextTurn() {
    if (remainingParts.length === 0) {
        const winMessage = "¡Excelente trabajo! Has identificado todas las partes.";
        promptEl.textContent = "🎉 ¡Felicidades! Juego completado.";
        speak(winMessage);
        return;
    }

    // Seleccionar elemento aleatorio
    const randomIndex = Math.floor(Math.random() * remainingParts.length);
    currentPart = remainingParts[randomIndex];

    const instruction = `Encuentra: ${currentPart.name}`;
    promptEl.textContent = instruction;
    speak(instruction);
}

hitboxes.forEach(button => {
    button.addEventListener('click', (e) => {
        const clickedPart = e.target.getAttribute('data-part');

        if (clickedPart === currentPart.id) {
            e.target.classList.add('correct');
            score += 100;
            scoreEl.textContent = score;

            // Eliminar de la lista de pendientes
            remainingParts = remainingParts.filter(p => p.id !== currentPart.id);
            nextTurn();
        } else {
            e.target.classList.add('wrong');
            setTimeout(() => e.target.classList.remove('wrong'), 500);
        }
    });
});

// Arrancar el juego
nextTurn();