export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}
