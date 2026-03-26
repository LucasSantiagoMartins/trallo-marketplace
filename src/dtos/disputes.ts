import { DisputeReason } from "@/enums/dispute.enums";
import { PaginationDTO } from "./pagination";

export enum DisputeStatus {
    OPEN = 'OPEN',
    UNDER_ANALYSIS = 'UNDER_ANALYSIS',
    REFUNDED = 'REFUNDED',
    PAYMENT_RELEASED = 'PAYMENT_RELEASED',
    CLOSED = 'CLOSED',
}

export interface CreateDisputeDto {
    orderNumber: string;
    productId: string;
    reason: DisputeReason;
    description?: string;
}

export interface RespondDisputeDto {
    message: string;
    action: DisputeStatus;
}

export interface DisputeDto {
    id: string;
    orderId: string;
    reason: string;
    description?: string;
    status: DisputeStatus;
    adminResponse?: string;
    createdAt: Date;
    user: {
        id: number;
        fullName: string;
        phoneNumber: string;
    };
}

export interface DisputesResponseDto {
    disputes: DisputeDto[];
    pagination: PaginationDTO
}