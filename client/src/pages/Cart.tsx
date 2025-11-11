import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, updateCartQuantity, removeFromCart } from "@/lib/api";
import { formatCOP } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
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
  const queryClient = useQueryClient();
  const { data: cart, isLoading } = useQuery({
    queryKey: ['/api/cart'],
    queryFn: getCart,
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) => updateCartQuantity(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar la cantidad",
        variant: "destructive",
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Producto eliminado",
        description: "El producto fue eliminado del carrito",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto",
        variant: "destructive",
      });
    },
  });

  const subtotal = cart?.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0) || 0;
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

  if (!cart || cart.length === 0) {
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
              {cart.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0 bg-card rounded-md p-2">
                      <img
                        src={brandImages[item.product.brand] || samsungImage}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                        data-testid={`img-cart-product-${item.id}`}
                      />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg" data-testid={`text-cart-name-${item.id}`}>
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground" data-testid={`text-cart-brand-${item.id}`}>
                          {item.product.brand}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => updateQuantityMutation.mutate({ id: item.id, quantity: item.quantity - 1 })}
                            disabled={item.quantity <= 1 || updateQuantityMutation.isPending}
                            data-testid={`button-decrease-${item.id}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const qty = parseInt(e.target.value);
                              if (qty > 0 && qty <= item.product.stock) {
                                updateQuantityMutation.mutate({ id: item.id, quantity: qty });
                              }
                            }}
                            className="w-16 text-center"
                            min="1"
                            max={item.product.stock}
                            data-testid={`input-quantity-${item.id}`}
                          />
                          
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => updateQuantityMutation.mutate({ id: item.id, quantity: item.quantity + 1 })}
                            disabled={item.quantity >= item.product.stock || updateQuantityMutation.isPending}
                            data-testid={`button-increase-${item.id}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-primary" data-testid={`text-cart-price-${item.id}`}>
                            {formatCOP(parseFloat(item.product.price) * item.quantity)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatCOP(parseFloat(item.product.price))} c/u
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeMutation.mutate(item.id)}
                        disabled={removeMutation.isPending}
                        data-testid={`button-remove-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
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

                <Button className="w-full mt-6" size="lg" data-testid="button-checkout">
                  Proceder al Pago
                </Button>

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
