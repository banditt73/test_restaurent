// =========================
// FIREBASE IMPORTS
// =========================

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
// GLOBAL WHATSAPP FUNCTION
// =========================

window.openWhatsApp = function(item = "") {

    const phone = "923453896060";

    const message = item
        ? `Hello Khan Pizza Hut! I would like to order ${item}.`
        : "Hello Khan Pizza Hut! I would like to place an order.";

    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
};

// =========================
// LOAD MENU
// =========================

async function loadMenu() {

    const container = document.getElementById("menu-container");

    if (!container) return;

    container.innerHTML = "<p>Loading menu...</p>";

    try {

        const snapshot = await getDocs(collection(db, "menu"));

        container.innerHTML = "";

        snapshot.forEach((doc) => {

            const item = doc.data();

            const price = Number(item.Price) || 0;
            const discount = Number(item.Discount) || 0;

            const finalPrice =
                discount > 0
                    ? Math.round(price * (1 - discount / 100))
                    : price;

            container.innerHTML += `
<div class="food-card" data-category="${item.Category}">

<img src="${item.Image}" alt="${item.Name}">

<div class="food-content">

<div class="food-top">
<h3>${item.Name}</h3>
<span>⭐ ${item.Rating || "5.0"}</span>
</div>

<p>${item.Description}</p>

<div class="food-bottom">

<h4>

${discount > 0
? `<del>Rs ${price}</del> Rs ${finalPrice}`
: `Rs ${price}`}

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

    } catch (error) {

        console.error(error);

        container.innerHTML =
            "<p>Unable to load menu.</p>";

    }

}// =========================
// CATEGORY FILTERS
// =========================

function setupFilters() {

    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter = button.dataset.filter.toLowerCase();

            document.querySelectorAll(".food-card").forEach(card => {

                const category =
                    (card.dataset.category || "").toLowerCase();

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

const facebookPage =
    "https://facebook.com/61583483672693";

const tiktokPage =
    "https://tiktok.com/@khanpizzahut6060";

document.getElementById("facebookBtn")?.href = facebookPage;
document.getElementById("facebookFooter")?.href = facebookPage;

document.getElementById("tiktokBtn")?.href = tiktokPage;
document.getElementById("tiktokFooter")?.href = tiktokPage;

// =========================
// NAVBAR SCROLL EFFECT
// =========================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    navbar.classList.toggle(
        "nav-scrolled",
        window.scrollY > 50
    );

});

// =========================
// MOBILE MENU
// =========================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle?.addEventListener("click", () => {

    navMenu?.classList.toggle("active");

});

// Close menu after clicking a link

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu?.classList.remove("active");

    });

});// =========================
// START APPLICATION
// =========================

document.addEventListener("DOMContentLoaded", () => {

    loadMenu();

});

// =========================
// OPTIONAL IMAGE FALLBACK
// =========================

document.addEventListener("error", function (e) {

    if (e.target.tagName === "IMG") {

        e.target.src =
            "https://placehold.co/600x400/111111/F77F00?text=Khan+Pizza+Hut";

    }

}, true);

// =========================
// DEBUG
// =========================

console.log("✅ Khan Pizza Hut loaded successfully.");
