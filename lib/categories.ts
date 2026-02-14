import axios from "@/lib/axios";

export const getCategories = () => axios.get("/categories");
export const getCategory = (id: string) => axios.get(`/categories/${id}`);
export const createCategory = (data: { name: string }) =>
  axios.post("/categories", data);
export const updateCategory = (id: string, data: { name: string }) =>
  axios.put(`/categories/${id}`, data);
export const deleteCategory = (id: string) =>
  axios.delete(`/categories/${id}`);
