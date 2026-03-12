import { ApiResponse } from "@/types/api";
import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import { BankAccountDTO, CreateBankAccountDTO, UpdateBankAccountDTO } from "@/dtos/bank.dto";

export const bankService = {
    async getAccounts(): Promise<ApiResponse<BankAccountDTO[]>> {
        return http.get<BankAccountDTO[]>(endpoints.bankAccounts.list);
    },

    async createAccount(data: CreateBankAccountDTO): Promise<ApiResponse<BankAccountDTO>> {
        return http.post<BankAccountDTO>(endpoints.bankAccounts.create, data);
    },

    async updateAccount(id: string, data: UpdateBankAccountDTO): Promise<ApiResponse<BankAccountDTO>> {
        return http.patch<BankAccountDTO>(endpoints.bankAccounts.update(id), data);
    },

    async deleteAccount(id: string, code: string): Promise<ApiResponse<void>> {
        return http.delete<void>(endpoints.bankAccounts.delete(id), {
            params: { code }
        });
    },

    async setDefaultAccount(id: string): Promise<ApiResponse<BankAccountDTO>> {
        return http.patch<BankAccountDTO>(endpoints.bankAccounts.update(id), { isDefault: true });
    }
};