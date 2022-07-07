const pagearticle = new URL(window.location.href);
let id_article = new URL(window.location.href).searchParams.get("id");
let url = new URL("http://localhost:3000/api/products.html?id=" + id_article);

// ----- Fonction qui me permet de récupérer les éléments dans le local Storage:
function getItemsFromLocalStorage() {
  let produitsPanier = JSON.parse(localStorage.getItem("produits"));
  if (produitsPanier == null) {
    produitsPanier = [];
  }
  return produitsPanier;
}
let monTableauProduits = getItemsFromLocalStorage();

// ----- Fonction qui me permet d'envoyer des éléments dans le local Storage:
function setItemsToLocalStorage(produits) {
  let envoiProduits = localStorage.setItem(
    "produits",
    JSON.stringify(produits)
  );
  return envoiProduits;
}
let canape;

// ----- Création dynamique des cartes de produits:
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

//----- Récuperer la valeur choisie dans le sélecteur des couleurs:
function choixCouleur() {
  selectColor = document.getElementById("colors").value;
  return selectColor;
}

//----- Récuperer la quantité choisie dans l'input du nombre d'article:
function choixQuantite() {
  selectQuant = document.getElementById("quantity").value;
  return parseInt(selectQuant, 10);
}

addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", clickAjoutPanier);

//----- Fonction dans laquelle je regroupe la description des produits en fonction des choix du client:
function clickAjoutPanier() {
  const productToAdd = {
    id: id_article,
    couleur: choixCouleur(),
    quantite: choixQuantite(),
    nom: canape.name,
    prix: canape.price,
    image: canape.imageUrl,
  };

  //----- Fonction qui va vérifier si un canapé existe déjà dans mon local Storage:
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

  //----- Si ce produit existe déjà, je modifie la quantité de ce produit:
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
    //----- Sinon, j'ajoute un nouveau produit dans le local Storage:
  } else {
    monTableauProduits.push(productToAdd);
  }
  setItemsToLocalStorage(monTableauProduits);
}
