import axios from "@/lib/axios";

export const getCategories = () => axios.get("/api/categories");
export const getCategory = (id: string) => axios.get(`/api/categories/${id}`);
export const createCategory = (data: any) =>
  axios.post("/api/categories", data);
export const updateCategory = (id: string, data: any) =>
  axios.patch(`/api/categories/${id}`, data);
export const deleteCategory = (id: string) =>
  axios.delete(`/api/categories/${id}`);
