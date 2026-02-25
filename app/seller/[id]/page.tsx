"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function SellerPublicPage() {
  const params = useParams();
  const sellerId = params?.id;

  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // 🔥 1. Luăm datele vânzătorului
        const userRes = await axiosInstance.get(`/users/${sellerId}`);
        setSeller(userRes.data);

        // 🔥 2. Luăm produsele vânzătorului
        const prodRes = await axiosInstance.get(`/products/user/${sellerId}`);
        setProducts(prodRes.data);
      } catch (error) {
        console.error("Eroare la încărcarea vânzătorului:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [sellerId]);

  if (loading) {
    return <p className="p-6 text-white opacity-70">Se încarcă...</p>;
  }

  if (!seller) {
    return <p className="p-6 text-white opacity-70">Vânzătorul nu există.</p>;
  }

  return (
    <div className="p-6 text-white max-w-5xl mx-auto space-y-8">

      {/* ⭐ Informații vânzător */}
      <div className="bg-[#070a20] border border-white/10 p-6 rounded-xl">
        <h1 className="text-2xl font-bold">Anunțurile lui {seller.name}</h1>
        <p className="opacity-70">{seller.email}</p>
      </div>

      {/* ⭐ Lista de anunțuri */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Toate anunțurile vânzătorului</h2>

        {products.length === 0 ? (
          <p className="opacity-70">Acest vânzător nu are anunțuri publicate.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`}>
                <div className="bg-[#070a20] border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/5 transition">
                  <img
                    src={p.images?.[0] || "/placeholder.png"}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-bold mt-3">{p.name}</h3>
                  <p className="opacity-70">{p.price} lei</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
