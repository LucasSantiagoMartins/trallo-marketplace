export enum PurchaseProfileEnum {
    BEST_PRICE = "best-price",
    VALUE_FOR_MONEY = "value-for-money",
    HIGH_PERFORMANCE = "high-performance",
}

export const profileTranslation = {
    [PurchaseProfileEnum.BEST_PRICE]: "Melhor Preço",
    [PurchaseProfileEnum.VALUE_FOR_MONEY]: "Custo-Benefício",
    [PurchaseProfileEnum.HIGH_PERFORMANCE]: "Alta Performance",
};