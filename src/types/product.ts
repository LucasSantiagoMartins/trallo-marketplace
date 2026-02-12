export enum ProductCondition {
  NEW = "NEW",
  SEMI_NEW = "SEMI_NEW",
  USED = "USED",
}

export enum ProductStatus {
  AWAITING_SUBMISSION = "AWAITING_SUBMISSION",
  SUBMITTED = "SUBMITTED",
  ONLINE_VERIFIED = "ONLINE_VERIFIED",
  TRALLO_VERIFIED = "TRALLO_VERIFIED",
  REJECTED_ONLINE = "REJECTED_ONLINE",
  REJECTED_TRALLO = "REJECTED_TRALLO",
}

export interface ProductStockDTO {
  totalQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
}

export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  condition: ProductCondition;
  status: ProductStatus;
  createdAt: string;
  coverImage: string;
  stock: ProductStockDTO;
}
