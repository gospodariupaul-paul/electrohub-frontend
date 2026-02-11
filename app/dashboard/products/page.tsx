"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axios";
import { deleteProduct } from "@/app/services/products";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await axios.get("/products");
      setProducts(res.data);
    }
    load();
  }, []);

  async function handleDelete(id: number) {
    await deleteProduct(id);
    setProducts(products.filter((p: any) => p.id !== id));
  }

  return (
    <div>
      <h1>Products</h1>
      <Link href="/dashboard/products/create">Add product</Link>

      <ul>
        {products.map((p: any) => (
          <li key={p.id}>
            {p.name}
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
