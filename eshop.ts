abstract class Product {
    protected name: string;
    protected basePrice: number;

    constructor(name: string, basePrice: number) {
        this.setName(name);
        this.setBasePrice(basePrice);
    }

    protected setName(name: string): void {
        const normalized = name.trim();
        if (!normalized) {
            throw new Error("Jméno produktu nesmí být prázdné.");
        }
        this.name = normalized;
    }

    protected setBasePrice(basePrice: number): void {
        if (!Number.isFinite(basePrice) || basePrice < 0) {
            throw new Error("Základní cena musí být nezáporné číslo.");
        }
        this.basePrice = basePrice;
    }

    public getName(): string {
        return this.name;
    }

    public getBasePrice(): number {
        return this.basePrice;
    }

    public abstract calculatePrice(): number;
}

class Notebook extends Product {
    private ram: number;

    constructor(name: string, basePrice: number, ram: number) {
        super(name, basePrice);
        this.setRam(ram);
    }

    private setRam(ram: number): void {
        if (!Number.isInteger(ram) || ram <= 0) {
            throw new Error("RAM musí být kladné celé číslo.");
        }
        this.ram = ram;
    }

    public calculatePrice(): number {
        return this.basePrice + this.ram * 500;
    }
}

class Phone extends Product {
    private has5G: boolean;

    constructor(name: string, basePrice: number, has5G: boolean) {
        super(name, basePrice);
        this.setHas5G(has5G);
    }

    private setHas5G(has5G: boolean): void {
        if (typeof has5G !== "boolean") {
            throw new Error("has5G musí být boolean hodnota.");
        }
        this.has5G = has5G;
    }

    public calculatePrice(): number {
        return this.basePrice + (this.has5G ? 2000 : 0);
    }
}
