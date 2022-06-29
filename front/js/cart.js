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
    document.getElementById("cart__items").innerHTML += `<article id="${
      productInLocal[i].id
    }" class="cart__item" data-id="${productInLocal[i].id}" data-color="${
      productInLocal[i].couleur
    }">
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
    boutons_supprimer[j].addEventListener("click", function e() {
      // je récupère l'id et la couleur du produit à supprimer (où je clique)
      let idToDelete = this.dataset.id;
      let colorToDelete = this.dataset.color;

      productInLocal = productInLocal.filter(
        (element) =>
          !(element.id === idToDelete && element.couleur === colorToDelete)
      );
      document.getElementById(idToDelete).style.display = "none";

      setItemsToLocalStorage(productInLocal);
      totalPriceAndQuantity();
    });
  }
}

deleteItem();

// // --------------------------- modifier la quantité d'un produit

function modifyQuantity() {
  let arrayQuantity = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < arrayQuantity.length; k++) {
    arrayQuantity[k].addEventListener("click", function e() {
      let idOfLocalProduct = this.dataset.id;
      let colorOfLocalProduct = this.dataset.color;

      productInLocal = productInLocal.map((element) => {
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
      setItemsToLocalStorage(productInLocal);
      totalPriceAndQuantity();
      // window.location.href = "cart.html";
    });
  }
}
modifyQuantity();

// ---------------------------- calcul prix et quantités

function totalPriceAndQuantity() {
  let totalP = 0;
  let totalQ = 0;
  productInLocal.forEach((element) => {
    let totalPriceEachProduct = element.quantite * element.prix;
    let totalQuantityEachProduct = element.quantite;

    totalP += totalPriceEachProduct;
    totalQ += totalQuantityEachProduct;
  });
  const totalPrice = document.getElementById("totalPrice");
  const totalQuantity = document.getElementById("totalQuantity");

  totalPrice.innerHTML = totalP;
  totalQuantity.innerHTML = totalQ;
}
totalPriceAndQuantity();

// // ---------------------------- passer la commande

let form = document.getElementById("commandForm"); // j'ai rajouté un id au formulaire dans le html

// création des redExp
const regexFirstAndLastName = new RegExp(/^[a-zA-Z-]/);
const regexCityAndAddress = new RegExp(/^[a-zA-Z0-9- ]/);
const regexEmail = new RegExp(
  /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/
);

// ---------------------------------------------email

const mail = document.getElementById("email");
const mailErreur = document.getElementById("emailErrorMsg");

form.email.addEventListener("change", function () {
  validEmail(this);
});

function validEmail(inputEmail) {
  let testEmail = regexEmail.test(inputEmail.value);

  if (testEmail == true) {
    mailErreur.innerHTML = "";
    document.getElementById("email").style.backgroundColor = "LightGreen";
  } else {
    mailErreur.innerHTML = "Adresse mail non valide";
    document.getElementById("email").style.backgroundColor = "LightCoral";
  }
}

// -------------------------- ville

const ville = document.getElementById("city");
const villeErreur = document.getElementById("cityErrorMsg");

form.city.addEventListener("change", function () {
  validCity(this);
});

function validCity(inputCity) {
  let testCity = regexCityAndAddress.test(inputCity.value);

  if (testCity == true) {
    villeErreur.innerHTML = "";
    document.getElementById("city").style.backgroundColor = "LightGreen";
  } else {
    villeErreur.innerHTML = "Ville non valide";
    document.getElementById("city").style.backgroundColor = "LightCoral";
  }
}

// ---------------------------- adresse
const adresse = document.getElementById("address");
const adresseErreur = document.getElementById("addressErrorMsg");

form.address.addEventListener("change", function () {
  validAddress(this);
});

function validAddress(inputAddress) {
  let testAddress = regexCityAndAddress.test(inputAddress.value);

  if (testAddress == true) {
    adresseErreur.innerHTML = "";
    document.getElementById("address").style.backgroundColor = "LightGreen";
  } else {
    adresseErreur.innerHTML = "Adresse non valide";
    document.getElementById("address").style.backgroundColor = "LightCoral";
  }
}

// ------------------------- prénom
const prenom = document.getElementById("firstName");
const prenomErreur = document.getElementById("firstNameErrorMsg");

form.firstName.addEventListener("change", function () {
  validFirstName(this);
});

function validFirstName(inputFirstName) {
  let testFirstName = regexFirstAndLastName.test(inputFirstName.value);
  if (testFirstName == true) {
    prenomErreur.innerHTML = "";
    document.getElementById("firstName").style.backgroundColor = "LightGreen";
  } else {
    prenomErreur.innerHTML = "Prénom non valide";
    document.getElementById("firstName").style.backgroundColor = "LightCoral";
  }
}

// ------------------------ nom
const nom = document.getElementById("lastName");
const nomErreur = document.getElementById("lastNameErrorMsg");

form.lastName.addEventListener("change", function () {
  validlastName(this);
});

function validlastName(inputLastName) {
  let testLastName = regexFirstAndLastName.test(inputLastName.value);
  if (testLastName == true) {
    nomErreur.innerHTML = "";
    document.getElementById("lastName").style.backgroundColor = "LightGreen";
  } else {
    nomErreur.innerHTML = "Nom non valide";
    document.getElementById("lastName").style.backgroundColor = "LightCoral";
  }
}
