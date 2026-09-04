// Base de datos modular para gestionar todas las semanas
const contenidoSemanas = {
    1: {
        titulo: "Semana 1: Partes de la Computadora",
        descripcion: "Selecciona una actividad para comenzar a practicar:",
        actividades: [
            { id: 1, nombre: "📍 Actividad 1: Partes de la Computadora" },
            { id: 2, nombre: "❓ Actividad 2: Cuestionario" }
        ]
    }
    // Aquí irás sumando 2, 3... hasta las 30+ semanas
};

// Navegación entre las secciones principales (Inicio, Juegos, Infografías, Enlaces)
function showSection(sectionId) {
    document.querySelectorAll('.main-section').forEach(sec => sec.classList.add('hidden'));
    
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
    }

    // Actualizar estilo del menú superior
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
}

// Cargar la vista de una semana específica con sus botones de actividad
function showWeek(weekNumber) {
    const data = contenidoSemanas[weekNumber];
    if (!data) return;

    // 1. Ocultar todas las secciones
    document.querySelectorAll('.main-section').forEach(sec => sec.classList.add('hidden'));

    // 2. Insertar título y descripción de la semana
    document.getElementById('semana-titulo').textContent = data.titulo;
    document.getElementById('semana-descripcion').textContent = data.descripcion;

    // 3. Crear los botones de las 2 actividades
    const tabsContainer = document.getElementById('actividades-lista');
    tabsContainer.innerHTML = '';
    
    // Dejar la pantalla central limpia a la espera de un clic
    document.getElementById('actividad-pantalla').innerHTML = `
        <div style="padding: 30px; text-align: center; color: #46178f;">
            <p style="font-weight: bold; font-size: 1.1rem;">👈 Presiona uno de los botones de arriba para cargar la actividad.</p>
        </div>
    `;

    data.actividades.forEach(act => {
        const btn = document.createElement('button');
        btn.className = 'tab-btn';
        btn.textContent = act.nombre;
        btn.onclick = (e) => {
            // Remueve clase activa de los otros botones
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Carga el contenido dinámico
            loadActivity(weekNumber, act.id);
        };
        tabsContainer.appendChild(btn);
    });

    // 4. Mostrar la vista contenedora
    document.getElementById('semana-view').classList.remove('hidden');
}

function loadActivity(weekNumber, activityId) {
    const screen = document.getElementById('actividad-pantalla');

    if (weekNumber === 1 && activityId === 1) {
        screen.innerHTML = `
            <div style="width: 100%; max-width: 900px; height: 580px; margin: 10px auto;">
                <iframe 
                    src="actividad-computadora/index.html" 
                    style="width: 100%; height: 100%; border: none; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);"
                    title="Conoce las Partes de la Computadora">
                </iframe>
            </div>
        `;
    } else if (weekNumber === 1 && activityId === 2) {
        screen.innerHTML = `
            <div style="width: 100%; max-width: 900px; height: 580px; margin: 10px auto;">
                <iframe 
                    src="uno/index.html" 
                    style="width: 100%; height: 100%; border: none; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);"
                    title="Cuestionario Semana 1">
                </iframe>
            </div>
        `;
    }
}

