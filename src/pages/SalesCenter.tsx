import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileLayout from "@/layouts/MobileLayout";
import PerformanceCard from "../components/PerformanceCard";
import PageHeader from "../components/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/utils/currency";

const SalesCenter: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    {
      label: "Vendas Totais",
      value: "150.000 Kz",
      icon: "payments",
      color: "emerald",
    },
    {
      label: "Produtos Ativos",
      value: "12",
      icon: "inventory_2",
      color: "orange",
    },
    {
      label: "Meus Produtos",
      value: "Gerenciar",
      icon: "add_shopping_cart",
      color: "blue",
      isClickable: true,
      path: "/meus-produtos",
    },
  ];

  const recentOrders = [
    {
      id: "1",
      productName: "iPhone 13 Pro Max",
      price: 450000,
      status: "Pendente",
      date: "Hoje, 12:30",
      image:
        "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
      id: "2",
      productName: "MacBook Air M1",
      price: 600000,
      status: "Concluído",
      date: "Ontem, 18:45",
      image:
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
      id: "3",
      productName: "AirPods Pro",
      price: 120000,
      status: "Concluído",
      date: "24 Out, 10:15",
      image:
        "https://images.unsplash.com/photo-1588423770574-910ae97c653a?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
      id: "4",
      productName: "Apple Watch S7",
      price: 250000,
      status: "Concluído",
      date: "22 Out, 09:00",
      image:
        "https://images.unsplash.com/photo-1546868871-70c122469d8b?q=80&w=200&h=200&auto=format&fit=crop",
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 flex flex-col space-y-6 sm:space-y-10 h-auto sm:h-[calc(100vh-theme(spacing.2))] overflow-visible sm:overflow-hidden">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 shrink-0">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileTap={stat.isClickable ? { scale: 0.98 } : {}}
              onClick={() =>
                stat.isClickable && stat.path && navigate(stat.path)
              }
              className={`bg-card p-4 sm:p-5 rounded-[2rem] border border-border shadow-soft flex items-center gap-4 transition-all ${
                stat.isClickable
                  ? "cursor-pointer hover:border-primary/40 hover:shadow-md"
                  : ""
              }`}
            >
              <div
                className={`size-11 sm:size-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  stat.color === "emerald"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : stat.color === "orange"
                      ? "bg-orange-500/10 text-orange-500"
                      : "bg-blue-500/10 text-blue-500"
                }`}
              >
                <span className="material-symbols-outlined text-xl sm:text-2xl">
                  {stat.icon}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-[9px] sm:text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-0.5">
                  {stat.label}
                </p>
                <div className="text-base sm:text-lg font-black truncate tracking-tight text-foreground">
                  {stat.value}
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 flex-1 min-h-0 pb-32 sm:pb-32">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            <div className="bg-card rounded-[2.5rem] border border-border overflow-hidden shadow-soft flex flex-col flex-1 min-h-[300px]">
              <div className="flex-1 w-full">
                <PerformanceCard />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex flex-col min-h-0">
            <div className="flex items-center justify-between px-2 mb-4 shrink-0">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Pedidos Recentes
              </h3>
              <button
                onClick={() => navigate("/meus-pedidos")}
                className="text-primary text-sm font-bold hover:underline"
              >
                Ver todos
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto sm:overflow-y-auto pr-2 space-y-3 scroll-smooth pb-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {recentOrders.map((order) => (
                <motion.div
                  key={order.id}
                  className="bg-card p-3.5 rounded-[1.8rem] border border-border flex items-center gap-4 shadow-sm shrink-0"
                >
                  <div className="size-14 rounded-2xl overflow-hidden bg-secondary shrink-0 shadow-inner">
                    <img
                      src={order.image}
                      className="size-full object-cover"
                      alt={order.productName}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-[13px] truncate text-foreground pr-2 uppercase tracking-tight">
                        {order.productName}
                      </h4>
                      <span
                        className={`text-[7px] font-black uppercase px-2 py-0.5 rounded-md shrink-0 ${
                          order.status === "Pendente"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-end justify-between mt-1">
                      <div className="space-y-0.5">
                        <p className="text-[9px] text-muted-foreground">
                          {order.date}
                        </p>
                        <span className="text-primary font-black text-sm">
                          {formatPrice(order.price, true)}
                        </span>
                      </div>
                      <button className="size-7 rounded-full bg-secondary flex items-center justify-center active:bg-primary/20 transition-all">
                        <span className="material-symbols-outlined text-base">
                          chevron_right
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </MobileLayout>
  );
};

export default SalesCenter;
