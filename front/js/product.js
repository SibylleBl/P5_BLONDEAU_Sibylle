const pagearticle = new URL(window.location.href);
let id_article = new URL(window.location.href).searchParams.get("id");
let url = new URL("http://localhost:3000/api/products.html?id=" + id_article);

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
let canape;

fetch(`http://localhost:3000/api/products/${id_article}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    canape = data;

    const canapePicture = document.getElementsByClassName("item__img");
    canapePicture[0].innerHTML = `<img src="${canape.imageUrl}" alt="${canape.altTxt}"></img>`;

    const canapeName = document.getElementById("title");
    canapeName.innerHTML = canape.name;

    const canapePrice = document.getElementById("price");
    canapePrice.innerHTML = canape.price;

    const canapeDescription = document.getElementById("description");
    canapeDescription.innerHTML = canape.description;

    const selectColors = document.getElementById("colors");
    let optionsdecouleurs = "";

    canape.colors.forEach((color) => {
      optionsdecouleurs += `<option value="${color}">${color}</option>`;
    });

    selectColors.innerHTML += optionsdecouleurs;
  });

//Récuperer la valeur choisie dans le sélecteur des couleurs:
function choixCouleur() {
  selectColor = document.getElementById("colors").value;
  return selectColor;
}

//Récuperer la quantité choisie dans l'input du nombre d'article:
function choixQuantite() {
  selectQuant = parseInt(document.getElementById("quantity").value, 10);
  return selectQuant;
}

addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", clickAjoutPanier);

// je regroupe les différents choix du client au même endroit:
function clickAjoutPanier() {
  const productToAdd = {
    id: id_article,
    couleur: choixCouleur(),
    quantite: choixQuantite(),
    nom: canape.name,
    prix: parseInt(canape.price, 10),
    image: canape.imageUrl,
  };

  //fonction qui me dit si un canapé existe déjà dans mon panier:
  function checkProductInCart(productToAdd) {
    let local = getItemsFromLocalStorage(monTableauProduits);

    for (let i = 0; i < local.length; i++) {
      if (
        local[i].id === productToAdd.id &&
        local[i].couleur === productToAdd.couleur
      ) {
        return true;
      }
    }
    return false;
  }

  const isProductInCart = checkProductInCart(productToAdd);

  if (isProductInCart) {
    monTableauProduits = monTableauProduits.map(function (produits) {
      if (
        produits.id === productToAdd.id &&
        produits.couleur === productToAdd.couleur
      ) {
        return {
          ...produits,
          quantite:
            parseInt(productToAdd.quantite, 10) +
            parseInt(produits.quantite, 10),
        };
      }
      return produits;
    });
  } else {
    monTableauProduits.push(productToAdd);
  }
  setItemsToLocalStorage(monTableauProduits);
}
