document.addEventListener("DOMContentLoaded", function () {
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    let modalContainer = document.querySelector('#modal-container');

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
        listItem.classList.add('list-group-pokemon');
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        button.setAttribute("type", "button");
        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
        button.addEventListener("click", () => showDetails(pokemon));
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon.name, `Height: ${pokemon.height} | Type: ${pokemon.types.join(", ")}`, pokemon.imageUrl);
        });
    }

    function loadList() {
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

    function loadDetails(pokemon) {
        return fetch(pokemon.detailsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                // Update the properties of the 'pokemon' object
                pokemon.imageUrl = details.sprites.other.dream_world.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types.map(type => type.type.name); // Extract type names
            })
            .catch(function (e) {
                console.error(e);
            });
    }
    

    function showModal(title, text, img) {
        modalContainer.innerHTML = '';
    
        let modal = document.createElement('div');
        modal.classList.add('modal');
    
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'close';
        closeButtonElement.addEventListener('click', hidemodal);
    
        let titleElement = document.createElement('h1');
        titleElement.innerText = title;
    
        let contentElement = document.createElement('p');
        contentElement.innerText = text;
    
        let imageElement = document.createElement("img");
        imageElement.setAttribute("src", img);
        imageElement.setAttribute("width", "306");
        imageElement.setAttribute("height", "230");
    
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
    
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
    }
    

    function hidemodal() {
        modalContainer.classList.remove('is-visible');
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal();
      });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hidemodal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
});
