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
            console.log(pokemon);
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
                    add(list);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    function loadDetails(item) {
        return fetch(item.detailsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;
            })
            .catch(function (e) {
                console.error(e);
            });
    }
    function showModal(title, text, image) {
        modalContainer.innerText = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        //add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'close';

        closeButtonElement.addEventListener('click', hidemodal);

        let titleElement = document.createElement ('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        let imageElement = document.createElement("img");
        imageElement.setAttribute("src", img);
        imageElement.setAttribute("width", "306");
        imageElement.setAttribute("height", "230");
        let container = document.querySelector('#image-container');

        // Create an <img> element
        let myImage = document.createElement('img');
        
        // setting `src` property to set the actual element's `src` attribute
        // this also works on <img> elements selected by querySelector() method, it is not specific for <img> elements created with createElement() methods
        myImage.src = 'https://picsum.photos/300/300';
        
        container.appendChild(myImage);


        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);

        modalContainer.classList.add(' is-visible');

 }

 function hidemodal() {
    modalContainer.classList.remove('is-visible');
 }

 window.addEventListener('keydown', (e) => {

    if (e.key === 'Escape' &&
    modalContainer.classList.contains('is-visible')){
        hidemodal();
    }

});

function add(item) {
    pokemon.push(item);
}

// return all users
function getAll(){
    return pokemon;
}
   
// add a list of buttons to the array
function addListItem(item){
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = item.name;
    button.classList.add('button-custom');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    button.addEventListener('click', function(){
        showDetails(item);
    });
}function showDetails(item){
    showModal(item.name, item.name + item.type + item.type)
} return {
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
