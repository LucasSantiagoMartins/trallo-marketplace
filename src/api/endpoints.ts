export const BASE_URL = "http://10.165.162.79:9090";
export const BASE_UPLOAD_URL = "http://10.165.162.79:9090/uploads/";

export const endpoints = {
  auth: {
    login: "/auth/login",
    verify2faCode: "/auth/verify-2fa",
    register: "/users",
  },
  users: {
    list: "/users",
    updateProfilePicture: "/users/profile-picture",
    updateUser: "/users/me",
    reviewSeller: "/reviews",
    myInfo: "/users/me",
    changePassword: "/users/change-password",
    resetPassword: "/users/reset-password",
    requestResetPassword: "/users/request-reset-password",
    deleteMyAccount: "/users/my-account",
    sellerProfile: (slug: string) => `/users/seller-profile/${slug}`,
    createStaff: "/users/staff",
    suspend: (userId: string) => `/users/${userId}/suspend`,
    reactivate: (userId: string) => `/users/${userId}/reactivate`,
    delete: (userId: string) => `/users/${userId}`,
  },
  notifications: {
    list: "/notifications",
    read: (id: string) => `/notifications/${id}/read`,
    delete: (id: string) => `/notifications/${id}`,
    deleteAll: "/notifications/all",
  },

  disputes: {
    create: "/disputes",
    get: "/disputes/pending",
    respondDisputes: (id: string) => `/disputes/${id}/respond`,
  },
    
  warehouseInventories: {
    dashboard: "/warehouse-inventories/dashboard",
    exits: "/warehouse-inventories/exits",
    entries: "/warehouse-inventories/entries",
    shelves: "/warehouse-inventories/shelves",
    deleteShelf: (id: string) => `/warehouse-inventories/shelves/${id}`,
  },
  products: {
    search: "/products/search",
    searchBySlug: (slug: string) => `/products/search/${slug}`,
    create: "/products",
    myProducts: "/products/my",
    submitValidation: (id: string) => `/products/${id}/submit-for-verification`,
    pendingVerifications: "/products/verifications/pending",
    details: (id: string) => `/products/${id}`,
    verify: (id: string) => `/products/${id}/verification`,
    update: (id: string) => `/products/${id}`,
    sellerProducts: (slug: string) => `/products/seller/${slug}`,
  },
  carts: {
    getMyCart: "/carts",
    addToCart: (productId: string) => `/carts/add/${productId}`,
    updateQuantity: (cartItemId: string) => `/carts/item/${cartItemId}`,
    removeItem: (cartItemId: string) => `/carts/item/${cartItemId}`,
    clear: "/carts/clear",
  },
  deliverers: {
    confirmDelivery: (orderNumber: string) => `/deliveries/${orderNumber}/confirm`,
    deliveries: "/deliveries/my",
  },
  orders: {
    buyerOrders: "/orders/my/buyer",
    sellerOrders: "/orders/my/seller",
    adminOrders: "/orders",
    getByOrderNumber: (orderNumber: string) => `/orders/${orderNumber}`,
    processDecision: (orderNumber: string) => `/orders/process-decision/${orderNumber}`,

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
    verifyCode: "/user-security-settings/verify-code",
    get: "/user-security-settings",
    update: "/user-security-settings",
    requestCode: "/user-security-settings/request-code"
  }
};
