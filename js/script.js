let offset = 0;
const limit = 18;

//-----------------POKEMONS----------------------------
const gridPokemons = document.querySelector('.pokedexGrid');

async function carregarPokemons() {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const dadosLista = await resposta.json();

    for(let item of dadosLista.results){
        const respostaDetalhe = await fetch(item.url);
        const pokemon = await respostaDetalhe.json(); 

        const cardHtmlPokemons = `
            <div class="pokemonCard" onclick="gerarDetalhes('${pokemon.name}')">
                <span class="pokedexId">#${pokemon.id}</span>
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
                <div class="tiposContainer">
                    <span class="typeTag">${pokemon.types[0].type.name}</span>
                </div>
            </div>
        `;

        gridPokemons.innerHTML += cardHtmlPokemons;
    }

    offset += limit;
}

carregarPokemons();

//-----------------DETALHES----------------------------
const gridDetalhes = document.querySelector('.infoDetalhada');

async function gerarDetalhes(nome) {
    const respostaDetalhe = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
    const pokemonInfo = await respostaDetalhe.json();

    console.log(`Carregando detalhes de: ${pokemonInfo.name}`);

    //Barra de Status
    const statsBar = pokemonInfo.stats.map(status => {
        const porcentagem = (status.base_stat / 255) * 100;

        return `
            <div class="statBarraContainer">
                <div class="statDesc">
                    <span class="statNome">${status.stat.name}</span>
                    <span class="statValor">${status.base_stat}</span>
                </div>
                <div class="statBarBg">
                    <div class="statBarraPreenchimento" style="width: ${porcentagem}%"></div>
                </div>
            </div>
        `;
    }).join('');

    //Card de detalhes
    const cardHtmlDetalhes = `
        <div class="pokemonDetalhe">
            <span class="pokedex-id">#${pokemonInfo.id}</span>
            <h3>${pokemonInfo.name}</h3>
            <img src="${pokemonInfo.sprites.other['official-artwork'].front_default}" alt="${pokemonInfo.name}">
            
            <div class="infoCorpo">
                <div class="corpo">
                    <span>${pokemonInfo.weight / 10}kg</span>
                    <label>Peso</label>
                </div>
                <div class="corpo">
                    <span>${pokemonInfo.height / 10}m</span>
                    <label>Altura</label>
                </div>
            </div>

            <div class="status">
                ${statsBar}
            </div>
        </div>
    `;
    gridDetalhes.innerHTML = cardHtmlDetalhes;
}

gerarDetalhes();

//-----------------PESQUISA---------------------------
const inptPesquisa =  document.querySelector('#pesquisaPokemon');

async function buscaPokemon(nome) {
    try{
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

        if(!resposta.ok) throw new Error();

        const pokemon = await resposta.json();

        gridPokemons.innerHTML = ""

        const cardHtmlPokemons = `
            <div class="pokemonCard" onclick="gerarDetalhes('${pokemon.name}')">
                <span class="pokedexId">#${pokemon.id}</span>
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
                <div class="tiposContainer">
                    <span class="typeTag">${pokemon.types[0].type.name}</span>
                </div>
            </div>
        `;

        gridPokemons.innerHTML += cardHtmlPokemons;

    }catch (erro){
        gridPokemons.innerHTML = "<p style='color: white;'>Pokémon não encontrado...</p>";
    }
}

inptPesquisa.addEventListener('input', (evento) => {
    const buscaNome = evento.target.value.toLowerCase().trim();

    if (buscaNome === ""){
        offset = 0;
        gridPokemons.innerHTML = ""
        carregarPokemons();
        return;
    }

    buscaPokemon(buscaNome);
})









