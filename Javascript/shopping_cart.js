

/*Oliver Dipples example*/

function save(key, value) {
  const encodedValue = JSON.stringify(value);
  localStorage.setItem(key, encodedValue);
}


function load(key, value) {
  const encodedValue = localStorage.getItem(key);
  return JSON.parse(encodedValue);
}

function remove(key) {
  localStorage.removeItem(key)
}

function onAddToCart(event) {
  const button = event.target;
  const id = button.dataset.id;

  let cart = load("cart") || [];

  const itemInCart = cart.find(item => item.id === id);

      if (itemInCart) {
        itemInCart.quantity++
      } else {
  cart.push({
    id, 
    quantity: 1}); }

  save("cart", cart);
}

function calculateTotal() {
  const  cart = load("cart");

  return cart.reduce((total, currentItem) => {return total + currentItem.quantity}, 0) // include return total 
  
}

function renderCart() {}

function demo() {
  const buttons = document.querySelectorAll("button[data-id]")

  buttons.forEach(button => {button.addEventListener("click", onAddToCart)})

  console.log(calculateTotal());
}


demo()