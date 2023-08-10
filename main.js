const pokemonConteiner=document.querySelector('.pokemon-container')

function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res =>res.json())
    .then((data) =>{
        createPokemon(data); 
    });
    //.then(data =>console.log(data))
}
//fetchPokemon(1);

function fetchPokemons(number){
    for(let i=1;i<=number;i++)
    {
        fetchPokemon(i);
    }
}
//fetchPokemons(9);

function createPokemon(pokemon){
    //creamos la carta
    const card=document.createElement('div');
    card.classList.add('pokemon-block');
    
    //creamos el sprite conteiner
    const spritecontainer=document.createElement('div');
    //le agragamos una class 
    spritecontainer.classList.add('img-container');

    const sprite=document.createElement('img');
    sprite.src=pokemon.sprites.front_default

    spritecontainer.appendChild(sprite);

    const number=document.createElement('p');
    number.textContent=`#${pokemon.id.toString().padStart(3,0)}`;

    const name=document.createElement('p');
    name.classList.add('name');
    name.textContent=pokemon.name

    //agrego elementos a la carta
    card.appendChild(spritecontainer);
    card.appendChild(number);
    card.appendChild(name);

    //agrego la carta al conteiner
    pokemonConteiner.appendChild(card);

    
}

fetchPokemons(9);
//generedor de blobs
//https://lokesh-coder.github.io/blobs.app/?e=6&gw=5&se=927&c=B53471&o=0

/*  
<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
  <path id="blob" d="M434.5,277.5Q393,305,369.5,321.5Q346,338,343.5,386Q341,434,303.5,427Q266,420,230.5,431.5Q195,443,182.5,399.5Q170,356,143,344.5Q116,333,68,313Q20,293,67.5,259Q115,225,80,174Q45,123,77.5,94Q110,65,148,45.5Q186,26,229,17Q272,8,298,54.5Q324,101,354,114.5Q384,128,396,158.5Q408,189,442,219.5Q476,250,434.5,277.5Z" fill="#a29bfe"></path>
</svg>

<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
  <path id="blob" d="M315,350Q135,450,136,252Q137,54,316,152Q495,250,315,350Z" fill="#fdcb6e"></path>
</svg>
*/