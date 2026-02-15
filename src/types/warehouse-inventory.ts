export enum MovementType {
  IN = "IN",
  OUT = "OUT",
}

export enum MovementOrigin {
  WAREHOUSE = "WAREHOUSE",
  DELIVERY = "DELIVERY",
  MANUAL = "MANUAL",
}

export interface StockMovementProductDTO {
  id: string;
  name: string;
  sku: string;
  coverImage: string;
  shelfCode: string;
  row: number;
}

export interface StockMovementDTO {
  id: string;
  type: MovementType;
  origin: MovementOrigin;
  quantity: number;
  createdAt: string;
  referenceId: string | null;
  product: StockMovementProductDTO;
}

export interface RegisterEntryDto {
  productSku: string;
  shelfCode: string;
  row: number;
  quantity: number;
}
