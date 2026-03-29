import { SearchedProductDTO } from "@/types/product";
import { PurchaseProfileEnum } from "@/enums/purchase-support.enums";

export const profileTranslation = {
    [PurchaseProfileEnum.BEST_PRICE]: "Melhor Preço",
    [PurchaseProfileEnum.VALUE_FOR_MONEY]: "Custo-Benefício",
    [PurchaseProfileEnum.HIGH_PERFORMANCE]: "Alta Performance",
};

export const getProfileTranslation = (profile: PurchaseProfileEnum): string => {
    return profileTranslation[profile];
};

export interface PurchaseRequestDto {
    query: string;
    investment: string;
    profileId: PurchaseProfileEnum;
    profileTitle: string;
    profileDesc: string;
}

export interface SetupItemDto {
    name: string;
    priority: 'essential' | 'optional';
    allocatedBudget: number;
    products: SearchedProductDTO[];
}

export interface PurchaseSupportResponseDto {
    type: 'PRODUCT_RECOMMENDATION' | 'SETUP_GUIDE';
    products?: SearchedProductDTO[];
    items?: SetupItemDto[];
    meta: {
        appliedProfile: PurchaseProfileEnum;
        totalBudget: number;
        context: string;
        level?: string;
    };
}