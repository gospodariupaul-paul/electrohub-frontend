import axios from "@/lib/axios";

export const getUsers = () => axios.get("/api/users");

export const getUserById = (id: string) =>
  axios.get(`/api/users/${id}`);

export const createUser = (data: any) =>
  axios.post("/api/users", data);

export const updateUser = (id: string, data: any) =>
  axios.patch(`/api/users/${id}`, data);

export const deleteUser = (id: string) =>
  axios.delete(`/api/users/${id}`);
