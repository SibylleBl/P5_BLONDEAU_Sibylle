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

// -------------------------- Définition des RegExp

const regexCityAndAddress = new RegExp(/^[a-zA-Z0-9- ]/);
const regexFirstAndLastName = new RegExp(/^[a-zA-Z-]/);
const regexEmail = new RegExp(
  /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/
);

// -------------------------- ville
const ville = document.getElementById("city");
const villeErreur = document.getElementById("cityErrorMsg");

form.city.addEventListener("change", function () {
  validRegex(this, regexCityAndAddress, ville, villeErreur);
});

// -------------------------- Adresse

const adresse = document.getElementById("address");
const adresseErreur = document.getElementById("addressErrorMsg");

form.address.addEventListener("change", function () {
  validRegex(this, regexCityAndAddress, adresse, adresseErreur);
});

// -------------------------- Prénom

const prenom = document.getElementById("firstName");
const prenomErreur = document.getElementById("firstNameErrorMsg");

form.firstName.addEventListener("change", function () {
  validRegex(this, regexFirstAndLastName, prenom, prenomErreur);
});

// -------------------------- Nom

const nom = document.getElementById("lastName");
const nomErreur = document.getElementById("lastNameErrorMsg");

form.lastName.addEventListener("change", function () {
  validRegex(this, regexFirstAndLastName, nom, nomErreur);
});

// -------------------------- Email

const mail = document.getElementById("email");
const mailErreur = document.getElementById("emailErrorMsg");

form.email.addEventListener("change", function () {
  validRegex(this, regexEmail, mail, mailErreur);
});

function validRegex(input, regex, element_html, element_error) {
  let test = regex.test(input.value);
  if (test == true) {
    element_error.innerHTML = "";
    element_html.style.backgroundColor = "LightGreen";
  } else {
    element_error.innerHTML = "champs non valide";
    element_html.style.backgroundColor = "LightCoral";
  }
}

// ------------------------ envoyer le panier et les informations clients
// création d'un event au clic du bouton commander

function sendCommand() {
  const commandButton = document.getElementById("order");

  commandButton.addEventListener("click", function (e) {
    e.preventDefault();
    //   création d'un tableau qui stocke les ids des produits sélectionnés par le client
    let arrayId = productInLocal.map((produits) => produits.id);
    //  création d'une variable qui regroupe les informations personnelles du client ainsi que le tableau ci-dessus
    const infoCommande = {
      contact: {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: mail.value,
      },
      products: arrayId,
    };

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoCommande),
    };

    fetch("http://localhost:3000/api/products/order", request)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        document.location.href = `confirmation.html?commandOrder=${data.orderId}`;
      });
  });
}

sendCommand();
