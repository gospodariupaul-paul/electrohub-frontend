import { api } from "./api";

export const getAllUsers = () => api.get("/users/all");

export const getCurrentUser = () => api.get("/users/me");
