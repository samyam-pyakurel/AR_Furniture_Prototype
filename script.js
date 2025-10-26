// Navigation buttons
const homeBtn = document.getElementById("homeBtn");
const catalogBtn = document.getElementById("catalogBtn");
const cartBtn = document.getElementById("cartBtn");
const exploreBtn = document.getElementById("exploreBtn");

const homeSection = document.getElementById("hero");
const catalogSection = document.getElementById("catalog");
const cartSection = document.getElementById("cart");

const cartList = document.getElementById("cartList");
let cartItems = [];

// Navigation functionality
function showSection(section) {
  [homeSection, catalogSection, cartSection].forEach(sec => sec.classList.add("hidden"));
  section.classList.remove("hidden");
}

homeBtn.onclick = () => showSection(homeSection);
catalogBtn.onclick = () => showSection(catalogSection);
cartBtn.onclick = () => showSection(cartSection);
exploreBtn.onclick = () => showSection(catalogSection);

// Add to cart functionality
const addButtons = document.querySelectorAll(".addToCart");
addButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement.querySelector("h3").textContent;
    cartItems.push(item);
    updateCart();
  });
});

function updateCart() {
  cartList.innerHTML = "";
  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    cartList.appendChild(li);
  });
}
