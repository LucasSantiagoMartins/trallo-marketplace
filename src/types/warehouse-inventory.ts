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
  quantity: number;
}

export interface DeliveryDetailsDTO {
  id: string;
  status: string;
  trackingCode: string;
  shippedAt: string | null;
  deliveredAt: string | null;
  delivererId: number;
  delivererName: string;
}

export interface StockMovementDTO {
  id: string;
  type: MovementType;
  origin: MovementOrigin;
  createdAt: string;
  referenceId: string | null;
  product: StockMovementProductDTO;
  delivery?: DeliveryDetailsDTO;
}

export interface RegisterExitDto {
  delivererId: number;
  orderNumber: string;
  items: StockExitItem[];
}
export interface StockExitItem {
  productSku: string;
  quantity: number;
}

export interface StockEntryItem {
  productSku: string;
  shelfCode: string;
  row: number;
  quantity: number;
}


export interface RegisterEntryDto {
  orderNumber: string;
  items: StockEntryItem[];
}