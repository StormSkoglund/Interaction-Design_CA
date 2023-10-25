export const gameList = document.querySelector(".games-list");
const loaderParent = document.querySelector(".loadContainer");
const errorContainer = document.querySelector(".errCont");

// error handling, as demonstrated by Talitha Kruger on Aug 32, 2023 on Loom
function errorRendered(message) {
  const errorHtml = document.querySelector(".error");
  errorHtml.innerHTML = `<h2>An error has occurred: ${message}<h2>`;
}

/*This is the updated API call from my Wordpress host via my own domain at One.com*/

const url = "https://cms-ca.alex-skoglund.no/wp-json/wc/store/products";


 async function getGames() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      loaderParent.innerHTML = "";
      throw new Error("failed to fetch product list.");
    }

    const list = await response.json();
    return list;
  } catch (error) {
    throw error;
  }
}

/*I am reusing the code from JS1, since it is working as intented. I am instead changing certain keywords since the WooCommerce API difffers sligthly from the Noroff API.
 */
async function renderList() {
  try {
    const list = await getGames();
    gameList.innerHTML = "";
    loaderParent.innerHTML = "";
    errorContainer.innerHTML = "";
    const collection = list;

    collection.forEach((unique) => {
      gameList.innerHTML += `<div>
          <p> ${unique.name} </p>
          <img
            src="${unique.images[0].src}"
            
            class="img_as_pl"

            alt="${unique.description}"
          />
          <a href="product_page.html?id=${unique.id}" class="button games-button">View Game</a>
        </div>`;
    });
  } catch (error) {
    errorRendered(error.message);
  }
}

renderList();
