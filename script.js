// =========================
// VARIABLES
// =========================

const whatsappNumber = "923453896060";
const facebookPage = "https://facebook.com/61583483672693";
const tiktokPage = "https://tiktok.com/@khanpizzahut6060";

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
// SOCIAL LINKS
// =========================

const facebookBtn = document.getElementById("facebookBtn");
const facebookFooter = document.getElementById("facebookFooter");
const tiktokBtn = document.getElementById("tiktokBtn");
const tiktokFooter = document.getElementById("tiktokFooter");

if (facebookBtn) {
  facebookBtn.href = facebookPage;
}

if (facebookFooter) {
  facebookFooter.href = facebookPage;
}

if (tiktokBtn) {
  tiktokBtn.href = tiktokPage;
}

if (tiktokFooter) {
  tiktokFooter.href = tiktokPage;
}

// =========================
// NAVBAR SCROLL EFFECT
// =========================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {
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

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

  });

}
// =========================
// MENU FILTER
// =========================

const categoryButtons =
  document.querySelectorAll(".category-btn");

const foodCards =
  document.querySelectorAll(".food-card");

categoryButtons.forEach(button => {

  button.addEventListener("click", () => {

    categoryButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    const filter =
      button.dataset.filter;

    foodCards.forEach(card => {

      if (
        filter === "all" ||
        card.dataset.category === filter
      ) {

        card.style.display = "block";

      } else {

        card.style.display = "none";

      }

    });

  });

});
