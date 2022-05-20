let url = new URL("http://localhost:3000/api/products/:id");
let params = new URLSearchParams(url.search);
// params.append("id", 1);
let id = params.get("id");
console.log(id);

// fetch("http://localhost:3000/api/products/");
// const url = "http://localhost:3000/api/products";
// const urlsearchParams = url.searchParams;
