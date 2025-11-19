import { ShoppingCart, Search, Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { db } from "@/lib/instant";
import { getCartSessionId } from "@/lib/cart-instant";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();
  const sessionId = getCartSessionId();

  // Use InstantDB to get cart items in real-time
  const { data } = db.useQuery({
    cartItems: {
      $: {
        where: {
          sessionId,
        },
      },
    },
  });

  const cartCount = data?.cartItems?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleWhatsAppClick = () => {
    // WhatsApp number for Celuvendo - Replace with actual number
    const phoneNumber = "573001234567"; // Update with real WhatsApp number
    const message = encodeURIComponent("Hola! Me gustaría obtener información sobre sus productos.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Button size="icon" variant="ghost" className="md:hidden" data-testid="button-menu">
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <h1 className="text-xl md:text-2xl font-bold font-serif text-primary" data-testid="text-logo">
                Celuvendo
              </h1>
              <Badge variant="secondary" className="hidden md:flex text-xs">
                Colombia
              </Badge>
            </div>
          </Link>

          <div className="flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar celulares..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </form>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="md:hidden" data-testid="button-search-mobile">
              <Search className="h-5 w-5" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="h-12 w-12 text-green-600 hover:text-green-700 hover:bg-green-50"
              onClick={handleWhatsAppClick}
              data-testid="button-whatsapp"
              aria-label="Chatear con agente de IA en WhatsApp"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>

            <Link href="/carrito" aria-label="Ver carrito de compras">
              <Button size="icon" variant="ghost" className="relative h-12 w-12" data-testid="button-cart" aria-label="Carrito de compras">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <Badge
                    className="absolute -top-0.5 -right-0.5 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold bg-destructive hover:bg-destructive border-2 border-background"
                    data-testid="badge-cart-count"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>

        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar celulares..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-mobile"
            />
          </form>
        </div>
      </div>
    </header>
  );
}
