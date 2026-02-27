export const BASE_URL = "http://localhost:9090";
export const BASE_UPLOAD_URL = "http://localhost:9090/uploads/";

export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/users",
  },
  users: {
    list: "/users",
  },
  warehouseInventories: {
    exits: "/warehouse-inventories/exits",
    entries: "/warehouse-inventories/entries",
    registerEntry: "/warehouse-inventories/entries",
  },
  products: {
    search: "/products/search",
    create: "/products",
    myProducts: "/products/my",
    submitValidation: (id: string) => `/products/${id}/submit-for-verification`,
    pendingVerifications: "/products/verifications/pending",
    details: (id: string) => `/products/${id}`,
    verify: (id: string) => `/products/${id}/verification`,
    update: (id: string) => `/products/${id}`,
  },

  carts: {
    getMyCart: "/carts",
    addToCart: (productId: string) => `/carts/add/${productId}`,
    updateQuantity: (cartItemId: string) => `/carts/item/${cartItemId}`,
    removeItem: (cartItemId: string) => `/carts/item/${cartItemId}`,
    clear: "/carts/clear",
  },
  orders: {
    buyerOrders: "/orders/my/buyer",
  },
  
  checkouts: {
    fromCart: "/checkouts/cart",
    fromProduct: (productId: string) => `/checkouts/product/${productId}`,
  },
};
