import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Home from "./pages/shared/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/shared/ProductDetails";
import NotFound from "./pages/shared/NotFound";
import WalletScreen from "./pages/seller/Wallet";
import TransactionHistoryScreen from "./components/TransactionHistory";
import ProductValidationSubmission from "./pages/operator/ProductValidationSubmission";
import PendingVerificationsPage from "./pages/operator/PendingVerifications";
import ReviewProductPage from "./pages/operator/ProductVerification";
import ChangePassword from "./components/ChangePassword";
import ResetPassword from "./pages/shared/ResetPassword";
import EditProfile from "./pages/shared/EditProfile";
import CreateProduct from "./pages/seller/CreateProduct";
import EditProduct from "./pages/seller/EditProduct";
import WithdrawScreen from "./pages/seller/WithdrawScreen";
import CreateStaffForm from "./components/CreateStaffForm";
import InventoryManagement from "./pages/operator/InventoryManagement";
import BankAccountsScreen from "./pages/seller/BankAccountsScreen";
import AddBankAccountScreen from "./pages/seller/AddBankAccountScreen";
import OrdersManagement from "./pages/admin/AdminOrdersManagement";
import RegisterEntry from "./pages/operator/RegisterEntry";
import RegisterExit from "./pages/operator/RegisterExit";
import RateSeller from "./pages/buyer/RateSeller";
import NotificationsScreen from "./pages/shared/NotificationsScreen";
import { NotificationProvider } from "./context/NotificationContext";
import { UserRole } from "./enums/user";
import CreateDispute from "./pages/buyer/CreateDispute";
import IdentityVerification from "./pages/seller/IdentityVerification";
import SellerProfileScreen from "./pages/shared/SellerProfile";
import SellerOrdersHistory from "./pages/seller/SellerOrdersHistory";
import SettingsScreen from "./pages/shared/Settings";
import BuyerOrdersHistory from "./pages/buyer/BuyerOrdersHistory";
import CartPage from "./pages/buyer/CartPage";
import OrderTracking from "./pages/buyer/OrderTracking";
import SalesCenter from "./pages/seller/SalesCenter";
import MyProductsPage from "./pages/buyer/MyProducts";
import DeliveryOrdersHistory from "./pages/deliverer/DeliveryOrdersHistory";
import WalletManagement from "./pages/seller/WalletManagement";
import OperatorDashboard from "./pages/operator/OperatorDashboard";
import SupportPage from "./pages/buyer/SupportPage";
import IdentityVerificationManagement from "./pages/admin/IdentityVerificationManagement";
import AdminDeliveryManagement from "./pages/admin/AdminDeliveryManagement";
import TransactionsManagement from "./pages/admin/AdminTransactionsManagement";
import PaymentsManagement from "./pages/admin/AdminPaymentsManagement";
import DisputesManagement from "./pages/admin/AdminDisputesManagement";
import UsersManagement from "./pages/admin/AdminUsersManagement";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ShelvesManagement from "./pages/operator/ShelvesManagement";
import UserProfileScreen from "./pages/user/UserProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/entrar" element={<Login />} />
            <Route path="/criar-conta" element={<Register />} />
            <Route path="/esqueceu-senha" element={<ResetPassword />} />
            <Route path="/detalhes-produto" element={<ProductDetails />} />
            <Route path="/notificacoes" element={<NotificationsScreen />} />
            <Route
              path="/perfil-vendedor/:sellerSlug"
              element={<SellerProfileScreen />}
            />
            <Route path="/configuracoes" element={<SettingsScreen />} />

            <Route
              path="/detalhes-produto/:slug"
              element={<ProductDetails />}
            />
            <Route path="/perfil" element={<UserProfileScreen />} />
            <Route element={<ProtectedRoute allowedRoles={[UserRole.BUYER]} />}>
              <Route path="/editar-perfil" element={<EditProfile />} />
              <Route path="/alterar-senha" element={<ChangePassword />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/meus-pedidos" element={<BuyerOrdersHistory />} />
              <Route path="/central-reclamacoes" element={<CreateDispute />} />
              <Route path="/avaliar-vendedor" element={<RateSeller />} />

              <Route path="/acompanhar-pedido" element={<OrderTracking />} />
              <Route path="/suporte" element={<SupportPage />} />
            </Route>

            {/* --- 3. ÁREA DO VENDEDOR (SELLER) --- */}
            <Route
              element={<ProtectedRoute allowedRoles={[UserRole.SELLER]} />}
            >
              <Route path="/minhas-vendas" element={<SellerOrdersHistory />} />
              <Route
                path="/transacoes"
                element={<TransactionHistoryScreen />}
              />
              <Route path="/carteira" element={<WalletScreen />} />

              <Route path="/centro-vendas" element={<SalesCenter />} />
              <Route path="/meus-produtos" element={<MyProductsPage />} />
              <Route path="/adicionar-produto" element={<CreateProduct />} />
              <Route path="/editar-produto" element={<EditProduct />} />
              <Route
                path="/verificacao-identidade"
                element={<IdentityVerification />}
              />
              <Route
                path="/submeter-produto"
                element={<ProductValidationSubmission />}
              />
              <Route
                path="/realizar-levantamento"
                element={<WithdrawScreen />}
              />
            </Route>

            {/* --- 4. ÁREA ENTREGAS (DELIVERER) --- */}
            <Route
              element={<ProtectedRoute allowedRoles={[UserRole.DELIVERER]} />}
            >
              <Route path="/area-entregas" element={<OperatorDashboard />} />
              <Route
                path="/area-entregas/minhas-entregas"
                element={<DeliveryOrdersHistory />}
              />
            </Route>

            {/* --- 4. ÁREA OPERACIONAL (OPERATOR) --- */}
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={[UserRole.OPERATOR, UserRole.ADMIN]}
                />
              }
            >
              <Route path="/area-operacional" element={<OperatorDashboard />} />
              <Route
                path="/area-operacional/pedidos"
                element={<OrdersManagement />}
              />
              <Route
                path="/area-operacional/prateleiras"
                element={<ShelvesManagement />}
              />

              <Route
                path="/area-operacional/verificacoes-pendentes"
                element={<PendingVerificationsPage />}
              />
              <Route
                path="/area-operacional/validar-produto"
                element={<ReviewProductPage />}
              />
              <Route
                path="/area-operacional/gestao-estoque"
                element={<InventoryManagement />}
              />
              <Route
                path="/area-operacional/registar-entrada"
                element={<RegisterEntry />}
              />
              <Route
                path="/area-operacional/registar-saida"
                element={<RegisterExit />}
              />
            </Route>

            {/* --- 5. ÁREA ADMINISTRATIVA (ADMIN) --- */}
            <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
              <Route path="/area-administrativa" element={<AdminDashboard />} />
              <Route
                path="/area-administrativa/usuarios"
                element={<UsersManagement />}
              />
              <Route
                path="/area-administrativa/reclamacoes"
                element={<DisputesManagement />}
              />
              <Route
                path="/area-administrativa/verificacoes-identidade"
                element={<IdentityVerificationManagement />}
              />
              <Route
                path="/area-administrativa/entregas"
                element={<AdminDeliveryManagement />}
              />
              <Route
                path="/area-administrativa/transacoes"
                element={<TransactionsManagement />}
              />

              <Route
                path="/area-administrativa/pagamentos"
                element={<PaymentsManagement />}
              />
              <Route
                path="/area-administrativa/carteiras"
                element={<WalletManagement />}
              />
              <Route
                path="/area-administrativa/adicionar-colaborador"
                element={<CreateStaffForm />}
              />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                path="/contas-bancarias"
                element={<BankAccountsScreen />}
              />
              <Route
                path="/contas-bancarias/nova"
                element={<AddBankAccountScreen />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
