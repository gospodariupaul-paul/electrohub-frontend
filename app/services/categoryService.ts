import { api } from "./api";

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const res = await api.get<Category[]>("/categories");
    return res.data;
  },

  async getCategoryById(id: number | string): Promise<Category> {
    const res = await api.get<Category>(`/categories/${id}`);
    return res.data;
  },

  async createCategory(data: Partial<Category>): Promise<Category> {
    const res = await api.post<Category>("/categories", data);
    return res.data;
  },

  async updateCategory(
    id: number | string,
    data: Partial<Category>
  ): Promise<Category> {
    const res = await api.put<Category>(`/categories/${id}`, data);
    return res.data;
  },

  async deleteCategory(
    id: number | string
  ): Promise<{ message: string }> {
    const res = await api.delete<{ message: string }>(`/categories/${id}`);
    return res.data;
  }
};
