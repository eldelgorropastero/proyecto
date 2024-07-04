$(document).ready(function () {
    function cargarAutores() {
        $.ajax({
            url: 'http://localhost:8000/BiblioOnline/autor/',
            type: 'GET',
            success: function (data) {
                var tableRows = '';
                data.forEach(function (autor) {
                    tableRows += '<tr>';
                    tableRows += '<td>' + autor.nombre + '</td>';
                    tableRows += '<td>' + autor.nacionalidad + '</td>';
                    tableRows += '<td>' + autor.fecha_de_nacimiento + '</td>';
                    tableRows += '</tr>';
                });
                $('#autoresTableBody').html(tableRows);
            },
            error: function (error) {
                console.log('Error al cargar autores:', error);
            }
        });
    }

    cargarAutores();

    $("#autorForm").validate({
        submitHandler: function (form) {
            var data = {
                nombre: $("#nombre").val(),
                nacionalidad: $("#nacionalidad").val(),
                fecha_de_nacimiento: $("#fechaNacimiento").val()
            };
            $.ajax({
                url: 'http://localhost:8000/BiblioOnline/autor/',
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (response) {
                    alert('Autor registrado correctamente');
                    cargarAutores();
                },
                error: function (error) {
                    console.log('Error al registrar autor:', error);
                    alert('Error al registrar autor');
                }
            });
        }
    });
});