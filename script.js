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

// INIT FIREBASE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========================
// WHATSAPP FUNCTION (GLOBAL FIX)
// =========================

window.openWhatsApp = function (item = "") {

  const whatsappNumber = "923453896060";

  const message = item
    ? `Hello Khan Pizza Hut, I want to order ${item}.`
    : "Hello Khan Pizza Hut, I want to place an order.";

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};

// =========================
// LOAD MENU FROM FIREBASE
// =========================

async function loadMenu() {

  const querySnapshot = await getDocs(collection(db, "menu"));

  const container = document.getElementById("menu-container");

  if (!container) return;

  container.innerHTML = "";

  querySnapshot.forEach((doc) => {

    const item = doc.data();

    container.innerHTML += `
      <div class="food-card" data-category="${item.category}">
        <img src="${item.image}" />
        <h3>${item.name}</h3>
        <p>Rs ${item.price}</p>
        <button onclick="openWhatsApp('${item.name}')">
          Order Now
        </button>
      </div>
    `;
  });

  setupFilters(); // IMPORTANT: run AFTER menu loads
}

// =========================
// MENU FILTER (FIXED)
// =========================

function setupFilters() {

  const categoryButtons = document.querySelectorAll(".category-btn");

  const foodCards = document.querySelectorAll(".food-card");

  categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

      categoryButtons.forEach(btn =>
        btn.classList.remove("active")
      );

      button.classList.add("active");

      const filter = button.dataset.filter;

      const cards = document.querySelectorAll(".food-card");

      cards.forEach(card => {

        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
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

document.getElementById("facebookBtn")?.setAttribute("href", facebookPage);
document.getElementById("facebookFooter")?.setAttribute("href", facebookPage);
document.getElementById("tiktokBtn")?.setAttribute("href", tiktokPage);
document.getElementById("tiktokFooter")?.setAttribute("href", tiktokPage);

// =========================
// NAVBAR SCROLL EFFECT
// =========================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (!navbar) return;

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
  navMenu?.classList.toggle("active");
});

// =========================
// START APP
// =========================

loadMenu();
