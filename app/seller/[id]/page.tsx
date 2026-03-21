"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SellerPage() {
  const { id } = useParams();
  const router = useRouter();

  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ⭐ RATINGURI VANZATOR
  const [ratings, setRatings] = useState<any[]>([]);
  const [average, setAverage] = useState("–");
  const [distribution, setDistribution] = useState<any>({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  useEffect(() => {
    if (!id) return;

    const API = process.env.NEXT_PUBLIC_API_URL;

    // 🔥 1. Luăm datele vânzătorului
    fetch(`${API}/products/seller/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setSeller(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Eroare la încărcarea vânzătorului:", err);
        setLoading(false);
      });

    // 🔥 2. Luăm ratingurile vânzătorului
    fetch(`${API}/ratings/user/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setRatings(data);

        if (data.length > 0) {
          const avg =
            data.reduce((a: number, b: any) => a + b.stars, 0) / data.length;
          setAverage(avg.toFixed(1));
        }

        const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        data.forEach((r: any) => {
          dist[r.stars] = dist[r.stars] + 1;
        });
        setDistribution(dist);
      })
      .catch(() => {});
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Se încarcă profilul vânzătorului...
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Vânzătorul nu a fost găsit.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b141a] text-white p-6">

      {/* 🔥 BUTON ÎNAPOI */}
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-[#00eaff] text-black rounded-lg font-semibold hover:bg-[#00c7d6] transition"
      >
        ← Înapoi la pagina anterioară
      </button>

      {/* ⭐ PROFIL VANZATOR */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={seller.avatarUrl || "/avatar.png"}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{seller.name}</h1>
          <p className="text-gray-400">S-a înscris în {seller.joinYear}</p>
          <p className="text-gray-400">{seller.activeListings} anunțuri active</p>

          <button
            onClick={() => router.push(`/rate/${id}`)}
            className="mt-3 px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            ⭐ Evaluează vânzătorul
          </button>
        </div>
      </div>

      {/* ⭐⭐⭐ RATING GENERAL + GRAFIC */}
      <div className="bg-[#111b21] p-4 rounded-lg mb-6 border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Ratingul vânzătorului</h2>

        <div className="flex items-center gap-4 mb-6">
          <p className="text-5xl font-bold text-yellow-400">{average} ⭐</p>
          <p className="text-gray-400">{ratings.length} evaluări</p>
        </div>

        {/* 📊 GRAFIC DISTRIBUȚIE */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = distribution[star];
            const percent =
              ratings.length > 0 ? (count / ratings.length) * 100 : 0;

            return (
              <div key={star}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{star} ⭐</span>
                  <span>{count}</span>
                </div>

                <div className="w-full bg-gray-700 h-3 rounded">
                  <div
                    className="bg-yellow-400 h-3 rounded"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ⭐⭐⭐ LISTA RATINGURI */}
      <div className="bg-[#111b21] p-4 rounded-lg mb-6 border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Recenzii primite</h2>

        {ratings.length === 0 && (
          <p className="text-gray-400">Acest vânzător nu are încă ratinguri.</p>
        )}

        <div className="flex flex-col gap-4">
          {ratings.map((r: any) => (
            <div
              key={r.id}
              className="bg-[#0f1a20] p-4 rounded-lg border border-white/10"
            >
              <p className="text-yellow-400 text-xl">{r.stars} ⭐</p>
              <p className="text-gray-300 mt-2">{r.comment || "Fără comentariu"}</p>
              <p className="text-gray-500 text-sm mt-2">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ⭐⭐⭐ ANUNTURI VANZATOR */}
      <div className="bg-[#111b21] p-4 rounded-lg border border-white/10">
        <h2 className="text-lg font-semibold mb-4">
          Anunțurile listate de {seller.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {seller.listings.map((p: any) => (
            <div
              key={p.id}
              className="bg-[#0f1a20] p-3 rounded-lg cursor-pointer hover:bg-[#15232b] transition"
              onClick={() => router.push(`/product/${p.id}`)}
            >
              <img
                src={p.images?.[0] || "/placeholder.png"}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{p.name}</h3>
              <p className="text-[#00eaff] font-bold">{p.price} RON</p>
              <p className="text-gray-400 text-sm">{p.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
