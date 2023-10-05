// render shopping cart (see checkout.html)

function loadCart(){
  const gameInCart =
  localStorage.getItem("cart");
  JSON.parse(gameInCart);


  document.querySelector(".checkout_display").innerHTML += gameInCart;

}

loadCart();
