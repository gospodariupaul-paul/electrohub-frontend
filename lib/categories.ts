import { API } from "./api";

export const getCategories = () => API.get("/categories");
export const getCategory = (id: string) => API.get(`/categories/${id}`);
export const createCategory = (data: { name: string }) =>
  API.post("/categories", data);
export const updateCategory = (id: string, data: { name: string }) =>
  API.put(`/categories/${id}`, data);
export const deleteCategory = (id: string) =>
  API.delete(`/categories/${id}`);
