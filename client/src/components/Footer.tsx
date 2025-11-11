import { SiVisa, SiMastercard } from "react-icons/si";
import { CreditCard, Shield, Truck, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-serif text-primary">Celuvendo</h3>
            <p className="text-sm text-muted-foreground">
              Celulares 100% originales con garantía oficial en Colombia
            </p>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">100% Originales</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Comprar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Samsung</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Xiaomi</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Motorola</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Ofertas</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Ayuda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Garantía</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>soporte@celuvendo.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Bogotá, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Truck className="h-5 w-5" />
              <span>Envío Gratis &gt; $100.000</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Métodos de pago:</span>
              <div className="flex items-center gap-3">
                <SiVisa className="h-6 w-6 text-muted-foreground" />
                <SiMastercard className="h-6 w-6 text-muted-foreground" />
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Celuvendo. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
