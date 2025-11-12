import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, MapPin, Calendar, RefreshCcw, AlertCircle } from "lucide-react";

export default function Shipping() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">
              Envíos y Devoluciones
            </h1>
            <p className="text-muted-foreground text-lg">
              Información completa sobre nuestros servicios de envío y política de devoluciones
            </p>
          </div>

          {/* Envío Gratis */}
          <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  ¡Envío GRATIS en compras mayores a $100,000!
                </h2>
                <p className="text-muted-foreground">
                  Disfruta de envío sin costo adicional en todo el territorio colombiano para compras superiores a cien mil pesos. Para montos menores, el costo de envío varía entre $10,000 y $20,000 según tu ubicación.
                </p>
              </div>
            </div>
          </Card>

          {/* Tiempos de Entrega */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Tiempos de Entrega</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b pb-4">
                <div>
                  <h3 className="font-semibold mb-1">Bogotá, Medellín, Cali y Barranquilla</h3>
                  <p className="text-sm text-muted-foreground">Ciudades principales</p>
                </div>
                <Badge className="bg-green-500 hover:bg-green-600">1-3 días hábiles</Badge>
              </div>
              <div className="flex items-start justify-between border-b pb-4">
                <div>
                  <h3 className="font-semibold mb-1">Otras Ciudades Principales</h3>
                  <p className="text-sm text-muted-foreground">Cartagena, Bucaramanga, Pereira, etc.</p>
                </div>
                <Badge className="bg-blue-500 hover:bg-blue-600">3-5 días hábiles</Badge>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Municipios y Zonas Rurales</h3>
                  <p className="text-sm text-muted-foreground">Áreas alejadas de centros urbanos</p>
                </div>
                <Badge className="bg-orange-500 hover:bg-orange-600">5-8 días hábiles</Badge>
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                <AlertCircle className="inline h-4 w-4 mr-1" />
                Los tiempos son estimados y pueden variar por disponibilidad de inventario, condiciones climáticas o situaciones de fuerza mayor.
              </p>
            </div>
          </Card>

          {/* Cobertura */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Cobertura Nacional</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Realizamos envíos a todo el territorio colombiano. Trabajamos con las transportadoras más confiables del país:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-md text-center">
                <div className="font-semibold mb-1">Servientrega</div>
                <p className="text-sm text-muted-foreground">Nacional</p>
              </div>
              <div className="p-4 border rounded-md text-center">
                <div className="font-semibold mb-1">Coordinadora</div>
                <p className="text-sm text-muted-foreground">Nacional</p>
              </div>
              <div className="p-4 border rounded-md text-center">
                <div className="font-semibold mb-1">Interrapidísimo</div>
                <p className="text-sm text-muted-foreground">Nacional</p>
              </div>
            </div>
          </Card>

          {/* Seguimiento */}
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Seguimiento de tu Pedido</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Pedido Confirmado</h3>
                  <p className="text-sm text-muted-foreground">Recibirás un correo de confirmación con los detalles de tu compra</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">En Preparación</h3>
                  <p className="text-sm text-muted-foreground">Empacamos tu pedido con el máximo cuidado</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Enviado</h3>
                  <p className="text-sm text-muted-foreground">Te enviaremos el número de guía para rastrear tu paquete</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold">Entregado</h3>
                  <p className="text-sm text-muted-foreground">¡Disfruta tu nuevo celular!</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Política de Devoluciones */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <RefreshCcw className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Política de Devoluciones</h2>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Derecho de Retracto (5 días hábiles)</h3>
              <p className="text-muted-foreground mb-3">
                Según la ley colombiana, tienes derecho a retractarte de tu compra dentro de los 5 días hábiles siguientes a la recepción del producto, sin necesidad de justificación.
              </p>
              <div className="bg-muted p-4 rounded-md space-y-2">
                <h4 className="font-semibold text-sm mb-2">Condiciones para devolución:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>El producto debe estar sin usar, en su empaque original y con todos sus accesorios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>No debe tener señales de uso, ralladuras o daños</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>No se debe haber insertado una tarjeta SIM ni activado el dispositivo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Debe incluir manuales, etiquetas y documentación original</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Los plásticos de protección deben estar intactos</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">¿Cómo solicitar una devolución?</h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    1
                  </span>
                  <div className="text-sm text-muted-foreground">
                    Contáctanos por WhatsApp (+57 300 123 4567) o correo (soporte@celuvendo.com) indicando tu número de pedido
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    2
                  </span>
                  <div className="text-sm text-muted-foreground">
                    Te daremos instrucciones para el envío del producto. Nosotros cubrimos el costo de recolección
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                    3
                  </span>
                  <div className="text-sm text-muted-foreground">
                    Una vez recibamos y verifiquemos el producto, procesaremos tu reembolso en 5-10 días hábiles
                  </div>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Cambios por otro Modelo</h3>
              <p className="text-sm text-muted-foreground">
                Si deseas cambiar tu celular por otro modelo, también puedes hacerlo dentro de los 5 días hábiles.
                El producto debe cumplir las mismas condiciones de devolución. Si hay diferencia de precio,
                se realizará el ajuste correspondiente (reembolso o cargo adicional según el caso).
              </p>
            </div>
          </Card>

          {/* Productos Defectuosos */}
          <Card className="p-6 border-orange-200 bg-orange-50/50">
            <h3 className="font-semibold text-lg mb-3">¿Recibiste un Producto Defectuoso o Incorrecto?</h3>
            <p className="text-muted-foreground mb-4">
              Si tu producto llegó con defectos, daños por el transporte, o no es el modelo que ordenaste,
              contáctanos inmediatamente. Te enviaremos un reemplazo sin costo adicional o te reembolsaremos
              el 100% de tu dinero, incluyendo los gastos de envío.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
              >
                Reportar por WhatsApp
              </a>
              <a
                href="mailto:soporte@celuvendo.com"
                className="inline-flex items-center justify-center px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
              >
                Enviar Email
              </a>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
