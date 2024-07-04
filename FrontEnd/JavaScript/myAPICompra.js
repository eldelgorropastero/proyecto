$(document).ready(function () {
    function cargarUsuarios() {
        $.ajax({
            url: 'http://localhost:8000/BiblioOnline/usuario/',
            type: 'GET',
            success: function (data) {
                var options = '';
                data.forEach(function (usuario) {
                    options += '<option value="' + usuario.id + '">' + usuario.nombre_apellido + '</option>';
                });
                $('#usuario').html(options);
            },
            error: function (error) {
                console.log('Error al cargar usuarios:', error);
            }
        });
    }

    function cargarLibros() {
        $.ajax({
            url: 'http://localhost:8000/BiblioOnline/libro/',
            type: 'GET',
            success: function (data) {
                var options = '';
                data.forEach(function (libro) {
                    options += '<option value="' + libro.id + '">' + libro.titulo + '</option>';
                });
                $('#libro').html(options);
            },
            error: function (error) {
                console.log('Error al cargar libros:', error);
            }
        });
    }

    function cargarCompras() {
        $.ajax({
            url: 'http://localhost:8000/BiblioOnline/compra/',
            type: 'GET',
            success: function (data) {
                var tableRows = '';
                data.forEach(function (compra) {
                    tableRows += '<tr>';
                    tableRows += '<td>' + compra.usuario.nombre_apellido + '</td>';
                    tableRows += '<td>' + compra.libro.titulo + '</td>';
                    tableRows += '<td>' + compra.fecha_compra + '</td>';
                    tableRows += '</tr>';
                });
                $('#comprasTableBody').html(tableRows);
            },
            error: function (error) {
                console.log('Error al cargar compras:', error);
            }
        });
    }

    cargarUsuarios();
    cargarLibros();
    cargarCompras();

    $("#compraForm").validate({
        submitHandler: function (form) {
            var data = {
                usuario: $("#usuario").val(),
                libro: $("#libro").val(),
                fecha_compra: $("#fecha_compra").val()
            };
            $.ajax({
                url: 'http://localhost:8000/BiblioOnline/compra/',
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (response) {
                    alert('Compra registrada correctamente');
                    cargarCompras();
                },
                error: function (error) {
                    console.log('Error al registrar compra:', error);
                    alert('Error al registrar compra');
                }
            });
        }
    });
});