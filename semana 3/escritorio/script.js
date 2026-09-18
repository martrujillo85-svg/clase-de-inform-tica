const draggableItems = document.querySelectorAll('.draggable-item');
const allDropzones = document.querySelectorAll('.dropzone, .dropzone-icon, .dropzone-tb');
const desktopCanvas = document.getElementById('desktop-canvas');
const feedbackEl = document.getElementById('feedback-msg');
const scoreEl = document.getElementById('score');

let placedCount = 0;
const totalElements = 11;
let draggedType = null;

draggableItems.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        draggedType = item.getAttribute('data-type');
        e.dataTransfer.setData('text/plain', draggedType);
        item.style.opacity = '0.4';
    });
    item.addEventListener('dragend', () => { item.style.opacity = '1'; });
});

allDropzones.forEach(zone => {
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('highlight'); });
    zone.addEventListener('dragleave', () => { zone.classList.remove('highlight'); });
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('highlight');
        const targetType = zone.getAttribute('data-target');

        if (targetType === draggedType) {
            handleValidDrop(zone, targetType);
        } else {
            feedbackEl.style.color = '#f87171';
            feedbackEl.textContent = '❌ Ese componente no pertenece a esta zona exacta.';
        }
    });
});

function handleValidDrop(zone, targetType) {
    const trayItem = document.querySelector(`.draggable-item[data-type="${targetType}"]`);
    if (trayItem && !trayItem.classList.contains('hidden-drag')) {
        trayItem.classList.add('hidden-drag');
        zone.classList.add('placed');
        zone.innerHTML = '';

        const placedContent = {
            'wallpaper': '<span style="font-size:0.75rem; background:rgba(0,0,0,0.6); padding:2px 8px; border-radius:4px; color:white;">🖼️ Fondo</span>',
            'chrome': '<img src="img/chrome.png" alt="Chrome" style="width:34px; height:34px; object-fit:contain;">',
            'edge': '<img src="img/edge.png" alt="Edge" style="width:34px; height:34px; object-fit:contain;">',
            'word': '<img src="img/w.png" alt="Word" style="width:34px; height:34px; object-fit:contain;">',
            'papelera': '<img src="img/pape.png" alt="Papelera" style="width:34px; height:34px; object-fit:contain;">',
            'carpetas': '<img src="img/carpeta.png" alt="Carpeta" style="width:34px; height:34px; object-fit:contain;">',
            'start': '<img src="img/start.png" alt="Inicio" style="width:18px; vertical-align:middle; margin-right:4px;"> Inicio',
            'search': '🔍 Buscar...',
            'excel': '<img src="img/excel.jpg" alt="Excel" style="width:18px; vertical-align:middle; margin-right:4px;"> Excel',
            'shortcut-folder': '<img src="img/carpeta.png" alt="Archivos" style="width:18px; vertical-align:middle; margin-right:4px;"> Archivos',
            'notify': '📶 🔊 10:00 a. m.'
        };

        if (targetType === 'wallpaper') {
            desktopCanvas.classList.add('has-wallpaper');
        }

        zone.innerHTML = placedContent[targetType] || '';

        placedCount++;
        scoreEl.textContent = placedCount;
        feedbackEl.style.color = '#4ade80';
        feedbackEl.textContent = '✅ ¡Excelente! Elemento acoplado en su zona.';

        if (placedCount === totalElements) {
            feedbackEl.textContent = '🎉 ¡Felicidades! Escritorio y barra fraccionada configurados.';
        }
    }
}