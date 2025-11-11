import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
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
  {
    id: "9",
    name: "OPPO A78 5G 128GB",
    brand: "Oppo",
    price: 799000,
    compareAtPrice: 899000,
    image: oppoImage,
    rating: 4.4,
    reviewCount: 89,
    freeShipping: false,
    stock: 31,
  },
  {
    id: "10",
    name: "Infinix Zero 30 5G 256GB",
    brand: "Infinix",
    price: 1099000,
    compareAtPrice: undefined,
    image: infinixImage,
    rating: 4.5,
    reviewCount: 67,
    freeShipping: true,
    stock: 14,
  },
  {
    id: "11",
    name: "Samsung Galaxy M34 5G 128GB",
    brand: "Samsung",
    price: 899000,
    compareAtPrice: 999000,
    image: samsungImage,
    rating: 4.4,
    reviewCount: 145,
    freeShipping: true,
    stock: 25,
  },
  {
    id: "12",
    name: "Xiaomi Poco X6 Pro 5G 256GB",
    brand: "Xiaomi",
    price: 1399000,
    compareAtPrice: 1599000,
    image: xiaomiImage,
    rating: 4.7,
    reviewCount: 198,
    freeShipping: true,
    stock: 16,
  },
];

export default function Products() {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold font-serif mb-2" data-testid="text-page-title">
                Todos los Celulares
              </h1>
              <p className="text-muted-foreground" data-testid="text-product-count">
                {mockProducts.length} productos encontrados
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
                data-testid="button-toggle-filters"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]" data-testid="select-sort">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recomendados</SelectItem>
                  <SelectItem value="price_asc">Menor precio</SelectItem>
                  <SelectItem value="price_desc">Mayor precio</SelectItem>
                  <SelectItem value="newest">Más recientes</SelectItem>
                  <SelectItem value="rating">Mejor valorados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <aside className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              <FilterSidebar />
            </aside>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {mockProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
