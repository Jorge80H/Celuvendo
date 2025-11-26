import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SlidersHorizontal } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { db } from "@/lib/instant";
import { formatCOP } from "@/lib/utils";
import { useLocation } from "wouter";
import samsungImage from "@assets/generated_images/Samsung_flagship_phone_product_aa170b09.png";
import xiaomiImage from "@assets/generated_images/Xiaomi_phone_product_shot_0705b3ea.png";
import motorolaImage from "@assets/generated_images/Motorola_phone_product_shot_9bac3b5d.png";
import oppoImage from "@assets/generated_images/Oppo_phone_product_shot_6e272c5d.png";
import infinixImage from "@assets/generated_images/Infinix_phone_product_shot_8860d3cb.png";

const brandImages: Record<string, string> = {
  "Samsung": samsungImage,
  "Xiaomi": xiaomiImage,
  "Motorola": motorolaImage,
  "OPPO": oppoImage,
  "Oppo": oppoImage,
  "Infinix": infinixImage,
  "TECNO": samsungImage, // Placeholder until we have TECNO image
};

const brands = ["Samsung", "Xiaomi", "Motorola", "OPPO", "Infinix", "TECNO"];
const ramOptions = ["4GB", "6GB", "8GB", "12GB"];
const storageOptions = ["64GB", "128GB", "256GB", "512GB"];

const oldMockProducts = [
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
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const searchQuery = searchParams.get('search') || '';

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([200000, 4000000]);

  // Fetch products from InstantDB
  const { data, isLoading, error } = db.useQuery({ products: {} });

  // Apply filters and sorting
  const products = useMemo(() => {
    if (!data?.products) return [];

    let filtered = [...data.products];

    // Filter out inactive products (agotados)
    filtered = filtered.filter(p => p.isActive === true);

    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
      );
    }

    // Apply brand filter (case-insensitive)
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p =>
        selectedBrands.some(brand =>
          brand.toLowerCase() === p.brand.toLowerCase()
        )
      );
    }

    // Apply RAM filter
    if (selectedRam.length > 0) {
      filtered = filtered.filter(p => {
        const ram = p.specifications?.ram || p.ram;
        return ram && selectedRam.includes(ram);
      });
    }

    // Apply storage filter
    if (selectedStorage.length > 0) {
      filtered = filtered.filter(p => {
        const storage = p.specifications?.storage || p.storage;
        return storage && selectedStorage.includes(storage);
      });
    }

    // Apply price range filter
    filtered = filtered.filter(p => {
      const price = parseFloat(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply sorting
    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price_desc':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => (parseFloat(b.rating || '0') - parseFloat(a.rating || '0')));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [data, selectedBrands, selectedRam, selectedStorage, priceRange, sortBy, searchQuery]);

  const toggleSelection = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedRam([]);
    setSelectedStorage([]);
    setPriceRange([200000, 4000000]);
  };

  const activeFiltersCount = selectedBrands.length + selectedRam.length + selectedStorage.length;

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
                {products.length} productos encontrados
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
              <Card className="p-6 sticky top-20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filtros</h3>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" data-testid="badge-active-filters">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </div>

                <Accordion type="multiple" defaultValue={["brand", "price", "ram", "storage"]} className="space-y-4">
                  <AccordionItem value="brand" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">
                      Marca
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        {brands.map((brand) => (
                          <div key={brand} className="flex items-center space-x-2">
                            <Checkbox
                              id={`brand-${brand}`}
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={() => toggleSelection(brand, selectedBrands, setSelectedBrands)}
                              data-testid={`checkbox-brand-${brand.toLowerCase()}`}
                            />
                            <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                              {brand}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">
                      Rango de Precio
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          min={200000}
                          max={4000000}
                          step={100000}
                          className="w-full"
                          data-testid="slider-price-range"
                        />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground" data-testid="text-price-min">
                            {formatCOP(priceRange[0])}
                          </span>
                          <span className="text-muted-foreground" data-testid="text-price-max">
                            {formatCOP(priceRange[1])}
                          </span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="ram" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">
                      Memoria RAM
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        {ramOptions.map((ram) => (
                          <div key={ram} className="flex items-center space-x-2">
                            <Checkbox
                              id={`ram-${ram}`}
                              checked={selectedRam.includes(ram)}
                              onCheckedChange={() => toggleSelection(ram, selectedRam, setSelectedRam)}
                              data-testid={`checkbox-ram-${ram.toLowerCase()}`}
                            />
                            <Label htmlFor={`ram-${ram}`} className="text-sm cursor-pointer">
                              {ram}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="storage" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">
                      Almacenamiento
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        {storageOptions.map((storage) => (
                          <div key={storage} className="flex items-center space-x-2">
                            <Checkbox
                              id={`storage-${storage}`}
                              checked={selectedStorage.includes(storage)}
                              onCheckedChange={() => toggleSelection(storage, selectedStorage, setSelectedStorage)}
                              data-testid={`checkbox-storage-${storage.toLowerCase()}`}
                            />
                            <Label htmlFor={`storage-${storage}`} className="text-sm cursor-pointer">
                              {storage}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    className="w-full mt-6"
                    onClick={clearFilters}
                    data-testid="button-clear-filters"
                  >
                    Limpiar Filtros
                  </Button>
                )}
              </Card>
            </aside>

            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="aspect-square" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      brand={product.brand}
                      price={parseFloat(product.price)}
                      compareAtPrice={product.compareAtPrice ? parseFloat(product.compareAtPrice) : undefined}
                      image={product.images?.[0] || brandImages[product.brand] || samsungImage}
                      rating={product.rating ? parseFloat(product.rating) : undefined}
                      reviewCount={product.reviewCount}
                      freeShipping={parseFloat(product.price) >= 100000}
                      stock={product.stock}
                      slug={product.slug}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
