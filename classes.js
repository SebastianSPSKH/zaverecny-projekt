"use strict";
// Základní třída pro všechny produkty.
// Obsahuje společná data a kontrolu platnosti.
class Product {
    name;
    basePrice;
    // Vytvoří produkt se jménem a základní cenou.
    constructor(name, basePrice) {
        this.setName(name);
        this.setBasePrice(basePrice);
    }
    // Vynutí neprázdné jméno produktu.
    setName(name) {
        const normalized = name.trim();
        if (!normalized) {
            throw new Error("Jméno produktu nesmí být prázdné.");
        }
        this.name = normalized;
    }
    // Vynutí nezápornou základní cenu.
    setBasePrice(basePrice) {
        if (!Number.isFinite(basePrice) || basePrice < 0) {
            throw new Error("Základní cena musí být nezáporné číslo.");
        }
        this.basePrice = basePrice;
    }
    // Vrátí název produktu.
    getName() {
        return this.name;
    }
    // Vrátí základní cenu produktu.
    getBasePrice() {
        return this.basePrice;
    }
}
// Třída pro notebooky s cenou navázanou na velikost RAM.
class Notebook extends Product {
    ram;
    constructor(name, basePrice, ram) {
        super(name, basePrice);
        this.setRam(ram);
    }
    // Ověří a uloží velikost RAM.
    setRam(ram) {
        if (!Number.isInteger(ram) || ram <= 0) {
            throw new Error("RAM musí být kladné celé číslo.");
        }
        this.ram = ram;
    }
    // K základní ceně přičte cenu za RAM.
    calculatePrice() {
        return this.basePrice + this.ram * 500;
    }
}
// Třída pro telefony s volitelným příplatkem za 5G.
class Phone extends Product {
    has5G;
    constructor(name, basePrice, has5G) {
        super(name, basePrice);
        this.setHas5G(has5G);
    }
    // Ověří, zda telefon má 5G.
    setHas5G(has5G) {
        if (typeof has5G !== "boolean") {
            throw new Error("has5G musí být boolean hodnota.");
        }
        this.has5G = has5G;
    }
    // K základní ceně přičte příplatek za 5G.
    calculatePrice() {
        return this.basePrice + (this.has5G ? 2000 : 0);
    }
}
// Převádí surové datové objekty na instance produktů.
function createProduct(item) {
    if (item.category === "Notebook") {
        if (item.ram === undefined) {
            throw new Error(`Notebook ${item.name} musí obsahovat hodnotu RAM.`);
        }
        return new Notebook(item.name, item.basePrice, item.ram);
    }
    else if (item.category === "Phone") {
        if (item.has5G === undefined) {
            throw new Error(`Phone ${item.name} musí mít nastavené has5G.`);
        }
        return new Phone(item.name, item.basePrice, item.has5G);
    }
    else {
        throw new Error(`Neznámá kategorie produktu: ${item.category}`);
    }
}
