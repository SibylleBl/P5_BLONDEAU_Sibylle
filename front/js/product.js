const pagearticle = new URL(window.location.href);
let id_article = new URL(window.location.href).searchParams.get("id");
let url = new URL("http://localhost:3000/api/products.html?id=" + id_article);

function getItemsFromLocalStorage() {
  let produitPanier = JSON.parse(localStorage.getItem("produit")); // m'affiche le contenu du panier
  if (produitPanier == null) {
    // si mon produit tableau est null, définir produitPanier en tableau
    produitPanier = []; //création du tableau
  }
  return produitPanier;
}
let monTableauProduits = getItemsFromLocalStorage();

function setItemsToLocalStorage(produits) {
  let envoiProduit = localStorage.setItem("produit", JSON.stringify(produits));
  return envoiProduit;
}

fetch(`http://localhost:3000/api/products/${id_article}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const canape = data;

    const canapePicture = document.getElementsByClassName("item__img");
    canapePicture[0].innerHTML = `<img src="${canape.imageUrl}" alt="${canape.altTxt}"></img>`;
    localStorage.setItem("imageUrl", canape.imageUrl);

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
  selectQuant = document.getElementById("quantity").value;
  return selectQuant;
}

function nameProduct() {
  selectName = document.getElementById("title").textContent;
  return selectName;
}

function priceProduct() {
  selectPrice = document.getElementById("price").textContent;
  return selectPrice;
}

// function pictureProduct() {
//   let localImgUrl = localStorage.getItem("imageUrl");
//   let linkImage = document.getElementsByClassName("item_img");

//   return linkImage;
// }

addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", clickAjoutPanier);

// je regroupe les différents choix du client au même endroit:
function clickAjoutPanier() {
  const productToAdd = {
    id: id_article,
    couleur: choixCouleur(),
    quantite: choixQuantite(),
    nom: nameProduct(),
    prix: priceProduct(),
    // image: pictureProduct(),
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
    monTableauProduits = monTableauProduits.map(function (produit) {
      if (
        produit.id === productToAdd.id &&
        produit.couleur === productToAdd.couleur
      ) {
        return {
          id: produit.id,
          couleur: produit.couleur,
          nom: produit.nom,
          prix: produit.prix,
          quantite:
            parseInt(productToAdd.quantite, 10) +
            parseInt(produit.quantite, 10),
        };
      }
      return produit;
    });
  } else {
    monTableauProduits.push(productToAdd);
  }
  setItemsToLocalStorage(monTableauProduits);
}
