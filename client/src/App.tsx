import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import PaymentConfirmation from "@/pages/PaymentConfirmation";
import SeedData from "@/pages/SeedData";
import FAQ from "@/pages/FAQ";
import Shipping from "@/pages/Shipping";
import Stores from "@/pages/Stores";
import Warranty from "@/pages/Warranty";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import DataProtection from "@/pages/DataProtection";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/productos" component={Products} />
      <Route path="/producto/:slug" component={ProductDetail} />
      <Route path="/carrito" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/payment/confirmation" component={PaymentConfirmation} />
      <Route path="/preguntas-frecuentes" component={FAQ} />
      <Route path="/envios-y-devoluciones" component={Shipping} />
      <Route path="/tiendas" component={Stores} />
      <Route path="/garantia" component={Warranty} />
      <Route path="/terminos-y-condiciones" component={Terms} />
      <Route path="/politica-de-privacidad" component={Privacy} />
      <Route path="/tratamiento-de-datos" component={DataProtection} />
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
        <WhatsAppFloat />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
