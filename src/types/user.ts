import { UserRole } from "@/enums/user";

export interface UserResponseDTO {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
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