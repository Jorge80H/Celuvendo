import ProductCard from "./ProductCard";
import samsungImage from "@assets/generated_images/Samsung_flagship_phone_product_aa170b09.png";
import xiaomiImage from "@assets/generated_images/Xiaomi_phone_product_shot_0705b3ea.png";
import motorolaImage from "@assets/generated_images/Motorola_phone_product_shot_9bac3b5d.png";
import oppoImage from "@assets/generated_images/Oppo_phone_product_shot_6e272c5d.png";
import infinixImage from "@assets/generated_images/Infinix_phone_product_shot_8860d3cb.png";

const mockProducts = [
  {
    id: "1",
    name: "Samsung Galaxy S24 Ultra 5G 256GB",
    brand: "Samsung",
    price: 3299000,
    compareAtPrice: 3899000,
    image: samsungImage,
    rating: 4.8,
    reviewCount: 324,
    freeShipping: true,
    stock: 15,
  },
  {
    id: "2",
    name: "Xiaomi Redmi Note 13 Pro 5G 128GB",
    brand: "Xiaomi",
    price: 899000,
    compareAtPrice: 1099000,
    image: xiaomiImage,
    rating: 4.6,
    reviewCount: 187,
    freeShipping: true,
    stock: 28,
  },
  {
    id: "3",
    name: "Motorola Edge 40 Neo 256GB",
    brand: "Motorola",
    price: 1199000,
    compareAtPrice: 1399000,
    image: motorolaImage,
    rating: 4.5,
    reviewCount: 95,
    freeShipping: true,
    stock: 12,
  },
  {
    id: "4",
    name: "OPPO Reno 11 5G 256GB",
    brand: "Oppo",
    price: 1599000,
    compareAtPrice: undefined,
    image: oppoImage,
    rating: 4.7,
    reviewCount: 142,
    freeShipping: true,
    stock: 20,
  },
  {
    id: "5",
    name: "Infinix Note 30 Pro 256GB",
    brand: "Infinix",
    price: 699000,
    compareAtPrice: 799000,
    image: infinixImage,
    rating: 4.3,
    reviewCount: 76,
    freeShipping: false,
    stock: 35,
  },
  {
    id: "6",
    name: "Samsung Galaxy A54 5G 128GB",
    brand: "Samsung",
    price: 1299000,
    compareAtPrice: 1499000,
    image: samsungImage,
    rating: 4.6,
    reviewCount: 211,
    freeShipping: true,
    stock: 18,
  },
  {
    id: "7",
    name: "Xiaomi 13T 256GB",
    brand: "Xiaomi",
    price: 1899000,
    compareAtPrice: undefined,
    image: xiaomiImage,
    rating: 4.7,
    reviewCount: 158,
    freeShipping: true,
    stock: 9,
  },
  {
    id: "8",
    name: "Motorola Moto G84 5G 256GB",
    brand: "Motorola",
    price: 999000,
    compareAtPrice: 1149000,
    image: motorolaImage,
    rating: 4.5,
    reviewCount: 103,
    freeShipping: true,
    stock: 22,
  },
];

export default function ProductGrid() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-serif" data-testid="text-section-title">
            Ofertas Destacadas
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
