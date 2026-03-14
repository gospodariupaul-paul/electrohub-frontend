"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // 🔥 Luăm user-ul din localStorage
        const u = localStorage.getItem("user");
        if (!u) {
          setLoading(false);
          return;
        }

        const user = JSON.parse(u);

        // 🔥 Endpoint-ul CORECT din backend
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
              <div
                key={p.id}
                className="bg-[#111] border border-[#222] rounded-xl p-4 hover:border-cyan-500 transition"
              >
                <img
                  src={p.images?.[0] || "/placeholder.png"}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <h2 className="text-xl font-semibold mb-2">{p.name}</h2>

                <p className="text-cyan-400 text-lg font-bold mb-2">
                  {p.price} lei
                </p>

                <div className="flex gap-3">
                  <Link
                    href={`/edit/${p.id}`}
                    className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm"
                  >
                    Editează
                  </Link>

                  <Link
                    href={`/delete/${p.id}`}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                  >
                    Șterge
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
