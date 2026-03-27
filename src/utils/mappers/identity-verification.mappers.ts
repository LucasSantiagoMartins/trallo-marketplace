import { IdentityVerificationStatus } from "@/enums/identity-verification.enums";

export const identityStatusLabel: Record<IdentityVerificationStatus, string> = {
    [IdentityVerificationStatus.PENDING]: "Pendente",
    [IdentityVerificationStatus.APPROVED]: "Aprovado",
    [IdentityVerificationStatus.REJECTED]: "Rejeitado",
};

export const identityStatusColor: Record<IdentityVerificationStatus, string> = {
    [IdentityVerificationStatus.PENDING]: "bg-amber-500/10 text-amber-600",
    [IdentityVerificationStatus.APPROVED]: "bg-emerald-500/10 text-emerald-600",
    [IdentityVerificationStatus.REJECTED]: "bg-rose-500/10 text-rose-600",
};

export function getIdentityStatusLabel(status: IdentityVerificationStatus): string {
    return identityStatusLabel[status] || status;
}

export function getIdentityStatusColor(status: IdentityVerificationStatus): string {
    return identityStatusColor[status] || "bg-gray-500/10 text-gray-500";
}