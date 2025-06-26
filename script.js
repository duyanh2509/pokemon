const pokemonContainerElement = document.getElementById("pokemon-container");
const buttonElement = document.getElementById("watch-more");
let offset = 0;
const limitInputElement = document.getElementById("limit-input");
let limit = 20;
function fetchData(limit) {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  )
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

      return offset + pokemons.length;
    });
}

buttonElement.addEventListener("click", () => {
  let limitNow = parseInt(limitInputElement.value);
  if (!isNaN(limitNow) && limitNow > 0) {
    limit = limitNow;
  } else {
    limit = 20;
    limitInputElement.value = "20";
  }
  fetchData(limit).then((pokemonNumber) => {
    offset = pokemonNumber;
  });
});
