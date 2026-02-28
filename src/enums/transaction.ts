export enum TransactionType {
  SALE = 'SALE',       // Venda (Crédito)
  WITHDRAWAL = 'WITHDRAWAL', // Saque (Débito)
  REFUND = 'REFUND',   // Estorno
  FEE = 'FEE',         // Taxas
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}