function copiarTexto() {
    const texto = document.getElementById('texto-base').innerText;
    navigator.clipboard.writeText(texto).then(() => {
        alert('¡Texto de la carta copiado al portapapeles! Pégalo en Word usando Ctrl + V');
    });
}