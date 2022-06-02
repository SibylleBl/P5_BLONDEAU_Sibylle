pagearticle = new URL(window.location.href);
id_article = new URL(window.location.href).searchParams.get("id");
let url = new URL("http://localhost:3000/api/products.html?id=" + id_article);

function getItemsFromLocalStorage() {
  let produitTableau = localStorage.getItem("produit"); // m'affiche le contenu du panier
  console.log(produitTableau);
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
    clickButton = document.getElementById("addToCart");
    // console.log("🚀 ~ file: product.js ~ line 54 ~ clickButton", clickButton);

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

    // je regroupe les différents choix du client au même endroit:
    function clickChoixDuClient() {
      const choixDuClient = {
        id: id_article, //ref du produit
        couleur: choixCouleur(), // couleur choisie
        quantite: choixQuantite(), // quantité choisie
      };
      // console.log(choixDuClient);
    }

    function setItemsToLocalStorage() {
      const monObjetQueJeConvertisEnString = JSON.stringify(clickChoixDuClient);
      console.log(monObjetQueJeConvertisEnString);
      let envoiProduit = localStorage.setItem("produit", clickChoixDuClient);
      console.log(envoiProduit);
    }

    clickButton.addEventListener("click", clickChoixDuClient);

    //j'appelle la fonction pour afficher le contenu du panier
    getItemsFromLocalStorage();

    // j'appelle la fonction pour envoyer un article dans le panier
    setItemsToLocalStorage();
  });
