// .getElementbyId must match id names bc it looks for specified html tag with id name
// remember that document refers to the entire html page
// searchButton must have an eventlistener, when clicked, must follow function to search for poke entered
// pokemonInput is meant for search field
// pokemonInfo is to retrieve details about entered poke
// pokemonImg retrieves artwork

const searchButton = document.getElementById('search-btn');
const pokemonInput = document.getElementById('pokemon-input');
const pokemonInfo = document.getElementById('pokemon-info');
const pokemonImg = document.getElementById('pokemon-img');

// check on console if working/linked to js before running scripts

console.log("DOM Loaded");

// must use async/await bc retrieving info from api, so user can do other things while waiting

const fetchPokemon = async () => {
    // check if working
    console.log("Retrieving Pokemon! Patience.");
    const input = pokemonInput.value.toLowerCase(); // search field id html to add to api url below
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        const data = await response.json();
        displayPokemon(data); // method below shows pokemon data if found in api
    } catch (error) { // some newer pokemon cannot be found from api / also when blank
        console.error('error finding info:', error);
        alert('Sorry, pokemon not found. It might be a new new!');
    }
}

const displayPokemon = (pokemon) => {
    console.log("Displaying Pokemon:", pokemon);

    // Get a different (better?) image
    const betterImage = pokemon.sprites.other['official-artwork'].front_default;
    // condition ? action else : alternative action
    // ternary operator (aka if, else) - if const url above is invalid : alt url is used below
    pokemonImg.src = betterImage ? betterImage : pokemon.sprites.other['official-artwork'].front_shiny;

    // .map() method iterates thru array
    const types = pokemon.types.map(type => type.type.name).join(' / ');
    const baseExperience = pokemon.base_experience;
    const species = pokemon.species.name;


    // structure info output for user side

    pokemonInfo.innerHTML = `
       
        <h2>${pokemon.name}</h2>
        <hr>
        <p>abilities:</p>
        <ul class='abilities-list'>
            ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
        </ul>
        <hr>
        <p>types: ${types}</p>
        <hr>
        <p>species: ${species}</p>
        <hr>
        <p>base experience: ${baseExperience}</p>
    `;
}

searchButton.addEventListener('click', fetchPokemon); // does not need () bc within another method
