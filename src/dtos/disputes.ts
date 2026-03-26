import { DisputeReason } from "@/enums/dispute.enums";

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
