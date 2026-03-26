import { DisputeStatus } from "@/dtos/disputes";
import { DisputeReason } from "@/enums/dispute.enums";

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

export const disputeStatusLabel: Record<DisputeStatus, string> = {
    [DisputeStatus.OPEN]: "Aberto",
    [DisputeStatus.UNDER_ANALYSIS]: "Em Análise",
    [DisputeStatus.REFUNDED]: "Reembolsado",
    [DisputeStatus.PAYMENT_RELEASED]: "Pagamento Liberado",
    [DisputeStatus.CLOSED]: "Fechado",
};

export const disputeStatusColor: Record<DisputeStatus, string> = {
    [DisputeStatus.OPEN]: "bg-blue-500/10 text-blue-600",
    [DisputeStatus.UNDER_ANALYSIS]: "bg-purple-500/10 text-purple-600",
    [DisputeStatus.REFUNDED]: "bg-emerald-500/10 text-emerald-600",
    [DisputeStatus.PAYMENT_RELEASED]: "bg-cyan-500/10 text-cyan-600",
    [DisputeStatus.CLOSED]: "bg-slate-500/10 text-slate-600",
};

export function getDisputeStatusLabel(status: DisputeStatus): string {
    return disputeStatusLabel[status] || status;
}

export function getDisputeStatusColor(status: DisputeStatus): string {
    return disputeStatusColor[status] || "bg-gray-500/10 text-gray-500";
}


export function getDisputeReasonLabel(reason: DisputeReason): string {
    return disputeReasonLabel[reason] || reason;
}


export function getDisputeReasonColor(reason: DisputeReason): string {
    return disputeReasonColor[reason] || "bg-gray-500/10 text-gray-500";
}