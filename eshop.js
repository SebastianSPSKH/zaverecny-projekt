"use strict";
class Product {
    name;
    basePrice;
    constructor(name, basePrice) {
        this.setName(name);
        this.setBasePrice(basePrice);
    }
    setName(name) {
        const normalized = name.trim();
        if (!normalized) {
            throw new Error("Jméno produktu nesmí být prázdné.");
        }
        this.name = normalized;
    }
    setBasePrice(basePrice) {
        if (!Number.isFinite(basePrice) || basePrice < 0) {
            throw new Error("Základní cena musí být nezáporné číslo.");
        }
        this.basePrice = basePrice;
    }
    getName() {
        return this.name;
    }
    getBasePrice() {
        return this.basePrice;
    }
}
class Notebook extends Product {
    ram;
    constructor(name, basePrice, ram) {
        super(name, basePrice);
        this.setRam(ram);
    }
    setRam(ram) {
        if (!Number.isInteger(ram) || ram <= 0) {
            throw new Error("RAM musí být kladné celé číslo.");
        }
        this.ram = ram;
    }
    calculatePrice() {
        return this.basePrice + this.ram * 500;
    }
}
class Phone extends Product {
    has5G;
    constructor(name, basePrice, has5G) {
        super(name, basePrice);
        this.setHas5G(has5G);
    }
    setHas5G(has5G) {
        if (typeof has5G !== "boolean") {
            throw new Error("has5G musí být boolean hodnota.");
        }
        this.has5G = has5G;
    }
    calculatePrice() {
        return this.basePrice + (this.has5G ? 2000 : 0);
    }
}
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
