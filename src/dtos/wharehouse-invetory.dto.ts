export interface InventoryDashboardDTO {
    totalShelves: number;
    totalRows: number;
    totalProductsInStock: number;
    totalStockValue: number;
    entriesToday: number;
    exitsToday: number;
    occupancyRate: number;
    dailyStockTurnover: number;
}

export interface CreateShelfDto {
    totalRows: number;
}

export interface ShelfDTO {
    id: string;
    code: string;
    totalRows: number;
    createdAt: string;
}