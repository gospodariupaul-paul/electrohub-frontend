import axios from "@/lib/axios";

export const getUser = () => axios.get("/api/users/me");
export const getUserById = (id: string) => axios.get(`/api/users/${id}`);
export const updateUser = (data: any) =>
  axios.patch("/api/users/me", data);
export const deleteUser = () => axios.delete("/api/users/me");
