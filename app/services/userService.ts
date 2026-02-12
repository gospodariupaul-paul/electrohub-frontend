import { api } from "./api";

export interface User {
  id: number;
  email: string;
  name?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const usersService = {
  async getAllUsers(): Promise<User[]> {
    const res = await api.get<User[]>("/users/all");
    return res.data;
  },

  async getCurrentUser(): Promise<User> {
    const res = await api.get<User>("/users/me");
    return res.data;
  },
};
