function orderNumber() {
  let orderId = document.getElementById("orderId");
  orderId.innerHTML = localStorage.getItem("orderId");
}
orderNumber();
