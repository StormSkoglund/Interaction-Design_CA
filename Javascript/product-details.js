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

const url = "https://api.noroff.dev/api/v1/gamehub/" + id;

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
    productImage.src = specProd.image;
    productImage.alt = specProd.description;
    prodFlex.appendChild(productImage);

    const productTitle = document.createElement("h2");
    productTitle.textContent = specProd.title;
    prodFlex.appendChild(productTitle);

    const productDescription = document.createElement("p");
    productDescription.textContent = specProd.description;
    prodFlex.appendChild(productDescription);

    uniqueTitle.textContent = specProd.title; // Change title in browser tab.

    const addToCartButton = document.createElement("button");
    addToCartButton.className = "button cta new-game";
    addToCartButton.id = "cart-button";
    addToCartButton.dataset.id = specProd.id;
    addToCartButton.dataset.title = specProd.title;
    addToCartButton.dataset.image = specProd.image;
    addToCartButton.dataset.price = specProd.discountedPrice;
    addToCartButton.textContent = "Add to Cart";

    // Add an event listener to the "Add to Cart" button
    addToCartButton.addEventListener("click", () => {
      const cartItem = {
        id: specProd.id,
        price: specProd.discountedPrice,
        image: specProd.image,
        title: specProd.title,
      };
      saveToCart(cartItem);
      alert(
        "Game has been added cart, please proceed to the shopping cart to review your order(s)!"
      );
    });

    buyGame.appendChild(addToCartButton);

    usedPrices.textContent = `${specProd.discountedPrice}$`;
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

function saveToCart(product) {
  const cart = loadFromStorage("cart") || [];
  cart.push(product);
  saveToStorage("cart", cart);
}

productDetails();
  
