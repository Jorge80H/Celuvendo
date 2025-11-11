import { ShoppingCart, Search, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount] = useState(2);

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Button size="icon" variant="ghost" className="md:hidden" data-testid="button-menu">
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold font-serif text-primary" data-testid="text-logo">
              Celuvendo
            </h1>
            <Badge variant="secondary" className="hidden md:flex text-xs">
              Colombia
            </Badge>
          </div>

          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar celulares..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="md:hidden" data-testid="button-search-mobile">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button size="icon" variant="ghost" data-testid="button-support">
              <Phone className="h-5 w-5" />
            </Button>

            <Button size="icon" variant="ghost" className="relative" data-testid="button-cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  data-testid="badge-cart-count"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar celulares..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-mobile"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
