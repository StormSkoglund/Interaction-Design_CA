// render shopping cart 


  const gameInCart =JSON.parse(localStorage.getItem("cart"));

  for (let i = 0; i < gameInCart.length; i++) {
    // insert the html to render the game
    const game = gameInCart[i];
    console.log(game.title);
document.querySelector(".checkout_display").innerHTML += `<h2>${gameInCart[i].title}</h2> <img src="${gameInCart[i].image}"></img> <p> 1 X </p><div class="price_checkout">Price:  ${gameInCart[i].price} $</div>    `;
  }







