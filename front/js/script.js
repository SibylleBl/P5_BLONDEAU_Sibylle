fetch("http://localhost:3000/api/products/")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    addProducts(data);
    console.log(data);
  }) //affiche la liste des produits dans la console
  .catch(function (erreur) {
    console.log(erreur);
  }); //message d'erreur

// Modèle pour les canapés:
function addProducts(tableau) {
  const items = document.getElementById("items");
  tableau.forEach((canape) => {
    const htmlItems = `<a href="./product.html?id=${canape._id}">
    <article>
    <img src="${canape.imageUrl}" alt="${canape.altTxt}">
    <h3 class="productName">${canape.name}</h3>
    <p class="productDescription">${canape.description}</p>
    </article>
    </a>`;

    items.innerHTML += htmlItems;
  });
}
