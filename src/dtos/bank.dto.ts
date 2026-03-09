export enum BankAccountType {
    NORMAL_BANK = "NORMAL_BANK",
    MCX_EXPRESS = "MCX_EXPRESS",
}

export interface BankAccountDTO {
    id: string;
    type: BankAccountType;
    phoneNumber: string | null;
    bankName: string | null;
    iban: string | null;
    accountNumber: string | null;
    isActive: boolean;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBankAccountDTO {
    type: BankAccountType;
    bankName: string;
    iban?: string;
    phoneNumber?: string;
    accountNumber?: string;
}

export interface UpdateBankAccountDTO {
    type?: BankAccountType;
    bankName?: string;
    iban?: string;
    phoneNumber?: string;
    accountNumber?: string;
}