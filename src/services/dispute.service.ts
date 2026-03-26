import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { CreateDisputeDto, DisputesResponseDto, RespondDisputeDto } from "@/dtos/disputes";


export const disputeService = {
    async createDispute(data: CreateDisputeDto): Promise<ApiResponse<any>> {
        return await http.post<any>(endpoints.disputes.create, data);
    },

    async getDisputes(page: number, limit: number): Promise<ApiResponse<DisputesResponseDto>> {
        return await http.get<DisputesResponseDto>(endpoints.disputes.get);
    },

    async respondDispute(id: string, data: RespondDisputeDto): Promise<ApiResponse<any>> {
        return await http.post<any>(endpoints.disputes.respondDisputes(id), data);
    },
};

