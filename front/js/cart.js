// let produitTableau = JSON.parse(localStorage.getItem("produit")); // qu'ai-je dans mon panier?
// console.log("🚀 ~ file: cart.js ~ line 2 ~ produitTableau", produitTableau);

// if (produitTableau == null) {
//   // si mon produit tableau est null, définir produitTableau en tableau
//   produitTableau = []; //création du tableau
//   localStorage.setItem("produit", JSON.stringify(produitTableau)); // j'envoie un produit sous forme de string
// }

//TUTO TEST pour comprendre
// function savebasket(basket) {
//   localStorage.setItem("monPanier", JSON.stringify(basket));
// }

// function getBasket() {
//   let basket = localStorage.getItem("basket");
//   if (basket == null) {
//     return [];
//   } else {
//     return JSON.parse(basket);
//   }
// }

// function addBasket(product) {
//   let basket = getBasket();
//   let foundProduct = basket.find((p) => p.id == product.id);
//   if (foundProduct != undefined) {
//     foundProduct.quantity++;
//   } else {
//     product.quantity = 1; //quantité minimum par défaut
//     basket.push(product);
//   }
//   basket.push(product);
//   savebasket(basket);
// }
