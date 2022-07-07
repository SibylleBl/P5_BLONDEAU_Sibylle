//----- Affichage du numéro de commande ainsi que d'un message de confirmation au client:

let url = new URL(window.location.href);
let orderId = document.getElementById("orderId");
orderId.innerHTML = url.searchParams.get("commandOrder");
