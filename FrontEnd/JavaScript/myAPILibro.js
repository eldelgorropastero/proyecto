$(document).ready(function () {
    function cargarAutores() {
        $.ajax({
            url: 'http://localhost:8000/BiblioOnline/autor/',
            type: 'GET',
            success: function (data) {
                var options = '';
                data.forEach(function (autor) {
                    options += '<option value="' + autor.id + '">' + autor.nombre + '</option>';
                });
                $('#autores').html(options);
            },
            error: function (error) {
                console.log('Error al cargar autores:', error);
            }
        });
    }

    function cargarLibros() {
        $.ajax({
            url: 'http://localhost:8000/BiblioOnline/libro/',
            type: 'GET',
            success: function (data) {
                var tableRows = '';
                data.forEach(function (libro) {
                    tableRows += '<tr>';
                    tableRows += '<td>' + libro.titulo + '</td>';
                    tableRows += '<td>' + libro.fecha_de_publicacion + '</td>';
                    tableRows += '<td>' + libro.genero + '</td>';
                    tableRows += '<td>' + libro.autores.map(function(autor) { return autor.nombre }).join(', ') + '</td>';
                    tableRows += '</tr>';
                });
                $('#librosTableBody').html(tableRows);
            },
            error: function (error) {
                console.log('Error al cargar libros:', error);
            }
        });
    }

    cargarAutores();
    cargarLibros();

    $("#libroForm").validate({
        submitHandler: function (form) {
            var data = {
                titulo: $("#titulo").val(),
                fecha_de_publicacion: $("#fecha_de_publicacion").val(),
                genero: $("#genero").val(),
                autores: $("#autores").val() // Obtiene los valores seleccionados del select de autores
            };
            $.ajax({
                url: 'http://localhost:8000/BiblioOnline/libro/',
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (response) {
                    alert('Libro registrado correctamente');
                    cargarLibros();
                },
                error: function (error) {
                    console.log('Error al registrar libro:', error);
                    alert('Error al registrar libro');
                }
            });
        }
    });
});