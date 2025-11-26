import { useRoute } from "wouter";
import { db } from "@/lib/instant";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Truck, Shield, Package, Star, Check, X } from "lucide-react";
import { formatCOP } from "@/lib/utils";
import { useMemo, useState } from "react";
import { addToCartInstant } from "@/lib/cart-instant";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const [, params] = useRoute("/producto/:slug");
  const slug = params?.slug;
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data, isLoading, error } = db.useQuery({ products: {} });

  const product = useMemo(() => {
    if (!data?.products) return null;
    return data.products.find((p: any) => p.slug === slug);
  }, [data, slug]);

  // Map color names to image indices (assuming first image is main, rest are color variants)
  const getImageIndexForColor = (colorName: string): number => {
    if (!product?.images) return 0;

    const colorLower = colorName.toLowerCase();
    // Mapping based on common color patterns in image names
    // Priority order matters - check more specific patterns first

    // TECNO Camon 40 Pro specific: Flyer (0), Negro (1), Blanco (2), Verde (3)
    if (product.name?.includes('Camon 40')) {
      if (colorLower.includes('negro') || colorLower.includes('black')) return 1;
      if (colorLower.includes('blanco') || colorLower.includes('white')) return 2;
      if (colorLower.includes('verde') || colorLower.includes('esmeralda') || colorLower.includes('green')) return 3;
    }

    // INFINIX Note 50S specific: azul (0), negro (1), gris (2)
    if (product.name?.includes('Note 50S')) {
      if (colorLower.includes('azul') || colorLower.includes('blue') || colorLower.includes('marine') || colorLower.includes('drift')) return 0;
      if (colorLower.includes('negro') || colorLower.includes('black') || colorLower.includes('obsidian')) return 1;
      if (colorLower.includes('gris') || colorLower.includes('grey') || colorLower.includes('gray') || colorLower.includes('titan')) return 2;
    }

    // Motorola Moto G06 specific: azul (0), naranja (1)
    if (product.name?.includes('Moto G06')) {
      if (colorLower.includes('azul') || colorLower.includes('blue') || colorLower.includes('starry')) return 0;
      if (colorLower.includes('naranja') || colorLower.includes('orange') || colorLower.includes('pastel')) return 1;
    }

    // Motorola Moto G55 specific: forest grey (0), pink (1), smoky green (2)
    if (product.name?.includes('Moto G55')) {
      if (colorLower.includes('forest') && colorLower.includes('grey')) return 0;
      if (colorLower.includes('twilight') || colorLower.includes('purple') || colorLower.includes('pink')) return 1;
      if (colorLower.includes('smoky') || colorLower.includes('green')) return 2;
    }

    // OPPO A5X specific: azul (0), blanco (1)
    if (product.name?.includes('A5X')) {
      if (colorLower.includes('azul') || colorLower.includes('blue') || colorLower.includes('lago') || colorLower.includes('tranquilo')) return 0;
      if (colorLower.includes('blanco') || colorLower.includes('white') || colorLower.includes('laser')) return 1;
    }

    // Xiaomi Redmi 15 specific: morado (0), gris (1), negro (2)
    if (product.name?.includes('Redmi 15') && !product.name?.includes('Note')) {
      if (colorLower.includes('morado') || colorLower.includes('purple') || colorLower.includes('arena')) return 0;
      if (colorLower.includes('gris') || colorLower.includes('grey') || colorLower.includes('gray') || colorLower.includes('titan')) return 1;
      if (colorLower.includes('negro') || colorLower.includes('black') || colorLower.includes('ocaso')) return 2;
    }

    // Xiaomi Redmi Note 14 Pro specific: negro (0), azul (1), morado (2)
    if (product.name?.includes('Redmi Note 14')) {
      if (colorLower.includes('negro') || colorLower.includes('black') || colorLower.includes('medianoche')) return 0;
      if (colorLower.includes('azul') || colorLower.includes('blue') || colorLower.includes('aurora')) return 1;
      if (colorLower.includes('morado') || colorLower.includes('purple') || colorLower.includes('cosmica')) return 2;
      return 1; // Default to azul for this product
    }

    // OPPO A5 5G specific: blanco (0), verde (1)
    if (colorLower.includes('mist')) return 0;
    if (colorLower.includes('aurora')) return 1;

    if (colorLower.includes('negro') || colorLower.includes('black') || colorLower.includes('obsidian') || colorLower.includes('midnight') || colorLower.includes('ocaso') || colorLower.includes('medianoche')) return 0;
    if (colorLower.includes('verde menta') || colorLower.includes('menta')) return 1;
    if (colorLower.includes('gris') || colorLower.includes('gray') || colorLower.includes('grey') || colorLower.includes('titan') || colorLower.includes('light gray')) return 1;
    if (colorLower.includes('verde') || colorLower.includes('green') || colorLower.includes('esmeralda') || colorLower.includes('smoky')) return 2;
    if ((colorLower.includes('azul') || colorLower.includes('blue') || colorLower.includes('marine') || colorLower.includes('drift') || colorLower.includes('starry') || colorLower.includes('lago') || colorLower.includes('aurora')) && !colorLower.includes('verde')) return 1;
    if (colorLower.includes('morado') || colorLower.includes('purple') || colorLower.includes('purpura') || colorLower.includes('twilight') || colorLower.includes('pink') || colorLower.includes('arena') || colorLower.includes('violeta')) return 1;
    if (colorLower.includes('forest') || colorLower.includes('dove')) return 2;
    if (colorLower.includes('naranja') || colorLower.includes('orange') || colorLower.includes('pastel')) return 1;
    if (colorLower.includes('blanco') || colorLower.includes('white') || colorLower.includes('glaciar') || colorLower.includes('laser')) return 1;

    return 0; // Default to first image
  };

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAdding(true);
    try {
      await addToCartInstant(product.id, 1);
      toast({
        title: "Producto agregado",
        description: `${product.name} fue agregado al carrito`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar el producto al carrito",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CategoryNav />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Skeleton className="aspect-square" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-24" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CategoryNav />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Producto no encontrado</h1>
            <p className="text-muted-foreground mb-4">
              El producto que buscas no existe o ha sido eliminado
            </p>
            <Button onClick={() => window.location.href = "/productos"}>
              Ver todos los productos
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:underline">Inicio</a>
            {" / "}
            <a href="/productos" className="hover:underline">Productos</a>
            {" / "}
            <span>{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Imagen del producto */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.images?.[currentImageIndex] || product.images?.[0] || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 transition-opacity duration-300"
                />
              </div>

              {product.colors && product.colors.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Colores disponibles:</p>
                  <div className="flex gap-2">
                    {product.colors.map((color: any) => {
                      const imageIndex = getImageIndexForColor(color.name);
                      return (
                        <div
                          key={color.name}
                          className="flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer hover:border-primary hover:bg-accent transition-all duration-200"
                          title={color.name}
                          onMouseEnter={() => setCurrentImageIndex(imageIndex)}
                          onMouseLeave={() => setCurrentImageIndex(0)}
                        >
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: color.code }}
                          />
                          <span className="text-sm">{color.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-muted-foreground">{product.sku}</p>

                {product.rating && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviewCount || 0} reseñas)
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold">{formatCOP(product.price)}</span>
                  {product.compareAtPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        {formatCOP(product.compareAtPrice)}
                      </span>
                      <Badge variant="destructive">{discount}% OFF</Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.stock > 0 ? (
                    <span className="text-green-600">✓ En stock ({product.stock} disponibles)</span>
                  ) : (
                    <span className="text-red-600">✗ Agotado</span>
                  )}
                </p>
              </div>

              <p className="text-lg">{product.description}</p>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full"
                  disabled={product.stock === 0 || isAdding}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isAdding ? 'Agregando...' : 'Agregar al Carrito'}
                </Button>
                <Button size="lg" variant="outline" className="w-full">
                  Comprar Ahora
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Envío gratis</p>
                    <p className="text-xs text-muted-foreground">En compras +$100.000</p>
                  </div>
                </Card>
                <Card className="p-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Garantía</p>
                    <p className="text-xs text-muted-foreground">12 meses oficial</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Tabs de información */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="description" className="text-xs md:text-sm">Descripción</TabsTrigger>
              <TabsTrigger value="specs" className="text-xs md:text-sm">Especificaciones</TabsTrigger>
              <TabsTrigger value="box" className="text-xs md:text-sm">Contenido</TabsTrigger>
              <TabsTrigger value="features" className="text-xs md:text-sm">Características</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card className="p-6">
                <div className="prose max-w-none">
                  {product.longDescription?.split('\n').map((paragraph: string, i: number) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <Card className="p-6">
                <div className="space-y-6">
                  {product.specifications?.screen && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3">📱 Pantalla</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div><span className="text-muted-foreground">Tamaño:</span> {product.specifications.screen.size}</div>
                        <div><span className="text-muted-foreground">Tipo:</span> {product.specifications.screen.type}</div>
                        <div><span className="text-muted-foreground">Resolución:</span> {product.specifications.screen.resolution}</div>
                        {product.specifications.screen.refreshRate && (
                          <div><span className="text-muted-foreground">Refresco:</span> {product.specifications.screen.refreshRate}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {product.specifications?.processor && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3">⚙️ Rendimiento</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div><span className="text-muted-foreground">Procesador:</span> {product.specifications.processor}</div>
                        <div><span className="text-muted-foreground">RAM:</span> {product.specifications.ram}</div>
                        <div><span className="text-muted-foreground">Almacenamiento:</span> {product.specifications.storage}</div>
                        {product.specifications.expandableStorage && (
                          <div><span className="text-muted-foreground">Expandible:</span> {product.specifications.expandableStorage}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {product.specifications?.camera && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3">📷 Cámaras</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div><span className="text-muted-foreground">Principal:</span> {product.specifications.camera.main}</div>
                        <div><span className="text-muted-foreground">Frontal:</span> {product.specifications.camera.front}</div>
                        {product.specifications.camera.depth && (
                          <div><span className="text-muted-foreground">Profundidad:</span> {product.specifications.camera.depth}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {product.specifications?.battery && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3">🔋 Batería</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div><span className="text-muted-foreground">Capacidad:</span> {product.specifications.battery.capacity}</div>
                        {product.specifications.battery.charging && (
                          <div><span className="text-muted-foreground">Carga:</span> {product.specifications.battery.charging}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="box" className="mt-6">
              <Card className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {product.boxContents?.included && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Package className="w-5 h-5 text-green-600" />
                        Incluido en la caja
                      </h3>
                      <ul className="space-y-2">
                        {product.boxContents.included.map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.boxContents?.notIncluded && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <X className="w-5 h-5 text-red-600" />
                        NO incluido
                      </h3>
                      <ul className="space-y-2">
                        {product.boxContents.notIncluded.map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <X className="w-4 h-4 text-red-600 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {product.features && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3">✨ Características</h3>
                      <ul className="space-y-2">
                        {product.features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-primary mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
