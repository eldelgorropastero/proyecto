document.addEventListener('DOMContentLoaded', function() {
    function fetchLibros() {
        fetch('http://localhost:8000/BiblioOnline/libro/')
            .then(response => response.json())
            .then(data => {
                const librosTableBody = document.getElementById('librosTableBody');
                librosTableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

                data.forEach(libro => {
                    const row = document.createElement('tr');

                    const tituloCell = document.createElement('td');
                    tituloCell.textContent = libro.titulo;
                    row.appendChild(tituloCell);

                    const fechaPublicacionCell = document.createElement('td');
                    fechaPublicacionCell.textContent = libro.fecha_de_publicacion;
                    row.appendChild(fechaPublicacionCell);

                    const autoresCell = document.createElement('td');
                    autoresCell.textContent = libro.autores.map(autor => autor.nombre).join(', ');
                    row.appendChild(autoresCell);

                    const generoCell = document.createElement('td');
                    generoCell.textContent = libro.genero;
                    row.appendChild(generoCell);

                    librosTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error al obtener libros:', error));
    }

    fetchLibros();

    // Función para enviar datos del formulario de Libro
    function submitLibroForm(event) {
        event.preventDefault();
        
        let formData = {
            titulo: document.getElementById('titulo').value,
            fecha_de_publicacion: document.getElementById('fechaPublicacion').value,
            autores: document.getElementById('autores').value.split(',').map(autor => autor.trim()),
            genero: document.getElementById('genero').value,
        };

        fetch('http://localhost:8000/BiblioOnline/libro/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al guardar libro: ' + JSON.stringify(response));
            }
            return response.json();
        })
        .then(data => {
            console.log('Libro creado:', data);
            fetchLibros(); // Actualizar la tabla después de agregar un nuevo libro
        })
        .catch(error => {
            console.error('Error al guardar libro:', error);
        });
    }

    // Escuchar el evento de submit del formulario
    document.getElementById('libroForm').addEventListener('submit', submitLibroForm);
});