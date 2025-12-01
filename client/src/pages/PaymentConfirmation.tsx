import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { formatCOP } from "@/lib/utils";

export default function PaymentConfirmation() {
  const [location] = useLocation();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get orderId from URL params - use window.location.search for full query string
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError("No se encontró el ID de la orden");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/orders/${orderId}`);

        if (!response.ok) {
          throw new Error("No se pudo obtener la información de la orden");
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("No se pudo cargar la información de la orden");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CategoryNav />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="text-lg text-muted-foreground">Cargando información del pago...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CategoryNav />
        <main className="flex-1">
          <div className="max-w-3xl mx-auto px-4 py-16">
            <Card className="p-8 text-center">
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Error</h1>
              <p className="text-muted-foreground mb-6">
                {error || "No se encontró la información de la orden"}
              </p>
              <Link href="/">
                <Button>Volver al Inicio</Button>
              </Link>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isPaid = order.paymentStatus === "paid";
  const items = typeof order.items === "string" ? JSON.parse(order.items) : order.items;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <Card className="p-8">
            <div className="text-center mb-8">
              {isPaid ? (
                <>
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold font-serif mb-2">¡Pago Exitoso!</h1>
                  <p className="text-lg text-muted-foreground">
                    Gracias por tu compra. Tu pedido ha sido confirmado.
                  </p>
                </>
              ) : (
                <>
                  <Loader2 className="h-16 w-16 text-yellow-600 mx-auto mb-4 animate-spin" />
                  <h1 className="text-3xl font-bold font-serif mb-2">Procesando Pago</h1>
                  <p className="text-lg text-muted-foreground">
                    Tu pago está siendo procesado. Recibirás una confirmación por email.
                  </p>
                </>
              )}
            </div>

            <div className="border-t pt-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold font-serif mb-4">Detalles de la Orden</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Número de Orden</p>
                    <p className="font-semibold">{order.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha</p>
                    <p className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString("es-CO")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estado del Pago</p>
                    <p className="font-semibold">
                      {isPaid ? (
                        <span className="text-green-600">Pagado</span>
                      ) : (
                        <span className="text-yellow-600">Pendiente</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estado del Pedido</p>
                    <p className="font-semibold capitalize">{order.orderStatus}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold mb-4">Información de Envío</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Nombre:</span> {order.customerName}</p>
                  <p><span className="font-semibold">Documento:</span> {order.documentType} {order.documentNumber}</p>
                  <p><span className="font-semibold">Dirección:</span> {order.address}</p>
                  <p><span className="font-semibold">Ciudad:</span> {order.city}</p>
                  <p><span className="font-semibold">Teléfono:</span> {order.phone}</p>
                  <p><span className="font-semibold">Email:</span> {order.email}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold mb-4">Productos</h3>
                <div className="space-y-3">
                  {items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{formatCOP(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatCOP(parseFloat(order.subtotal))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="font-semibold">
                      {parseFloat(order.shipping) === 0 ? "Gratis" : formatCOP(parseFloat(order.shipping))}
                    </span>
                  </div>
                  {parseFloat(order.discount) > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento</span>
                      <span className="font-semibold">-{formatCOP(parseFloat(order.discount))}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-primary">{formatCOP(parseFloat(order.total))}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              <Link href="/">
                <Button variant="outline">Volver al Inicio</Button>
              </Link>
              <Link href="/productos">
                <Button>Seguir Comprando</Button>
              </Link>
            </div>

            {isPaid && (
              <p className="text-center text-sm text-muted-foreground mt-6">
                Recibirás un correo electrónico con los detalles de tu pedido y el seguimiento del envío.
              </p>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
