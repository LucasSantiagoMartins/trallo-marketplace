import { MovementType, MovementOrigin } from "@/types/warehouse-inventory";

export const movementTypeMap: Record<
  MovementType,
  { label: string; color: string }
> = {
  [MovementType.IN]: {
    label: "Entrada",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  [MovementType.OUT]: {
    label: "Saída",
    color: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
};

export const movementOriginMap: Record<
  MovementOrigin,
  { label: string; color: string }
> = {
  [MovementOrigin.WAREHOUSE]: {
    label: "Armazém",
    color: "text-blue-600 dark:text-blue-400",
  },
  [MovementOrigin.DELIVERY]: {
    label: "Entrega / Cliente",
    color: " text-purple-600 dark:text-purple-400",
  },
  [MovementOrigin.MANUAL]: {
    label: "Ajuste Manual",
    color: " text-slate-600 dark:text-slate-400",
  },
};