import { SiVisa, SiMastercard } from "react-icons/si";
import { CreditCard, Shield, Truck, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link href="/">
              <a className="flex items-center gap-2">
                <img
                  src="/assets/logoceluvendo_nofondo.png"
                  alt="Celuvendo"
                  className="h-10 w-auto"
                />
              </a>
            </Link>
            <p className="text-sm text-muted-foreground">
              Celulares 100% originales con garantía oficial. Envíos a toda Colombia.
            </p>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">100% Originales</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Comprar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/productos?brand=Samsung"><a onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">Samsung</a></Link></li>
              <li><Link href="/productos?brand=Xiaomi"><a onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">Xiaomi</a></Link></li>
              <li><Link href="/productos?brand=Motorola"><a onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">Motorola</a></Link></li>
              <li><Link href="/productos?brand=OPPO"><a onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">OPPO</a></Link></li>
              <li><Link href="/productos?brand=Infinix"><a onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">Infinix</a></Link></li>
              <li><Link href="/productos?brand=TECNO"><a onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">TECNO</a></Link></li>
              <li><Link href="/productos?ofertas=true"><a onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">Ofertas</a></Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Ayuda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/preguntas-frecuentes" className="hover:text-foreground transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="/envios-y-devoluciones" className="hover:text-foreground transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="/garantia" className="hover:text-foreground transition-colors">Garantía</a></li>
              <li><a href="/terminos-y-condiciones" className="hover:text-foreground transition-colors">Términos y Condiciones</a></li>
              <li><a href="/politica-de-privacidad" className="hover:text-foreground transition-colors">Política de Privacidad</a></li>
              <li><a href="/tratamiento-de-datos" className="hover:text-foreground transition-colors">Tratamiento de Datos</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+573168880808" className="hover:text-foreground transition-colors">+57 316 888 0808</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:soporte@celuvendo.com" className="hover:text-foreground transition-colors">soporte@celuvendo.com</a>
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
            
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Pagos seguros procesados por:</span>
                <img
                  src="https://cdn.brandfetch.io/iddn3wqBfj/theme/dark/logo.svg"
                  alt="Bold Pagos"
                  className="h-5 w-auto"
                />
              </div>
              <div className="flex items-center gap-2">
                <SiVisa className="h-6 w-6 text-muted-foreground" />
                <SiMastercard className="h-6 w-6 text-muted-foreground" />
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
            <p>&copy; 2025 Celuvendo.com. Todos los derechos reservados.</p>
            <p>Desarrollado por <a href="https://empleadosdigitales.com.co" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">empleadosdigitales.com.co</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
