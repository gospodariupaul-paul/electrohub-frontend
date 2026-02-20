"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data || []);
      } catch (e) {
        console.error("Eroare:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produse</h1>

        {/* BUTON ADD PRODUCT */}
        <Link
          href="/dashboard/products/add"
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded"
        >
          Adaugă produs
        </Link>
      </div>

      {loading ? (
        <p className="opacity-70">Se încarcă...</p>
      ) : products.length === 0 ? (
        <p className="opacity-70">Nu există produse.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p: any) => (
            <Link key={p.id} href={`/dashboard/products/${p.id}`}>
              <div className="bg-[#070a20] border border-white/10 rounded-xl p-4 cursor-pointer hover:border-cyan-400 transition">

                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}

                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{p.name}</h4>
                  <span className="text-sm font-bold text-cyan-300">
                    {p.price} lei
                  </span>
                </div>

                <p className="text-xs opacity-70">{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
