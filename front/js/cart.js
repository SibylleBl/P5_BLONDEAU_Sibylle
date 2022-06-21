let productInLocal = JSON.parse(localStorage.getItem("produit"));
let pictureInLocal = localStorage.getItem("imageUrl");

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
  <img src="${pictureInLocal}" alt="Photographie d'un canapé">
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
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
      productInLocal[i].quantite
    }">
  </div>
  <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
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
      let idToDelete = productInLocal[j].id;
      let colorToDelete = productInLocal[j].couleur;

      // let mySelectProduct = idToDelete + " " + couleurToDelete;
      // je compare l'id et la couleur cliqué avec mon local storage
      const compareproduct = productInLocal.find(
        (element) =>
          element.id == idToDelete && element.couleur == colorToDelete
      );

      productInLocal = productInLocal.filter(
        (product) => product != compareproduct
      );

      productInLocal = productInLocal.filter((item) => item != compareproduct); // je veux tout les items qui ne sont pas celui que je clique
      localStorage.setItem("produit", JSON.stringify(productInLocal)); // mise à jour du local storage
      window.location.href = "cart.html"; // permet de recharger la page
    });
  }
}

deleteItem();

// --------------------------- modifier la quantité d'un produit

function modifyQuantity() {
  let boutons_quantite = document.querySelectorAll(".itemQuantity");

  // même début que pour la suppression d'un objet (trouver et comparer les ids et couleurs pour sélectionner le produit voulu)

  for (let k = 0; k < boutons_quantite.length; k++) {
    boutons_quantite[k].addEventListener("click", (e) => {
      let idToModify = productInLocal[k].id;
      let colorToModify = productInLocal[k].couleur;

      const compareproduct = productInLocal.find(
        (element) =>
          element.id == idToModify && element.couleur == colorToModify
      );

      // je rédéfini la quantité du produit sélectionné
      compareproduct.quantite = boutons_quantite[k].value;

      // je met à jour le local storage
      localStorage.setItem("produit", JSON.stringify(productInLocal));
      window.location.href = "cart.html";
    });
  }
}

modifyQuantity();

// ---------------------------- calcul prix et quantités
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

// for (let l = 0; l < boutons_quantite.length; l++) {
//   let allQuant = document.querySelectorAll(".itemQuantity");
//   let eachQuant = productInLocal[l].quantite;

//   allQuant.reduce(
//     (accumulateur, valeurCourante) => accumulateur + valeurCourante;
//   );
// }

// ---------------------------- passer la commande
