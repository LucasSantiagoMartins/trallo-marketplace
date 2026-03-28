import { FeeType } from "@/enums/fee-type.enum";

export const feeTypeLabel: Record<FeeType, string> = {
  [FeeType.PLATFORM_SALE_FEE]: "Taxa de Venda",
  [FeeType.SERVICE_FEE]: "Taxa de Serviço",
  [FeeType.DELIVERY_ADJUSTMENT_FEE]: "Ajuste de Entrega",
};

export const feeTypeColor: Record<FeeType, string> = {
  [FeeType.PLATFORM_SALE_FEE]: "bg-[#6C3EF8]/10 text-[#6C3EF8]",
  [FeeType.SERVICE_FEE]: "bg-blue-500/10 text-blue-600",
  [FeeType.DELIVERY_ADJUSTMENT_FEE]: "bg-amber-500/10 text-amber-600",
};

export function getFeeTypeLabel(type: FeeType): string {
  return feeTypeLabel[type] || type;
}

export function getFeeTypeColor(type: FeeType): string {
  return feeTypeColor[type] || "bg-gray-500/10 text-gray-500";
}