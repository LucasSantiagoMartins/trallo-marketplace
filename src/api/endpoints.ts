export const BASE_URL = "http://localhost:9090";
export const BASE_UPLOAD_URL = "http://localhost:9090/uploads/";

export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/users",
  },
  products: {
    create: "/products",
    myProducts: "/products/my",
    submitValidation: (id: string) => `/products/${id}/submit-for-verification`,
    pendingVerifications:"/products/verifications/pending",
    details: (id: string) => `/products/${id}`,
  },
};
