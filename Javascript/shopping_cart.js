import { gameList } from "./product-list";

import { getGames } from "./product-list";

const addToCartButton = document.querySelectorAll(".button games-button");

addToCartButton.forEach((button) => {
  button.addEventListener("click", gameToCart);
});

function gameToCart() {
  const id = this.dataset.id;
  const name = this.dataset.name;

  toLocalStorage();
}

function toLocalStorage() {
  const selectedGames = localStorage.getItem("Games");

  if (selectedGames === null) {
    return [];
  } else {
    return selectedGames;
  }
}

function saveGames(selectedGames) {
  localStorage.setItem();
}

/*const gameButton = document.querySelector(.games-button);

gameList === gameButton;

// this is a method for adding a product to the cart, demonstrated by the channel "Code Explained", available at https://www.youtube.com/watch?v=UcrypywtAm0 [viewed on 13. September 2023].

// cart array
let cart = [];

function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    alert("product already in cart");
  }

  // Add product to cart
  const game = gameList.find((gameList) => gameList.id === id);

  cart.push(game);

  console.log(cart);
}*/
