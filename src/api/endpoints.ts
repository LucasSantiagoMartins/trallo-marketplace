export const BASE_URL = "http://localhost:9000";

export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/users",
  },
  products: {
    create: "/products",
    list: "/products",
    details: (id: string) => `/products/${id}`,
  },
};
