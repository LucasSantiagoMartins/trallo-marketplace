import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { CreateUpdateFeeDto, Fee } from "@/dtos/fee.dtos";


export const feeService = {
    async getFees(): Promise<ApiResponse<Fee[]>> {
        return await http.get<Fee[]>(endpoints.admin.plataformfees.fee);
    },

    async createAndUpdateFee(data: CreateUpdateFeeDto): Promise<ApiResponse<void>> {
        return await http.post<void>(endpoints.admin.plataformfees.fee, data);
    },

    async toggleFeeStatus(id: string): Promise<ApiResponse<void>> {
        return await http.patch<void>(endpoints.admin.plataformfees.toggle(id));
    },

};