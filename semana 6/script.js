function copiarTexto() {
    const texto = document.getElementById('texto-base').innerText;
    navigator.clipboard.writeText(texto).then(() => {
        alert('¡Texto copiado al portapapeles! Ahora pégalo en Word con Ctrl + V');
    });
}