"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/app/services/api";
import { productService } from "@/app/services/productService";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await api.get("/products");
      setProducts(res.data);
    }
    load();
  }, []);

  async function handleDelete(id: number) {
    await productService.remove(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <h1>Products</h1>
      <Link href="/dashboard/products/create">Add product</Link>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name}
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
