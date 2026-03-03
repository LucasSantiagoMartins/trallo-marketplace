import { PaymentMode, PaymentMethod, PaymentStatus } from "@/enums/payment";

export const paymentModeLabel: Record<PaymentMode, string> = {
  [PaymentMode.ONLINE_PAYMENT]: "Pagamento Online",
  [PaymentMode.ONSITE_PAYMENT]: "Pagamento Presencial",
};

export const paymentMethodLabel: Record<PaymentMethod, string> = {
  [PaymentMethod.MULTICAIXA_EXPRESS]: "Multicaixa Express",
  [PaymentMethod.REFERENCE]: "Referência Bancária",
  [PaymentMethod.ONSITE_CARD]: "Cartão (TPA Local)",
};

export const paymentStatusLabel: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: "Pendente",
  [PaymentStatus.PAID]: "Pago",
  [PaymentStatus.FAILED]: "Falhou",
  [PaymentStatus.REFUNDED]: "Reembolsado",
  [PaymentStatus.PROCESSING]: "Processando",
};

export const paymentStatusColor: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: "bg-amber-500/10 text-amber-600",
  [PaymentStatus.PAID]: "bg-emerald-500/10 text-emerald-600",
  [PaymentStatus.FAILED]: "bg-rose-500/10 text-rose-600",
  [PaymentStatus.REFUNDED]: "bg-gray-500/10 text-gray-600",
  [PaymentStatus.PROCESSING]: "bg-blue-500/10 text-blue-600",
};

export function getPaymentModeLabel(mode: PaymentMode): string {
  return paymentModeLabel[mode] || mode;
}

export function getPaymentMethodLabel(method: PaymentMethod): string {
  return paymentMethodLabel[method] || method;
}

export function getPaymentStatusLabel(status: PaymentStatus): string {
  return paymentStatusLabel[status] || status;
}

export function getPaymentStatusColor(status: PaymentStatus): string {
  return paymentStatusColor[status] || "bg-gray-500/10 text-gray-500";
}
