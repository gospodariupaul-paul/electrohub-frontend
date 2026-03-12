"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

export default function DashboardProductsPage() {
  const [products, setProducts] = useState([]);

  // 🔥 ÎNCARCĂ PRODUSELE
  const loadProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Eroare la încărcarea produselor:", err);
    }
  };

  // 🔥 ȘTERGE PRODUS
  const deleteProduct = async (id: number) => {
    if (!confirm("Sigur vrei să ștergi acest produs?")) return;

    try {
      await axiosInstance.delete(`/products/${id}`);
      loadProducts(); // reîncarcă lista după ștergere
    } catch (err) {
      console.error("Eroare la ștergere:", err);
      alert("Nu s-a putut șterge produsul.");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-10 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produse</h1>

        <Link
          href="/dashboard/products/add"
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded"
        >
          + Adaugă produs
        </Link>
      </div>

      <div className="space-y-4">
        {products.length === 0 && (
          <p className="opacity-70">Nu există produse.</p>
        )}

        {products.map((p: any) => (
          <div
            key={p.id}
            className="p-4 bg-[#0a0d25] border border-white/10 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="opacity-70">{p.price} €</p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/dashboard/products/${p.id}`}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
              >
                Editează
              </Link>

              <button
                onClick={() => deleteProduct(p.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded"
              >
                Șterge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
