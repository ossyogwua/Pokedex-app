// array of pokemons
let pokemonRepository = (function () {
    let pokemonList = [
    { name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
    { name: 'Butterfree', height: 1.1, type: ['bug', 'flying']},
    { name: 'Raticate', height: 0.7, type: ['normal']}
  ];

function add(pokemon) {
    pokemonList.push(pokemon);
}

function getAll() {
    return pokemonList;
}

return {
    add: add, 
    getAll: getAll
};
})();

//print to console
console.log(pokemonRepository.getAll());

  // forEach  loop 
  pokemonRepository.getAll().forEach((pokemon) => {
    document.write(pokemon.name + " (height: " + pokemon.height + ")")
    // conditional if height is greater than 1.
    if (pokemon.height > 1.5) {
        document.write(" - Wow, that's big!");
    }
    document.write("<br><br>");
  });

