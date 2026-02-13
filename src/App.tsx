import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import ToastContainer from "@/components/Toast";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import UserProfileScreen from "./pages/UserProfile";
import WalletScreen from "./pages/Wallet";
import TransactionHistoryScreen from "./components/TransactionHistory";
import OrdersHistory from "./pages/OrdersHistory";
import OrderDetail from "./pages/OrderDetail";
import CartPage from "./pages/CartPage";
import SettingsScreen from "./pages/Settings";
import MyProductsScreen from "./pages/MyProducts";
import ProductValidationSubmission from "./pages/ProductValidationSubmission";
import PendingVerificationsPage from "./pages/PendingVerifications";
import ReviewProductPage from "./pages/ProductVerification";
import ChangePassword from "./components/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import EditProfile from "./pages/EditProfile";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import WithdrawScreen from "./pages/WithdrawScreen";
import AdminDashboard from "./pages/AdminDashboard";
import UsersManagement from "./pages/UsersManagement";
import TransactionsManagement from "./pages/TransactionsManagement";
import PaymentsManagement from "./pages/PaymentsManagement";
import OperatorsManagement from "./pages/OperatorsManagement";
import CreateStaffForm from "./components/CreateStaffForm";
import AdminSettings from "./pages/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* O AuthProvider deve envolver tudo o que precisa de dados do usuário */}
    <AuthProvider>
      <ToastProvider>
        <TooltipProvider>
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              {/* --- ROTAS PÚBLICAS --- */}
              <Route path="/" element={<Home />} />
              <Route path="/entrar" element={<Login />} />
              <Route path="/area-administrativa" element={<AdminDashboard />} />
              <Route
                path="/area-administrativa/usuarios"
                element={<UsersManagement />}
              />
              <Route
                path="/area-administrativa/transacoes"
                element={<TransactionsManagement />}
              />
              <Route
                path="/area-administrativa/operadores"
                element={<OperatorsManagement />}
              />
              <Route
                path="/area-administrativa/adicionar-operador"
                element={<CreateStaffForm type="OPERATOR" />}
              />
              <Route
                path="/area-administrativa/adicionar-administrador"
                element={<CreateStaffForm type="ADMIN" />}
              />
              <Route
                path="/area-administrativa/pagamentos"
                element={<PaymentsManagement />}
              />
               <Route
                path="/area-administrativa/configuracoes"
                element={<AdminSettings />}
              />
              <Route path="/registrar" element={<Register />} />
              <Route path="/detalhes-produto" element={<ProductDetails />} />
              <Route path="/alterar-senha" element={<ChangePassword />} />
              <Route path="/esqueceu-senha" element={<ResetPassword />} />
              <Route path="/editar-perfil" element={<EditProfile />} />
              <Route
                path="/submeter-produto"
                element={<ProductValidationSubmission />}
              />
              <Route
                path="/verificacoes-pendentes"
                element={<PendingVerificationsPage />}
              />
              <Route path="/validar-produto" element={<ReviewProductPage />} />

              {/* --- ROTAS PRIVADAS (Qualquer user logado) --- */}
              <Route
                path="/carrinho"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/perfil"
                element={
                  <ProtectedRoute>
                    <UserProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/meus-pedidos"
                element={
                  <ProtectedRoute>
                    <OrdersHistory />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/meus-produtos"
                element={
                  <ProtectedRoute>
                    <MyProductsScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/detalhe-pedido"
                element={
                  <ProtectedRoute>
                    <OrderDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/carteira"
                element={
                  <ProtectedRoute>
                    <WalletScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transacoes"
                element={
                  <ProtectedRoute>
                    <TransactionHistoryScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/configuracoes"
                element={
                  <ProtectedRoute>
                    <SettingsScreen />
                  </ProtectedRoute>
                }
              />

              {/* --- ROTAS RESTRITAS (SELLER OU ADMIN) --- */}
              <Route
                path="/adicionar-produto"
                element={
                  <ProtectedRoute allowedRoles={["SELLER", "ADMIN"]}>
                    <CreateProduct />
                  </ProtectedRoute>
                }
              />

              {/* --- ROTAS RESTRITAS (SELLER OU ADMIN) --- */}
              <Route
                path="/editar-produto"
                element={
                  <ProtectedRoute allowedRoles={["SELLER", "ADMIN"]}>
                    <EditProduct />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/realizar-levantamento"
                element={
                  <ProtectedRoute allowedRoles={["SELLER", "ADMIN"]}>
                    <WithdrawScreen />
                  </ProtectedRoute>
                }
              />

              {/* CATCH-ALL */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ToastProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
