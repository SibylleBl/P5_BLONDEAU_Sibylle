const pagearticle = new URL(window.location.href);
id_article = new URL(window.location.href).searchParams.get("id");
let url = new URL("http://localhost:3000/api/products.html?id=" + id_article);

function getItemsFromLocalStorage() {
  let produitPanier = JSON.parse(localStorage.getItem("produit")); // m'affiche le contenu du panier
  // console.log(produitPanier);

  if (produitPanier == null) {
    // si mon produit tableau est null, définir produitPanier en tableau
    produitPanier = []; //création du tableau
  }

  // produitPanier.forEach((produit) => console.log(produit));

  return produitPanier;
}
const monTableauProduits = getItemsFromLocalStorage();

function setItemsToLocalStorage(produits) {
  let envoiProduit = localStorage.setItem("produit", JSON.stringify(produits));
  // console.log(envoiProduit);

  return envoiProduit;
}

fetch(`http://localhost:3000/api/products/${id_article}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    const canape = data;

    const canapePicture = document.getElementsByClassName("item__img");
    `<img src="${canape.imageUrl}" alt="Photographie d'un canapé"></img>`;
    canapePicture[0].innerHTML = `<img src="${canape.imageUrl}" alt="${canape.altTxt}"></img>`;

    const laoujinjectemonhtml = document.getElementById("title");
    laoujinjectemonhtml.innerHTML = canape.name;

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

    // ajout d'un event lorque je clique sur le bouton "ajouter au panier" :
    // clickButton = document.getElementById("addToCart");
    // console.log("🚀 ~ file: product.js ~ line 54 ~ clickButton", clickButton);

    // let monTableauProduits = [];
    // console.log(
    //   "🚀 ~ file: product.js ~ line 90 ~ monTableauProduits",
    //   monTableauProduits
    // );
  });

//Récuperer la valeur choisie dans le sélecteur des couleurs:
function choixCouleur() {
  selectColor = document.getElementById("colors");
  value = selectColor.value;
  // console.log(value);
  return value;
}

//Récuperer la quantité choisie dans l'input du nombre d'article:
function choixQuantite() {
  selectQuant = document.getElementById("quantity").value;
  // console.log(selectQuant);
  return selectQuant;
}

clickButton = document.getElementById("addToCart");

clickButton.addEventListener("click", clickChoixDuClient);

// je regroupe les différents choix du client au même endroit:
function clickChoixDuClient() {
  const choixDuClient = {
    id: id_article, //ref du produit
    couleur: choixCouleur(), // couleur choisie
    quantite: choixQuantite(), // quantité choisie
  };
  gereAjoutPanier(choixDuClient);
}

function gereAjoutPanier(DesCanapes) {
  // est ce que ce canapé est déjà dans mon panier ?
  monTableauProduits = DesCanapes.filter(function (UnCanape) {
    if (UnCanape.id === id_article) return true;
    return false;
  });
  //pas encore dans mon panier
  monTableauProduits.push(canap);
  // console.log(monTableauProduits);

  //déjà dans mon panier
  monTableauProduits.map(function (produit) {
    if (produit.id === 2) {
      return {
        id: produit.id, //ref du produit
        couleur: produit.couleur, // couleur choisie
        quantite: produit.quantite * 2, // quantité choisie
      };
    }
    return produit;
  });

  setItemsToLocalStorage(monTableauProduits);
}
