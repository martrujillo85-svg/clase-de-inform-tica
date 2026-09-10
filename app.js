// 1. Semanas y sus Actividades integradas
const contenidoSemanas = {
    1: {
        titulo: "Semana 1: Partes de la Computadora",
        descripcion: "Selecciona una actividad para comenzar a practicar:",
        actividades: [
            { id: 1, nombre: "📍 Actividad 1: Partes de la Computadora" },
            { id: 2, nombre: "❓ Actividad 2: Cuestionario" }
        ]
    },
    2: {
        titulo: "Semana 2: Ergonomía al Usar la Computadora",
        descripcion: "Aprende a configurar tu puesto de trabajo para cuidar tu postura:",
        actividades: [
            { id: 1, nombre: "🕵️‍♂️ Actividad 1: Inspector de Ergonomía" },
            { id: 2, nombre: "🔤 Actividad 2: Sopa de Letras" }

        ]
    },
    3: {
        titulo: "Semana 3: Próximamente",
        descripcion: "",
        actividades: [
            
        ]
    },
    4: {
        titulo: "Semana 4: Repaso General",
        descripcion: "Próximamente más contenidos y dinámicas.",
        actividades: []
    }
};

// 2. Navegación entre Secciones Principales (Inicio, Juegos, Infografías, Enlaces)
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.main-section').forEach(sec => {
        sec.classList.add('hidden');
    });

    // Remover la clase active de todos los enlaces del menú
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Mostrar la sección requerida
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
    }
}
// 2. Función para renderizar el catálogo de cuadros iguales de las semanas
function renderWeeksCatalog() {
    const grid = document.getElementById('grid-semanas');
    if (!grid) return;

    // Vaciamos completamente el contenedor para evitar duplicados
    grid.innerHTML = '';

    // Generamos ÚNICAMENTE 1 tarjeta por cada clave dentro de contenidoSemanas
    Object.keys(contenidoSemanas).forEach(num => {
        const semana = contenidoSemanas[num];
        const card = document.createElement('div');
        
        card.className = 'feature-card card-purple-transparent';
        card.style.cursor = 'pointer';
        
        // Asigna el título correspondiente a cada número de semana
        card.innerHTML = `
            <h3>📅 Semana ${num}</h3>
            <p>${semana.titulo.split(':')[1] || semana.titulo}</p>
        `;

        card.onclick = () => showWeek(Number(num));

        grid.appendChild(card);
    });
}
// 3. Modificar showSection para que active el catálogo si corresponde
function showSection(sectionId) {
    document.querySelectorAll('.main-section').forEach(sec => sec.classList.add('hidden'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
    }

    // Si la sección elegida es el catálogo de semanas, renderizamos sus tarjetas
    if (sectionId === 'semanas-catalogo') {
        renderWeeksCatalog();
    }
}
// 3. Muestra la pantalla general de la Semana seleccionada
function showWeek(weekNumber) {
    const data = contenidoSemanas[weekNumber];
    if (!data) return;

    // Ocultar todas las secciones generales
    document.querySelectorAll('.main-section').forEach(sec => {
        sec.classList.add('hidden');
    });

    // Insertar título y descripción de la semana
    document.getElementById('semana-titulo').textContent = data.titulo;
    document.getElementById('semana-descripcion').textContent = data.descripcion;

    // Cargar los botones/pestañas de sus actividades
    const tabsContainer = document.getElementById('actividades-lista');
    tabsContainer.innerHTML = '';

    // Estado inicial de la pantalla de actividades
    const screen = document.getElementById('actividad-pantalla');
    
    if (data.actividades.length === 0) {
        screen.innerHTML = `
            <div style="padding: 40px; text-align: center; color: #666;">
                <p style="font-size: 1.1rem; font-weight: 600;">⚠️ Esta semana aún no tiene actividades disponibles.</p>
            </div>
        `;
    } else {
        screen.innerHTML = `
            <div style="padding: 30px; text-align: center; color: #46178f;">
                <p style="font-weight: bold; font-size: 1.1rem;">👈 Haz clic en una de las actividades superiores para cargar el ejercicio.</p>
            </div>
        `;
    }

    // Crear dinámicamente cada botón de actividad
    data.actividades.forEach(act => {
        const btn = document.createElement('button');
        btn.className = 'tab-btn';
        btn.textContent = act.nombre;
        
        // Estilos para los botones de las pestañas
        btn.style.cssText = `
            margin: 5px; 
            padding: 10px 20px; 
            border-radius: 8px; 
            border: 2px solid #46178f; 
            background: white; 
            color: #46178f; 
            font-weight: bold; 
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        `;

        btn.onclick = () => {
            // Desmarcar otros botones
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.style.background = "white";
                b.style.color = "#46178f";
            });
            // Marcar este botón como activo
            btn.style.background = "#46178f";
            btn.style.color = "white";

            // Cargar iframe correspondiente
            loadActivity(weekNumber, act.id);
        };

        tabsContainer.appendChild(btn);
    });

    // Mostrar el contenedor de semanas
    const semanaView = document.getElementById('semana-view');
    if (semanaView) {
        semanaView.classList.remove('hidden');
    }
}

