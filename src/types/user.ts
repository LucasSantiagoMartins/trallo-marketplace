import { PaginationDTO } from "@/dtos/pagination";
import { UserRole } from "@/enums/user";

export interface UserResponseDTO {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture?: string;
  address: string | null;
  role: UserRole;
  isSuspended: boolean;
  suspensionReason: string | null;
  suspendedAt: string | null;
  createdAt: string;
}

export class UserFiltersDto {
  query?: string;
  role?: UserRole;
  createdBefore?: Date;
  createdAfter?: Date;
}


export interface GetUsersResponseDTO {
  users: UserResponseDTO[];
  pagination: PaginationDTO
}

export interface RegisterDTO {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: "BUYER" | "SELLER";
  address?: string;
  latitude?: number;
  longitude?: number;
}