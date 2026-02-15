import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import {
  RegisterEntryDto,
  StockMovementDTO,
} from "@/types/warehouse-inventory";

export async function registerStockEntry(
  data: RegisterEntryDto,
): Promise<ApiResponse<StockMovementDTO>> {
  const res = await http.post<StockMovementDTO>(
    endpoints.warehouseInventories.registerEntry,
    data,
  );
  return res;
}

export async function getStockEntries(): Promise<
  ApiResponse<StockMovementDTO[]>
> {
  const res = await http.get<StockMovementDTO[]>(
    endpoints.warehouseInventories.entries,
  );
  return res;
}

export async function getStockExits(): Promise<
  ApiResponse<StockMovementDTO[]>
> {
  const res = await http.get<StockMovementDTO[]>(
    endpoints.warehouseInventories.exits,
  );
  return res;
}
