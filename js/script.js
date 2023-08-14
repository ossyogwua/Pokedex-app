document.addEventListener("DOMContentLoaded", function () {
    let pokemonRepository = (function () {
        let pokemonList = [
            { name: 'Charizard', height: 1.7, type: ['fire', 'flying'] },
            { name: 'Butterfree', height: 1.1, type: ['bug', 'flying'] },
            { name: 'Raticate', height: 0.7, type: ['normal'] }
        ];

        function add(pokemon) {
            pokemonList.push(pokemon);
        }

        function getAll() {
            return pokemonList;
        }

        function addListItem(pokemon) {
            let pokemonList = document.querySelector(".pokemon-list");
            let listPokemon = document.createElement("li");
            let button = document.createElement("button");
            button.innerText = pokemon.name;
            button.classList.add("button-class");
            listPokemon.appendChild(button);
            pokemonList.appendChild(listPokemon);
            button.addEventListener('click', function () {
                showDetails(pokemon);
            });
        }

        function showDetails(pokemon) {
            console.log(pokemon);
           
        }

        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem,
            showDetails: showDetails
        };
    })();

    console.log(pokemonRepository.getAll());

    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});