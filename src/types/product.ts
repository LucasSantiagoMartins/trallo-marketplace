export enum ProductCondition {
  NEW = "NEW",
  SEMI_NEW = "SEMI_NEW",
  USED = "USED",
}

export enum ProductVerificationType {
  ONLINE = "ONLINE",
  TRALLO = "TRALLO",
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
  category?: string;
  price: number;
  condition: ProductCondition;
  status: ProductStatus;
  createdAt: string;
  coverImage: string;
  images: string[];
  stock: ProductStockDTO;
}

export interface PendingVerificationDTO {
  verificationId: string;
  id: string;
  name: string;
  description: string;
  price: number;
  condition: ProductCondition;
  status: ProductStatus;
  createdAt: string;
  videoUrl?: string;
  notes?: string;
  coverImage: string;
  images: string[];
  stock: ProductStockDTO;
}

export interface UpdateProductDTO extends Partial<
  Omit<ProductDTO, "id" | "stock" | "coverImage" | "status" | "createdAt">
> {
  stockQuantity?: number;
}

export interface SearchedProductDTO {
  id: string;
  name: string;
  description: string;
  category?: string; // Opcional conforme o JSON
  price: number;
  condition: ProductCondition;
  status: ProductStatus;
  coverImage: string;
  seller: SellerDTO; // Adicionado conforme o JSON
  images: ProductImageDTO[]; // Agora é um array de objetos, não de strings
  stock: ProductStockDTO;
  createdAt: string;
}

export interface ProductImageDTO {
  url: string;
  position: number;
}

export interface SellerDTO {
  id: number;
  fullName: string;
}
