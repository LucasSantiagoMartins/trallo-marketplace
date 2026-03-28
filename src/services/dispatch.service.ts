import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import {
    ActivateDispatchDto,
    DispatchStatusResponseDto,
    CheckoutDispatchDto
} from "@/dtos/dispatches";

export const dispatchService = {
    async activate(data: ActivateDispatchDto): Promise<ApiResponse<any>> {
        return await http.post<any>(endpoints.dispatches.activate, data);
    },

    async getStatus(productId: string): Promise<ApiResponse<DispatchStatusResponseDto>> {
        return await http.get<DispatchStatusResponseDto>(endpoints.dispatches.status(productId));
    },

    async buyNow(data: CheckoutDispatchDto): Promise<ApiResponse<any>> {
        return await http.post<any>(endpoints.dispatches.buy, data);
    },
};