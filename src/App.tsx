import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "@/context/ToastContext";
import ToastContainer from "@/components/Toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./pages/CreateProduct";
import NotFound from "./pages/NotFound";
import UserProfileScreen from "./pages/UserProfile";
import WalletScreen from "./pages/Wallet";
import TransactionHistoryScreen from "./components/TransactionHistory";
import OrdersHistory from "./pages/OrdersHistory";
import OrderDetail from "./pages/OrderDetail";
import CartPage from "./pages/CartPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
    <TooltipProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/registrar" element={<Register />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/adicionar-produto" element={<CreateProduct />} />
          {/* Placeholder routes for bottom nav */}
          <Route path="/explorar" element={<Home />} />
        <Route path="/carrinho" element={<CartPage />} />
          <Route path="/perfil" element={<UserProfileScreen />} />
          <Route path="/meus-pedidos" element={<OrdersHistory />} />
          <Route path="/carteira" element={<WalletScreen />} />
          <Route path="/transacoes" element={<TransactionHistoryScreen />} />
          <Route path="/detalhe-pedido" element={<OrderDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ToastProvider>
  </QueryClientProvider>
);

export default App;
