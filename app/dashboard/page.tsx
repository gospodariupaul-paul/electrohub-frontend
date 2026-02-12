"use client";

import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await productService.getProducts(); // sau getAll(), după cum ai în service
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    }

    loadProducts();
  }, []);

  function handleLogout() {
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax;";
    document.cookie = "refresh_token=; path=/; max-age=0; SameSite=Lax;";
    router.push("/login");
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Dashboard</h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            background: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: 4,
            height: 40,
          }}
        >
          Logout
        </button>
      </div>

      {products.length === 0 && <p>No products found.</p>}

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} — {p.price} RON
          </li>
        ))}
      </ul>
    </div>
  );
}
