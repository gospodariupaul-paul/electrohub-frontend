"use client";

import { useEffect, useState } from "react";

const API_BASE = "https://electrohub-backend.vercel.app";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`);
        if (res.ok) setProducts(await res.json());
      } catch (e) {
        console.error("Eroare:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-cyan-300">Produse</h1>
        <a
          href="/dashboard/products/add"
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm shadow-[0_0_15px_rgba(34,211,238,0.4)] transition"
        >
          + Adaugă produs
        </a>
      </div>

      {loading ? (
        <p className="opacity-70">Se încarcă...</p>
      ) : products.length === 0 ? (
        <p className="opacity-70">Nu există produse.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map((p: any) => (
            <div
              key={p.id}
              className="bg-[#070a20] border border-cyan-500/30 rounded-xl p-5 hover:border-cyan-400 transition"
            >
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm opacity-70 mt-1">{p.description}</p>
              <p className="text-cyan-300 font-bold mt-3">{p.price} lei</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
