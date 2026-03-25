export enum DisputeStatus {
    OPEN = 'OPEN',
    UNDER_ANALYSIS = 'UNDER_ANALYSIS',
    REFUNDED = 'REFUNDED',
    PAYMENT_RELEASED = 'PAYMENT_RELEASED',
    CLOSED = 'CLOSED',
}

export interface CreateDisputeDto {
    productSku: string;
    reason: string;
    description: string;
}

export interface RespondDisputeDto {
    message: string;
    action: DisputeStatus;
}
