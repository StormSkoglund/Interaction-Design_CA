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
  "https://api.noroff.dev/api/v1/gamehub"; /*I was trying to move the API URL into another file to use it as a component of sorts, but I didn't manage to get it to work. I was following this video by MJ Philips "https://www.youtube.com/watch?v=l-nOOCb4wG0&list=PLOy2fxfOYlVPVTCIKfEKh5VGCR3_DmxV4&index=13"[viewed on 31. August 2023].*/

//this API call swaps out the hardcoded super duper game cover on my homepage, with the one from the API,
//while keeping my own generated screenshot (i asked Talitha if could keep this for layout purposes). */
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
    homePageCover.innerHTML += `<span> <img src ="${superDupGame[2].image}" alt = "${superDupGame[2].description}" class ="front-cover" "> </span>`;
    coverText.innerHTML += `<p class="front-image-text">"${superDupGame[2].description}" </p> <a class="button to-game" href="product_page.html?id=${superDupGame[2].id}">View Game</a>`;
  } catch (error) {
    errorRendered(error.message);
  }
}

renderIndexProduct();
