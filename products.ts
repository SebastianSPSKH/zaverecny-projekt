// Základní třída pro všechny produkty.
// Obsahuje společná data a kontrolu platnosti.
abstract class Product {
    protected name!: string;
    protected basePrice!: number;

    // Vytvoří produkt se jménem a základní cenou.
    constructor(name: string, basePrice: number) {
        this.setName(name);
        this.setBasePrice(basePrice);
    }

    // Vynutí neprázdné jméno produktu.
    protected setName(name: string): void {
        const normalized = name.trim();
        if (!normalized) {
            throw new Error("Jméno produktu nesmí být prázdné.");
        }
        this.name = normalized;
    }

    // Vynutí nezápornou základní cenu.
    protected setBasePrice(basePrice: number): void {
        if (!Number.isFinite(basePrice) || basePrice < 0) {
            throw new Error("Základní cena musí být nezáporné číslo.");
        }
        this.basePrice = basePrice;
    }

    // Vrátí název produktu.
    public getName(): string {
        return this.name;
    }

    // Vrátí základní cenu produktu.
    public getBasePrice(): number {
        return this.basePrice;
    }

    // Každá podtřída musí spočítat konečnou cenu.
    public abstract calculatePrice(): number;
}

// Třída pro notebooky s cenou navázanou na velikost RAM.
class Notebook extends Product {
    private ram!: number;

    constructor(name: string, basePrice: number, ram: number) {
        super(name, basePrice);
        this.setRam(ram);
    }

    // Ověří a uloží velikost RAM.
    private setRam(ram: number): void {
        if (!Number.isInteger(ram) || ram <= 0) {
            throw new Error("RAM musí být kladné celé číslo.");
        }
        this.ram = ram;
    }

    // K základní ceně přičte cenu za RAM.
    public calculatePrice(): number {
        return this.basePrice + this.ram * 500;
    }
}

// Třída pro telefony s volitelným příplatkem za 5G.
class Phone extends Product {
    private has5G!: boolean;

    constructor(name: string, basePrice: number, has5G: boolean) {
        super(name, basePrice);
        this.setHas5G(has5G);
    }

    // Ověří, zda telefon má 5G.
    private setHas5G(has5G: boolean): void {
        if (typeof has5G !== "boolean") {
            throw new Error("has5G musí být boolean hodnota.");
        }
        this.has5G = has5G;
    }

    // K základní ceně přičte příplatek za 5G.
    public calculatePrice(): number {
        return this.basePrice + (this.has5G ? 2000 : 0);
    }
}

// Převádí surové datové objekty na instance produktů.
function createProduct(item: any): Product {
    if (item.category === "Notebook") {
        if (item.ram === undefined) {
            throw new Error(`Notebook ${item.name} musí obsahovat hodnotu RAM.`);
        }
        return new Notebook(item.name, item.basePrice, item.ram);
    } else if (item.category === "Phone") {
        if (item.has5G === undefined) {
            throw new Error(`Phone ${item.name} musí mít nastavené has5G.`);
        }
        return new Phone(item.name, item.basePrice, item.has5G);
    } else {
        throw new Error(`Neznámá kategorie produktu: ${item.category}`);
    }
}
