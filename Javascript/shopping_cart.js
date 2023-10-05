// render shopping cart

function loadCart(){
  const gameInCart =
  localStorage.getItem("cart");
  JSON.parse(gameInCart);


  document.querySelector(".checkout_display").innerHTML +=` "${gameInCart} + class=""`;

}

loadCart();
