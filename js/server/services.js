import { request, dollarUS2 } from "../../controllers/products.js";

const products = await request.then((resp) => resp).catch((error) => error);
const categorias = products.map((product) => product.categoria);


class objectcategories {
  constructor(category) {
    this.category = category;
  }
  createCategory() {
    const category = document.createElement("div");
    category.classList.add("product__container");
    const categoryComponents = `
          <div class="section__header">
              <h2 class="product__title" data-category id="${this.category}">${this.category}</h2>
              <div class="seeAll" id="see__all" data-seeall>
                  <a class="product__seeAll">Ver todo</a>
                  <img src="assets/img/seeAll_Arrow.svg" alt="arrow" class="arrow__seeAll">
              </div>
          </div>
          <div class="product__cards"></div>`;
    category.innerHTML = categoryComponents;
    return category;
  }
}

class product {
  constructor(name, price, category, url, id) {
    this.name = name;
    this.price = dollarUS2.format(price);
    this.id = id;
    this.url = url;
    this.category = category;
    this.description =
      "Lorem ipsum dolor sit amet. Id galisum fugiat ut minus rerum non sequi neque 33 minima facere voluptatibus doloremque est minima sequi ut doloremque praesentium.";
  }
  createProduct() {
    const product = document.createElement("div");
    product.classList.add("product_container");
    const productComponents = `<div class="product"><img src="${this.url}" alt="product image" class="product__img">
          <h2 class="product__name" id="${this.id}">${this.name}</h2>
          <p class="product__price">${this.price}</p>
          <a href="#" class="product__id product__link" id="${this.category}">Ver producto</a></div>`;
    product.innerHTML = productComponents;
    return product;
  }
  addProduct(product) {
    const theTitle = document.querySelector("[data-productsContainer]");
    theTitle.appendChild(product);
  }
  saveItems(categoria, productComponents) {
    const savedProducts = JSON.parse(sessionStorage.getItem(categoria)) || [];
    savedProducts.push(productComponents);
    sessionStorage.setItem(categoria, JSON.stringify(savedProducts));
  }
}

const uniqueCategory = [];
categorias.forEach((categoria) => {
  if (!uniqueCategory.includes(categoria)) {
    uniqueCategory.push(categoria);
  }
});

const createProductDiv = (nombre, precio, image, categoria, id) => {
  const nuevoProduct = new product(nombre, precio, categoria, image, id);
 
  return nuevoProduct.createProduct();
};

/*uniqueCategory.forEach(categoria=>{
    const section = document.querySelector('.product__section');
    const nuevaCategoria = new objectcategories (categoria);
    const lacategoria = nuevaCategoria.createCategory();
    section.appendChild(lacategoria);
        
        const categoryProducts = products.filter(product=>product.categoria===categoria);
        
        categoryProducts.forEach(product=>{
            const {nombre, precio, imagen, categoria} = product
            const theProduct = createProductDiv(nombre, precio, imagen, categoria);
            lacategoria.children[1].appendChild(theProduct);
        }
    )
});*/

const section = document.querySelector(".product__section");

const elements = uniqueCategory.map((categoria) => {
  const nuevaCategoria = new objectcategories(categoria);
  const lacategoria = nuevaCategoria.createCategory();
  const categoryProducts = products.filter(
    (product) => product.categoria === categoria
  );

  categoryProducts.forEach((product) => {
    const { id, nombre, precio, imagen, categoria } = product;
    const theProduct = createProductDiv(nombre, precio, imagen, categoria, id);
    lacategoria.children[1].appendChild(theProduct);
  });
  return lacategoria;
});

const fragment = document.createDocumentFragment();
elements.forEach((element) => {
  fragment.append(element);
});

section.appendChild(fragment);

class linkproduct {
  constructor(url, name, price, id, categoria) {
    this.url = url;
    this.name = name;
    this.price = price;
    this.id = id;
    this.categoria=categoria;
  }
  createPage() {
    const name = this.name;
    const price = this.price;
    const url = this.url;
    const id = this.id;
    const category = this.categoria;
    sessionStorage.setItem("seeProduct", JSON.stringify([name, price, url, id, category]));
    const currentPage = window;
    const newpage = window.open("productdetails.html");
  }
}

const allProductLinks = document.querySelectorAll(".product__id");
allProductLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const url = link.parentNode.children[0].src;
    const name = link.parentNode.children[1].innerHTML;
    const price = link.parentNode.children[2].innerHTML;
    const id = link.parentNode.children[1].id;
    const category = link.parentElement.children[3].id;
    const theProduct = new linkproduct(url, name, price, id, category);
    theProduct.createPage();
    createLink();
  });
});

function createLink() {
  const theProduct = JSON.parse(sessionStorage.getItem("seeProduct"));
  const theTarget = document.querySelector(".product__information__details");
  theTarget.children[0].src = theProduct[2];
  theTarget.children[1].children[0].innerHTML = theProduct[0];
  theTarget.children[1].children[1].innerHTML = theProduct[1];
}

const seeAlls = document.querySelectorAll(".seeAll")
seeAlls.forEach(seeall=>seeall.addEventListener("click", (e)=>{
  e.preventDefault();
const category = e.target.parentNode.children[0].innerHTML;
sessionStorage.setItem("seeCategory", JSON.stringify([category]));
const currentPage = window;
const newpage = window.open("allproducts.html");
}))
