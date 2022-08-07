//Importing Data from Server Scripts
//import { productServer } from './server/server.js';
import { createAlert } from './createAlerts.js';
import { createProduct, request, deleteProduct, updateProduct, dollarUS2} from "../controllers/products.js";
/*productServer.productbyCategory()
.then((response) => {
    response.forEach(data => {
    console.log(data.name);
    });
    
})
.catch((error) => {});
*/


//create products and add by click
export class product {
    constructor (name, price, category, url, description){
        this.name = name;
        this.price = dollarUS2.format(price);
        this.id = uuid.v4().substr(0,8);
        this.url = url;
        this.category = category;
        this.description = description;
    };
    createProduct (){
        const product = document.createElement ("div");
        product.classList.add ("product")
        const productComponents = `<img src="${this.url}" alt="product image" class="product__img">
        <h2 class="product__name">${this.name}</h2>
        <p class="product__price">${this.price}</p>
        <a href="#" class="product__id">${this.id}</a>
        <div class="delete__edit__icon">
            <img src="assets/img/delete.svg" alt="edition__icon" class="edition__icon">
            <img src="assets/img/edit.svg" alt="edition__icon" class="edition__icon">
        </div>`
        product.innerHTML = productComponents;
        return product;
    };

    addProduct (product){
        const theTitle = document.querySelector ("[data-productsContainer]");
        theTitle.appendChild (product);
    };      
    saveItems(categoria, productComponents){
        const savedProducts = JSON.parse(sessionStorage.getItem(categoria))||[];
        savedProducts.push(productComponents);
        sessionStorage.setItem (categoria, JSON.stringify(savedProducts));
        const alerta = document.getElementById("alert");
        const thebody = document.querySelector("main");
        const theAlert = createAlert("Success", "Your Product has been added succeessfully", "success", "Add Another Product", "Go to Products");
        thebody.appendChild (theAlert);
        const btn1 = document.querySelector("[data-btn1]");
        btn1.addEventListener("click", closeUploader);
        const btn2 = document.querySelector("[data-btn2]");
        btn2.addEventListener("click", ()=>{
            theAlert.classList.add ("invisible");
            window.location.assign("products.html");
        });
    };
};


let closeUploader =  ()=>{
    const theUploader = document.querySelector(".alerta"); 
    theUploader.parentElement.removeChild(theUploader);
    enableScroll();
};

const addBtn = document.querySelector("[data-addProduct]");
addBtn.addEventListener ("click", (event)=>{
    event.preventDefault();
    const name = document.getElementById("product");
    const price = document.getElementById("price");
    const categoria = document.getElementById("category");
    const url = document.getElementById("url");
    const description = document.getElementById("description");

    if(name.value == "" || price.value == "" || categoria.value == "" || url.value == ""){
        const thebody = document.querySelector("main");
        const theAlert = createAlert("Oppss..", "Please complete all fields.","wrong","Continue", "Go to products");

//adding span message on empty fields. 
        const messageSpan = document.querySelectorAll (".input-message-error");
        messageSpan.forEach (span =>{
            span.classList.remove ("theSpanMessage");
            if(span.parentNode.children[1].value == ""){
                
                span.classList.add ("theSpanMessage");
            }
        });

        window.scrollTo(0, 0);
        window.onscroll = function() {
            window.scrollTo(0, 0);
        };
        thebody.appendChild (theAlert);
        const btn1 = document.querySelector("[data-btn1]");
        btn1.addEventListener("click", closeUploader);
        const btn2 = document.querySelector("[data-btn2]");
        btn2.addEventListener("click", ()=>{
            theAlert.classList.add ("invisible");
            window.location.assign("products.html");
        });

    }else{
    const newproduct = new product (name.value, price.value, categoria.value, url.value, description.value);
    //const theproduct = newproduct.createProduct();
        const productComponents = newproduct;
        console.log(productComponents);

    createProduct (name.value, price.value, categoria.value, url.value, description.value);
    /*newproduct.addProduct(theproduct);*/
   //newproduct.saveItems(productComponents.category, productComponents);

    const form = document.querySelector("[data-formularioProduct]");
    form.reset();
    
    }
});


const inputs = document.querySelectorAll(".input__addproduct");
inputs.forEach ((input)=>{
    input.addEventListener('focus', (event)=>{
        const label = event.target.parentElement.firstChild.parentElement.firstChild.nextElementSibling;
        label.classList.add ("thelabel");
    });

    input.addEventListener('blur', (event)=>{
        const label = event.target.parentElement.firstChild.parentElement.firstChild.nextElementSibling;
        label.classList.remove ("thelabel");
    });
})


function enableScroll() {
    window.onscroll = function() {};
}

/*const addBtn = document.querySelector("[data-addProduct]");
addBtn.addEventListener ("click", (event)=>{
    event.preventDefault();
    const name = document.getElementById("product").value;
    const price = document.getElementById("price").value;
    const categoria = document.getElementById("category").value;
    const url = document.getElementById("url").value;
    const description = document.getElementById("description").value;
    const newproduct = new product (name, price, categoria, url);
    //const theproduct = newproduct.createProduct();
    const productComponents = newproduct;
    //newproduct.addProduct(theproduct);
    newproduct.saveItems(categoria, productComponents);
    alert("your product has been successfuly added");
    console.log(name, price, categoria, url, description);
});*/
