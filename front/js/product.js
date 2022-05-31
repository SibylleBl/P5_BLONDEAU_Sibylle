pagearticle = new URL(window.location.href);
console.log(pagearticle);
id_article = new URL(window.location.href).searchParams.get("id");
console.log(id_article);
let url = new URL("http://localhost:3000/api/products.html?id=" + id_article);

// const products= []
fetch(`http://localhost:3000/api/products/${id_article}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    const canape = data;

    const canapePicture = document.getElementsByClassName("item__img");
    `<img src="${canape.imageUrl}" alt="Photographie d'un canapé"></img>`;
    canapePicture[0].innerHTML = `<img src="${canape.imageUrl}" alt="${canape.altTxt}"></img>`;

    //L'image ne s'affiche pas (ReferenceError: imageUrl is not defined at product.js:22:63)

    const laoujinjectemonhtml = document.getElementById("title");
    laoujinjectemonhtml.innerHTML = canape.name;

    const canapePrice = document.getElementById("price");
    canapePrice.innerHTML = canape.price;

    const canapeDescription = document.getElementById("description");
    canapeDescription.innerHTML = canape.description;

    const selectColors = document.getElementById("colors");
    let optionsdecouleurs = "";

    canape.colors.forEach((color) => {
      console.log(
        "🚀 ~ file: product.js ~ line 25 ~ canape.colors.forEach ~ color",
        color
      );
      optionsdecouleurs += `<option value="${color}">${color}</option>`;
    });

    selectColors.innerHTML += optionsdecouleurs;

    // ajout d'un event lorque je clique sur le bouton "ajouter au panier" :
    clickButton = document.getElementById("addToCart");
    console.log("🚀 ~ file: product.js ~ line 54 ~ clickButton", clickButton);

    // clickButton.addEventListener("click", choixCouleur);
    // clickButton.addEventListener("click", choixQuantite);

    //Récuperer la valeur choisie dans le sélecteur des couleurs:
    function choixCouleur() {
      selectColor = document.getElementById("colors");
      value = selectColor.value;
      console.log(value);
      return value;
    }

    //Récuperer la quantité choisie dans l'input du nombre d'article:
    function choixQuantite() {
      selectQuant = document.getElementById("quantity").value;
      console.log(selectQuant);
      return selectQuant;
    }
    function clickChoixDuClient() {
      const choixDuClient = {
        id: id_article,
        couleur: choixCouleur(),
        quantite: choixQuantite(),
      };
      console.log(choixDuClient);
    }
    clickButton.addEventListener("click", clickChoixDuClient);
  });
