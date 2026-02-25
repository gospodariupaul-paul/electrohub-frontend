"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function SellerPublicPage() {
  const params = useParams();
  const router = useRouter();
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

  const startChat = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await axiosInstance.post("/chat/start", {
        sellerId: seller.id,
      });

      router.push(`/chat/${res.data.conversationId}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/70">
        Se încarcă...
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/70">
        Vânzătorul nu există.
      </div>
    );
  }

  const rating = seller.rating || 0;
  const totalProducts = products.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#050816] to-[#020617] text-white">

      {/* BUTON ÎNAPOI */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition text-sm"
        >
          ← Înapoi la homepage
        </Link>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER SELLER */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center gap-10">

          {/* Avatar */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 blur-2xl opacity-60" />
            <div className="relative w-32 h-32 rounded-full border border-white/20 overflow-hidden shadow-[0_0_25px_rgba(34,211,238,0.5)]">
              <img
                src={seller.avatar || "/default-avatar.png"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold">{seller.name}</h1>
            <p className="text-white/60 text-sm">{seller.email}</p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-semibold">{rating.toFixed(1)}</span>
                <span className="text-white/50">/ 5</span>
              </div>

              <div className="w-px h-4 bg-white/20" />

              <div className="text-white/70">
                {totalProducts} anunțuri publicate
              </div>
            </div>

            <button
              onClick={startChat}
              className="mt-4 w-full md:w-40 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-sm font-semibold shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:brightness-110 transition"
            >
              Trimite mesaj
            </button>
          </div>
        </div>

        {/* LISTA PRODUSE */}
        <h2 className="text-2xl font-semibold">Anunțurile vânzătorului</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_25px_rgba(0,0,0,0.6)] cursor-pointer transition hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)]">
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={p.images?.[0] || "/placeholder.png"}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="text-cyan-300 font-bold text-lg">
                    {p.price} lei
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
