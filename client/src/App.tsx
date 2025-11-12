import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import SeedData from "@/pages/SeedData";
import FAQ from "@/pages/FAQ";
import Shipping from "@/pages/Shipping";
import Warranty from "@/pages/Warranty";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/productos" component={Products} />
      <Route path="/producto/:slug" component={ProductDetail} />
      <Route path="/carrito" component={Cart} />
      <Route path="/preguntas-frecuentes" component={FAQ} />
      <Route path="/envios-y-devoluciones" component={Shipping} />
      <Route path="/garantia" component={Warranty} />
      <Route path="/terminos-y-condiciones" component={Terms} />
      <Route path="/seed" component={SeedData} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
