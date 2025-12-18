import { SiVisa, SiMastercard, SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";
import { CreditCard, Shield, Truck, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src="/assets/logoceluvendo_nofondo.png"
                  alt="Celuvendo"
                  className="h-10 w-auto"
                  width="120"
                  height="40"
                />
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Celulares 100% originales con garantía oficial. Envíos a toda Colombia.
            </p>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">100% Originales</span>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Síguenos</h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/celuvendocol/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <SiInstagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61584323354202"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <SiFacebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@user5878746258668"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="TikTok"
                >
                  <SiTiktok className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Comprar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/productos?brand=Samsung" onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">Samsung</Link></li>
              <li><Link href="/productos?brand=Xiaomi" onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">Xiaomi</Link></li>
              <li><Link href="/productos?brand=Motorola" onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">Motorola</Link></li>
              <li><Link href="/productos?brand=OPPO" onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">OPPO</Link></li>
              <li><Link href="/productos?brand=Infinix" onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">Infinix</Link></li>
              <li><Link href="/productos?brand=TECNO" onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">TECNO</Link></li>
              <li><Link href="/productos?ofertas=true" onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">Ofertas</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Ayuda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/blog" onClick={() => window.scrollTo(0, 0)} className="hover:text-foreground transition-colors cursor-pointer">Blog</Link></li>
              <li><Link href="/preguntas-frecuentes" className="hover:text-foreground transition-colors cursor-pointer">Preguntas Frecuentes</Link></li>
              <li><Link href="/envios-y-devoluciones" className="hover:text-foreground transition-colors cursor-pointer">Envíos y Devoluciones</Link></li>
              <li><Link href="/garantia" className="hover:text-foreground transition-colors cursor-pointer">Garantía</Link></li>
              <li><Link href="/terminos-y-condiciones" className="hover:text-foreground transition-colors cursor-pointer">Términos y Condiciones</Link></li>
              <li><Link href="/politica-de-privacidad" className="hover:text-foreground transition-colors cursor-pointer">Política de Privacidad</Link></li>
              <li><Link href="/tratamiento-de-datos" className="hover:text-foreground transition-colors cursor-pointer">Tratamiento de Datos</Link></li>
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
                  width="80"
                  height="20"
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
