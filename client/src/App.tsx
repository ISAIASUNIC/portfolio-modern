import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Navigation from "./components/Navigation";
import FloatingCart from "./components/FloatingCart";
import DeliveryHome from "./pages/DeliveryHome";
import RestaurantMenu from "./pages/RestaurantMenu";
import ErrorBoundary from "./components/ErrorBoundary";
import { Route, Switch } from "wouter";

/**
 * Main App Component - Delivery App
 * Modern delivery platform with restaurants, menu, and cart
 * Design: Dark mode with glassmorphism and premium interactions
 */
function Router() {
  return (
    <Switch>
      <Route path={"/"} component={DeliveryHome} />
      <Route path={"/restaurant/:id"} component={RestaurantMenu} />
      {/* Final fallback route */}
      <Route component={DeliveryHome} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <div className="bg-slate-900 text-slate-100 overflow-x-hidden">
              <Navigation />
              <main>
                <Router />
              </main>
              <FloatingCart />
            </div>
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
