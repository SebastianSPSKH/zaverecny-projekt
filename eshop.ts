abstract class Product {
    protected name: string;
    protected basePrice: number;

    constructor(name: string, basePrice: number) {
        this.name = name;
        this.basePrice = basePrice;
    }

    public getName(): string {
         return this.name;
    }

    public abstract calculatePrice(): number;
}

class Notebook extends Product {
    private ram: number;

    constructor(name: string, basePrice: number, ram: number) {
        super(name, basePrice);
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
        this.has5G = has5G;
    }
    
    public calculatePrice(): number {   
        return this.basePrice + (this.has5G ? 2000 : 0);
    }
}
