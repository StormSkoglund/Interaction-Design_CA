const gameList = document.querySelector(".games-list");
const loaderParent = document.querySelector(".loadContainer");
const errorContainer = document.querySelector(".errCont");

// error handling, as demonstrated by Talitha Kruger on Aug 32, 2023 on Loom
function errorRendered(message) {
  const errorHtml = document.querySelector(".error");
  errorHtml.innerHTML = `<h2>An error has occurred: ${message}<h2>`;
}

/*Here I am adding the unique product id from the API call to the HTML of the product-site*/

const url = "https://api.noroff.dev/api/v1/gamehub";
/*I was trying to move the API URL into another file to use it as a component of sorts, but I didn't manage to get it to work. I was following this video by MJ Philips "https://www.youtube.com/watch?v=l-nOOCb4wG0&list=PLOy2fxfOYlVPVTCIKfEKh5VGCR3_DmxV4&index=13"[viewed on 31. August 2023].*/

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

/*I am using the forEach method, this was demonstrated in module 4, lesson one. I am looping through my list (gameDetails), which contains meta data about the different games)
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
          <p> ${unique.title} </p>
          <img
            src="${unique.image}"
            
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
/* In the above code, I have selected my container and then I created new HTML in my products-list HTML page, changing out the hardcoded game titles and cover photos as well as giving them the original styling via class names*/
renderList();
