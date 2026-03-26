export class OrderProductsForDisputeResponseDto {
    orderId: string;
    orderNumber: string;
    items: {
        productId: string;
        name: string;
        coverImage: string;
    }[];

}
