// render shopping cart 


// The following JavaScript document contains code made with supervision, and or edits/inputs from Talitha Kruger on Oct 4. - 6. 2023!

const gameInCart =JSON.parse(localStorage.getItem("cart"));

  for (let i = 0; i < gameInCart.length; i++) {
    // insert the html to render the game
    const game = gameInCart[i];
    
document.querySelector(".checkout_display").innerHTML += `<h2>${game.title}</h2> <img src="${game.image}"></img> <p> 1 X </p><div class="price_checkout">Price:  ${game.price} $</div>    `;
  }


for (let  i= 0; i < gameInCart.length; i++) {
 // display total value when adding game prices together
 const gameCost = gameInCart[i].price;
 
console.log(gameCost);
 //fortsæt herfra!
}





