import {request, dollarUS2} from '../controllers/products.js'

class product {
    constructor(name, price, category, url) {
      this.name = name;
      this.price = dollarUS2.format(price);
      this.url = url;
      this.category = category;
      this.description =
        "Lorem ipsum dolor sit amet. Id galisum fugiat ut minus rerum non sequi neque 33 minima facere voluptatibus doloremque est minima sequi ut doloremque praesentium.";
    }
    createProduct() {
      const product = document.createElement("div");
      product.classList.add("product_container");
      const productComponents = `<div class="product"><img src="${this.url}" alt="product image" class="product__img">
            <h2 class="product__name" id="">${this.name}</h2>
            <p class="product__price">${this.price}</p>
            <a href="#" class="product__id product__link" id="${this.category}">Ver producto</a></div>`;
      product.innerHTML = productComponents;
      return product;
    }
};

const allLinks = document.querySelector('.seeAll');
console.log(allLinks)



const [category] = JSON.parse(sessionStorage.getItem("seeCategory"));
const products = await request;
const productsbyCategory  = products.filter(product=>product.categoria===category)
console.log(productsbyCategory);

const crearProducto = (name, price, category, url)=>{
    const newProduct = new product (name, price, category, url)
    return newProduct;
};

console.log(productsbyCategory)
const productContainer = document.querySelector("[data-allproductsContainer]");
const productTitel = document.querySelector(".product__title");
productTitel.innerHTML =`Todos los productos en: ${category}`
productsbyCategory.forEach(products => {
const {nombre, precio, imagen, categoria}= products
    console.log(nombre);
    const newproduct = crearProducto (nombre, precio, categoria, imagen);
    productContainer.append(newproduct.createProduct());
});







//const theMain = createMainProduct(imagen, nombre, precio, descripcion);
//theTarget.after(theMain);





/*;
allproductInCategory.forEach(producto=>{
    const {imagen, nombre, precio, descripcion}= producto;
    const elProducto = createCategoryProducts(imagen, nombre, precio, descripcion); 
    productContainer.append(elProducto);
});*/

