let url = new URL(window.location.href);
let orderId = document.getElementById("orderId");
orderId.textContent = url.searchParams.get("commandOrder");
