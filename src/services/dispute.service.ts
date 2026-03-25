import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { CreateDisputeDto, RespondDisputeDto } from "@/dtos/disputes";


export const disputeService = {
    async createDispute(data: CreateDisputeDto): Promise<ApiResponse<any>> {
        console.log(data)
        return await http.post<any>(endpoints.disputes.create, data);
    },

    async getPendingDisputes(): Promise<ApiResponse<any[]>> {
        return await http.get<any[]>(endpoints.disputes.get);
    },

    async respondDispute(id: string, data: RespondDisputeDto): Promise<ApiResponse<any>> {
        return await http.post<any>(endpoints.disputes.respondDisputes(id), data);
    },
};

 