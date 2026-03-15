export interface CartItemDto {
    id: string;
    name: string;
    attr: string;
    price: number;
    qty: number;
    image: string;
    availableQuantity: number;

}

export interface ApiCartItemDto {
    id: string;
    quantity: number;
    priceSnapshot: number;
    product: {
        id: string;
        name: string;
        description: string;
        coverImage: string | null;
        availableQuantity: 12
    };
}