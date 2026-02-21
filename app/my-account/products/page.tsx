"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function MyProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // 🔥 Luăm produsele DOAR ale userului logat
        const res = await axiosInstance.get("/products/my-products");
        setProducts(res.data || []);
      } catch (e) {
        console.error("Eroare la încărcarea produselor:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const deleteProduct = async (id: number) => {
    if (!confirm("Sigur vrei să ștergi acest produs?")) return;

    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error("Eroare la ștergere:", e);
      alert("Nu s-a putut șterge produsul.");
    }
  };

  return (
    <div className="p-6 text-white space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Produsele mele</h1>

        <Link
          href="/my-account/products/add"
          className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
        >
          ➕ Adaugă produs
        </Link>
      </div>

      {/* LISTA PRODUSE */}
      {loading ? (
        <p className="opacity-70">Se încarcă...</p>
      ) : products.length === 0 ? (
        <p className="opacity-70">Nu ai încă produse adăugate.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-[#070a20] border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400 transition"
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-36 object-cover"
                />
              )}

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{p.name}</h4>
                  <span className="text-sm font-bold text-cyan-300">
                    {p.price} lei
                  </span>
                </div>

                <p className="text-xs opacity-70 line-clamp-2">
                  {p.description}
                </p>

                <div className="flex gap-2 pt-2">
                  <Link
                    href={`/my-account/products/${p.id}`}
                    className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 rounded text-sm"
                  >
                    Editează
                  </Link>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
                  >
                    Șterge
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
