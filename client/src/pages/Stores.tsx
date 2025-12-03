import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Phone, Mail, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const stores = [
  {
    name: "Tienda Alcalá",
    address: "Calle 137 # 45-21",
    neighborhood: "Alcalá, Bogotá",
    phone: "+57 316 888 0808",
    schedule: "Lunes a Sábado: 9:00 AM - 7:00 PM\nDomingos: 10:00 AM - 5:00 PM",
    mapUrl: "https://maps.google.com/?q=Calle+137+45-21+Bogotá",
  },
  {
    name: "Tienda Ensueño",
    address: "Av. Gaitán Cortés con Calle 59 Sur",
    neighborhood: "Centro Comercial Ensueño Local 114, Bogotá",
    phone: "+57 316 888 0808",
    schedule: "Lunes a Sábado: 10:00 AM - 8:00 PM\nDomingos: 11:00 AM - 6:00 PM",
    mapUrl: "https://maps.google.com/?q=Centro+Comercial+Ensueño+Local+114+Bogotá",
  },
  {
    name: "Tienda Tunal",
    address: "Calle 48C Sur # 24-80",
    neighborhood: "Centro Comercial Tunal Local 1036, Bogotá",
    phone: "+57 316 888 0808",
    schedule: "Lunes a Sábado: 10:00 AM - 8:00 PM\nDomingos: 11:00 AM - 6:00 PM",
    mapUrl: "https://maps.google.com/?q=Centro+Comercial+Tunal+Local+1036+Bogotá",
  },
];

export default function Stores() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">
              Nuestras Tiendas Físicas
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Visítanos en cualquiera de nuestras 3 tiendas en Bogotá. Prueba los productos,
              recibe asesoría personalizada y lleva tu celular de inmediato.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {stores.map((store, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold font-serif mb-2">{store.name}</h2>
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{store.address}</p>
                        <p className="text-sm">{store.neighborhood}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div className="text-sm whitespace-pre-line">{store.schedule}</div>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="text-sm hover:text-primary transition-colors">
                      {store.phone}
                    </a>
                  </div>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => window.open(store.mapUrl, '_blank')}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Ver en Google Maps
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Información adicional */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h3 className="text-xl font-bold mb-4">¿Por qué visitar nuestras tiendas?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Prueba antes de comprar</h4>
                  <p className="text-sm text-muted-foreground">
                    Conoce personalmente los celulares, prueba sus funciones y compara modelos
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Asesoría personalizada</h4>
                  <p className="text-sm text-muted-foreground">
                    Nuestros expertos te ayudarán a encontrar el celular perfecto para ti
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Llévalo de inmediato</h4>
                  <p className="text-sm text-muted-foreground">
                    Sin esperas, lleva tu nuevo celular el mismo día
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Devoluciones fáciles</h4>
                  <p className="text-sm text-muted-foreground">
                    Realiza cambios o devoluciones directamente en tienda
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contacto */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              ¿Tienes preguntas? Contáctanos antes de visitarnos
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="default"
                onClick={() => window.open('https://wa.me/573332725157?text=Hola! Me gustaría obtener información sobre sus tiendas físicas.', '_blank')}
              >
                <Phone className="h-4 w-4 mr-2" />
                WhatsApp: +57 333 272 5157
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = 'mailto:soporte@celuvendo.com'}
              >
                <Mail className="h-4 w-4 mr-2" />
                soporte@celuvendo.com
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
