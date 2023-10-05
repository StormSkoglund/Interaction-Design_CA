// render shopping cart (see checkout.html)


  const gameInCart =
  localStorage.getItem("cart");
  

  
  for (let i = 0; i < gameInCart.length; i++) {
  console.log(gameInCart[i])
  document.querySelector(".checkout_display").innerHTML += gameInCart[i];  
}
  
  




