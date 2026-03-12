import MyProductsPage from "@/pages/MyProducts";

export const BASE_URL = "http://localhost:9090";
export const BASE_UPLOAD_URL = "http://localhost:9090/uploads/";

export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/users",
  },
  users: {
    list: "/users",
    updateProfilePicture: "/users/profile-picture",
    updateUser: "/users/me",
    myInfo: "/users/me"
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
    sellerOrders: "/orders/my/seller",
  },
  wallets: {
    summary: "/wallets/summary",
  },
  withdrawals: {
    request: "/withdrawals",
  },
  transactions: {
    my: (limit: number, page: number, type?: string, status?: string) => {
      let url = `/transactions/my?limit=${limit}&page=${page}`;
      if (type) url += `&type=${type}`;
      if (status) url += `&status=${status}`;
      return url;
    },
  },

  checkouts: {
    fromCart: "/checkouts/cart",
    fromProduct: (productId: string) => `/checkouts/product/${productId}`,
  },

  admin: {
    dashboardOverview: "/admin/dashboards/overview",

    dashboards: {
      transactions: "/admin/dashboards/transactions",
      payments: "/admin/dashboards/payments",
      wallets: "/admin/dashboards/wallets",
    },

    wallets: {
      list: "/wallets/admin/list",
    },

    transactions: {
      list: "/transactions/admin/list",
    },

    payments: {
      list: "/payments/admin/list",
    },


  },
  bankAccounts: {
    list: "/bank-accounts",
    create: "/bank-accounts",
    update: (id: string) => `/bank-accounts/${id}`,
    delete: (id: string) => `/bank-accounts/${id}`,
  },

  salesCenter: {
    summary: "/orders/my/sales-summary"
  },
  userSecuritySettings: {
    get: "/user-security-settings",
    update: "/user-security-settings",
  }
};
