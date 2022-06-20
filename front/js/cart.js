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
      console.log(boutons_supprimer.length);
      // je récupère l'id et la couleur du produit à supprimer (où je clique)
      let idToDelete = productInLocal[j].id;
      console.log(
        "🚀 ~ file: cart.js ~ line 44 ~ boutons_supprimer[j].addEventListener ~ idToDelete",
        idToDelete
      );
      let couleurToDelete = productInLocal[j].couleur;
      console.log(
        "🚀 ~ file: cart.js ~ line 49 ~ boutons_supprimer[j].addEventListener ~ couleurToDelete",
        couleurToDelete
      );
      // let mySelectProduct = idToDelete + " " + couleurToDelete;
      // je compare l'id et la couleur cliqué avec mon local storage
      const compareproduct = productInLocal.find(
        (element) =>
          element.id == idToDelete && element.couleur == couleurToDelete
      );
      console.log(
        "🚀 ~ file: cart.js ~ line 54 ~ boutons_supprimer[j].addEventListener ~ compareproduct",
        compareproduct
      );

      productInLocal = productInLocal.filter(
        (product) => product != compareproduct
      );
      console.log(
        "🚀 ~ file: cart.js ~ line 63 ~ boutons_supprimer[j].addEventListener ~ productInLocal",
        productInLocal
      );
      productInLocal = productInLocal.filter((item) => item != compareproduct); // je veux tout les items qui ne sont pas celui que je clique
      localStorage.setItem("produit", JSON.stringify(productInLocal)); // mise à jour du local storage
      window.location.href = "cart.html"; // permet de recharger la page
    });
  }
}

deleteItem();
// for (j=0; j <boutons_supprimer.length; j++) {

// }

// ---------------------------- création d'une boucle et de l'event au clic
