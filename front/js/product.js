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

    // const canapePicture = document.getElementsByClassName("item__img");
    // console.log(
    //   "🚀 ~ file: product.js ~ line 17 ~ canapePicture",
    //   canapePicture
    // );
    // canapePicture.innerHTML = canape.imageUrl;
    // console.log("🚀 ~ file: product.js ~ line 22 ~ imageUrl", imageUrl);
    // L'image ne s'affiche pas (ReferenceError: imageUrl is not defined at product.js:22:63)

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

    clickButton.addEventListener("click", choixCouleur);
    clickButton.addEventListener("click", choixQuantite);

    // function nouvelEvent() {
    //   console.log("coucou");
    // }

    //Récuperer la valeur choisie dans le sélecteur des couleurs:
    function choixCouleur(colors) {
      selectColor = document.getElementById("colors");
      value = selectColor.options[selectColor.selectedIndex].value;
      console.log(value);
    }

    function choixQuantite(quantity) {
      selectQuant = document.getElementById("quantity").value;
      console.log(selectQuant);
    }
  });

//   //affiche la liste des produits dans la console
//   .catch(function (erreur) {
//     console.log(erreur);
//   }); //message d'erreur

// // ajout d'un event lorque je clique sur le bouton "ajouter au panier" :
// clickButton = document.getElementById("addToCart");
// console.log("🚀 ~ file: product.js ~ line 54 ~ clickButton", clickButton);

// clickButton.addEventListener("click", choix);

// // function nouvelEvent() {
// //   console.log("coucou");
// // }

// //Récuperer la valeur choisie dans le sélecteur des couleurs:
// function choix(colors) {
//   selectElement = document.getElementById(colors);

//   console.log(colors);
// }
// selectElement = document.getElementById(colors);
// selectElement.addEventListener("click", choix);

// target.addEventListener(type, listener [, options]);

// ClickButton = new EventTarget(document.getElementById("addToCart")); //que mettre dedans?
// console.log("🚀 ~ file: product.js ~ line 56 ~ ClickButton", ClickButton);
// // ClickButton.addEventListener();

// const EventTarget = function () {
//   this.listeners = {};
// };

// EventTarget.prototype.listeners = null;
// EventTarget.prototype.addEventListener = function (type, callback) {
//   if (!(type in this.listeners)) {
//     this.listeners[type] = [];
//   }
//   this.listeners[type].push(callback);
// };
