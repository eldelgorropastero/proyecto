let nextUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&startIndex=0&maxResults=10'; // URL inicial para libros

function fetchData(url, container, templateFunction) {
    $('#loading').show(); // Muestra el indicador de cargando
    $.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
            $('#loading').hide(); // Oculta el indicador de cargando
            response.items.forEach(item => container.append(templateFunction(item)));
            let startIndex = parseInt(new URL(url).searchParams.get('startIndex')) + 10;
            nextUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&startIndex=${startIndex}&maxResults=10`; // Actualiza la URL del próximo conjunto de datos
        },
        error: function() {
            $('#loading').hide(); // Oculta el indicador de cargando
            alert('No se pudo obtener datos');
        }
    });
}

function bookTemplate(book) {
    const volumeInfo = book.volumeInfo;
    const publishedDate = volumeInfo.publishedDate ? `<p class="card-text">Fecha de lanzamiento: ${volumeInfo.publishedDate}</p>` : '';
    const categories = volumeInfo.categories ? `<p class="card-text">Categorías: ${volumeInfo.categories.join(', ')}</p>` : '';

    return $(`<div class="col-md-4 d-flex">
        <div class="card w-100">
            <div class="card-body">
                <h5 class="card-title">${volumeInfo.title}</h5>
                <p class="card-text">${volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Autor desconocido'}</p>
                ${publishedDate}
                ${categories}
            </div>
        </div>
    </div>`);
}

$(document).ready(function() {
    fetchData(nextUrl, $('#books'), bookTemplate);

    $('#loadMore').click(function() {
        fetchData(nextUrl, $('#books'), bookTemplate);
    });
});
