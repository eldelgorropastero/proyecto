function submitAutorForm(event) {
    event.preventDefault();
    
    let formData = {
        nombre: document.getElementById('nombre').value,
        nacionalidad: document.getElementById('nacionalidad').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
    };

    // Realizar la petición POST al endpoint de Autor
    fetch('http://127.0.0.1:8000/BiblioOnline/autor/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Autor creado:', data);
        // Aquí podrías actualizar la tabla de autores registrados o realizar otra acción
    })
    .catch(error => {
        console.error('Error al crear autor:', error);
    });
}

// Escuchar el evento de submit del formulario
document.getElementById('autorForm').addEventListener('submit', submitAutorForm);