import { api } from "./api";

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  categoryId?: number;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    const res = await api.get<Product[]>("/products");
    return res.data;
  },

  async getProductById(id: number | string): Promise<Product> {
    const res = await api.get<Product>(`/products/${id}`);
    return res.data;
  },

  async createProduct(data: Partial<Product>): Promise<Product> {
    const res = await api.post<Product>("/products", data);
    return res.data;
  },

  async updateProduct(
    id: number | string,
    data: Partial<Product>
  ): Promise<Product> {
    const res = await api.put<Product>(`/products/${id}`, data);
    return res.data;
  },

  async deleteProduct(id: number | string): Promise<{ message: string }> {
    const res = await api.delete<{ message: string }>(`/products/${id}`);
    return res.data;
  }
};
