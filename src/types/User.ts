export interface User {
  currentUser: null | UserShema;
  error: unknown;
}
export interface UserCredentials {
  email: string;
  password: string;
}
export interface LoginResponce {
  access_token: string;
}

export type UserShema = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  avatar: string;
};

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role?: string;
}
