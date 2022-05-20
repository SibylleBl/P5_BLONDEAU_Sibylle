// const products= []
fetch("http://localhost:3000/api/products/")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    // products=data
    addProducts(data);
  }) //affiche la liste des produits dans la console
  .catch(function (erreur) {
    console.log(erreur);
  }); //message d'erreur

// Modèle pour les canapés:
function addProducts(tableau) {
  const laoujinjectemonhtml = document.getElementById("items");
  tableau.forEach((canape) => {
    console.log(laoujinjectemonhtml);
    const moncanapehtml = `<a href="./product.html?id=42">
    <article>
    <img src="${canape.imageUrl}" alt="${canape.altTxt}">
    <h3 class="productName">${canape.name}</h3>
    <p class="productDescription">${canape.description}</p>
    </article>
    </a>`;

    laoujinjectemonhtml.innerHTML += moncanapehtml;
  });
}
