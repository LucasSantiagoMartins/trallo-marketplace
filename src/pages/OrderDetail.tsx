import React from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import BottomNavigation from "../components/BottomNavigation";
import { OrderDTO } from "@/dtos/order";
import { formatPrice } from "@/utils/currency";
import {
  getOrderStatusColor,
  getOrderStatusLabel,
} from "@/utils/mappers/order.mapper";
import { OrderStatus } from "@/enums/order-status";
import { BASE_UPLOAD_URL } from "@/api/endpoints";
import { getPaymentMethodLabel } from "@/utils/mappers/payment.mappers";
import { formatDateFriendly } from "@/utils/date";

const OrderDetail: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order as OrderDTO;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f5f8] dark:bg-[#141022]">
        <p className="text-gray-500 font-medium">Pedido não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f5f8] dark:bg-[#141022] text-[#121118] dark:text-white pb-10">
      <PageHeader title="Detalhe do Pedido" />

      <main className="max-w-3xl mx-auto px-4 pt-24 space-y-6">
        <section className="bg-white dark:bg-white/5 p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
          <div className="flex justify-between items-start gap-3 mb-4">
            <div className="min-w-0">
              <span
                className={`${getOrderStatusColor(order.status)} text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full`}
              >
                {getOrderStatusLabel(order.status)}
              </span>
              <h2 className="text-lg sm:text-xl font-black mt-2 truncate">
                Pedido #{order.orderNumber}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-[11px] sm:text-sm">
                {formatDateFriendly(order.date)}
              </p>
            </div>
            <div className="size-12 sm:size-14 bg-[#6d3ff8]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#6d3ff8] text-2xl sm:text-3xl">
                shopping_bag
              </span>
            </div>
          </div>
          <div className="border-t border-dashed border-gray-200 dark:border-white/10 pt-4 flex justify-between items-center">
            <span className="text-[11px] sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              Pagamento
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] sm:text-sm font-bold">
                {getPaymentMethodLabel(order.paymentMethod)}
              </span>
              <span className="material-symbols-outlined text-[#6d3ff8] text-lg">
                verified_user
              </span>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">
            Rastreamento
          </h3>
          <div className="bg-white dark:bg-white/5 p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10">
            <div className="relative space-y-0">
              <div className="flex gap-4 pb-7 relative">
                <div
                  className={`absolute left-[11px] top-6 bottom-0 w-[2px] ${order.status !== OrderStatus.AWAITING_PAYMENT ? "bg-[#6d3ff8]" : "bg-gray-200 dark:bg-white/10"}`}
                ></div>
                <div className="relative z-10 flex size-6 items-center justify-center rounded-full bg-[#6d3ff8] ring-4 ring-[#6d3ff8]/10">
                  <span className="material-symbols-outlined text-white text-[14px]">
                    check
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm">Pedido Confirmado</p>
                  <p className="text-[11px] text-gray-500">
                    O seu pagamento foi processado.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pb-7 relative">
                <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-gray-200 dark:bg-white/10"></div>
                <div
                  className={`relative z-10 flex size-6 items-center justify-center rounded-full ${order.status === OrderStatus.PREPARING_ORDER ? "bg-white dark:bg-[#1c182d] ring-2 ring-[#6d3ff8]" : "bg-gray-100 dark:bg-white/10"}`}
                >
                  {order.status === OrderStatus.PREPARING_ORDER ? (
                    <div className="size-2 bg-[#6d3ff8] rounded-full animate-pulse"></div>
                  ) : (
                    <span className="material-symbols-outlined text-gray-400 text-[14px]">
                      inventory_2
                    </span>
                  )}
                </div>
                <div>
                  <p
                    className={`font-bold text-sm ${order.status === OrderStatus.PREPARING_ORDER ? "text-[#6d3ff8]" : "text-gray-400"}`}
                  >
                    Em Preparação
                  </p>
                  <p className="text-[11px] text-gray-500">
                    O vendedor está a separar os itens.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className={`relative z-10 flex size-6 items-center justify-center rounded-full ${order.status === OrderStatus.SHIPPED ? "bg-white dark:bg-[#1c182d] ring-2 ring-[#6d3ff8]" : "bg-gray-100 dark:bg-white/10"}`}
                >
                  <span className="material-symbols-outlined text-gray-400 text-[14px]">
                    local_shipping
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-400">
                    Saiu para Entrega
                  </p>
                  <p className="text-[11px] text-gray-500">
                    A caminho da sua morada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">
            Itens ({order.items.length})
          </h3>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-white/5 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 flex gap-4 items-center"
              >
                <div className="size-16 sm:size-20 rounded-xl bg-gray-100 dark:bg-white/10 overflow-hidden flex-shrink-0">
                  <img
                    src={BASE_UPLOAD_URL + item.coverImage}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/200x200?text=Item";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-bold text-xs sm:text-sm line-clamp-2 leading-tight">
                      {item.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                        {item.quantity} {item.quantity === 1 ? "item" : "itens"}
                      </span>
                    </div>
                    <p className="font-black text-sm text-[#6d3ff8]">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-white/5 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-white/10">
          <div className="space-y-3">
            <div className="flex justify-between text-[11px] sm:text-sm">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="font-bold">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
            <div className="flex justify-between text-[11px] sm:text-sm">
              <span className="text-gray-500 font-medium">Taxa de Entrega</span>
              <span className="font-bold text-green-500 italic">Grátis</span>
            </div>
            <div className="border-t border-gray-100 dark:border-white/5 pt-4 flex justify-between items-center">
              <div>
                <span className="block text-[10px] font-black uppercase text-gray-400 tracking-wider">
                  Total do Pedido
                </span>
                <span className="font-black text-xl sm:text-2xl text-[#6d3ff8]">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default OrderDetail;
