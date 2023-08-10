const pokemonConteiner = document.querySelector('.pokemon-container')
const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => res.json())
        .then((data) => {
            createPokemon(data);
            console.log(data); // para ver los datos 
            spinner.style.display = "none";// oculta el spinner
        });
    //.then(data =>console.log(data))
}
//fetchPokemon(1);

let offset = 1;
let limit = 8;

previous.addEventListener("click", () => {
    if (offset != 1) {
        offset -= 9;
        removeChildNodes(pokemonConteiner);// remueve los pokemones que ya estan cargado
        fetchPokemons(offset, limit);
    }
});

next.addEventListener("click", () => {
    //falta control de limite a 800
    offset += 9;
    removeChildNodes(pokemonConteiner);//remueve los pokemones que ya estan cargado
    fetchPokemons(offset, limit);

});



function fetchPokemons(offset, limit) {
    spinner.style.display = "block";// muestra el spinner
    for (let i = offset; i <= offset + limit; i++) {
        fetchPokemon(i);
    }
}
//fetchPokemons(9);

function createPokemon(pokemon) {
    //creamos la carta
    const flipCard = document.createElement('div');
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement('div');
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    //creamos el sprite conteiner
    const spritecontainer = document.createElement('div');
    //le agragamos una class 
    spritecontainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default

    spritecontainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name

    //agrego elementos a la carta
    card.appendChild(spritecontainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");
    //se carga en la parte de atras de la carta los 
    //stats del pokemon
    cardBack.appendChild(progressBars(pokemon.stats));
    //cardBack.textContent = "carta de atrasss"; //texto atras
    //agrego la carta al card container
    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);

    //agrego la carta al conteiner
    pokemonConteiner.appendChild(flipCard);// pokemonConteiner.appendChild(card); 

}
function progressBars(stats) {
    //se tiene que crear div s
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-Container");
    //le vamos a pasar los stats
    //se lo pasamos como un array
    for (let i = 0; i < 3; i++) { //tiene 6 pero se ponen 3
        const stat = stats[i];

        const statPercent = stat.base_state / 2 + "%";
        const statContainer = document.createElement("div");
        
        statContainer.classList.add("stat-container");

        const statName = document.createElement("p");
        statName.textContent = stat.stat.name;

        const progress = document.createElement("div");
        progress.classList.add("progress");
        //barras de boostraps 
        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.setAttribute("aria-valuenow", stat.base_stat);
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 200);
        progressBar.style.width = statPercent;
        //el numero adentro de la barra
        progressBar.textContent = stat.base_stat;
        //agregamos los hijos
        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);
        //se van agregando 
        statsContainer.appendChild(statContainer);
    }
    return statsContainer;
}

//funcion remueve los elementos del parent 
function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);//mientras el parent tenga firstChild removerlo
    }

}

fetchPokemons(offset, limit);


//  comentarios y links
//generedor de blobs
//https://lokesh-coder.github.io/blobs.app/?e=6&gw=5&se=927&c=B53471&o=0

/*  
<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
  <path id="blob" d="M434.5,277.5Q393,305,369.5,321.5Q346,338,343.5,386Q341,434,303.5,427Q266,420,230.5,431.5Q195,443,182.5,399.5Q170,356,143,344.5Q116,333,68,313Q20,293,67.5,259Q115,225,80,174Q45,123,77.5,94Q110,65,148,45.5Q186,26,229,17Q272,8,298,54.5Q324,101,354,114.5Q384,128,396,158.5Q408,189,442,219.5Q476,250,434.5,277.5Z" fill="#a29bfe"></path>
</svg>

<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
  <path id="blob" d="M315,350Q135,450,136,252Q137,54,316,152Q495,250,315,350Z" fill="#fdcb6e"></path>
</svg>


<!-- https://getbootstrap.com/docs/5.3/components/pagination/ -->



*/