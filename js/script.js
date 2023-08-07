// array of pokemons
let pokemonList = [
    { name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
    { name: 'Butterfree', height: 1.1, type: ['bug', 'flying']},
    { name: 'Raticate', height: 0.7, type: ['normal']}
  ];

  // forEach loop 
  pokemonList.forEach((pokemon) => {
    document.write(pokemon.name + " (height: " + pokemon.height + ")")
    // conditional if height is greater than 1.
    if (pokemon.height > 1.5) {
        document.write(" - Wow, that's big!");
    }
    document.write("<br><br>");
  });

