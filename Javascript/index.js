const homePageCover = document.querySelector(".front-flexbox");
const coverText = document.querySelector(".text-flex-front");
const productLink = document.querySelector(".button to-game");
const loadContainer = document.querySelector(".loadContainer");
const errorContainer = document.querySelector(".errCont");

// error handling, as demonstrated by Talitha Kruger on Aug 32, 2023 on Loom
function errorRendered(message) {
  const errorHtml = document.getElementById("errorIndex");
  errorHtml.innerHTML = `<h2>An error has occurred: ${message}<h2>`;
}

const url =
  "https://cms-ca.alex-skoglund.no/wp-json/wc/store/products"; // API call for products originating from my own domain, products were created with the WooCommerce plugin in WordPress. 

async function gameInfoHomepage() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      loadContainer.innerHTML = ""; //Toggle off loading screen
      throw new Error("failed to fetch product details.");
    }
    const superDupGame = await response.json();
    return superDupGame;
  } catch (error) {
    throw error;
  }
}

async function renderIndexProduct() {
  try {
    const superDupGame = await gameInfoHomepage();
    // turning off the loader animation with an empty string
    loadContainer.innerHTML = ""; //Toggle off loading screen
    errorContainer.innerHTML = ""; //Toggle off error styling
    //here I am using backticks, in order to manually insert elements from the third object in the array, into the index.html document. I also attach custom classes, to keep the original styling of the site, for both the image and the text underneath the image//
    homePageCover.innerHTML += `<span> <img src ="${superDupGame[0].images[0].src}" alt = "${superDupGame[0].images[0].alt}" class ="front-cover" "> </span>`;
    coverText.innerHTML += `<div class="front-image-text"${superDupGame[0].description} </div> <a class="button to-game" href="product_page.html?id=${superDupGame[0].id}">Become Super Duper!</a>`;
  } catch (error) {
    errorRendered(error.message);
  }
}

renderIndexProduct();
