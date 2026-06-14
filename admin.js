import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs,
setDoc,
doc,
deleteDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "khan-pizza-hut",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let editingId = null;

window.saveItem = async function(){

const name =
document.getElementById("name").value;

const price =
Number(document.getElementById("price").value);

const image =
document.getElementById("image").value;

const category =
document.getElementById("category").value;

const description =
document.getElementById("description").value;

const discount =
Number(document.getElementById("discount").value);

const stock =
document.getElementById("stock").checked;

const id =
editingId || name.replace(/\s+/g,'');

await setDoc(doc(db,"menu",id),{

Name:name,
Price:price,
Image:image,
Category:category,
Description:description,
Discount:discount,
InStock:stock

});

editingId = null;

loadItems();
};

async function loadItems(){

const container =
document.getElementById("items");

container.innerHTML="";

const snap =
await getDocs(collection(db,"menu"));

snap.forEach(docSnap=>{

const data = docSnap.data();

const div =
document.createElement("div");

div.className="item";

div.innerHTML=`

<div>
<b>${data.Name}</b><br>
Rs ${data.Price}
</div>

<div class="actions">

<button onclick="editItem('${docSnap.id}')">
Edit
</button>

<button onclick="removeItem('${docSnap.id}')">
Delete
</button>

</div>

`;

container.appendChild(div);

});

}

window.removeItem = async function(id){

if(!confirm("Delete item?")) return;

await deleteDoc(doc(db,"menu",id));

loadItems();

}

window.editItem = async function(id){

const snap =
await getDocs(collection(db,"menu"));

snap.forEach(docSnap=>{

if(docSnap.id===id){

const data =
docSnap.data();

document.getElementById("name").value =
data.Name || "";

document.getElementById("price").value =
data.Price || "";

document.getElementById("image").value =
data.Image || "";

document.getElementById("category").value =
data.Category || "";

document.getElementById("description").value =
data.Description || "";

document.getElementById("discount").value =
data.Discount || 0;

document.getElementById("stock").checked =
data.InStock;

editingId=id;

}

});

}

loadItems();
