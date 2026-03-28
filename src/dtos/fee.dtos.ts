import { FeeType } from "@/enums/fee-type.enum";

export interface Fee {
    id: string;
    type: FeeType;
    value: number;
    active: boolean;
}

export interface CreateUpdateFeeDto {
    type: FeeType;
    value: number;
}