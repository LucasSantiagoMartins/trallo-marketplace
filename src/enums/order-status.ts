export enum OrderStatus {

  AWAITING_PAYMENT = 'AWAITING_PAYMENT', 
  // Pedido criado, aguardando o cliente realizar o pagamento

  PAYMENT_PROCESSING = 'PAYMENT_PROCESSING', 
  // Pagamento enviado ao gateway ou sistema de pagamento e está sendo processado

  PAID = 'PAID', 
  // Pagamento confirmado com sucesso

  PAYMENT_FAILED = 'PAYMENT_FAILED', 
  // Falha no pagamento ou pagamento rejeitado

  AWAITING_SELLER_CONFIRMATION = 'AWAITING_SELLER_CONFIRMATION', 
  // Pedido aguardando confirmação do vendedor de que o produto está disponível

  AWAITING_SHIPMENT = 'AWAITING_SHIPMENT', 
  // Pedido confirmado e aguardando o vendedor enviar ou levar o produto para envio

  READY_FOR_SHIPMENT = 'READY_FOR_SHIPMENT', 
  // Produto já recebido ou preparado e pronto para ser enviado ao cliente

  PREPARING_ORDER = 'PREPARING_ORDER', 
  // Produto está sendo preparado para envio (embalagem, verificação, etiquetagem)

  SHIPPED = 'SHIPPED', 
  // Produto já foi enviado ou despachado para o cliente

  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY', 
  // Produto está com o entregador e a caminho do cliente

  DELIVERED = 'DELIVERED', 
  // Pedido entregue com sucesso ao cliente

  DELIVERY_FAILED = 'DELIVERY_FAILED', 
  // Tentativa de entrega falhou (cliente ausente, endereço incorreto, recusa, etc.)

  CANCELLED = 'CANCELLED' 
  // Pedido cancelado pelo cliente, vendedor ou sistema

}