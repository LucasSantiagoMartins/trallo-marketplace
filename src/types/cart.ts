export interface CartItem {
  id: number;
  name: string;
  attr: string;
  price: number;
  qty: number;
  image: string;
}

export type ModalType = "single" | "all" | "payment_choice" | "checkout" | null;
export type PaymentType = "online" | "presencial";
export type PaymentMethod = "mcx" | "transfer";