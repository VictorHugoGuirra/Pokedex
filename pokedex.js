const pokemonList = document.getElementById('pokemon-list');
const loadingIndicator = document.getElementById('loading');
let offset = 0;
const limit = 15;
let loading = false;

async function fetchPokemons() {//fetchPokemons: Função assíncrona que faz uma requisição à PokeAPI para obter os pokémons, cria elementos para cada um e os adiciona à lista.
    if (loading) return;//Usamos um controle loading para evitar múltiplas requisições simultâneas.
    loading = true;
    loadingIndicator.style.display = 'block';

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${251}&offset=${0}`);
    const data = await response.json();
    
    data.results.forEach(pokemon => {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
            <h3>${pokemon.name}</h3>
            <img src="https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png" alt="${pokemon.name}">
        `;
        pokemonList.appendChild(card);
    });

    loading = false;
    loadingIndicator.style.display = 'none';
    offset += limit;
}

function handleScroll() {//handleScroll: Função que verifica se o usuário rolou até o final da página. Se sim, chama fetchPokemons para carregar mais pokémons.
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchPokemons();
    }
}

window.addEventListener('scroll', handleScroll);
fetchPokemons(); // Carregar pokémons inicialmente
