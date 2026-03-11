import { OrderStatus } from "@/enums/order-status";

export const orderStatusLabel = (status: OrderStatus, isSeller?: boolean): string => {
  const labels: Record<OrderStatus, string> = {
    [OrderStatus.AWAITING_PAYMENT]: "Aguardando Pagamento",
    [OrderStatus.PAYMENT_PROCESSING]: "Processando Pagamento",
    [OrderStatus.PAID]: "Pago",
    [OrderStatus.AWAITING_SHIPMENT]: isSeller ? "Pendente de Entrega" : "Aguardando Vendedor",
    [OrderStatus.PAYMENT_FAILED]: "Falha no Pagamento",
    [OrderStatus.SHIPPED]: "A Caminho",
    [OrderStatus.DELIVERED]: "Entregue",
    [OrderStatus.CANCELLED]: "Cancelado",
  };
  return labels[status] || status;
};

export const orderStatusColor: Record<OrderStatus, string> = {
  [OrderStatus.AWAITING_PAYMENT]: "bg-yellow-500/10 text-yellow-600",
  [OrderStatus.PAYMENT_PROCESSING]: "bg-orange-500/10 text-orange-600",
  [OrderStatus.PAID]: "bg-emerald-500/10 text-emerald-600",
  [OrderStatus.AWAITING_SHIPMENT]: "bg-purple-500/10 text-purple-600",
  [OrderStatus.PAYMENT_FAILED]: "bg-red-500/10 text-red-600",
  [OrderStatus.SHIPPED]: "bg-blue-500/10 text-blue-600",
  [OrderStatus.DELIVERED]: "bg-green-500/10 text-green-600",
  [OrderStatus.CANCELLED]: "bg-red-500/10 text-red-600",
};

export function getOrderStatusLabel(status: OrderStatus, isSeller?: boolean): string {
  return orderStatusLabel(status, isSeller);
}

export function getOrderStatusColor(status: OrderStatus): string {
  return orderStatusColor[status] || "bg-gray-500/10 text-gray-500";
}