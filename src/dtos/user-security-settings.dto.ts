export type TwoFactorMethod = "EMAIL" | "SMS";

export interface UserSecuritySettings {
    id: string;
    twoFactorMethod: TwoFactorMethod;
    secureLogin: boolean;
    secureOperations: boolean;
    updatedAt: string;
}

export interface UpdateSecuritySettingsDTO {
    twoFactorMethod?: TwoFactorMethod;
    secureLogin?: boolean;
    secureOperations?: boolean;
    code?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}