// render shopping cart 


// The following JavaScript document contains code made with supervision, and or edits/inputs from Talitha Kruger on Oct 4. - 6. 2023!

const gameInCart =JSON.parse(localStorage.getItem("cart"));

// Remove function WIP
function remove(key){
  localStorage.removeItem(key);
 ;
}

  for (let i = 0; i < gameInCart.length; i++) {
    // insert the html to render the game
    const game = gameInCart[i];
    
document.querySelector(".checkout_display").innerHTML += `<h2>${game.title}</h2> <img src="${game.image}"></img> <p> 1 X </p><div class="price_checkout">Price:  ${game.price} kr.</div> <button class="remove" " onclick="remove()"> Remove Game </game>   `;

}



//watch this next https://www.youtube.com/watch?v=1RnzyplvqEg total price explained!
  


    






