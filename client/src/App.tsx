import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { OrderProvider } from "./contexts/OrderContext";
import Navigation from "./components/Navigation";
import FloatingCart from "./components/FloatingCart";
import DeliveryHome from "./pages/DeliveryHome";
import RestaurantMenu from "./pages/RestaurantMenu";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
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
      <Route path={"./"} component={DeliveryHome} />
      <Route path={"/restaurant/:id"} component={RestaurantMenu} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/order-confirmation"} component={OrderConfirmation} />
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
          <OrderProvider>
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
          </OrderProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
