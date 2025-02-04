const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3001/artists`;  

    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            filterResults(result, searchTerm);  // Filtra no JavaScript
        });
}

function filterResults(artists, searchTerm) {
    // Filtra os artistas com base na pesquisa, ignorando maiúsculas e minúsculas
    const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    displayResults(filteredArtists);  // Exibe os resultados filtrados
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    // Se não encontrar nenhum artista, podemos ocultar a lista
    if (result.length === 0) {
        resultArtist.classList.add('hidden');  // Esconde a área de resultados
        return;
    }

    // Exibe o primeiro artista que corresponder ao filtro
    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');  // Exibe os resultados filtrados
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value; // Não converter para minúsculas aqui, fazemos a conversão mais tarde
    if (searchTerm === '') {
        resultArtist.classList.add('hidden');  // Esconde a área de resultados quando o campo for limpo
        resultPlaylist.classList.add('hidden');  // Opcional, se necessário
        return;
    }
    
    requestApi(searchTerm);  // Passa o termo de pesquisa sem modificar
})
