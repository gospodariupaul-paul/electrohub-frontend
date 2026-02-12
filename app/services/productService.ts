const API_URL = "https://electrohub-backend-1-10qa.onrender.com";

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  categoryId?: number;
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  },
};
