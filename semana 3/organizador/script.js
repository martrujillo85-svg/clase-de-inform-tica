const files = [
    { name: "Foto_Vacaciones.jpg", icon: "🖼️", type: "imagenes" },
    { name: "Cancion_Favorita.mp3", icon: "🎵", type: "musica" },
    { name: "Tarea_Informatica.docx", icon: "📝", type: "documentos" },
    { name: "Video_Escolar.mp4", icon: "🎬", type: "videos" },
    { name: "Logo_Proyecto.png", icon: "🖼️", type: "imagenes" },
    { name: "Receta_Cocina.pdf", icon: "📄", type: "documentos" }
];

let currentIndex = 0;
let score = 0;

function loadNextFile() {
    if (currentIndex >= files.length) {
        document.getElementById('current-item').innerHTML = "🎉 ¡Felicidades! Clasificaste todos los archivos correctamente.";
        document.getElementById('feedback-msg').textContent = "";
        return;
    }
    const current = files[currentIndex];
    document.getElementById('file-icon').textContent = current.icon;
    document.getElementById('file-name').textContent = current.name;
}

function checkAnswer(selectedType) {
    if (currentIndex >= files.length) return;
    const current = files[currentIndex];
    const feedback = document.getElementById('feedback-msg');

    if (selectedType === current.type) {
        score += 100;
        document.getElementById('score').textContent = score;
        feedback.className = "feedback correct";
        feedback.textContent = "✅ ¡Correcto! Archivo guardado en la carpeta adecuada.";
        currentIndex++;
        setTimeout(() => {
            feedback.textContent = "";
            loadNextFile();
        }, 1000);
    } else {
        feedback.className = "feedback wrong";
        feedback.textContent = "❌ Inténtalo de nuevo. Revisa el tipo de archivo.";
    }
}

loadNextFile();