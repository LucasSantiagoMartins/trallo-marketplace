import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileLayout from "@/layouts/MobileLayout";
import PerformanceCard from "../components/PerformanceCard";
import PageHeader from "../components/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/utils/currency";
import { BASE_UPLOAD_URL } from "@/api/endpoints";

const SalesCenter: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    {
      label: "Vendas Totais",
      value: "150.000 Kz",
      icon: "payments",
      color: "bg-green-500",
      path: "/transacoes",
    },
    {
      label: "Produtos Ativos",
      value: "12",
      icon: "inventory_2",
      color: "bg-orange-500",
      path: "/meus-produtos",
    },
    {
      label: "Novo Produto",
      value: "Adicionar",
      icon: "add_box",
      color: "bg-primary",
      path: "/adicionar-produto",
    },
  ];

  const recentOrders = [
    {
      id: "1",
      productName: "iPhone 13 Pro Max",
      price: 450000,
      status: "Pendente",
      date: "Hoje, 12:30",
      image: "path-to-image.jpg",
    },
    {
      id: "2",
      productName: "MacBook Air M1",
      price: 600000,
      status: "Concluído",
      date: "Ontem, 18:45",
      image: "path-to-image-2.jpg",
    },
  ];

  const RightElement = (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => navigate("/perfil")}
    >
      <div className="text-right hidden sm:block">
        <p className="text-[10px] text-[#8c5f67] dark:text-gray-400 font-bold uppercase tracking-wider">
          Olá, {user?.userName || "Vendedor"}
        </p>
      </div>
      <div className="size-10 rounded-full border-2 border-primary/20 p-0.5 shadow-sm">
        <div
          className="w-full h-full rounded-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&h=100&auto=format&fit=crop")',
          }}
        />
      </div>
    </div>
  );

  return (
    <MobileLayout>
      <PageHeader title="Centro de Vendas" rightElement={RightElement} />

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(stat.path)}
                  className="bg-card p-5 rounded-[2rem] border border-border shadow-soft flex flex-col items-start text-left hover:border-primary/30 transition-colors"
                >
                  <div
                    className={`${stat.color} size-10 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {stat.icon}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <h3 className="text-lg font-black mt-1 tracking-tight">
                    {stat.value}
                  </h3>
                </motion.button>
              ))}
            </section>

            <div className="bg-card rounded-[2.5rem] border border-border overflow-hidden">
              <PerformanceCard />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold tracking-tight">
                Pedidos Recentes
              </h3>
              <button
                onClick={() => navigate("/meus-pedidos")}
                className="text-primary text-sm font-bold hover:underline"
              >
                Ver todos
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {recentOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ y: -2 }}
                  className="bg-card p-4 rounded-3xl border border-border flex items-center gap-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="size-20 rounded-2xl overflow-hidden bg-secondary shrink-0 border border-border">
                    <img
                      src={
                        order.image.startsWith("http")
                          ? order.image
                          : `${BASE_UPLOAD_URL}/${order.image}`
                      }
                      className="size-full object-cover"
                      alt={order.productName}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm truncate pr-2">
                        {order.productName}
                      </h4>
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${
                          order.status === "Pendente"
                            ? "bg-orange-100 text-orange-600 dark:bg-orange-500/10"
                            : "bg-green-100 text-green-600 dark:bg-green-500/10"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">
                      {order.date}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-primary font-black text-base">
                        {formatPrice(order.price, true)}
                      </span>
                      <button
                        onClick={() => navigate(`/detalhe-pedido`)}
                        className="size-8 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform"
                      >
                        <span className="material-symbols-outlined text-lg">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {recentOrders.length === 0 && (
                <div className="py-12 text-center opacity-40 border-2 border-dashed border-border rounded-[2.5rem]">
                  <span className="material-symbols-outlined text-4xl mb-2">
                    order_approve
                  </span>
                  <p className="font-medium">Nenhum pedido hoje</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </MobileLayout>
  );
};

export default SalesCenter;
