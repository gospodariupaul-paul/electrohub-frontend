import axios from "@/lib/axios";

export const getProducts = () => axios.get("/products");
export const getProduct = (id: string) => axios.get(`/products/${id}`);
export const createProduct = (data: any) => axios.post("/products", data);
export const updateProduct = (id: string, data: any) =>
  axios.patch(`/products/${id}`, data);
export const deleteProduct = (id: string) => axios.delete(`/products/${id}`);
