
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("Pokemon data is not correct");
        }
    }

    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        listItem.classList.add('list-group-pokemon','row','bg-transparent', 'border-0');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary', 'btn-lg', 'button-custom');
        button.setAttribute("data-target", "#modal-container");
        button.setAttribute("data-toggle", "modal")
        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
        button.addEventListener("click", () => showDetails(pokemon));
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function (pokemonDetail) {
            showModal(pokemonDetail);
        });
    }

    async function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    async function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(pokemon.detailsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                // Update the properties of the 'pokemon' object
                pokemon.imageUrlFront = details.sprites.front_default;
                pokemon.imageUrlBack = details.sprites.back_default
                pokemon.height = details.height;
                pokemon.types = details.types.map(type => type.type.name); // Extract type names
                pokemon.abilities = details.abilities.map(a => a.ability.name);
                pokemon.weight = details.weight
                return pokemon;
            })
            .catch(function (e) {
                console.error(e);
            });
    }
    

    function showModal(item) {
        console.log("Pokemon Details", item);
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');

        modalTitle.empty();
        modalBody.empty();

        let nameElement = $('<h1>'+ item.name +'</h1>');
        let imageElementFront = $(`<img src=${item.imageUrlFront}>`);
        let imageElementBack = $(`<img src=${item.imageUrlBack}>`);
        let heightElement = $('<p>' + 'Height :' + item.height + '</p>');
        let weightElement = $('<p>' + 'Weight :' + item.weight + '</p>');
        let typesElement = $('<p>' + 'types :' + item.types.join(',') + '</p>');
        let abilitiesElement = $('<p>' + 'Abilities :' + item.abilities.join(',') + '</p>');

        typesElement.addClass('array-item');
        abilitiesElement.addClass('array-item');

    
        console.log(imageElementFront)
        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
    }
        return {
        add:
        getAll,
        addListItem,
        loadList,
        loadDetails,
        showDetails,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

function hideModal () {
    let modalContainer = document.querySelector ('#modal-container');
    modalContainer.classList.remove('is-visibile');
    if (dialogPromiseReject) {
        dialogPromise
    }
}


