const pokemonContainerElement = document.getElementById("pokemon-container");
const buttonElement = document.getElementById("watch-more");
let offset = 0;

function fetchData() {
  return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const pokemons = data.results;
      pokemons.forEach((item, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        const imgElement = document.createElement("img");
        imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          offset + index + 1
        }.png`;
        imgElement.alt = item.name;
        cardElement.appendChild(imgElement);

        const p = document.createElement("p");
        p.innerHTML = item.name;
        cardElement.appendChild(p);

        pokemonContainerElement.appendChild(cardElement);
      });

      return pokemons.length;
    });
}

fetchData().then((pokemonNumber) => {
  offset += pokemonNumber;
});

buttonElement.addEventListener("click", () => {
  fetchData().then((pokemonNumber) => {
    offset += pokemonNumber;
  });
});
