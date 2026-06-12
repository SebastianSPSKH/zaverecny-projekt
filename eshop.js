"use strict";
/// <reference path="products.ts" />
/// <reference path="data.ts" />
let productList = catalog.map(createProduct);
let productDataList = [...catalog];
let categoryFilter = "all";
function getFilteredProducts() {
    const result = [];
    for (let i = 0; i < productList.length; i++) {
        const product = productList[i];
        const data = productDataList[i];
        if (categoryFilter === "all" || product.getCategory() === categoryFilter) {
            result.push({ product, data });
        }
    }
    return result;
}
function formatPrice(price) {
    return price.toLocaleString("cs-CZ") + " Kč";
}
function getExtraInfo(data) {
    if (data.category === "Notebook") {
        return "RAM: " + data.ram + " GB";
    }
    return "5G: " + (data.has5G ? "Ano" : "Ne");
}
function renderProducts() {
    const filtered = getFilteredProducts();
    const tableBody = document.getElementById("product-table-body");
    const cardsContainer = document.getElementById("product-cards");
    const countElement = document.getElementById("product-count");
    let tableHtml = "";
    let cardsHtml = "";
    let totalPrice = 0;
    filtered.forEach((item) => {
        const product = item.product;
        const data = item.data;
        const finalPrice = product.calculatePrice();
        totalPrice += finalPrice;
        tableHtml += "<tr>";
        tableHtml += "<td>" + product.getCategory() + "</td>";
        tableHtml += "<td>" + product.getName() + "</td>";
        tableHtml += "<td>" + formatPrice(product.getBasePrice()) + "</td>";
        tableHtml += "<td>" + getExtraInfo(data) + "</td>";
        tableHtml += "<td>" + formatPrice(finalPrice) + "</td>";
        tableHtml += "</tr>";
        cardsHtml += '<div class="product-card">';
        cardsHtml += "<h3>" + product.getName() + "</h3>";
        cardsHtml += "<p><strong>Kategorie:</strong> " + product.getCategory() + "</p>";
        cardsHtml += "<p><strong>Základní cena:</strong> " + formatPrice(product.getBasePrice()) + "</p>";
        cardsHtml += "<p><strong>Parametr:</strong> " + getExtraInfo(data) + "</p>";
        cardsHtml += '<p class="final-price">Konečná cena: ' + formatPrice(finalPrice) + "</p>";
        cardsHtml += "</div>";
    });
    tableBody.innerHTML = tableHtml;
    cardsContainer.innerHTML = cardsHtml;
    if (filtered.length === 0) {
        countElement.textContent = "Žádné produkty k zobrazení.";
    }
    else {
        const averagePrice = Math.round(totalPrice / filtered.length);
        countElement.textContent =
            "Počet produktů: " + filtered.length +
                " | Celková cena: " + formatPrice(totalPrice) +
                " | Průměrná cena: " + formatPrice(averagePrice);
    }
}
function showError(message) {
    const errorElement = document.getElementById("error-message");
    errorElement.textContent = message;
}
function clearError() {
    showError("");
}
function toggleFormFields() {
    const category = document.getElementById("category").value;
    const ramField = document.getElementById("ram-field");
    const has5GField = document.getElementById("has5G-field");
    if (category === "Notebook") {
        ramField.classList.remove("hidden");
        has5GField.classList.add("hidden");
    }
    else {
        ramField.classList.add("hidden");
        has5GField.classList.remove("hidden");
    }
}
function handleFormSubmit(event) {
    event.preventDefault();
    clearError();
    const category = document.getElementById("category").value;
    const name = document.getElementById("name").value;
    const basePrice = Number(document.getElementById("basePrice").value);
    const data = {
        category: category,
        name: name,
        basePrice: basePrice,
    };
    if (category === "Notebook") {
        data.ram = Number(document.getElementById("ram").value);
    }
    else {
        data.has5G = document.getElementById("has5G").checked;
    }
    try {
        const product = createProduct(data);
        productList.push(product);
        productDataList.push(data);
        renderProducts();
        document.getElementById("product-form").reset();
        toggleFormFields();
    }
    catch (error) {
        if (error instanceof Error) {
            showError(error.message);
        }
        else {
            showError("Neznámá chyba při vytváření produktu.");
        }
    }
}
function handleFilterChange() {
    const filterValue = document.getElementById("filter").value;
    if (filterValue === "Notebook" || filterValue === "Phone") {
        categoryFilter = filterValue;
    }
    else {
        categoryFilter = "all";
    }
    renderProducts();
}
function init() {
    document.getElementById("product-form").addEventListener("submit", handleFormSubmit);
    document.getElementById("category").addEventListener("change", toggleFormFields);
    document.getElementById("filter").addEventListener("change", handleFilterChange);
    toggleFormFields();
    renderProducts();
}
init();
