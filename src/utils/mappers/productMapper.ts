import { ProductCondition, ProductStatus } from "@/types/product";

export const productConditionLabel: Record<ProductCondition, string> = {
  [ProductCondition.NEW]: "Novo",
  [ProductCondition.SEMI_NEW]: "Seminovo",
  [ProductCondition.USED]: "Usado",
};

export const productStatusLabel: Record<ProductStatus, string> = {
  [ProductStatus.AWAITING_SUBMISSION]: "Aguardando envio",
  [ProductStatus.SUBMITTED]: "Enviado",
  [ProductStatus.ONLINE_VERIFIED]: "Verificado online",
  [ProductStatus.TRALLO_VERIFIED]: "Verificado pela Trallo",
  [ProductStatus.REJECTED_ONLINE]: "Rejeitado online",
  [ProductStatus.REJECTED_TRALLO]: "Rejeitado pela Trallo",
};

export function getProductConditionLabel(condition: ProductCondition): string {
  return productConditionLabel[condition] || condition;
}

export function getProductStatusLabel(status: ProductStatus): string {
  return productStatusLabel[status] || status;
}
