import { request, dollarUS2 } from "../controllers/products.js";

const loading = document.querySelector(".loading");

request.then((resolve) => {
  console.log(resolve);
  setInterval(() => {
    finishLoading();
  }, 2000);
});

function finishLoading() {
  const content = document.querySelectorAll(".content");
  content.forEach((cont) => {
    cont.classList.remove("content");
  });
  loading.classList.add("content");
}

const allProductsDB = await request;
const searchBar = document.querySelector(".search__bar");

//const headers = document.querySelectorAll(".section__header");

const closebar = () => {
  const theBody = document.querySelector("body");
  const theBar = document.querySelector(".found__products");
  theBody.removeChild(theBar);
  /*products.forEach(product => {
        product.classList.remove("productHide");        
     });*/
  const findFound = document.querySelectorAll(".no__found");
  const searchSpace = document.querySelector(".searchproduct__container");
  findFound.forEach((findF) => {
    searchSpace.removeChild(findF);
  });
};

searchBar.addEventListener("input", () => {
  const thebar = document.querySelector(".found__products");
  const theHead = document.querySelector(".theHead");
  if (!thebar) {
    const theBar = createSearchBar();
    theHead.after(theBar);
    theBar.addEventListener("click", closebar);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////***Getting data from DB***////
const allItems = allProductsDB.map((product) => {
  const { nombre, id, precio, imagen } = product;
  return { nombre: nombre.toLowerCase(), id, precio, imagen };
});

//adding eventlistener to listen for keypress
searchBar.addEventListener("input", () => {
  //Transformin name to lower case and creating element on the search bar.
  const searchValue = searchBar.value.toLowerCase();
  const newArray = allItems
    .filter((item) => item.nombre.includes(searchValue))
    .splice(0, 8);
  const searchSpace = document.querySelector(".searchproduct__container");
  const searchContainer = document.querySelector(".searchproduct__container");
  const foundProducs = document.querySelectorAll(".searched__product");
  const notFound = document.querySelector(".no__found");

  if (!searchValue) {
    const searchContainer = document.querySelector(".searchproduct__container");
    const foundProducs = document.querySelectorAll(".searched__product");
    foundProducs.forEach((product) => {
      searchContainer.removeChild(product);
    });
  }

  if (searchValue.length > 1) {
    foundProducs.forEach((product) => {
      searchContainer.removeChild(product);
    });
  }

  if (searchValue.length > 0) {
    newArray.forEach((match) => {
      const { nombre, id, imagen, precio } = match;
      const nametoupper = [...nombre];
      const newWord = nametoupper.reduce(function (
        valorAnterior,
        valorActual,
        indice,
        vector
      ) {
        return nametoupper.indexOf(valorAnterior) == 0
          ? valorAnterior.toLocaleUpperCase() + valorActual
          : valorAnterior + valorActual;
      });
      const matchProduct = seachProduct(imagen, newWord, precio);
      searchSpace.appendChild(matchProduct);
    });
  }

  if (newArray.length < 1 && !notFound) {
    searchSpace.appendChild(createNotFound());
    console.log("Not Found created");
  } else if (newArray.length > 0 && notFound) {
    searchSpace.removeChild(notFound);
    console.log("Not Found removed");
  }
});

function createNotFound() {
  const noFoundText = document.createElement("div");
  noFoundText.classList.add("no__found");
  const noFoundTextCompounts = `<p class="no__found__text">Product Not Found</p>`;
  noFoundText.innerHTML = noFoundTextCompounts;
  return noFoundText;
}

function createSearchBar() {
  const searchSpace = document.createElement("div");
  searchSpace.classList.add("found__products");
  const searchBarComponents = `<div class ="searchproduct__container">
    </div>`;
  searchSpace.innerHTML = searchBarComponents;
  return searchSpace;
}

function seachProduct(url, name, price) {
  const newProductFound = document.createElement("div");
  newProductFound.classList.add("searched__product");

  const theProductComponents = `<img src="${url}" alt="product image" class="seachproduct__img">
  <h2 class="product__name">${name}</h2>
  <p class="product__price">${dollarUS2.format(price)}</p>
  <a href="#" class="product__id">See Product</a>`;
  newProductFound.innerHTML = theProductComponents;
  return newProductFound;
}
