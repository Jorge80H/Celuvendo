import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import { formatCOP, calculateDiscount } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  freeShipping?: boolean;
  stock: number;
}

export default function ProductCard({
  id,
  name,
  brand,
  price,
  compareAtPrice,
  image,
  rating = 0,
  reviewCount = 0,
  freeShipping = false,
  stock,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const discount = compareAtPrice ? calculateDiscount(price, compareAtPrice) : 0;

  return (
    <Card className="overflow-hidden hover-elevate transition-transform duration-200 hover:scale-105 group">
      <div className="relative aspect-square bg-card p-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
          data-testid={`img-product-${id}`}
        />
        
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-2 right-2 rounded-full ${isFavorite ? 'text-destructive' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
            console.log(`Favorite toggled for product ${id}`);
          }}
          data-testid={`button-favorite-${id}`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>

        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground" data-testid={`badge-discount-${id}`}>
            -{discount}%
          </Badge>
        )}

        {freeShipping && (
          <Badge variant="secondary" className="absolute bottom-2 left-2 text-xs" data-testid={`badge-shipping-${id}`}>
            Envío Gratis
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium uppercase" data-testid={`text-brand-${id}`}>
            {brand}
          </p>
          <h3 className="font-semibold text-base line-clamp-2 min-h-[3rem]" data-testid={`text-name-${id}`}>
            {name}
          </h3>
        </div>

        {rating > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium ml-1" data-testid={`text-rating-${id}`}>{rating}</span>
            </div>
            <span className="text-xs text-muted-foreground" data-testid={`text-reviews-${id}`}>
              ({reviewCount} reseñas)
            </span>
          </div>
        )}

        <div className="space-y-1">
          {compareAtPrice && (
            <p className="text-sm text-muted-foreground line-through" data-testid={`text-old-price-${id}`}>
              {formatCOP(compareAtPrice)}
            </p>
          )}
          <p className="text-2xl font-bold text-primary" data-testid={`text-price-${id}`}>
            {formatCOP(price)}
          </p>
        </div>

        <Button
          className="w-full"
          disabled={stock === 0}
          onClick={() => console.log(`Add to cart: ${id}`)}
          data-testid={`button-add-cart-${id}`}
        >
          {stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
        </Button>
      </div>
    </Card>
  );
}
