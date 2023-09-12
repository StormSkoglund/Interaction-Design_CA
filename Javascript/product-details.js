const prodFlex = document.querySelector(".product-mobile-flex");
const loaderParent = document.querySelector(".loadPar");
const uniqueTitle = document.querySelector(".unTit");
const metaDescription = document.querySelector(".meta");
const usedPrices = document.querySelector(".price-cart");
const newPrices = document.querySelector(".price-cart2");
const errorContainer = document.querySelector(".errCont");

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

    prodFlex.innerHTML += `<img class ="APIgame" src = "${specProd.image}" alt = "${specProd.description}" /> <h2> ${specProd.title}</h2> <p> ${specProd.description} </p>`;
    uniqueTitle.innerHTML += `${specProd.title}`; // Change title in browser tab.
    usedPrices.innerHTML += `${specProd.discountedPrice}$`;
    newPrices.innerHTML += `${specProd.price}$`;
    metaDescription.innerHTML += `
  name = "description"
  content = "${specProd.description}"`; // Change description in browser tab.
  } catch (error) {
    errorRendered(error.message);
  }
}

productDetails();
