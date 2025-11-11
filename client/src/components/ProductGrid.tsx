import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import samsungImage from "@assets/generated_images/Samsung_flagship_phone_product_aa170b09.png";
import xiaomiImage from "@assets/generated_images/Xiaomi_phone_product_shot_0705b3ea.png";
import motorolaImage from "@assets/generated_images/Motorola_phone_product_shot_9bac3b5d.png";
import oppoImage from "@assets/generated_images/Oppo_phone_product_shot_6e272c5d.png";
import infinixImage from "@assets/generated_images/Infinix_phone_product_shot_8860d3cb.png";

const brandImages: Record<string, string> = {
  "Samsung": samsungImage,
  "Xiaomi": xiaomiImage,
  "Motorola": motorolaImage,
  "Oppo": oppoImage,
  "Infinix": infinixImage,
};

export default function ProductGrid() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products/featured'],
    queryFn: getFeaturedProducts,
  });

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-serif" data-testid="text-section-title">
              Ofertas Destacadas
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-serif" data-testid="text-section-title">
            Ofertas Destacadas
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              brand={product.brand}
              price={parseFloat(product.price)}
              compareAtPrice={product.compareAtPrice ? parseFloat(product.compareAtPrice) : undefined}
              image={brandImages[product.brand] || samsungImage}
              rating={product.rating ? parseFloat(product.rating) : undefined}
              reviewCount={product.reviewCount}
              freeShipping={parseFloat(product.price) >= 100000}
              stock={product.stock}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
