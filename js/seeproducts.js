import {request, dollarUS2} from '../controllers/products.js'


class product {
    constructor(url, name, price){
        this.url = url;
        this.name =  name;
        this.price = price;
    }
    createPage(){
        const name = this.name;
        const price = this.price;
        const url = this.url;
        sessionStorage.setItem("seeProduct", JSON.stringify([name, price, url]));
        const currentPage = window;
        const newpage = window.open("productdetails.html");
    };
} 

const allProductLinks = document.querySelectorAll(".product__id");

allProductLinks.forEach(link =>{
link.addEventListener("click", (event)=>{
    event.preventDefault();
    const url = link.parentNode.children[0].src;
    const name = link.parentNode.children[1].innerHTML; 
    const price = link.parentNode.children[2].innerHTML;
    const theProduct = new product (url, name, price);
    theProduct.createPage();

    });
});


const products = await request.then(res=>res);

const theProduct = JSON.parse(sessionStorage.getItem("seeProduct"));
const [name, price, url, id, category]= theProduct;
const [dbProduct] = products.filter(theproduct=>theproduct.id === id);
 
//filtering categories and product that's not current product. 
const allproductInCategory = products.filter(theProduct=>theProduct.categoria === category && theProduct.id != id);

const theTarget = document.querySelector(".section__header");

//Creating Main Product 
const createMainProduct = (imagen, nombre, precio, descripcion)=>{
    const mainProduct = document.createElement("div");
    mainProduct.classList.add('product__information__details');
    const productDetails = `
    <img src='${imagen}' alt="product image" class="product__img__details__see">
    <div class="product__img__details">
        <h2 class="product__name__see">${nombre}</h2>
        <p class="product__price__see">${dollarUS2.format(precio)}</p>
        <p href="#" class="product__details__see">${descripcion}</p>
    </div>`;
    mainProduct.innerHTML = productDetails;
    return mainProduct;
}

const createCategoryProducts = (imagen, nombre, precio, descripcion)=>{
        const mainProduct = document.createElement("div");
        mainProduct.classList.add('product');
        const productDetails = `
        <img src='${imagen}' alt="product image" class="product__img">
        <h2 class="product__name">${nombre}</h2>
        <p class="product__price">${dollarUS2.format(precio)}</p>
        <a href="#" class="product__id">Ver producto</a>`;
        mainProduct.innerHTML = productDetails;
    return mainProduct;
}

const {imagen, nombre, precio, descripcion} = dbProduct
const theMain = createMainProduct(imagen, nombre, precio, descripcion);
theTarget.after(theMain);

const productContainer = document.querySelector("[data-productsContainer]");

allproductInCategory.forEach(producto=>{
    const {imagen, nombre, precio, descripcion}= producto;
    const elProducto = createCategoryProducts(imagen, nombre, precio, descripcion); 
    productContainer.append(elProducto);
});





