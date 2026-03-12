import { UserRole } from "@/enums/user";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};



export class AuthUser {
  id: number;
  token: string;
  role: string;
  fullName: string;
  profilePicture?: string;
  address?: string;
}

export class MfaRequiredDto {
  mfaRequired: boolean;
  mfaToken: string;
  method: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string | undefined;
  role: UserRole;
  profilePicture?: string;
}