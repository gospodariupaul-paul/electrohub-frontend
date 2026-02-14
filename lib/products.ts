import axios from "@/lib/axios";

export const getProducts = () => axios.get("/api/products");
export const getProduct = (id: string) => axios.get(`/api/products/${id}`);
export const createProduct = (data: any) =>
  axios.post("/api/products", data);
export const updateProduct = (id: string, data: any) =>
  axios.patch(`/api/products/${id}`, data);
export const deleteProduct = (id: string) =>
  axios.delete(`/api/products/${id}`);
