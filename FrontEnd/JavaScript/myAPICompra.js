function submitCompraForm(event) {
    event.preventDefault();
    
    let formData = {
        usuario: document.getElementById('usuario').value,
        libro: document.getElementById('libro').value,
        fechaCompra: document.getElementById('fechaCompra').value,
    };

    // Realizar la petición POST al endpoint de Compra
    fetch('http://127.0.0.1:8000/BiblioOnline/compra/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Compra registrada:', data);
        // Aquí podrías actualizar la tabla de compras registradas o realizar otra acción
    })
    .catch(error => {
        console.error('Error al registrar compra:', error);
    });
}

// Escuchar el evento de submit del formulario
document.getElementById('compraForm').addEventListener('submit', submitCompraForm);