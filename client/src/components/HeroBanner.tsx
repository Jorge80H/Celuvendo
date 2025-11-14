import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Shield, CreditCard } from "lucide-react";
import { Link } from "wouter";

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-20">
        <div className="grid md:grid-cols-2 gap-8 items-center py-12 md:py-16">
          <div className="space-y-6">
            <div className="space-y-3">
              <Badge variant="secondary" className="text-sm font-semibold">
                100% Originales
              </Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
                Celulares con Garantía en Colombia
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Envío gratis en compras superiores a $100.000 COP
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/productos">
                <Button size="lg" className="text-base w-full sm:w-auto" data-testid="button-explore-offers">
                  Explorar Ofertas
                </Button>
              </Link>
              <Link href="/productos">
                <Button size="lg" variant="outline" className="text-base backdrop-blur-sm w-full sm:w-auto" data-testid="button-view-catalog">
                  Ver Catálogo
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Envío Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Garantía Oficial</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Financiación</span>
              </div>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px]">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/assets/hero-banner-mobile.webp"
                type="image/webp"
              />
              <source
                media="(max-width: 1023px)"
                srcSet="/assets/hero-banner-tablet.webp"
                type="image/webp"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="/assets/hero-banner-desktop.webp"
                type="image/webp"
              />
              <img
                src="/assets/hero-banner-desktop.webp"
                alt="Colección de celulares modernos"
                className="absolute inset-0 w-full h-full object-contain"
                data-testid="img-hero-banner"
                fetchPriority="high"
                loading="eager"
                width="1408"
                height="768"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
