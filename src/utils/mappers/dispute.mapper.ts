import { DisputeReason } from "@/enums/dispute.enum";

export const disputeReasonLabel: Record<DisputeReason, string> = {
    [DisputeReason.PRODUCT_DAMAGED]: "Produto Danificado",
    [DisputeReason.WRONG_PRODUCT]: "Produto Errado",
    [DisputeReason.PRODUCT_NOT_AS_DESCRIBED]: "Diferente do Anúncio",
    [DisputeReason.OTHER]: "Outro Motivo",
};

export const disputeReasonColor: Record<DisputeReason, string> = {
    [DisputeReason.PRODUCT_DAMAGED]: "bg-red-500/10 text-red-600",
    [DisputeReason.WRONG_PRODUCT]: "bg-orange-500/10 text-orange-600",
    [DisputeReason.PRODUCT_NOT_AS_DESCRIBED]: "bg-amber-500/10 text-amber-600",
    [DisputeReason.OTHER]: "bg-slate-500/10 text-slate-600",
};

 
export function getDisputeReasonLabel(reason: DisputeReason): string {
    return disputeReasonLabel[reason] || reason;
}

 
export function getDisputeReasonColor(reason: DisputeReason): string {
    return disputeReasonColor[reason] || "bg-gray-500/10 text-gray-500";
}