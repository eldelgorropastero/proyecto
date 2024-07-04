$(document).ready(function () {
    function cargarUsuarios() {
        $.ajax({
            url: 'http://localhost:8000/BiblioOnline/usuario/',
            type: 'GET',
            success: function (data) {
                var tableRows = '';
                data.forEach(function (usuario) {
                    tableRows += '<tr>';
                    tableRows += '<td>' + usuario.nombre_apellido + '</td>';
                    tableRows += '<td>' + usuario.email + '</td>';
                    tableRows += '<td>' + usuario.telefono + '</td>';
                    tableRows += '</tr>';
                });
                $('#usuariosTableBody').html(tableRows);
            },
            error: function (error) {
                console.log('Error al cargar usuarios:', error);
            }
        });
    }

    cargarUsuarios();

    $("#usuarioForm").validate({
        submitHandler: function (form) {
            var data = {
                nombre_apellido: $("#nombre_apellido").val(),
                email: $("#email").val(),
                telefono: $("#telefono").val()
            };
            $.ajax({
                url: 'http://localhost:8000/BiblioOnline/usuario/',
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (response) {
                    alert('Usuario registrado correctamente');
                    cargarUsuarios();
                },
                error: function (error) {
                    console.log('Error al registrar usuario:', error);
                    alert('Error al registrar usuario');
                }
            });
        }
    });
});