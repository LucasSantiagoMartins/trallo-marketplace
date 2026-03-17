import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import UserProfileScreen from "./pages/UserProfile";
import WalletScreen from "./pages/Wallet";
import TransactionHistoryScreen from "./components/TransactionHistory";
import BuyerOrdersHistory from "./pages/BuyerOrdersHistory";
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
import CreateStaffForm from "./components/CreateStaffForm";
import InventoryManagement from "./pages/InventoryManagement";
import OperatorDashboard from "./pages/OperatorDashboard";
import WalletManagement from "./pages/WalletManagement";
import SalesCenter from "./pages/SalesCenter";
import BankAccountsScreen from "./pages/BankAccountsScreen";
import AddBankAccountScreen from "./pages/AddBankAccountScreen";
import SupportPage from "./pages/SupportPage";
import SellerOrdersHistory from "./pages/SellerOrdersHistory";
import OrdersManagement from "./pages/OrdersManagement";
import RegisterEntry from "./pages/RegisterEntry";
import RegisterExit from "./pages/RegisterExit";
import ShelvesManagement from "./pages/ShelvesManagement";
import SellerProfileScreen from "./pages/SellerProfile";
import RateSeller from "./pages/RateSeller";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {/* --- 1. ROTAS PÚBLICAS --- */}
            <Route path="/" element={<Home />} />
            <Route path="/entrar" element={<Login />} />
            <Route path="/criar-conta" element={<Register />} />
            <Route path="/esqueceu-senha" element={<ResetPassword />} />
            <Route path="/detalhes-produto" element={<ProductDetails />} />
            <Route
              path="/perfil-vendedor/:sellerSlug"
              element={<SellerProfileScreen />}
            />
            <Route path="/avaliar-vendedor" element={<RateSeller />} />
            <Route
              path="/detalhes-produto/:slug"
              element={<ProductDetails />}
            />
            {/* --- 2. ROTAS PRIVADAS (CLIENTES / GERAL) --- */}
            <Route element={<ProtectedRoute />}>
              <Route path="/perfil" element={<UserProfileScreen />} />
              <Route path="/editar-perfil" element={<EditProfile />} />
              <Route path="/alterar-senha" element={<ChangePassword />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/meus-pedidos" element={<BuyerOrdersHistory />} />
              <Route path="/minhas-vendas" element={<SellerOrdersHistory />} />
              <Route path="/detalhe-pedido" element={<OrderDetail />} />
              <Route path="/carteira" element={<WalletScreen />} />
              <Route path="/suporte" element={<SupportPage />} />
              <Route
                path="/transacoes"
                element={<TransactionHistoryScreen />}
              />
              <Route path="/configuracoes" element={<SettingsScreen />} />
            </Route>

            {/* --- 3. ÁREA DO VENDEDOR (SELLER) --- */}
            <Route
              element={<ProtectedRoute allowedRoles={["SELLER", "ADMIN"]} />}
            >
              <Route path="/centro-vendas" element={<SalesCenter />} />
              <Route path="/meus-produtos" element={<MyProductsScreen />} />
              <Route path="/adicionar-produto" element={<CreateProduct />} />
              <Route path="/editar-produto" element={<EditProduct />} />

              <Route
                path="/submeter-produto"
                element={<ProductValidationSubmission />}
              />
              <Route
                path="/realizar-levantamento"
                element={<WithdrawScreen />}
              />
            </Route>

            {/* --- 4. ÁREA OPERACIONAL (OPERATOR) --- */}
            <Route
              element={<ProtectedRoute allowedRoles={["OPERATOR", "ADMIN"]} />}
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
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
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
                path="/area-administrativa/pagamentos"
                element={<PaymentsManagement />}
              />
              <Route
                path="/area-administrativa/carteiras"
                element={<WalletManagement />}
              />
              <Route
                path="/area-administrativa/adicionar-operador"
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
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
