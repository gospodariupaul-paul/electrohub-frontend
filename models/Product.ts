export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  category: string;
  brand?: string | null;
  stock: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
