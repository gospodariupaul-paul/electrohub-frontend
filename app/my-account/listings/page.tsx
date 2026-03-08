"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyListingsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://electrohub-backend-1-10qa.onrender.com/products/my", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-white/60 p-6">Se încarcă produsele tale...</p>;
  }

  if (products.length === 0) {
    return (
      <div className="p-6 text-white/60">
        <p>Nu ai încă produse publicate.</p>
        <Link
          href="/add-product"
          className="text-cyan-400 underline mt-2 inline-block"
        >
          Adaugă primul tău produs →
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Produsele mele</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <img
              src={p.images?.[0] || "/placeholder.png"}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-cyan-300">{p.price} lei</p>

            <Link
              href={`/product/${p.id}`}
              className="text-xs text-cyan-400 underline mt-2 inline-block"
            >
              Vezi detalii →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
