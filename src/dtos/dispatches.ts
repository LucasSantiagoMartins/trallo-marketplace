export interface ActivateDispatchDto {
    productId: string;
    minPrice: number;
    durationInMinutes: number;
}

export interface DispatchStatusResponseDto {
    initialPrice: number;
    currentPrice: number;
    nextPrice: number | null;
    nextReductionAt: Date | null;
    isFinished: boolean;
    reductionAmount: number;
    endsAt: string;
}

export interface CheckoutDispatchDto {
    productId: string;
    paymentMethod: any;
}