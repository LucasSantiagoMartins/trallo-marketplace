import { OrderStatus } from "@/enums/order-status";

export const orderStatusLabel = (status: OrderStatus, isSeller?: boolean): string => {
  const labels: Record<OrderStatus, string> = {
    [OrderStatus.AWAITING_PAYMENT]: "Aguardando Pagamento",
    [OrderStatus.PAYMENT_PROCESSING]: "Processando Pagamento",
    [OrderStatus.PAID]: "Pago",
    [OrderStatus.PAYMENT_FAILED]: "Falha no Pagamento",
    [OrderStatus.AWAITING_SELLER_CONFIRMATION]: isSeller ? "Aguardando sua Confirmação" : "Confirmação Pendente",
    [OrderStatus.AWAITING_SHIPMENT]: isSeller ? "Pendente de Envio" : "Aguardando Envio",
    [OrderStatus.PREPARING_ORDER]: "Preparando Pedido",
    [OrderStatus.READY_FOR_SHIPMENT]: "Pronto para Envio",
    [OrderStatus.SHIPPED]: "Enviado",
    [OrderStatus.OUT_FOR_DELIVERY]: "Saiu para Entrega",
    [OrderStatus.DELIVERED]: "Entregue",
    [OrderStatus.DELIVERY_FAILED]: "Falha na Entrega",
    [OrderStatus.CANCELLED]: "Cancelado",
  };
  return labels[status] || status;
};

export const orderStatusColor: Record<OrderStatus, string> = {
  [OrderStatus.AWAITING_PAYMENT]: "bg-yellow-500/10 text-yellow-600",
  [OrderStatus.PAYMENT_PROCESSING]: "bg-orange-500/10 text-orange-600",
  [OrderStatus.PAID]: "bg-emerald-500/10 text-emerald-600",
  [OrderStatus.PAYMENT_FAILED]: "bg-red-500/10 text-red-600",
  [OrderStatus.AWAITING_SELLER_CONFIRMATION]: "bg-indigo-500/10 text-indigo-600",
  [OrderStatus.AWAITING_SHIPMENT]: "bg-purple-500/10 text-purple-600",
  [OrderStatus.PREPARING_ORDER]: "bg-pink-500/10 text-pink-600",
  [OrderStatus.READY_FOR_SHIPMENT]: "bg-cyan-500/10 text-cyan-600",
  [OrderStatus.SHIPPED]: "bg-blue-500/10 text-blue-600",
  [OrderStatus.OUT_FOR_DELIVERY]: "bg-teal-500/10 text-teal-600",
  [OrderStatus.DELIVERED]: "bg-green-500/10 text-green-600",
  [OrderStatus.DELIVERY_FAILED]: "bg-rose-500/10 text-rose-600",
  [OrderStatus.CANCELLED]: "bg-red-500/10 text-red-600",
};

export const getOrderStatusDetails = (status: OrderStatus) => {
  const mapping = {
    [OrderStatus.AWAITING_PAYMENT]: { label: 'Aguardando Pagamento', description: 'O pedido foi gerado e aguarda o pagamento.', icon: 'payments' },
    [OrderStatus.PAYMENT_PROCESSING]: { label: 'Processando Pagamento', description: 'Estamos confirmando o seu pagamento.', icon: 'sync_alt' },
    [OrderStatus.PAID]: { label: 'Pagamento Confirmado', description: 'Seu pagamento foi aprovado com sucesso.', icon: 'check_circle' },
    [OrderStatus.PAYMENT_FAILED]: { label: 'Falha no Pagamento', description: 'Houve um erro ao processar o pagamento.', icon: 'error' },
    [OrderStatus.AWAITING_SELLER_CONFIRMATION]: { label: 'Aguardando Vendedor', description: 'O vendedor está confirmando a disponibilidade.', icon: 'person_search' },
    [OrderStatus.AWAITING_SHIPMENT]: { label: 'Aguardando Envio', description: 'O produto está aguardando para ser postado.', icon: 'pending_actions' },
    [OrderStatus.READY_FOR_SHIPMENT]: { label: 'Pronto para Envio', description: 'O pacote já está pronto para a transportadora.', icon: 'inventory' },
    [OrderStatus.PREPARING_ORDER]: { label: 'Em Preparação', description: 'O vendedor está embalando o seu pedido.', icon: 'package_2' },
    [OrderStatus.SHIPPED]: { label: 'Enviado', description: 'O seu pedido já está a caminho.', icon: 'local_shipping' },
    [OrderStatus.OUT_FOR_DELIVERY]: { label: 'Saiu para Entrega', description: 'O estafeta está a caminho do seu endereço.', icon: 'delivery_dining' },
    [OrderStatus.DELIVERED]: { label: 'Entregue', description: 'Pedido entregue com sucesso!', icon: 'task_alt' },
    [OrderStatus.DELIVERY_FAILED]: { label: 'Falha na Entrega', description: 'Não conseguimos entregar o pedido.', icon: 'moped_error' },
    [OrderStatus.CANCELLED]: { label: 'Cancelado', description: 'Este pedido foi cancelado.', icon: 'cancel' },
  };

  return mapping[status] || { label: 'Status Desconhecido', description: '', icon: 'help' };
};

export function getOrderStatusLabel(status: OrderStatus, isSeller?: boolean): string {
  return orderStatusLabel(status, isSeller);
}

export function getOrderStatusColor(status: OrderStatus): string {
  return orderStatusColor[status] || "bg-gray-500/10 text-gray-500";
}

