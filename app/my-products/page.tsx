"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

// 🔥 Import ProductCard
import ProductCard from "@/components/ProductCard";

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const u = localStorage.getItem("user");

        if (!u) {
          console.warn("User nu este logat sau localStorage este gol.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(u);

        if (!user.id) {
          console.error("User ID lipsă sau invalid:", user);
          setLoading(false);
          return;
        }

        const res = await axiosInstance.get(`/products/user/${user.id}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Eroare la încărcarea produselor mele:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Se încarcă produsele tale...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b141a] text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/"
          className="mb-6 inline-block px-4 py-2 bg-[#00eaff] text-black rounded-lg font-semibold hover:bg-[#00c7d6] transition"
        >
          ← Înapoi la homepage
        </Link>

        <h1 className="text-2xl font-bold mb-6">Produsele mele</h1>

        {products.length === 0 ? (
          <p className="text-white/50">Nu ai încă produse publicate.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
