import { UserRole } from "@/enums/user";

export const userRoleLabel: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Administrador",
  [UserRole.SELLER]: "Vendedor",
  [UserRole.BUYER]: "Comprador",
  [UserRole.OPERATOR]: "Operador",
  [UserRole.DELIVERER]: "Entregador",
};

export const userRoleColor: Record<UserRole, string> = {
  [UserRole.ADMIN]: "bg-purple-500/10 text-purple-600",
  [UserRole.SELLER]: "bg-blue-500/10 text-blue-600",
  [UserRole.BUYER]: "bg-emerald-500/10 text-emerald-600",
  [UserRole.OPERATOR]: "bg-amber-500/10 text-amber-600",
  [UserRole.DELIVERER]: "bg-pink-500/10 text-pink-600",
};

export function getUserRoleLabel(role: UserRole): string {
  return userRoleLabel[role] || role;
}

export function getUserRoleColor(role: UserRole): string {
  return userRoleColor[role] || "bg-gray-500/10 text-gray-500";
}
