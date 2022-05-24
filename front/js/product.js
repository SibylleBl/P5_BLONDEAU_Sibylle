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
  })

  //affiche la liste des produits dans la console
  .catch(function (erreur) {
    console.log(erreur);
  }); //message d'erreur
