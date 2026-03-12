import { UserRole } from "@/enums/user";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export interface AuthUser {
  id: number,
  fullName: string;
  role: UserRole;
  token?: string;
  profilePicture?: string;
  address?: string;
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