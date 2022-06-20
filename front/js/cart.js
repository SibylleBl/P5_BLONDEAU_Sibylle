let productInLocal = JSON.parse(localStorage.getItem("produit"));

for (i = 0; i < productInLocal.length; i += 1) {
  document.getElementById(
    "cart__items"
  ).innerHTML += `<article class="cart__item" data-id="${
    productInLocal[i].id
  }" data-color="${productInLocal[i].couleur}">
  <div class="cart__item__img">
    
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

// ------------------------------------------------------- gestion du bouton supprimer l'article
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

// ----------------------------------------------------------- modifier la quantité d'un produit

function modifyQuantity() {
  let boutons_quantite = document.querySelectorAll(".itemQuantity");

  // même début que pour la suppression d'un objet (trouver et comparer les ids et couleurs pour sélectionner le produit voulu)

  for (let k = 0; k < boutons_quantite.length; k++) {
    boutons_quantite[k].addEventListener("click", (e) => {
      let idToModify = productInLocal[k].id;
      console.log(
        "🚀 ~ file: cart.js ~ line 71 ~ boutons_quantite[k].addEventListener ~ idToModify",
        idToModify
      );
      let colorToModify = productInLocal[k].couleur;
      console.log(
        "🚀 ~ file: cart.js ~ line 72 ~ boutons_quantite[k].addEventListener ~ colorToModify",
        colorToModify
      );

      const compareproduct = productInLocal.find(
        (element) =>
          element.id == idToModify && element.couleur == colorToModify
      );
      console.log(
        "🚀 ~ file: cart.js ~ line 87 ~ boutons_quantite[k].addEventListener ~ compareproduct",
        compareproduct
      );
      // je rédéfinie la quantité du produit sélectionné
      compareproduct.quantite = boutons_quantite[k].value;
      console.log(compareproduct.quantite);

      // je met à jour le local storage
      localStorage.setItem("produit", JSON.stringify(productInLocal));
    });
  }
}

modifyQuantity();
