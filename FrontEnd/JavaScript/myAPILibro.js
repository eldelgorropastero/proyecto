function submitLibroForm(event) {
    event.preventDefault();
    
    let autores = document.getElementById('autores').value.split(',').map(item => item.trim());
    let formData = {
        titulo: document.getElementById('titulo').value,
        fechaPublicacion: document.getElementById('fechaPublicacion').value,
        autores: autores,
        genero: document.getElementById('genero').value,
    };

    // Realizar la petición POST al endpoint de Libro
    fetch('http://127.0.0.1:8000/BiblioOnline/libro/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Libro creado:', data);
        // Aquí podrías actualizar la tabla de libros registrados o realizar otra acción
    })
    .catch(error => {
        console.error('Error al crear libro:', error);
    });
}

// Escuchar el evento de submit del formulario
document.getElementById('libroForm').addEventListener('submit', submitLibroForm);