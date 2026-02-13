"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/app/services/products";
import { getCategories } from "@/app/services/categories";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
    getCategories().then(setCategories);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <h2>Products</h2>
      <pre>{JSON.stringify(products, null, 2)}</pre>

      <h2>Categories</h2>
      <pre>{JSON.stringify(categories, null, 2)}</pre>
    </div>
  );
}
