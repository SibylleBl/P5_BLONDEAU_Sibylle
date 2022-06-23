let productInLocal = JSON.parse(localStorage.getItem("produits"));

function getItemsFromLocalStorage() {
  let produitsPanier = JSON.parse(localStorage.getItem("produits")); // m'affiche le contenu du panier
  if (produitsPanier == null) {
    // si mon produit tableau est null, définir produitPanier en tableau
    produitsPanier = []; //création du tableau
  }
  return produitsPanier;
}
let monTableauProduits = getItemsFromLocalStorage();

function setItemsToLocalStorage(produits) {
  let envoiProduits = localStorage.setItem(
    "produits",
    JSON.stringify(produits)
  );
  return envoiProduits;
}

// si le panier est vide
if (productInLocal.length === 0) {
  document.getElementById(
    "cart__items"
  ).innerHTML += `<p>Votre panier est vide</p>`;
} else {
  //sinon création de la carte produit
  for (i = 0; i < productInLocal.length; i += 1) {
    document.getElementById(
      "cart__items"
    ).innerHTML += `<article class="cart__item" data-id="${
      productInLocal[i].id
    }" data-color="${productInLocal[i].couleur}">
  <div class="cart__item__img">
  <img src="${productInLocal[i].image}" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
<div class="cart__item__content__description">
  <h2>${productInLocal[i].nom}</h2>
  <p>${productInLocal[i].couleur}</p>
 <p>${productInLocal[i].prix + "€"}</p>
</div>
<div class="cart__item__content__settings">
   <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" data-id="${
      productInLocal[i].id
    }" data-color="${
      productInLocal[i].couleur
    }" name="itemQuantity" min="1" max="100" value="${
      productInLocal[i].quantite
    }">
  </div>
  <div class="cart__item__content__settings__delete">
    <p class="deleteItem" data-id="${productInLocal[i].id}" data-color="${
      productInLocal[i].couleur
    }">Supprimer</p>
  </div>
 </div>
</div>
</article>`;
  }
}

// ---------------------------- gestion du bouton supprimer l'article
function deleteItem() {
  let boutons_supprimer = document.querySelectorAll(".deleteItem"); // crée un tableau

  for (let j = 0; j < boutons_supprimer.length; j++) {
    boutons_supprimer[j].addEventListener("click", (e) => {
      // je récupère l'id et la couleur du produit à supprimer (où je clique)
      let idToDelete = boutons_supprimer[j].dataset.id;
      let colorToDelete = boutons_supprimer[j].dataset.color;

      productInLocal = productInLocal.filter(
        (element) =>
          !(element.id === idToDelete && element.couleur === colorToDelete)
      );

      localStorage.setItem("produits", JSON.stringify(productInLocal)); // mise à jour du local storage
      window.location.href = "cart.html"; // permet de recharger la page
    });
  }
}

deleteItem();

// // --------------------------- modifier la quantité d'un produit

function modifyQuantity() {
  let arrayQuantity = document.querySelectorAll(".itemQuantity");
  // console.log("🚀 ~ file: cart.js ~ line 89 ~ arrayQuantite", arrayQuantity);
  // console.log(productInLocal);
  for (let k = 0; k < arrayQuantity.length; k++) {
    // console.log("🚀 ~ file: cart.js ~ line 100 ~ modifyQuantity ~ k", k);
    arrayQuantity[k].addEventListener("click", (e) => {
      let idOfLocalProduct = arrayQuantity[k].dataset.id;
      let colorOfLocalProduct = arrayQuantity[k].dataset.color;
      // console.log(idOfLocalProduct + " " + colorOfLocalProduct);

      productInLocal = productInLocal.map((element) => {
        // console.log(
        //   "🚀 ~ file: cart.js ~ line 102 ~ productInLocal=productInLocal.map ~ element",
        //   element
        // );
        if (
          element.id === idOfLocalProduct &&
          element.couleur === colorOfLocalProduct
        ) {
          return {
            ...element,
            quantite: parseInt(arrayQuantity[k].value, 10),
          };
        }
        return element;
      });
      localStorage.setItem("produits", JSON.stringify(productInLocal));
      window.location.href = "cart.html";
    });
  }
}
modifyQuantity();

// ---------------------------- calcul prix et quantités
function totalPriceAndQuantity() {
  // déclaration de la variable pour pouvoir y mettre les prix et quant qui sont présents dans le panier
  let prixTotalCalcul = [];
  let quantTotalCalcul = [];

  for (let l = 0; l < productInLocal.length; l++) {
    let prixProduitDansLePanier = parseInt(productInLocal[l].prix);
    let quantProduitDansLePanier = parseInt(productInLocal[l].quantite);

    // mettre les prix du panier dans le tableau "prixTotalCalcul" / idem pour quant
    prixTotalCalcul.push(prixProduitDansLePanier);
    // console.log(
    //   "🚀 ~ file: cart.js ~ line 111 ~ prixTotalCalcul",
    //   prixTotalCalcul
    // );
    quantTotalCalcul.push(quantProduitDansLePanier);
    // console.log(
    //   "🚀 ~ file: cart.js ~ line 112 ~ quantTotalCalcul",
    //   quantTotalCalcul
    // );

    // additionner les prix et les quantités dans les tableaux dédiés avec la méthode reduce
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const prixTotal = prixTotalCalcul.reduce(reducer, 0);
    // console.log("🚀 ~ file: cart.js ~ line 125 ~ prixTotal", prixTotal);
    const quantTotal = quantTotalCalcul.reduce(reducer, 0);
    // console.log("🚀 ~ file: cart.js ~ line 127 ~ quantTotal", quantTotal);

    // afficher au bon endroit dans le html
    const totalPrice = document.getElementById("totalPrice");
    const totalQuant = document.getElementById("totalQuantity");

    totalPrice.innerHTML = prixTotal;
    totalQuant.innerHTML = quantTotal;
  }
}
totalPriceAndQuantity();

// // ---------------------------- passer la commande
