import { TransactionType } from "@/components/TransactionItem";
import { PaginationDTO } from "./pagination";
import { TransactionStatus } from "@/enums/transaction";

export interface TransactionDTO {
  id: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  createdAt: string;
}

export interface TransactionStatsDTO {
  totalSales: number;
  totalWithdrawals: number;
}

export interface MyTransactionsResponseDTO {
  transactions: TransactionDTO[];
  stats: TransactionStatsDTO;
  pagination: PaginationDTO;
}
