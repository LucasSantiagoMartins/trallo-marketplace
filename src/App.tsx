import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "@/context/ToastContext";
import ToastContainer from "@/components/Toast";
import { ProtectedRoute } from "@/components/ProtectedRoute";

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
import SettingsScreen from "./pages/Settings";
import ProductValidationScreen from "./pages/ProductValidationScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <TooltipProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            {/* --- ROTAS PÚBLICAS --- */}
            <Route path="/" element={<Home />} />
            <Route path="/entrar" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/produto/:id" element={<ProductDetails />} />
            <Route path="/submeter-produto" element={<ProductValidationScreen />} />

            {/* --- ROTAS PRIVADAS (Qualquer user logado) --- */}
            <Route path="/carrinho" element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } />
            <Route path="/perfil" element={
              <ProtectedRoute>
                <UserProfileScreen />
              </ProtectedRoute>
            } />
            <Route path="/meus-pedidos" element={
              <ProtectedRoute>
                <OrdersHistory />
              </ProtectedRoute>
            } />
            <Route path="/detalhe-pedido" element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            } />
            <Route path="/carteira" element={
              <ProtectedRoute>
                <WalletScreen />
              </ProtectedRoute>
            } />
            <Route path="/transacoes" element={
              <ProtectedRoute>
                <TransactionHistoryScreen />
              </ProtectedRoute>
            } />
            <Route path="/configuracoes" element={
              <ProtectedRoute>
                <SettingsScreen />
              </ProtectedRoute>
            } />

            {/* --- ROTAS RESTRITAS (SELLER OU ADMIN) --- */}
            <Route 
              path="/adicionar-produto" 
              element={
                <ProtectedRoute allowedRoles={["SELLER", "ADMIN"]}>
                  <CreateProduct /> 
                </ProtectedRoute>
              } 
            />

            {/* CATCH-ALL */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ToastProvider>
  </QueryClientProvider>
);

export default App;