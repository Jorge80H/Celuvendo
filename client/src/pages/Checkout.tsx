import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/instant";
import { getCartSessionId } from "@/lib/cart-instant";
import { formatCOP } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { useState, useMemo, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Checkout() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const sessionId = getCartSessionId();
  const [isProcessing, setIsProcessing] = useState(false);

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

  // Form state
  const [formData, setFormData] = useState({
    customerName: "",
    documentType: "CC",
    documentNumber: "",
    address: "",
    city: "",
    phone: "",
    email: "",
  });

  // Calculate totals
  const subtotal = cartItems.reduce((sum: number, item: any) => sum + (item.product?.price || 0) * item.quantity, 0);
  const shipping = subtotal >= 100000 ? 0 : 15000;
  const total = subtotal + shipping;

  // Redirect if cart is empty
  useEffect(() => {
    if (!isLoading && (!cartItems || cartItems.length === 0)) {
      setLocation("/carrito");
    }
  }, [isLoading, cartItems, setLocation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.customerName || !formData.documentNumber || !formData.address ||
        !formData.city || !formData.phone || !formData.email) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Get product details for the order
      const orderItems = cartItems.map((item: any) => ({
        productId: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        price: parseFloat(item.product.price),
        quantity: item.quantity,
        color: item.selectedColor || undefined,
      }));

      // Create order in database
      const orderData = {
        ...formData,
        items: orderItems,
        subtotal,
        shipping,
        total,
        sessionId,
        date: new Date().toISOString(),
      };

      // Call backend to create order and initiate Bold payment
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la orden");
      }

      const result = await response.json();

      // Redirect to Bold payment page
      if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        throw new Error("No se recibió URL de pago");
      }

    } catch (error) {
      console.error("Error processing checkout:", error);
      toast({
        title: "Error",
        description: "No se pudo procesar el pago. Por favor intenta nuevamente.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CategoryNav />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
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
          <h1 className="text-3xl font-bold font-serif mb-8">Finalizar Compra</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Customer Information Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-bold font-serif mb-6">Datos de Envío y Facturación</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customerName">Nombre Completo *</Label>
                      <Input
                        id="customerName"
                        name="customerName"
                        type="text"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: Juan Pérez"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="documentType">Tipo de Documento *</Label>
                        <select
                          id="documentType"
                          name="documentType"
                          value={formData.documentType}
                          onChange={handleInputChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="CC">Cédula de Ciudadanía</option>
                          <option value="NIT">NIT</option>
                          <option value="CE">Cédula de Extranjería</option>
                          <option value="PAS">Pasaporte</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="documentNumber">Número de Documento *</Label>
                        <Input
                          id="documentNumber"
                          name="documentNumber"
                          type="text"
                          value={formData.documentNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="Ej: 1234567890"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Dirección Completa *</Label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: Calle 123 #45-67 Apto 801"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">Ciudad *</Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: Bogotá"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: 3001234567"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: correo@ejemplo.com"
                      />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="p-6 sticky top-20">
                  <h2 className="text-xl font-bold font-serif mb-6">Resumen del Pedido</h2>

                  <div className="space-y-4 mb-6">
                    {cartItems.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="flex-1">
                          {item.product?.name}
                          {item.selectedColor && <span className="text-primary font-medium"> - {item.selectedColor}</span>}
                          {' x '}{item.quantity}
                        </span>
                        <span className="font-semibold">
                          {formatCOP((item.product?.price || 0) * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">{formatCOP(subtotal)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      <span className="font-semibold">
                        {shipping === 0 ? 'Gratis' : formatCOP(shipping)}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatCOP(total)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-6"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      "Proceder al Pago"
                    )}
                  </Button>

                  <Link href="/carrito">
                    <Button variant="outline" className="w-full mt-3" type="button">
                      Volver al Carrito
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
