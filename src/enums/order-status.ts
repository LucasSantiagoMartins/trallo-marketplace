export enum OrderStatus {
  AWAITING_PAYMENT = 'AWAITING_PAYMENT', // Aguardando ação do usuário (ex: gerar referência)
  PAYMENT_PROCESSING = 'PAYMENT_PROCESSING', // Pagamento enviado ao gateway/fila
  PAID = 'PAID', // Confirmado
  PAYMENT_FAILED = 'PAYMENT_FAILED', // Erro no processamento do pagamento
  SHIPPED = 'SHIPPED',
  AWAITING_SHIPMENT = 'AWAITING_SHIPMENT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}
