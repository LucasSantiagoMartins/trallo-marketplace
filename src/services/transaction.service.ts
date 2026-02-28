import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import { MyTransactionsResponseDTO } from "@/dtos/transaction";

export const transactionService = {
  async getMyTransactions(
    limit: number,
    page: number,
    type?: string,
    status?: string
  ): Promise<ApiResponse<MyTransactionsResponseDTO>> {
    return await http.get<MyTransactionsResponseDTO>(
      endpoints.transactions.my(limit, page, type, status)
    );
  },
};