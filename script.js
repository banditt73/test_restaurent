# script.js

```javascript id="script-js-01"
// =========================
// VARIABLES
// =========================

const whatsappNumber = "923499114880";
const facebookPage = "https://facebook.com/yourpage";
const tiktokPage = "https://tiktok.com/@yourpage";

// =========================
// WHATSAPP FUNCTION
// =========================

function openWhatsApp(item = "") {

  const message = item
    ? `Hello Khan Pizza Hut, I want to order ${item}.`
    : "Hello Khan Pizza Hut, I want to place an order.";

  const url =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

}

// =========================
// FACEBOOK LINKS
// =========================

document.getElementById("facebookBtn").href = facebookPage;
document.getElementById("facebookFooter").href = facebookPage;

document.getElementById("tiktokFooter").href = tiktokPage;
document.getElementById("tiktokBtn").href = tiktokPage;

// =========================
// NAVBAR SCROLL EFFECT
// =========================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

  if(window.scrollY > 50){
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
  }

});

// =========================
// MOBILE MENU
// =========================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
```
