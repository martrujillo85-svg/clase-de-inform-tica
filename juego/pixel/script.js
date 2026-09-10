let currentToolValue = '#87CEEB';
let currentToolType = 'color'; // 'color', 'texture', 'eraser'
const gridSize = 22; // Cuadrícula grande de 22x22

const gridEl = document.getElementById('pixel-grid');

// Generar la cuadrícula interactiva
function createGrid() {
    gridEl.innerHTML = '';
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'pixel-cell';
        
        cell.addEventListener('click', () => applyTool(cell));
        cell.addEventListener('mouseover', (e) => {
            if (e.buttons === 1) applyTool(cell); // Pintar al arrastrar el mouse
        });

        gridEl.appendChild(cell);
    }
}

// Seleccionar herramienta activa (Color o Textura)
function selectTool(value, type) {
    currentToolValue = value;
    currentToolType = type;
}

// Aplicar color, textura o borrador a la celda
function applyTool(cell) {
    if (currentToolType === 'color') {
        cell.style.backgroundColor = currentToolValue;
        cell.textContent = ''; // Limpiar emoji si había textura
    } else if (currentToolType === 'texture') {
        cell.style.backgroundColor = 'transparent';
        cell.textContent = currentToolValue;
    } else if (currentToolType === 'eraser') {
        cell.style.backgroundColor = '#ffffff';
        cell.textContent = '';
    }
}

// Limpiar todo el lienzo
function clearGrid() {
    const cells = document.querySelectorAll('.pixel-cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '#ffffff';
        cell.textContent = '';
    });
}

// Inicializar al cargar
createGrid();