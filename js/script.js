//-----------------POKEMONS----------------------------
const gridPokemons = document.querySelector('.pokedexGrid');

async function gerarCard() {
    const resposta = await fetch('https://pokeapi.co/api/v2/pokemon/haunter');
    const pokemon = await resposta.json();

    console.log("Dados do Haunter:", pokemon);

    const cardHtmlPokemons = `
        <div class="pokemonCard">
            <span class="pokedexId">#${pokemon.id}</span>
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <div class="tiposContainer">
                <span class="typeTag">${pokemon.types[0].type.name}</span>
            </div>
        </div>
    `;

    gridPokemons.innerHTML = cardHtmlPokemons;
}

gerarCard();

//-----------------DETALHES----------------------------
const gridDetalhes = document.querySelector('.infoDetalhada');

async function gerarDetalhes() {
    const respostaDetalhe = await fetch('https://pokeapi.co/api/v2/pokemon/haunter');
    const pokemonInfo = await respostaDetalhe.json();

    console.log("Detalhes de Haunter");

    const cardHtmlDetalhes = `
        <div class="pokemonDetalhe">
            <span class="pokedex-id">#${pokemonInfo.id}</span>
            <img src="${pokemonInfo.sprites.other['official-artwork'].front_default}" alt="${pokemonInfo.name}">
            <h3>${pokemonInfo.name}</h3>
            <div class="tipos-container">
                <span class="typeTag">Tipo: ${pokemonInfo.types[0].type.name}</span>
                <span class="typeTag">Altura: ${pokemonInfo.height / 10}m</span>
                <span class="typeTag">Peso: ${pokemonInfo.weight / 10}kg</span>

                <div class="status">
                    <p>HP: ${pokemonInfo.stats[0].base_stat}</p>
                    <p>Ataque: ${pokemonInfo.stats[1].base_stat}</p>
                    <p>Defesa: ${pokemonInfo.stats[2].base_stat}</p>
                    <p>Ataque Especial: ${pokemonInfo.stats[3].base_stat}</p>
                    <p>Defesa Especial: ${pokemonInfo.stats[4].base_stat}</p>
                    <p>Velocidade: ${pokemonInfo.stats[5].base_stat}</p>
                </div>
                
            </div>
        </div>
    `
    gridDetalhes.innerHTML = cardHtmlDetalhes;
}

gerarDetalhes();