// 4. Inserción dinámica de iFrames por actividad
function loadActivity(weekNumber, activityId) {
    const screen = document.getElementById('actividad-pantalla');

    if (weekNumber === 1 && activityId === 1) {
        // Semana 1 - Actividad 1: Partes de la Computadora
        screen.innerHTML = `
            <div style="width: 100%; max-width: 900px; height: 580px; margin: 10px auto;">
                <iframe 
                    src="semana 1/actividad-computadora/index.html" 
                    style="width: 100%; height: 100%; border: none; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);" 
                    title="Partes de la Computadora">
                </iframe>
            </div>
        `;
    } else if (weekNumber === 1 && activityId === 2) {
        // Semana 1 - Actividad 2: Cuestionario
        screen.innerHTML = `
            <div style="width: 100%; max-width: 900px; height: 580px; margin: 10px auto;">
                <iframe 
                    src="semana 1/uno/index.html" 
                    style="width: 100%; height: 100%; border: none; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);" 
                    title="Cuestionario Partes de la Computadora">
                </iframe>
            </div>
        `;
    } else if (weekNumber === 2 && activityId === 1) {
        // Semana 2 - Actividad 1: Inspector de Ergonomía
        screen.innerHTML = `
            <div style="width: 100%; max-width: 900px; height: 600px; margin: 10px auto;">
                <iframe 
                    src="semana 2/ergonomia/index.html" 
                    style="width: 100%; height: 100%; border: none; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);" 
                    title="Inspector de Ergonomía">
                </iframe>
            </div>
        `;
    }
    else if (weekNumber === 2 && activityId === 2) {
        // Semana 2 - Actividad 2: Sopa de Letras Ergonomía
        screen.innerHTML = `
            <div style="width: 100%; max-width: 900px; height: 620px; margin: 10px auto;">
                <iframe src="semana 2/sopa/index.html" style="width: 100%; height: 100%; border: none; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);" title="Sopa de Letras - Ergonomía"></iframe>
            </div>
        `;
    }
}

// Función para cargar el Creador Pixel Art
function loadPixelGame() {
    // 1. Ocultar la cuadrícula de tarjetas de juegos para ganar espacio libre
    const gamesGrid = document.querySelector('.games-grid');
    if (gamesGrid) {
        gamesGrid.style.display = 'none';
    }

    const container = document.getElementById('pixel-game-container');
    if (!container) return;

    // 2. Renderizar el iframe del Pixel Art aprovechando toda la pantalla
    container.innerHTML = `
        <div style="position: relative; width: 100%; max-width: 1050px; height: 720px; margin: 0 auto;">
            <button onclick="closePixelGame()" style="position: absolute; top: 10px; right: 10px; z-index: 10; background: #dc2626; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">❌ Cerrar Juego</button>
            <iframe src="/juego/pixel/index.html" style="width: 100%; height: 100%; border: none; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);" title="Creador Pixel Art"></iframe>
        </div>
    `;
}

// Función para cerrar el juego y restaurar el menú de juegos
function closePixelGame() {
    const container = document.getElementById('pixel-game-container');
    if (container) {
        container.innerHTML = '';
    }

    // Volver a mostrar la cuadrícula de tarjetas de juegos
    const gamesGrid = document.querySelector('.games-grid');
    if (gamesGrid) {
        gamesGrid.style.display = 'grid';
    }
}