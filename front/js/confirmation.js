let url = new URL(window.location.href);
let orderId = document.getElementById("orderId");
orderId.innerHTML = url.searchParams.get("commandOrder");
