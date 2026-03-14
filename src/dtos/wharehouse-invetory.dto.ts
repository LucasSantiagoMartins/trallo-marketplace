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