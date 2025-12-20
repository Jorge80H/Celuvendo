import { Link } from "wouter";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Blog articles data - En producción esto vendría de archivos .md en blog-content/
const blogArticles = [
  {
    slug: "celulares-regalo-navidad-colombia-2025",
    title: "Los Mejores Celulares para Regalar en Navidad 2025 | Celuvendo Colombia",
    excerpt: "Descubre los mejores celulares para regalar esta Navidad en Colombia. Envío rápido, precios increíbles y garantía oficial. ¡Entrega antes del 24!",
    category: "Temporada/Especial",
    date: "2025-12-19",
    readTime: "18 min",
    image: "/assets/blog/celulares-regalo-navidad-colombia-2025-hero.jpg",
    keywords: ["celulares regalo navidad colombia", "celular regalo navidad 2025", "mejores celulares para regalar", "celulares baratos navidad colombia", "regalo navidad smartphone"]
  },
  {
    slug: "mejor-celular-para-trabajar-colombia-2025",
    title: "Mejor Celular para Trabajar en Colombia 2025: Guía Completa para Profesionales",
    excerpt: "¿Te quedas sin batería a mitad del día? Descubre los mejores celulares para trabajar: conductores, repartidores, vendedores y teletrabajo. Batería duradera y cámaras profesionales.",
    category: "Uso-Necesidad",
    date: "2025-12-16",
    readTime: "15 min",
    image: "/assets/blog/mejor-celular-para-trabajar-colombia-2025-hero.jpg",
    keywords: ["celular para trabajar", "mejor celular trabajo Colombia", "celular batería larga", "celular para Uber", "smartphone profesional"]
  },
  {
    slug: "celulares-xiaomi-bogota-envio-rapido",
    title: "Celulares Xiaomi en Bogotá 2025: Envío Rápido y Mejor Precio",
    excerpt: "¿Estás buscando un celular Xiaomi en Bogotá pero te preocupa esperar semanas para que llegue? Descubre cómo recibir tu Xiaomi en 24-48 horas con hasta 20% de descuento vs retail tradicional.",
    category: "Geo-localizado",
    city: "Bogotá",
    date: "2025-01-15",
    readTime: "12 min",
    image: "/assets/blog/celulares-xiaomi-bogota-envio-rapido-hero.jpg",
    keywords: ["celulares Xiaomi Bogotá", "Xiaomi envío rápido", "Redmi Note 14 Pro Bogotá", "comprar Xiaomi Colombia"]
  }
  // Más artículos se agregarán aquí
];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Blog de Celuvendo
              </h1>
              <p className="text-xl text-muted-foreground">
                Guías de compra, comparativas y todo lo que necesitas saber para elegir tu próximo celular en Colombia.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b bg-card">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge variant="default" className="cursor-pointer whitespace-nowrap">
                Todos
              </Badge>
              <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
                Geo-localizado
              </Badge>
              <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
                Guías de Compra
              </Badge>
              <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
                Reviews
              </Badge>
              <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
                Comparativas
              </Badge>
            </div>
          </div>
        </section>

        {/* Blog Articles Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            {blogArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Próximamente encontrarás aquí artículos útiles sobre celulares.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Estamos preparando contenido de calidad para ayudarte a tomar la mejor decisión.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogArticles.map((article) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                      {/* Featured Image */}
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        {article.image ? (
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            width="640"
                            height="360"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            📱
                          </div>
                        )}
                        {article.city && (
                          <Badge className="absolute top-2 right-2 bg-primary">
                            {article.city}
                          </Badge>
                        )}
                      </div>

                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                        </div>
                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {article.excerpt}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(article.date).toLocaleDateString('es-CO', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>

                        {article.keywords && article.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {article.keywords.slice(0, 3).map((keyword) => (
                              <span
                                key={keyword}
                                className="text-xs px-2 py-1 bg-muted rounded-md"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-muted/50 py-12">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Quieres más consejos sobre celulares?
            </h2>
            <p className="text-muted-foreground mb-6">
              Síguenos en redes sociales para estar al día con las últimas novedades y ofertas.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/productos">
                <a className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Ver Productos
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
