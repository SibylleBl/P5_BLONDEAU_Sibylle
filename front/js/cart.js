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

  for (j = 0; j < boutons_supprimer.length; j++) {
    boutons_supprimer[j].addEventListener("click", (e) => {
      console.log("coucou");
      console.log(productInLocal[2].id);
      console.log(e);
      // je récupère l'id et la couleur du produit à supprimer (où je clique)
      // let idToDelete = productInLocal[j].id;
      // let couleurToDelete = productInLocal[j].couleur;
    });
  }
}

deleteItem();
// for (j=0; j <boutons_supprimer.length; j++) {

// }

// ---------------------------- création d'une boucle et de l'event au clic
