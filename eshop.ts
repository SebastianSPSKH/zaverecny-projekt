/// <reference path="products.ts" />
/// <reference path="data.ts" />

// Vytvoření seznamu objektů Product z dat v katalogu
let productList: Product[] = catalog.map(createProduct);

// Kopie původních dat produktů
let productDataList: ProductData[] = [...catalog];

// Aktuálně zvolený filtr kategorií
let categoryFilter: "all" | "Notebook" | "Phone" = "all";

// Vrátí pouze produkty odpovídající aktuálnímu filtru
function getFilteredProducts(): { product: Product; data: ProductData }[] {
    const result: { product: Product; data: ProductData }[] = [];

    // Projde všechny produkty
    for (let i = 0; i < productList.length; i++) {
        const product = productList[i];
        const data = productDataList[i];

        // Přidá produkt pokud odpovídá filtru
        if (categoryFilter === "all" || product.getCategory() === categoryFilter) {
            result.push({ product, data });
        }
    }

    return result;
}

// Převede číslo ceny na český formát
function formatPrice(price: number): string {
    return price.toLocaleString("cs-CZ") + " Kč";
}

// Vrátí doplňující informaci podle typu produktu
function getExtraInfo(data: ProductData): string {
    if (data.category === "Notebook") {
        return "RAM: " + data.ram + " GB";
    }
    return "5G: " + (data.has5G ? "Ano" : "Ne");
}

// Vykreslí tabulku a karty produktů
function renderProducts(): void {
    const filtered = getFilteredProducts();

    // Získání HTML prvků
    const tableBody = document.getElementById("product-table-body")!;
    const cardsContainer = document.getElementById("product-cards")!;
    const countElement = document.getElementById("product-count")!;

    let tableHtml = "";
    let cardsHtml = "";
    let totalPrice = 0;

    // Vytvoření obsahu tabulky a karet
    filtered.forEach((item) => {
        const product = item.product;
        const data = item.data;

        // Výpočet výsledné ceny
        const finalPrice = product.calculatePrice();
        totalPrice += finalPrice;

        // Přidání řádku do tabulky
        tableHtml += "<tr>";
        tableHtml += "<td>" + product.getCategory() + "</td>";
        tableHtml += "<td>" + product.getName() + "</td>";
        tableHtml += "<td>" + formatPrice(product.getBasePrice()) + "</td>";
        tableHtml += "<td>" + getExtraInfo(data) + "</td>";
        tableHtml += "<td>" + formatPrice(finalPrice) + "</td>";
        tableHtml += "</tr>";

        // Přidání karty produktu
        cardsHtml += '<div class="product-card">';
        cardsHtml += "<h3>" + product.getName() + "</h3>";
        cardsHtml += "<p><strong>Kategorie:</strong> " + product.getCategory() + "</p>";
        cardsHtml += "<p><strong>Základní cena:</strong> " + formatPrice(product.getBasePrice()) + "</p>";
        cardsHtml += "<p><strong>Parametr:</strong> " + getExtraInfo(data) + "</p>";
        cardsHtml += '<p class="final-price">Konečná cena: ' + formatPrice(finalPrice) + "</p>";
        cardsHtml += "</div>";
    });

    // Zobrazení vytvořeného HTML
    tableBody.innerHTML = tableHtml;
    cardsContainer.innerHTML = cardsHtml;

    // Výpis statistik
    if (filtered.length === 0) {
        countElement.textContent = "Žádné produkty k zobrazení.";
    } else {
        const averagePrice = Math.round(totalPrice / filtered.length);

        countElement.textContent =
            "Počet produktů: " + filtered.length +
            " | Celková cena: " + formatPrice(totalPrice) +
            " | Průměrná cena: " + formatPrice(averagePrice);
    }
}

// Zobrazí chybovou zprávu
function showError(message: string): void {
    const errorElement = document.getElementById("error-message")!;
    errorElement.textContent = message;
}

// Vymaže chybovou zprávu
function clearError(): void {
    showError("");
}

// Přepíná viditelnost polí podle zvolené kategorie
function toggleFormFields(): void {
    const category = (document.getElementById("category") as HTMLSelectElement).value;

    const ramField = document.getElementById("ram-field")!;
    const has5GField = document.getElementById("has5G-field")!;

    // Notebook zobrazuje RAM
    if (category === "Notebook") {
        ramField.classList.remove("hidden");
        has5GField.classList.add("hidden");
    }
    // Telefon zobrazuje 5G
    else {
        ramField.classList.add("hidden");
        has5GField.classList.remove("hidden");
    }
}

// Zpracování odeslání formuláře
function handleFormSubmit(event: Event): void {
    // Zabrání obnovení stránky
    event.preventDefault();

    clearError();

    // Načtení hodnot z formuláře
    const category = (document.getElementById("category") as HTMLSelectElement).value as "Notebook" | "Phone";
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const basePrice = Number((document.getElementById("basePrice") as HTMLInputElement).value);

    // Vytvoření objektu s daty produktu
    const data: ProductData = {
        category: category,
        name: name,
        basePrice: basePrice,
    };

    // Přidání specifických údajů podle typu
    if (category === "Notebook") {
        data.ram = Number((document.getElementById("ram") as HTMLInputElement).value);
    } else {
        data.has5G = (document.getElementById("has5G") as HTMLInputElement).checked;
    }

    try {
        // Vytvoření produktu
        const product = createProduct(data);

        // Uložení do seznamů
        productList.push(product);
        productDataList.push(data);

        // Aktualizace zobrazení
        renderProducts();

        // Vymazání formuláře
        (document.getElementById("product-form") as HTMLFormElement).reset();

        // Aktualizace viditelných polí
        toggleFormFields();
    } catch (error) {
        // Zobrazení chyby
        if (error instanceof Error) {
            showError(error.message);
        } else {
            showError("Neznámá chyba při vytváření produktu.");
        }
    }
}

// Změna filtru produktů
function handleFilterChange(): void {
    const filterValue = (document.getElementById("filter") as HTMLSelectElement).value;

    // Nastavení filtru
    if (filterValue === "Notebook" || filterValue === "Phone") {
        categoryFilter = filterValue;
    } else {
        categoryFilter = "all";
    }

    // Překreslení produktů
    renderProducts();
}

// Inicializace aplikace
function init(): void {
    // Připojení obsluh událostí
    document.getElementById("product-form")!.addEventListener("submit", handleFormSubmit);
    document.getElementById("category")!.addEventListener("change", toggleFormFields);
    document.getElementById("filter")!.addEventListener("change", handleFilterChange);

    // Nastavení formuláře
    toggleFormFields();

    // První vykreslení produktů
    renderProducts();
}

// Spuštění aplikace
init();