import { http } from "../api/http";
import { endpoints } from "../api/endpoints";
import type { ApiResponse } from "@/types/api";
import {
  RegisterEntryDto,
  RegisterExitDto,
  StockMovementDTO,
} from "@/types/warehouse-inventory";
import { CreateShelfDto, InventoryDashboardDTO, ShelfDTO } from "@/dtos/wharehouse-invetory.dto";



export async function registerStockEntry(
  data: RegisterEntryDto,
): Promise<ApiResponse<StockMovementDTO>> {
  return await http.post<StockMovementDTO>(
    endpoints.warehouseInventories.entries,
    data,
  );
}

export async function registerStockExit(
  data: RegisterExitDto,
): Promise<ApiResponse<StockMovementDTO>> {
  return await http.post<StockMovementDTO>(
    endpoints.warehouseInventories.exits,
    data,
  );
}

export async function getStockEntries(): Promise<
  ApiResponse<StockMovementDTO[]>
> {
  return await http.get<StockMovementDTO[]>(
    endpoints.warehouseInventories.entries,
  );
}

export async function getStockExits(): Promise<
  ApiResponse<StockMovementDTO[]>
> {
  return await http.get<StockMovementDTO[]>(
    endpoints.warehouseInventories.exits,
  );
}

export async function getDashboard(): Promise<
  ApiResponse<InventoryDashboardDTO>
> {
  return await http.get<InventoryDashboardDTO>(
    endpoints.warehouseInventories.dashboard,
  );
}

export async function createShelf(
  data: CreateShelfDto,
): Promise<ApiResponse<ShelfDTO>> {
  return await http.post<ShelfDTO>(
    endpoints.warehouseInventories.shelves,
    data,
  );
}

export async function getShelves(): Promise<ApiResponse<ShelfDTO[]>> {
  return await http.get<ShelfDTO[]>(endpoints.warehouseInventories.shelves);
}

export async function deleteShelf(id: string): Promise<ApiResponse<void>> {
  return await http.delete<void>(
    endpoints.warehouseInventories.deleteShelf(id),
  );
}