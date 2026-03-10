import axios from "@/lib/axios";

export const getProducts = () => axios.get("/products");
export const getProduct = (id: string) => axios.get(`/products/${id}`);

export const createProduct = (data: any) =>
  axios.post("/products", data, { withCredentials: true });

export const updateProduct = (id: string, data: any) =>
  axios.put(`/products/${id}`, data, { withCredentials: true });

export const deleteProduct = (id: string) =>
  axios.delete(`/products/${id}`, { withCredentials: true });
