id_article = new URL(window.location.href);
console.log(new URL(window.location.href));
id_article = new URL(window.location.href).searchParams.get("id");
console.log(id_article);
let url = new URL("http://localhost:3000/api/products.html?id=" + id_article);

// import {productCtrl.getOneProduct} from "../../back/routes/product";

// // import router from "../../back/routes/product";

// // import("..back/routes/product.js").then((router) => {
// //   router.get(productCtrl.getOneProduct);
// // });

// let getOneProduct = {
//   // "colors": ["Blue", "White", "Black"],
//   _id: "${id_article}",
//   name: "${id_article.name}",
//   price: "${id_article.price}",
//   Photo: "${id_article.imageUrl}",
//   description: "${id_article.description}",
//   descriptionphoto: "${id_article.altTxt}",
// };
// console.log(getOneProduct);
// const oujemetmaphoto = document.getElementsByClassName("item__img");

// function article(elements) {
//
//   let photocanape = id_article.getAttribute("imageUrl");
//   const imagecanape = `<img src="${photocanape.imageUrl}" alt="Photographie d'un canapé">`;
//   oujemetmaphoto.innerHTML = imagecanape;
// }
