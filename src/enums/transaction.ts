export enum TransactionType {
  SALE = "SALE", // Venda (Crédito)
  WITHDRAWAL = "WITHDRAWAL", // Saque (Débito)
  REFUND = "REFUND", // Estorno
  COMMISSION = "COMMISSION", // Ganho da plataforma sobre a venda (Crédito)
  PLATFORM_WITHDRAWAL = "PLATFORM_WITHDRAWAL", // Saque da conta da plataforma para o banco
  PLATFORM_DEBIT = "PLATFORM_DEBIT",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}
