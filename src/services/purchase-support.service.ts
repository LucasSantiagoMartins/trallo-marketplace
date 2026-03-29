import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import type {
    PurchaseRequestDto,
    PurchaseSupportResponseDto
} from "@/types/purchase-support";

export const purchaseSupportService = {
    async getRecommendations(params: PurchaseRequestDto): Promise<ApiResponse<PurchaseSupportResponseDto>> {
        return await http.get<PurchaseSupportResponseDto>(
            endpoints.purchaseSupport.recommendations,
            { params }
        );
    },
};