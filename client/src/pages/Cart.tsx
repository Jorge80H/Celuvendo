import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus } from "lucide-react";
import { db } from "@/lib/instant";
import { updateCartQuantityInstant, removeFromCartInstant, getCartSessionId } from "@/lib/cart-instant";
import { formatCOP } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useMemo, useState } from "react";
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

export default function Cart() {
  const { toast } = useToast();
  const sessionId = getCartSessionId();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  // Query cart items with products
  const { data, isLoading } = db.useQuery({
    cartItems: {
      $: {
        where: {
          sessionId,
        },
      },
      product: {},
    },
  });

  const cartItems = useMemo(() => {
    return data?.cartItems || [];
  }, [data]);

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    setUpdatingItems(prev => new Set(prev).add(id));
    try {
      await updateCartQuantityInstant(id, quantity);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la cantidad",
        variant: "destructive",
      });
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleRemove = async (id: string) => {
    setUpdatingItems(prev => new Set(prev).add(id));
    try {
      await removeFromCartInstant(id);
      toast({
        title: "Producto eliminado",
        description: "El producto fue eliminado del carrito",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto",
        variant: "destructive",
      });
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const subtotal = cartItems.reduce((sum: number, item: any) => sum + (item.product?.price || 0) * item.quantity, 0);
  const shipping = subtotal >= 100000 ? 0 : 15000;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CategoryNav />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Skeleton className="h-10 w-64 mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
              <div>
                <Skeleton className="h-64" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CategoryNav />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-bold font-serif" data-testid="text-empty-cart">
                Tu carrito está vacío
              </h1>
              <p className="text-muted-foreground text-lg">
                Explora nuestro catálogo y agrega productos a tu carrito
              </p>
              <Link href="/productos">
                <Button size="lg" data-testid="button-continue-shopping">
                  Ver Productos
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold font-serif mb-8" data-testid="text-page-title">
            Carrito de Compras
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item: any) => {
                const isUpdating = updatingItems.has(item.id);
                return (
                <Card key={item.id} className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-24 h-24 flex-shrink-0 bg-card rounded-md p-2 mx-auto sm:mx-0">
                      <img
                        src={item.product?.images?.[0] || brandImages[item.product?.brand] || samsungImage}
                        alt={item.product?.name}
                        className="w-full h-full object-contain"
                        data-testid={`img-cart-product-${item.id}`}
                      />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="text-center sm:text-left">
                        <h3 className="font-semibold text-base md:text-lg" data-testid={`text-cart-name-${item.id}`}>
                          {item.product?.name}
                        </h3>
                        <p className="text-sm text-muted-foreground" data-testid={`text-cart-brand-${item.id}`}>
                          {item.product?.brand}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating}
                            data-testid={`button-decrease-${item.id}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const qty = parseInt(e.target.value);
                              if (qty > 0 && qty <= item.product?.stock) {
                                handleUpdateQuantity(item.id, qty);
                              }
                            }}
                            className="w-14 text-center"
                            min="1"
                            max={item.product?.stock}
                            data-testid={`input-quantity-${item.id}`}
                          />

                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product?.stock || isUpdating}
                            data-testid={`button-increase-${item.id}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-center sm:text-right">
                          <p className="text-lg md:text-xl font-bold text-primary" data-testid={`text-cart-price-${item.id}`}>
                            {formatCOP((item.product?.price || 0) * item.quantity)}
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {formatCOP(item.product?.price || 0)} c/u
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive w-full sm:w-auto"
                        onClick={() => handleRemove(item.id)}
                        disabled={isUpdating}
                        data-testid={`button-remove-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </Card>
              );})}
            </div>

            <div>
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-bold font-serif mb-6">Resumen del Pedido</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold" data-testid="text-subtotal">
                      {formatCOP(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="font-semibold" data-testid="text-shipping">
                      {shipping === 0 ? 'Gratis' : formatCOP(shipping)}
                    </span>
                  </div>

                  {shipping === 0 && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      ¡Envío gratis! 🎉
                    </p>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary" data-testid="text-total">
                      {formatCOP(total)}
                    </span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full mt-6" size="lg" data-testid="button-checkout">
                    Proceder al Pago
                  </Button>
                </Link>

                <Link href="/productos">
                  <Button variant="outline" className="w-full mt-3" data-testid="button-continue-shopping-2">
                    Seguir Comprando
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
