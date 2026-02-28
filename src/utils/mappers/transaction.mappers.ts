import { TransactionType, TransactionStatus } from "@/enums/transaction";


export const transactionTypeLabel: Record<TransactionType, string> = {
  [TransactionType.SALE]: "Venda",
  [TransactionType.WITHDRAWAL]: "Levantamento",
  [TransactionType.REFUND]: "Estorno",
  [TransactionType.FEE]: "Taxa",
};

export const transactionTypeColor: Record<TransactionType, string> = {
  [TransactionType.SALE]: "bg-emerald-500/10 text-emerald-600",
  [TransactionType.WITHDRAWAL]: "bg-rose-500/10 text-rose-600",
  [TransactionType.REFUND]: "bg-amber-500/10 text-amber-600",
  [TransactionType.FEE]: "bg-gray-500/10 text-gray-600",
};

export function getTransactionTypeLabel(type: TransactionType): string {
  return transactionTypeLabel[type] || type;
}

export function getTransactionTypeColor(type: TransactionType): string {
  return transactionTypeColor[type] || "bg-gray-500/10 text-gray-500";
}


export const transactionStatusLabel: Record<TransactionStatus, string> = {
  [TransactionStatus.PENDING]: "Pendente",
  [TransactionStatus.COMPLETED]: "Concluído",
  [TransactionStatus.FAILED]: "Falhou",
  [TransactionStatus.CANCELLED]: "Cancelado",
};

export const transactionStatusColor: Record<TransactionStatus, string> = {
  [TransactionStatus.PENDING]: "bg-amber-500/10 text-amber-600",
  [TransactionStatus.COMPLETED]: "bg-emerald-500/10 text-emerald-600",
  [TransactionStatus.FAILED]: "bg-rose-500/10 text-rose-600",
  [TransactionStatus.CANCELLED]: "bg-gray-500/10 text-gray-500",
};

export function getTransactionStatusLabel(status: TransactionStatus): string {
  return transactionStatusLabel[status] || status;
}

export function getTransactionStatusColor(status: TransactionStatus): string {
  return transactionStatusColor[status] || "bg-gray-500/10 text-gray-500";
}