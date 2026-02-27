import { OrderStatus } from "@/enums/order-status";

export const orderStatusLabel: Record<OrderStatus, string> = {
  [OrderStatus.AWAITING_PAYMENT]: "Aguardando Pagamento",
  [OrderStatus.PAID]: "Pago",
  [OrderStatus.PROCESSING]: "Em Processamento",
  [OrderStatus.SHIPPED]: "A Caminho",
  [OrderStatus.DELIVERED]: "Entregue",
  [OrderStatus.CANCELLED]: "Cancelado",
};

export const orderStatusColor: Record<OrderStatus, string> = {
  [OrderStatus.AWAITING_PAYMENT]: "bg-yellow-500/10 text-yellow-600",
  [OrderStatus.PAID]: "bg-emerald-500/10 text-emerald-600",
  [OrderStatus.PROCESSING]: "bg-orange-500/10 text-orange-600",
  [OrderStatus.SHIPPED]: "bg-blue-500/10 text-blue-600",
  [OrderStatus.DELIVERED]: "bg-green-500/10 text-green-600",
  [OrderStatus.CANCELLED]: "bg-red-500/10 text-red-600",
};

export function getOrderStatusLabel(status: OrderStatus): string {
  return orderStatusLabel[status] || status;
}

export function getOrderStatusColor(status: OrderStatus): string {
  return orderStatusColor[status] || "bg-gray-500/10 text-gray-500";
}
