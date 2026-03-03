export enum PaymentMode {
  ONLINE_PAYMENT = "ONLINE_PAYMENT",
  ONSITE_PAYMENT = "ONSITE_PAYMENT",
}

export enum PaymentMethod {
  MULTICAIXA_EXPRESS = "MULTICAIXA_EXPRESS",
  REFERENCE = "REFERENCE",
  ONSITE_CARD = "ONSITE_CARD",
}

export enum PaymentStatus {
  PENDING = 'PENDING', // payment was created but not yet released to seller
  PAID = 'PAID', // payment was released to seller
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PROCESSING = 'PROCESSING', // payment is being processed by the payment gateway
}
