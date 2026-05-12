/// <reference path="products.ts" />
/// <reference path="data.ts" />

const testProducts: Product[] = catalog.map(createProduct);

testProducts.forEach((product, index) => {
    console.log(`Produkt ${index + 1}:`);
    console.log(`  Název: ${product.getName()}`);
    console.log(`  Základní cena: ${product.getBasePrice()} Kč`);
    console.log(`  Konečná cena: ${product.calculatePrice()} Kč`);
});
