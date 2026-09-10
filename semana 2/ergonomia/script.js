// Estado actual de la inspección
const state = {
    monitor: 'low',
    chair: 'low',
    feet: 'hanging'
};

function adjustElement(type, value) {
    state[type] = value;
    const el = document.getElementById(`${type}-element`);

    if (type === 'monitor') {
        el.textContent = value === 'correct' ? "🖥️ Monitor (Altura Correcta)" : "🖥️ Monitor (Muy Bajo)";
    } else if (type === 'chair') {
        el.textContent = value === 'correct' ? "🪑 Espalda (Recta y Apoyada)" : "🪑 Espalda (Encorvada)";
    } else if (type === 'feet') {
        el.textContent = value === 'correct' ? "🦶 Pies (Apoyados en el Piso)" : "🦶 Pies (Colgando)";
    }

    if (value === 'correct') {
        el.classList.add('correct-state');
    } else {
        el.classList.remove('correct-state');
    }
}

function validatePosturalCheck() {
    const feedbackEl = document.getElementById('feedback-result');
    const statusEl = document.getElementById('character-status');

    if (state.monitor === 'correct' && state.chair === 'correct' && state.feet === 'correct') {
        statusEl.textContent = "✅ Postura 100% Ergonómica";
        statusEl.style.backgroundColor = "#2ecc71";
        statusEl.style.color = "white";

        feedbackEl.className = "feedback success";
        feedbackEl.textContent = "🎉 ¡Inspección Aprobada! Has ajustado el puesto de trabajo correctamente para cuidar la salud del usuario.";
    } else {
        statusEl.textContent = "⚠️ Ajustes Pendientes";
        statusEl.style.backgroundColor = "#ffc107";
        statusEl.style.color = "#333";

        feedbackEl.className = "feedback error";
        feedbackEl.textContent = "❌ Todavía hay problemas de postura. Revisa los puntos que están en color rojo o desajustados.";
    }
}