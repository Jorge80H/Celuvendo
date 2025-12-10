import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { lazy, Suspense } from "react";

// Eager load critical pages
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";

// Lazy load secondary pages
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const PaymentConfirmation = lazy(() => import("@/pages/PaymentConfirmation"));
const SeedData = lazy(() => import("@/pages/SeedData"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Shipping = lazy(() => import("@/pages/Shipping"));
const Stores = lazy(() => import("@/pages/Stores"));
const Warranty = lazy(() => import("@/pages/Warranty"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const DataProtection = lazy(() => import("@/pages/DataProtection"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/productos" component={Products} />
        <Route path="/producto/:slug" component={ProductDetail} />
        <Route path="/carrito" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/payment/confirmation" component={PaymentConfirmation} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
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
    </Suspense>
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
