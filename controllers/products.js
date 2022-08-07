const lorem =
  "Lorem ipsum dolor sit amet consectetur Tempora culpa quam sit odit? Esse adipisci voluptat.Molestias enim eum, corporis velit placeat ea distinctio sed quae modi, veritatis facere et voluptatum laboriosam laborum accusantium. Ab delectus aperiam porro mollitia recusandae id fugiat magni quas voluptatibus facere.";
const request = fetch(
  "https://e-commercechallenge.herokuapp.com/productos"
).then((res) => res.json());

const createProduct = (name, price, category, url, descrip = lorem) => {
  return fetch("https://e-commercechallenge.herokuapp.com/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: name,
      precio: price,
      categoria: category,
      id: uuid.v4().substr(0, 8),
      imagen: url || "assets/img/defaultProduct.png",
      descripcion: descrip,
    }),
  });
};

const updateProduct = (id, name, price,  url) => {
  return fetch(`https://e-commercechallenge.herokuapp.com/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: name,
      precio: price,
      imagen: url||"assets/img/defaultProduct.png",
    }),
  })
  .then((respuesta) => respuesta)
  .catch((err) => console.log(err));
};


const deleteProduct = (id) => {
    return fetch(`https://e-commercechallenge.herokuapp.com/productos/${id}`, {
      method: "DELETE",
    });
  };


  let dollarUS2 = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    useGrouping: true,
});

export { request, createProduct, updateProduct, deleteProduct, dollarUS2};
