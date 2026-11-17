const fasesData = [
    {
        id: "fase-1",
        titulo: "Fase 1: Explorando el área de trabajo (Retos 1 al 4)",
        descripcion: "Estos primeros retos sirven para que pierdas el miedo a moverte por las ventanas y botones principales.",
        medallaId: "medalla-1",
        retos: [
            {
                id: 1,
                nombre: "Reto 1: ¡Aumenta la lupa!",
                ubicacion: "📍 Esquina inferior derecha",
                instruccion: "Mueve la barra de Zoom hasta que la hoja se vea gigante (al 150% o más) y luego regrésala a su tamaño normal."
            },
            {
                id: 2,
                nombre: "Reto 2: Fábrica de hojas",
                ubicacion: "📍 Pestaña Inicio",
                instruccion: "Busca el botón Nueva diapositiva y haz clic hasta tener 4 hojas en tu panel izquierdo."
            },
            {
                id: 3,
                nombre: "Reto 3: El viaje en el tiempo",
                ubicacion: "📍 Arriba a la izquierda",
                instruccion: "Haz clic en la diapositiva número 2 del panel izquierdo; escribe tu nombre, cambia el formato, en la diapositiva 3 escribe hola y luego usa la flecha curva de Deshacer para que desaparezca por arte de magia."
            },
            {
                id: 4,
                nombre: "Reto 4: Cambio de ropa",
                ubicacion: "📍 Pestaña Diseño",
                instruccion: "Elige cualquier tema de colores para que todas tus hojas cambien de fondo al mismo tiempo."
            }
        ]
    },
    {
        id: "fase-2",
        titulo: "Fase 2: Jugando con formas y texto (Retos 5 al 8)",
        descripcion: "Aquí empezarás a usar la pestaña Insertar y a manipular elementos dentro de la diapositiva.",
        medallaId: "medalla-2",
        retos: [
            {
                id: 5,
                nombre: "Reto 5: Cazador de figuras",
                ubicacion: "📍 Pestaña Insertar > Formas",
                instruccion: "Dibuja una estrella en la diapositiva 1 y píntala de color amarillo usando el botón Relleno de forma."
            },
            {
                id: 6,
                nombre: "Reto 6: El gigante y el enano",
                ubicacion: "📍 Bolitas de las esquinas",
                instruccion: "Dibuja un círculo en la diapositiva 4, hazlo tan grande que casi toque los bordes de la hoja y luego encógelo hasta que sea del tamaño de una moneda y cambia su color."
            },
            {
                id: 7,
                nombre: "Reto 7: ¡De cabeza!",
                ubicacion: "📍 Flecha circular superior",
                instruccion: "En la diapositiva 3 inserta una flecha o una carita feliz y usa la flecha circular que está arriba de la figura para girarla hasta que quede completamente de cabeza."
            },
            {
                id: 8,
                nombre: "Reto 8: Tu firma secreta",
                ubicacion: "📍 Pestaña Insertar > Cuadro de texto",
                instruccion: "Escribe tu nombre completo, selecciónalo y ponlo en Negritas (N) y de color rojo."
            }
        ]
    },
    {
        id: "fase-3",
        titulo: "Fase 3: Trucos de magia y pantalla completa (Retos 9 y 10)",
        descripcion: "Cierra la actividad con dos funciones divertidas para ver cómo cobra vida tu pantalla.",
        medallaId: "medalla-3",
        retos: [
            {
                id: 9,
                nombre: "Reto 9: ¡Efecto especial!",
                ubicacion: "📍 Pestaña Transiciones",
                instruccion: "Elige la transición que se llama Cortinas, Avión o Aplastar y observa cómo cambia tu hoja."
            },
            {
                id: 10,
                nombre: "Reto 10: ¡Modo cine!",
                ubicacion: "📍 Barra inferior (ícono de copita)",
                instruccion: "Haz clic en Presentación con diapositivas para ver tu trabajo en pantalla completa, y luego presiona la tecla Esc de tu teclado para volver."
            }
        ]
    }
];

const contenedorFases = document.getElementById("lista-fases");
const barraProgreso = document.getElementById("barra-progreso");
const textoCompletados = document.getElementById("texto-completados");
const porcentajeTexto = document.getElementById("porcentaje-texto");
const bannerVictoria = document.getElementById("banner-victoria");

function renderizarActividad() {
    contenedorFases.innerHTML = "";

    fasesData.forEach((fase) => {
        const tarjeta = document.createElement("section");
        tarjeta.className = "tarjeta-fase";
        tarjeta.id = fase.id;

        let retosHTML = "";
        fase.retos.forEach((reto) => {
            retosHTML += `
                <label class="reto-item" for="chk-${reto.id}">
                    <input type="checkbox" id="chk-${reto.id}" class="reto-checkbox" data-fase="${fase.id}">
                    <div class="reto-contenido">
                        <div class="reto-cabecera">
                            <span class="reto-nombre">${reto.nombre}</span>
                            <span class="pista-ubicacion">${reto.ubicacion}</span>
                        </div>
                        <p class="reto-texto">${reto.instruccion}</p>
                    </div>
                </label>
            `;
        });

        tarjeta.innerHTML = `
            <h2 class="fase-titulo">${fase.titulo}</h2>
            <p class="fase-desc">${fase.descripcion}</p>
            <div>${retosHTML}</div>
        `;

        contenedorFases.appendChild(tarjeta);
    });

    // Escuchar cambios en todos los checkboxes
    document.querySelectorAll(".reto-checkbox").forEach((chk) => {
        chk.addEventListener("change", (e) => {
            const label = e.target.closest(".reto-item");
            if (e.target.checked) {
                label.classList.add("completado");
            } else {
                label.classList.remove("completado");
            }
            actualizarProgreso();
        });
    });
}

function actualizarProgreso() {
    const totalRetos = 10;
    const completados = document.querySelectorAll(".reto-checkbox:checked").length;
    const porcentaje = Math.round((completados / totalRetos) * 100);

    barraProgreso.style.width = `${porcentaje}%`;
    textoCompletados.textContent = `${completados} de ${totalRetos} retos completados`;
    porcentajeTexto.textContent = `${porcentaje}%`;

    // Verificar medallas por fase
    fasesData.forEach((fase) => {
        const checksFase = document.querySelectorAll(`.reto-checkbox[data-fase="${fase.id}"]`);
        const marcadosFase = document.querySelectorAll(`.reto-checkbox[data-fase="${fase.id}"]:checked`);
        const tarjetaFase = document.getElementById(fase.id);
        const medalla = document.getElementById(fase.medallaId);

        if (checksFase.length === marcadosFase.length) {
            tarjetaFase.classList.add("fase-completa");
            medalla.classList.remove("bloqueada");
            medalla.classList.add("desbloqueada");
        } else {
            tarjetaFase.classList.remove("fase-completa");
            medalla.classList.add("bloqueada");
            medalla.classList.remove("desbloqueada");
        }
    });

    // Mostrar banner final si llegó al 100%
    if (completados === totalRetos) {
        bannerVictoria.classList.remove("oculto");
    } else {
        bannerVictoria.classList.add("oculto");
    }
}

document.getElementById("btn-reiniciar").addEventListener("click", () => {
    renderizarActividad();
    actualizarProgreso();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Inicializar
renderizarActividad();