// array of pokemons
let pokemonList = [
    { name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
    { name: 'Butterfree', height: 1.1, type: ['bug', 'flying']},
    { name: 'Raticate', height: 0.7, type: ['normal']}
  ];

  // for loop 
  for (let i = 0 ; i < pokemonList.length ; i++) {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")")
    // conditional if height is greater than 1.5
    if (pokemonList[i].height > 1.5) {
        document.write(" - Wow, that's big!");
    }
    document.write("<br><br>");
  }

