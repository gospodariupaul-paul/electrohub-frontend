"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import SellerChatButton from "@/components/SellerChatButton";

export default function DashboardPage() {
  const { user } = useUser();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // 🔥 Cookie trimite tokenul automat
        const res = await axiosInstance.get("/products");
        setProducts(res.data || []);
      } catch (e) {
        console.error("Eroare:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  const deleteProduct = async (id: number) => {
    if (!confirm("Sigur vrei să ștergi acest produs?")) return;

    try {
      // 🔥 Cookie trimite tokenul automat
      await axiosInstance.delete(`/products/${id}`);

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error("Eroare la ștergere:", e);
      alert("Nu s-a putut șterge produsul.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Salut, {user?.name || "PAUL‑STELIAN"}!
          </h1>
          <p className="opacity-70 text-sm">
            Bine ai revenit în panoul tău de administrare.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard/products/add"
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
          >
            ➕ Adaugă produs
          </Link>

          <SellerChatButton userId={user?.id} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Produse active" value={products.length} />
        <StatCard title="Vizualizări totale" value="—" />
        <StatCard title="Mesaje noi" value="—" />
        <StatCard title="Anunțuri expirate" value="0" />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Produsele tale</h2>

        {loading ? (
          <p className="opacity-70">Se încarcă...</p>
        ) : products.length === 0 ? (
          <p className="opacity-70">Nu există produse.</p>
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
                      href={`/dashboard/products/${p.id}`}
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
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-[#070a20] border border-white/10 rounded-xl p-4 shadow-sm">
      <p className="text-sm opacity-70">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}
