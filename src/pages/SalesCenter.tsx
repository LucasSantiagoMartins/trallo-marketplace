import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import MobileLayout from "@/layouts/MobileLayout";
import PerformanceCard from "../components/PerformanceCard";
import PageHeader from "../components/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/utils/currency";
import { getSalesSummary } from "@/services/sales.service";
import { formatDateFriendly } from "@/utils/date";
import OrderDetailsModal from "@/components/OrderDetailsModal";
import BottomNavigation from "@/components/BottomNavigation";
import { getOrderStatusColor, getOrderStatusLabel } from "@/utils/mappers/order.mapper";

export interface MonthOverMonth {
  percentage: number;
  value: number;
  isGrowth: boolean;
}

export interface SalesMetrics {
  monthOverMonth: MonthOverMonth;
}

export interface SalesPerformance {
  day?: string;
  week?: string;
  value: number;
}

export interface SalesSummary {
  total: {
    count: number;
    totalValue: number;
  };
  performance: {
    weekly: SalesPerformance[];
    monthly: SalesPerformance[];
  };
  metrics: SalesMetrics;
  recentOrders: any[];
}

const SalesCenter: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { data: salesResponse, isLoading } = useQuery({
    queryKey: ["sales-summary"],
    queryFn: getSalesSummary,
  });

  const salesData = salesResponse?.data as unknown as SalesSummary;

  const { total, metrics, performance, recentOrders } = salesData || {
    total: { count: 0, totalValue: 0 },
    metrics: { monthOverMonth: { percentage: 0, value: 0, isGrowth: true } },
    performance: { weekly: [], monthly: [] },
    recentOrders: [],
  };

  const handleOpenDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const renderGrowthBadge = (mom?: MonthOverMonth, isCurrency?: boolean) => {
    if (!mom) return null;

    return (
      <div className="flex flex-col items-end justify-center gap-1 ml-auto shrink-0">
        <div
          className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-black shadow-sm ${
            mom.isGrowth
              ? "bg-emerald-500/10 text-emerald-500"
              : "bg-rose-500/10 text-rose-500"
          }`}
        >
          <span className="material-symbols-outlined text-[12px] font-bold">
            {mom.isGrowth ? "trending_up" : "trending_down"}
          </span>
          {mom.isGrowth ? "+" : "-"}
          {mom.percentage}%
        </div>

        <div
          className={`flex items-center gap-1 text-[10px] sm:text-[12px] font-bold ${
            mom.isGrowth ? "text-emerald-600/60" : "text-rose-600/60"
          }`}
        >
          <span className="material-symbols-outlined text-[12px]">
            compare_arrows
          </span>
          {isCurrency ? formatPrice(mom.value, true) : mom.value}
        </div>
      </div>
    );
  };

  const stats = [
    {
      label: "Vendas Totais",
      value: salesData ? formatPrice(total.totalValue, true) : "---",
      icon: "payments",
      color: "emerald",
      mom: metrics?.monthOverMonth,
      isCurrency: true,
    },
    {
      label: "Pedidos",
      value: salesData ? total.count.toString() : "---",
      icon: "inventory_2",
      color: "orange",
      isCurrency: false,
    },
    {
      label: "Meus Produtos",
      value: "Gerenciar",
      icon: "add_shopping_cart",
      color: "blue",
      isClickable: true,
      path: "/meus-produtos",
      mom: null,
      isCurrency: false,
    },
  ];

  if (isLoading) {
    return (
      <MobileLayout>
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">A carregar dados...</p>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <PageHeader title="Centro de Vendas" showUser={true} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 flex flex-col space-y-6 sm:space-y-10 h-auto sm:h-[calc(100vh-theme(spacing.2))] overflow-visible sm:overflow-hidden">
        <section className="flex overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:gap-6 sm:pb-0 sm:mx-0 sm:px-0 hide-scrollbar shrink-0">
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileTap={stat.isClickable ? { scale: 0.98 } : {}}
              onClick={() =>
                stat.isClickable && stat.path && navigate(stat.path)
              }
              className={`relative bg-card p-4 sm:p-5 rounded-[2rem] border border-border shadow-soft flex items-center transition-all shrink-0 w-[300px] sm:w-auto snap-center mr-4 sm:mr-0 ${
                stat.isClickable
                  ? "cursor-pointer hover:border-primary/40 hover:shadow-md"
                  : ""
              }`}
            >
              <div
                className={`size-11 sm:size-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm mr-3 ${
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

              <div className="flex flex-col min-w-0 flex-1 justify-center mr-2">
                <p className="text-[9px] sm:text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-0.5">
                  {stat.label}
                </p>
                <div className="text-base sm:text-lg font-black truncate tracking-tight text-foreground">
                  {stat.value}
                </div>
              </div>

              {renderGrowthBadge(stat.mom, stat.isCurrency)}
            </motion.div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 flex-1 min-h-0 pb-32 sm:pb-32">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            <div className="flex-1 w-full min-h-[300px]">
              <PerformanceCard data={performance} />
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex flex-col min-h-0">
            <div className="flex items-center justify-between px-2 mb-4 shrink-0">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Vendas Recentes
              </h3>
              <button
                onClick={() => navigate("/minhas-vendas")}
                className="text-primary text-sm font-bold hover:underline"
              >
                Ver todas
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 scroll-smooth pb-2 custom-scrollbar">
              <style>{`div::-webkit-scrollbar { display: none; }`}</style>
              {recentOrders.map((order: any) => (
                <motion.div
                  key={order.orderNumber}
                  className="bg-card p-3.5 rounded-[1.8rem] border border-border flex items-center gap-4 shadow-sm shrink-0"
                >
                  <div className="size-14 rounded-2xl overflow-hidden bg-secondary shrink-0 shadow-inner flex items-center justify-center">
                    <span className="material-symbols-outlined text-muted-foreground">
                      package_2
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-[10px] truncate text-foreground pr-2 uppercase tracking-tight">
                        {order.orderNumber }
                      </h4>
                      <span
                        className={`text-[7px] font-black uppercase px-2 py-0.5 rounded-md shrink-0 ${getOrderStatusColor(order.status)}`}
                      >
                        {getOrderStatusLabel(order.status, true)}
                      </span>
                    </div>
                    <div className="flex items-end justify-between mt-1">
                      <div className="space-y-0.5">
                        <p className="text-[10px] text-muted-foreground">
                          {formatDateFriendly(order.createdAt)}
                        </p>
                        <span className="text-primary font-black text-sm">
                          {formatPrice(order.totalAmount, true)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleOpenDetails(order)}
                        className="size-7 rounded-full bg-secondary flex items-center justify-center active:bg-primary/20 transition-all text-muted-foreground hover:text-primary"
                      >
                        <span className="material-symbols-outlined text-base">
                          info
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {recentOrders.length === 0 && (
                <div className="text-center py-10 text-muted-foreground text-sm">
                  Nenhuma venda realizada recentemente.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {selectedOrder && (
        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={selectedOrder}
        />
      )}
      <BottomNavigation />
    </MobileLayout>
  );
};

export default SalesCenter;