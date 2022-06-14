let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

if (produitLocalStorage) {
  for (let i = 0; i < produitLocalStorage.length; i++) {
    let baseCart = document.getElementById("cart__items");
    let baseCartCode = `<article class="cart__item" data-id="${produitLocalStorage.id}" data-color="${produitLocalStorage.couleur}">
    </aticle>`;
    console.log(baseCartCode);
    baseCart.innerHTML += baseCartCode;

    let imgCart = document.getElementsByClassName("cart__item__img");
    let imgCartCode = `<img src="${produitLocalStorage.imageUrl}" alt="${produitLocalStorage.altTxt}">`;
    console.log("🚀 ~ file: cart.js ~ line 16 ~ imgCartCode", imgCartCode);
    imgCart.innerHTML += imgCartCode;
  }
}

// function addCart(produitLocalStorage) {
//   const locCart = document.getElementById("cart__items");
//   produitLocalStorage.array.forEach((locCart) => {
//     const aCart = `<produitLocalStorage class="cart__item" data-id="${produitLocalStorage.id}" data-color="${produitLocalStorage.color}">
//                         <div class="cart__item__img">
//                            <img src="${produitLocalStorage.imageUrl}" alt="${produitLocalStorage.altTxt}">
//                         </div>
//                        <div class="cart__item__content">
//                           <div class="cart__item__content__description">
//                             <h2>Nom du produit</h2>
//                             <p>Vert</p>
//                             <p>42,00 €</p>
//                           </div>
//                           <div class="cart__item__content__settings">
//                             <div class="cart__item__content__settings__quantity">
//                               <p>Qté : </p>
//                               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//                             </div>
//                             <div class="cart__item__content__settings__delete">
//                               <p class="deleteItem">Supprimer</p>
//                             </div>
//                           </div>
//                         </div>
//                       </produitLocalStorage>`;
//     locCart.innerHTML += aCart;
//   });
// }
