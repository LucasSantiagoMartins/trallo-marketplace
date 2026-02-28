import { TransactionDTO } from "./transaction";


export interface WalletSummaryDTO {
  id: string;
  availableBalance: number;
  heldBalance: number;
  type: "SELLER" | "BUYER"; 
  transactions: TransactionDTO[];
}