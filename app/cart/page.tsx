"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export default function CartPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/cart/me", { withCredentials: true })
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Eroare la încărcarea coșului:", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Coșul tău</h1>

      {items.length === 0 && (
        <p className="text-gray-400">Coșul tău este gol.</p>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 mb-4 bg-white/10 rounded-lg border border-white/20"
        >
          <h2 className="text-lg font-semibold">{item.product.name}</h2>
          <p>Cantitate: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}
