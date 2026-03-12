"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export default function DashboardProductsPage() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await axiosInstance.get("/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Sigur vrei să ștergi produsul?")) return;

    await axiosInstance.delete(`/products/${id}`);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Produsele tale</h1>

      <div className="space-y-4">
        {products.map((p: any) => (
          <div
            key={p.id}
            className="p-4 bg-[#0a0d25] border border-white/10 rounded flex justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="opacity-70">{p.price} €</p>
            </div>

            <button
              onClick={() => deleteProduct(p.id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded"
            >
              Șterge
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
