import { IdentityVerificationStatus } from "@/enums/identity-verification.enums";
import { PaginationDTO } from "./pagination";

export interface CreateIdentityVerificationDTO {
    front: string;
    back: string;
    selfie: string;
}

export interface VerifyIdentityDTO {
    status: "APPROVED" | "REJECTED";
    reason?: string;
}

export interface IdentityVerificationDTO {
    id: number;
    status: IdentityVerificationStatus;
    idFrontUrl: string;
    idBackUrl: string;
    selfieUrl?: string;
    rejectionReason?: string;
    createdAt: Date;
    user: {
        id: number;
        fullName: string;
        email: string;
        phoneNumber: string;
    };
}

export interface IdentityVerificationResponseDTO {
    submissions: IdentityVerificationDTO[];
    pagination: PaginationDTO;
}