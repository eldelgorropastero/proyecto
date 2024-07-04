function submitUsuarioForm(event) {
    event.preventDefault();
    
    let formData = {
        nombreApellido: document.getElementById('nombreApellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
    };

    // Realizar la petición POST al endpoint de Usuario
    fetch('http://127.0.0.1:8000/BiblioOnline/usuario/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Usuario creado:', data);
        // Aquí podrías actualizar la tabla de usuarios registrados o realizar otra acción
    })
    .catch(error => {
        console.error('Error al crear usuario:', error);
    });
}

// Escuchar el evento de submit del formulario
document.getElementById('usuarioForm').addEventListener('submit', submitUsuarioForm);