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

export const productStatusColor: Record<ProductStatus, string> = {
  [ProductStatus.AWAITING_SUBMISSION]: "bg-blue-500/10 text-blue-600",
  [ProductStatus.SUBMITTED]: "bg-amber-500/10 text-amber-600",
  [ProductStatus.ONLINE_VERIFIED]: "bg-emerald-500/10 text-emerald-500",
  [ProductStatus.TRALLO_VERIFIED]: "bg-purple-500/10 text-purple-600",
  [ProductStatus.REJECTED_ONLINE]: "bg-red-500/10 text-red-500",
  [ProductStatus.REJECTED_TRALLO]: "bg-red-600/10 text-red-600",
};

export function getProductConditionLabel(condition: ProductCondition): string {
  return productConditionLabel[condition] || condition;
}

export function getProductStatusLabel(status: ProductStatus): string {
  return productStatusLabel[status] || status;
}

export function getProductStatusColor(status: ProductStatus): string {
  return productStatusColor[status] || "bg-gray-500/10 text-gray-500";
}
