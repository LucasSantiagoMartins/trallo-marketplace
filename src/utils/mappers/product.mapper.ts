import { ProductCondition, ProductStatus } from "@/types/product";

export const productConditionLabel: Record<ProductCondition, string> = {
  [ProductCondition.NEW]: "Novo",
  [ProductCondition.SEMI_NEW]: "Quase novo",
  [ProductCondition.USED]: "Usado",
};

export const productConditionColor: Record<ProductCondition, string> = {
  [ProductCondition.NEW]: "text-emerald-700",
  [ProductCondition.SEMI_NEW]: "text-blue-700",
  [ProductCondition.USED]: "text-orange-700",
};

export const productConditionIcon: Record<ProductCondition, string> = {
  [ProductCondition.NEW]: "new_releases",
  [ProductCondition.SEMI_NEW]: "auto_awesome",
  [ProductCondition.USED]: "history",
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
  [ProductStatus.AWAITING_SUBMISSION]: "bg-blue-50 text-blue-700 border-blue-200",
  [ProductStatus.SUBMITTED]: "bg-amber-50 text-amber-700 border-amber-200",
  [ProductStatus.ONLINE_VERIFIED]: "bg-emerald-50 text-emerald-700 border-emerald-200",
  [ProductStatus.TRALLO_VERIFIED]: "bg-purple-50 text-purple-700 border-purple-200",
  [ProductStatus.REJECTED_ONLINE]: "bg-red-50 text-red-700 border-red-200",
  [ProductStatus.REJECTED_TRALLO]: "bg-red-100 text-red-800 border-red-300",
};

export function getProductConditionLabel(condition: ProductCondition): string {
  return productConditionLabel[condition] || condition;
}

export function getProductConditionColor(condition: ProductCondition): string {
  return productConditionColor[condition] || "text-slate-600";
}

export function getProductStatusLabel(status: ProductStatus): string {
  return productStatusLabel[status] || status;
}

export function getProductStatusColor(status: ProductStatus): string {
  return productStatusColor[status] || "bg-slate-50 text-slate-600 border-slate-200";
}