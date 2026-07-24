import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========================
// DOM ELEMENTS
// =========================

const menuList = document.getElementById("menuList");

const totalItems = document.getElementById("totalItems");
const featuredItems = document.getElementById("featuredItems");
const stockItems = document.getElementById("stockItems");
const categories = document.getElementById("categories");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const editor = document.getElementById("editor");
const editorTitle = document.getElementById("editorTitle");

const itemName = document.getElementById("itemName");
const itemPrice = document.getElementById("itemPrice");
const itemImage = document.getElementById("itemImage");
const previewImage = document.getElementById("previewImage");
const itemDescription = document.getElementById("itemDescription");
const itemCategory = document.getElementById("itemCategory");
const itemDiscount = document.getElementById("itemDiscount");
const itemStock = document.getElementById("itemStock");
const itemFeatured = document.getElementById("itemFeatured");
const itemVisible = document.getElementById("itemVisible");

let menu = [];
let editingId = null;

// =========================
// LOAD MENU
// =========================

async function loadMenu() {

    menu = [];

    const snapshot = await getDocs(collection(db, "menu"));

    snapshot.forEach(document => {

        menu.push({
            id: document.id,
            ...document.data()
        });

    });

    renderMenu(menu);
    updateStats();

}

// =========================
// UPDATE DASHBOARD
// =========================

function updateStats() {

    totalItems.textContent = menu.length;

    featuredItems.textContent =
        menu.filter(item => item.Featured).length;

    stockItems.textContent =
        menu.filter(item => item.InStock).length;

    categories.textContent =
        new Set(menu.map(item => item.Category)).size;

}

// =========================
// RENDER MENU
// =========================

function renderMenu(list) {

    menuList.innerHTML = "";

    list.forEach(item => {

        const finalPrice =
            item.Discount > 0
            ? Math.round(item.Price * (1 - item.Discount / 100))
            : item.Price;

        menuList.innerHTML += `

<div class="menu-card">

<img src="${item.Image}" alt="${item.Name}">

<div class="menu-info">

<h3>${item.Name}</h3>

<p>${item.Description}</p>

<strong>

${item.Discount > 0
?
`<del>Rs ${item.Price}</del> Rs ${finalPrice}`
:
`Rs ${item.Price}`}

</strong>

<div class="tags">

<span>${item.Category}</span>

${item.InStock
? "<span class='green'>In Stock</span>"
: "<span class='red'>Out of Stock</span>"}

${item.Featured
? "<span class='orange'>Featured</span>"
: ""}

</div>

<div class="actions">

<button class="edit-btn"
data-id="${item.id}">

Edit

</button>

<button class="delete-btn"
data-id="${item.id}">

Delete

</button>

</div>

</div>

</div>

`;

    });

}

// =========================
// SEARCH
// =========================

searchInput.addEventListener("input", () => {

    const text = searchInput.value.toLowerCase();

    const filtered = menu.filter(item =>
        item.Name.toLowerCase().includes(text)
    );

    renderMenu(filtered);

});

// =========================
// CATEGORY FILTER
// =========================

categoryFilter.addEventListener("change", () => {

    const category = categoryFilter.value;

    if (category === "all") {

        renderMenu(menu);

    } else {

        renderMenu(
            menu.filter(item => item.Category === category)
        );

    }

});

// =========================
// IMAGE PREVIEW
// =========================

itemImage.addEventListener("input", () => {

    previewImage.src = itemImage.value;

});

// =========================
// CLEAR FORM
// =========================

function clearForm() {

    editingId = null;

    itemName.value = "";
    itemPrice.value = "";
    itemImage.value = "";
    itemDescription.value = "";
    itemCategory.value = "Burger";
    itemDiscount.value = 0;

    itemStock.checked = true;
    itemFeatured.checked = false;
    itemVisible.checked = true;

    previewImage.src = "";

}

// =========================
// OPEN ADD ITEM
// =========================

document.getElementById("addItemBtn")
.addEventListener("click", () => {

    clearForm();

    editorTitle.textContent = "Add Menu Item";

    editor.classList.remove("hidden");

});

// =========================
// CANCEL
// =========================

document.getElementById("cancelBtn")
.addEventListener("click", () => {

    editor.classList.add("hidden");

});

// =========================
// EDIT BUTTON
// =========================

menuList.addEventListener("click", e => {

    if (!e.target.classList.contains("edit-btn")) return;

    editingId = e.target.dataset.id;

    const item = menu.find(i => i.id === editingId);

    if (!item) return;

    editorTitle.textContent = "Edit Menu Item";

    itemName.value = item.Name;
    itemPrice.value = item.Price;
    itemImage.value = item.Image;
    itemDescription.value = item.Description;
    itemCategory.value = item.Category;
    itemDiscount.value = item.Discount;

    itemStock.checked = item.InStock;
    itemFeatured.checked = item.Featured;
    itemVisible.checked = item.Visible;

    previewImage.src = item.Image;

    editor.classList.remove("hidden");

});

// =========================
// SAVE
// =========================

document.getElementById("saveBtn").addEventListener("click", async () => {

    const data = {

        Name: itemName.value.trim(),
        Price: Number(itemPrice.value),
        Image: itemImage.value.trim(),
        Description: itemDescription.value.trim(),
        Category: itemCategory.value,
        Discount: Number(itemDiscount.value) || 0,
        InStock: itemStock.checked,
        Featured: itemFeatured.checked,
        Visible: itemVisible.checked,
        Rating: 5

    };

    if (
        !data.Name ||
        !data.Image ||
        !data.Description
    ) {
        alert("Please fill all required fields.");
        return;
    }

    try {

        if (editingId) {

            await updateDoc(
                doc(db, "menu", editingId),
                data
            );

        } else {

            await addDoc(
                collection(db, "menu"),
                data
            );

        }

        editor.classList.add("hidden");

        clearForm();

        await loadMenu();

    } catch (err) {

        console.error(err);

        alert("Failed to save item.");

    }

});

// =========================
// DELETE
// =========================

menuList.addEventListener("click", async e => {

    if (!e.target.classList.contains("delete-btn")) return;

    const id = e.target.dataset.id;

    if (!confirm("Delete this menu item?")) return;

    try {

        await deleteDoc(
            doc(db, "menu", id)
        );

        await loadMenu();

    } catch (err) {

        console.error(err);

        alert("Failed to delete item.");

    }

});

// =========================
// INITIAL LOAD
// =========================

loadMenu();
