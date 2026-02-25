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
        const userRes = await axiosInstance.get(`/users/${sellerId}`);
        setSeller(userRes.data);

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]">
        <p className="text-white/70">Se încarcă...</p>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]">
        <p className="text-white/70">Vânzătorul nu există.</p>
      </div>
    );
  }

  const rating = seller.rating || 4.7;
  const totalProducts = products.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#050816] to-[#020617] text-white">
      {/* Glow background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* Header seller glass */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-10">
          {/* Avatar + glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 blur-2xl opacity-60" />
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border border-white/20 overflow-hidden shadow-[0_0_25px_rgba(34,211,238,0.5)]">
              <img
                src={seller.avatar || "/default-avatar.png"}
                alt={seller.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info seller */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {seller.name}
              </h1>
              <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 border border-cyan-400/40 text-cyan-300">
                Vânzător verificat
              </span>
            </div>

            <p className="text-sm text-white/60">{seller.email}</p>

            {/* Rating + număr anunțuri */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-semibold">{rating.toFixed(1)}</span>
                <span className="text-white/50">/ 5.0</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="text-white/70">
                {totalProducts} anunț{totalProducts === 1 ? "" : "uri"} active
              </div>
            </div>

            {/* Badge info */}
            <div className="flex flex-wrap gap-2 text-xs text-white/60">
              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                Activ pe platformă
              </span>
              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                Răspunde rapid la mesaje
              </span>
            </div>
          </div>

          {/* Buton contact */}
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Link
              href={`/product`}
              className="hidden"
            >
              {/* placeholder dacă vrei altceva aici */}
            </Link>
            <button
              className="w-full md:w-40 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-sm font-semibold shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:brightness-110 transition"
            >
              Trimite mesaj
            </button>
          </div>
        </div>

        {/* Titlu secțiune */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Anunțurile vânzătorului
          </h2>
          <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
            {totalProducts} rezultate
          </span>
        </div>

        {/* Lista de anunțuri */}
        {products.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-white/60">
            Acest vânzător nu are momentan anunțuri publicate.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_25px_rgba(0,0,0,0.6)] cursor-pointer transition transform hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)]">
                  {/* Imagine */}
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={p.images?.[0] || "/placeholder.png"}
                      alt={p.name}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/60 text-xs text-white/70 border border-white/20">
                      {p.category || "Anunț"}
                    </div>
                  </div>

                  {/* Info produs */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold line-clamp-2">
                      {p.name}
                    </h3>
                    <p className="text-cyan-300 font-bold text-lg">
                      {p.price} lei
                    </p>
                    <p className="text-xs text-white/50 line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  {/* Footer card */}
                  <div className="px-4 pb-4 flex items-center justify-between text-xs text-white/50">
                    <span>Vezi detalii</span>
                    <span className="text-cyan-300 group-hover:translate-x-1 transition">
                      → 
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
