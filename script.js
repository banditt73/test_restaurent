import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// =========================
// FIREBASE CONFIG
// =========================

const firebaseConfig = {
  apiKey: "AIzaSyD38MbdY3awMPg4jhr16yMbk96HOltaMS0",
  authDomain: "khan-pizza-hut.firebaseapp.com",
  projectId: "khan-pizza-hut",
  storageBucket: "khan-pizza-hut.firebasestorage.app",
  messagingSenderId: "365147610724",
  appId: "1:365147610724:web:eaff71796ccfa9e77a8971",
  measurementId: "G-26E0XRT5N6"
};

// =========================
// INITIALIZE FIREBASE
// =========================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========================
// WHATSAPP
// =========================

window.openWhatsApp = function(item = "") {

  const number = "923453896060";

  const text = item
    ? `Hello Khan Pizza Hut, I want to order ${item}.`
    : "Hello Khan Pizza Hut, I want to place an order.";

  window.open(
    `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
    "_blank"
  );

};

// =========================
// LOAD MENU
// =========================

async function loadMenu() {

  const container = document.getElementById("menu-container");

  if (!container) return;

  container.innerHTML = "";

  const snapshot = await getDocs(collection(db, "menu"));

  snapshot.forEach(doc => {

    const item = doc.data();

    const finalPrice =
      item.Discount > 0
        ? Math.round(item.Price * (1 - item.Discount / 100))
        : item.Price;

    container.innerHTML += `

<div class="food-card"
data-category="${item.Category.toLowerCase()}">

<img src="${item.Image}" alt="${item.Name}">

<div class="food-content">

<div class="food-top">

<h3>${item.Name}</h3>

<span>⭐ ${item.Rating}</span>

</div>

<p>${item.Description}</p>

<div class="food-bottom">

<h4>

${
item.Discount > 0
? `<del>Rs ${item.Price}</del> Rs ${finalPrice}`
: `Rs ${item.Price}`
}

</h4>

<button
${item.InStock ? "" : "disabled"}
onclick="openWhatsApp('${item.Name}')">

${item.InStock ? "Order Now" : "Out of Stock"}

</button>

</div>

</div>

</div>

`;

  });

  setupFilters();

}    container.innerHTML += `
    <div class="food-card" data-category="${(item.Category || "").toLowerCase()}">

      <img src="${item.Image}" alt="${item.Name}">

      <div class="food-content">

        <div class="food-top">
          <h3>${item.Name}</h3>
          <span>⭐ ${item.Rating || "5.0"}</span>
        </div>

        <p>${item.Description}</p>

        <div class="food-bottom">

          <h4>
            ${
              item.Discount > 0
                ? `<del>Rs ${item.Price}</del> Rs ${finalPrice}`
                : `Rs ${item.Price}`
            }
          </h4>

          <button
            ${item.InStock ? "" : "disabled"}
            onclick="openWhatsApp('${item.Name}')">

            ${item.InStock ? "Order" : "Out of Stock"}

          </button>

        </div>

      </div>

    </div>
    `;
  });

  setupFilters();

}

function setupFilters() {

  const buttons = document.querySelectorAll(".category-btn");
  const cards = document.querySelectorAll(".food-card");

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter.toLowerCase();

      cards.forEach(card => {

        const category = card.dataset.category.toLowerCase();

        if (filter === "all" || category === filter) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }

      });

    });

  });

}

// =========================
// SOCIAL LINKS
// =========================

const facebookPage = "https://facebook.com/61583483672693";
const tiktokPage = "https://tiktok.com/@khanpizzahut6060";

document.getElementById("facebookBtn")?.href = facebookPage;
document.getElementById("facebookFooter")?.href = facebookPage;
document.getElementById("tiktokBtn")?.href = tiktokPage;
document.getElementById("tiktokFooter")?.href = tiktokPage;

// =========================
// NAVBAR SCROLL
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

menuToggle?.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// =========================
// START APP
// =========================

loadMenu().catch(error => {
  console.error("Error loading menu:", error);
});
