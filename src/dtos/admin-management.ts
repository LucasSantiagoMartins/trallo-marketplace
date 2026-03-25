import { WalletType } from "@/enums/wallet";
import { PaginationDTO } from "./pagination";
import { PaymentMethod, PaymentStatus } from "@/enums/payment";
import { TransactionStatus, TransactionType } from "@/enums/transaction";
import { UserRole } from "@/enums/user";

export interface AdminWallet {
  id: string;
  availableBalance: number;
  heldBalance: number;
  walletType: WalletType;
  updatedAt: string;
  owner: {
    id: number;
    fullName: string;
    email: string;
  };
}

export interface AdminTransaction {
  id: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  createdAt: string;
  wallet: {
    id: string;
    ownerName: string;
    ownerRole: UserRole;
  };
  order?: {
    id: string;
    orderNumber: string;
  };
}

export interface AdminPayment {
  id: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: string;
  seller: {
    id: number;
    fullName: string;
  };
  order: {
    id: string;
    orderNumber: string;
    buyerName: string;
  };
}

export interface AdminWalletListResponse {
  wallets: AdminWallet[];
  pagination: PaginationDTO;
}

export interface AdminTransactionListResponse {
  transactions: AdminTransaction[];
  pagination: PaginationDTO;
}

export interface AdminPaymentListResponse {
  payments: AdminPayment[];
  pagination: PaginationDTO;
}
