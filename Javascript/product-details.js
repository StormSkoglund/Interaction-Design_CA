// The following JavaScript document contains code made with supervision, and or edits/inputs from Talitha Kruger on Oct 4. - 6. 2023!


const prodFlex = document.querySelector(".product-mobile-flex");
const loaderParent = document.querySelector(".loadPar");
const uniqueTitle = document.querySelector(".unTit");
const metaDescription = document.querySelector(".meta");
const usedPrices = document.querySelector(".price-cart");
const errorContainer = document.querySelector(".errCont");
const buyGame = document.querySelector(".buy-game");


// error handling method, as demonstrated by Talitha Kruger on Aug 32, 2023 on Loom.
function errorRendered(message) {
  const errorHtml = document.getElementById("error");
  errorHtml.innerHTML = `<h2>An error has occurred: ${message}<h2>`;
}

// Here I am using the method, demonstrated in module 4 lesson 3, in order to pass variables into my product site

const queryString = document.location.search;

const parameters = new URLSearchParams(queryString);

const id = parameters.get("id");

// Here I am adding the unique product id from the API call to the HTML of the product-site

const url = "https://cms-ca.alex-skoglund.no/wp-json/wc/store/products/" + id;

async function productPage() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      loaderParent.innerHTML = ""; //Toggle off loading screen
      throw new Error("failed to fetch product details.");
    }
    const specProd = await response.json();
    return specProd;
  } catch (error) {
    throw error;
  }
}

productPage();

async function productDetails() {
  try {
    const specProd = await productPage();
    loaderParent.innerHTML = ""; //Toggle off loading screen
    errorContainer.innerHTML = ""; //Toggle off error styling

    // Fix from Talitha.

    // Create product elements using createElement
    const productImage = document.createElement("img");
    productImage.className = "APIgame";
    productImage.src = specProd.images[0].src;
    productImage.alt = specProd.description;
    prodFlex.appendChild(productImage);

    const productTitle = document.createElement("h2");
    productTitle.textContent = specProd.name;
    prodFlex.appendChild(productTitle);

    
    prodFlex.innerHTML += `${specProd.description}`;
    

    uniqueTitle.textContent = specProd.name; // Change title in browser tab.

    const addToCartButton = document.createElement("button");
    addToCartButton.className = "button cta new-game";
    addToCartButton.id = "cart-button";
    addToCartButton.dataset.id = specProd.id;
    addToCartButton.dataset.title = specProd.name;
    addToCartButton.dataset.image = specProd.images[0].src;
    addToCartButton.dataset.price = specProd.prices.price;
    addToCartButton.dataset.amount = 1;
    addToCartButton.textContent = "Add to Cart";

    // Add an event listener to the "Add to Cart" button
    addToCartButton.addEventListener("click", () => {
      const cartItem = {
        id: specProd.id,
        price: specProd.prices.price,
        image: specProd.images[0].src,
        title: specProd.name,
        amount: 1,
      };
      saveToCart(cartItem);
      alert(
        "Game has been added to cart, please proceed to the shopping cart to review your order(s)!"
      );

      //Adds the game to the shopping cart counter, I will continue on this feature!
      const result = (cartItem.amount++);
      
    
  
      document.querySelector(".Games_in_cart").innerHTML =`${result}`;
      
    });

    buyGame.appendChild(addToCartButton);

    usedPrices.textContent = `${specProd.prices.currency_prefix} ${specProd.prices.price}`;
    metaDescription.setAttribute("name", "description");
    metaDescription.setAttribute("content", specProd.description); // Change description in browser tab.
  } catch (error) {
    errorRendered(error.message);
  }
}

// ...

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Saving game to Local Storage
function saveToCart(product) {

  const cart = loadFromStorage("cart") || [];
  

  if (cart.some((product) => product.id ===id)) { alert("Game has already been added to the cart"); } else { // Method to prevent double orders viewed at the youtube channel "freeCodecamp.org" url "https://www.youtube.com/watch?v=cT_ZYrS3tKc&t=5788s"[viewed on 6th of October, 2023].
    cart.push(product);
    saveToStorage("cart", cart);

  
    

     
  }
}

productDetails();