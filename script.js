/* Portfolio Contact Form*/
document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.checkValidity()) {
        alert("Message sent!");
        form.reset();
      } else {
        emailInput.focus();
      }
    });
  }
});

/*To-Do App */
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let list = document.getElementById("taskList");
  if (list) {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
      let li = document.createElement("li");
      li.textContent = task;
      let btn = document.createElement("button");
      btn.textContent = "Delete";
      btn.onclick = () => deleteTask(index);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }
}

function addTask() {
  let input = document.getElementById("taskInput");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (input.value.trim() !== "") {
    tasks.push(input.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    loadTasks();
  }
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

if (document.getElementById("taskList")) {
  loadTasks();
}

/*Product Page*/
let products = [
  { name: "Smartphone", category: "electronics", price: 12000, rating: 4.5 },
  { name: "Laptop", category: "electronics", price: 45000, rating: 4.8 },
  { name: "T-Shirt", category: "clothing", price: 500, rating: 4.0 },
  { name: "Jeans", category: "clothing", price: 1500, rating: 4.3 }
];

function displayProducts(prodArray) {
  let container = document.getElementById("productContainer");
  if (container) {
    container.innerHTML = "";
    prodArray.forEach(p => {
      let card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p>Price: ₹${p.price}</p>
        <p>Rating: ${p.rating}</p>
      `;
      container.appendChild(card);
    });
  }
}

function filterProducts() {
  let category = document.getElementById("categoryFilter").value;
  let filtered = category === "all" ? products : products.filter(p => p.category === category);
  displayProducts(filtered);
}

function sortProducts() {
  let option = document.getElementById("sortOption").value;
  let sorted = [...products];
  if (option === "priceLowHigh") sorted.sort((a, b) => a.price - b.price);
  else if (option === "priceHighLow") sorted.sort((a, b) => b.price - a.price);
  else if (option === "ratingHighLow") sorted.sort((a, b) => b.rating - a.rating);
  displayProducts(sorted);
}

if (document.getElementById("productContainer")) {
  displayProducts(products);
}
