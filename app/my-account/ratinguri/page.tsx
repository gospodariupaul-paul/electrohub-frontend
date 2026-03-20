"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

export default function RatinguriPage() {
  const [received, setReceived] = useState([]);
  const [given, setGiven] = useState([]);

  const [filter, setFilter] = useState(0); // 0 = toate

  useEffect(() => {
    axiosInstance.get("/ratings/me", { withCredentials: true })
      .then((res) => setReceived(res.data))
      .catch(() => setReceived([]));

    axiosInstance.get("/ratings/given", { withCredentials: true })
      .then((res) => setGiven(res.data))
      .catch(() => setGiven([]));
  }, []);

  const average =
    received.length > 0
      ? (received.reduce((a, b) => a + b.stars, 0) / received.length).toFixed(1)
      : "–";

  const filteredReceived =
    filter === 0 ? received : received.filter((r: any) => r.stars === filter);

  // 🔥 CALCUL BADGE
  const getBadge = () => {
    const total = received.length;
    const avg = Number(average);

    // ratinguri în ultimele 30 zile
    const recent = received.filter((r: any) => {
      const diff = Date.now() - new Date(r.createdAt).getTime();
      return diff < 30 * 24 * 60 * 60 * 1000; // 30 zile
    }).length;

    if (avg > 4.8 && total >= 20)
      return { label: "Super Seller", color: "bg-green-600", emoji: "🟩" };

    if (avg > 4.5 && total >= 10)
      return { label: "Trusted Buyer", color: "bg-blue-600", emoji: "🟦" };

    if (recent >= 5)
      return { label: "Active User", color: "bg-yellow-500", emoji: "🟨" };

    if (avg < 3)
      return { label: "Needs Improvement", color: "bg-red-600", emoji: "🟥" };

    return null;
  };

  const badge = getBadge();

  return (
    <div className="text-white p-6 max-w-4xl mx-auto">

      <Link href="/my-account" className="text-cyan-400 underline">
        ← Înapoi la cont
      </Link>

      <h1 className="text-3xl font-bold mt-6 mb-6 text-cyan-400">Ratingurile tale</h1>

      {/* ⭐ Rating general */}
      <div className="bg-[#0b1220] p-6 rounded-lg border border-cyan-500/20 mb-8">
        <h2 className="text-2xl font-semibold mb-2">Rating general</h2>
        <p className="text-4xl font-bold text-yellow-400">{average} ⭐</p>
        <p className="text-gray-400 mt-1">{received.length} evaluări primite</p>

        {/* 🔥 BADGE DINAMIC */}
        {badge && (
          <div className={`mt-4 inline-block px-4 py-2 rounded-lg text-white font-semibold ${badge.color}`}>
            {badge.emoji} {badge.label}
          </div>
        )}
      </div>

      {/* 🔥 FILTRARE */}
      <div className="flex gap-2 mb-6">
        {[0, 5, 4, 3, 2, 1].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg border transition ${
              filter === s
                ? "bg-cyan-600 border-cyan-400"
                : "bg-[#0b1220] border-cyan-500/20 hover:border-cyan-400"
            }`}
          >
            {s === 0 ? "Toate" : `${s} ⭐`}
          </button>
        ))}
      </div>

      {/* ⭐ Ratinguri primite */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Ratinguri primite</h2>

        {filteredReceived.length === 0 && (
          <p className="text-gray-400">Nu există ratinguri pentru acest filtru.</p>
        )}

        <div className="flex flex-col gap-4">
          {filteredReceived.map((r: any) => (
            <div key={r.id} className="bg-[#0f1a2a] p-5 rounded-lg border border-green-500/30">
              <p className="text-yellow-400 text-xl">{r.stars} ⭐</p>
              <p className="text-gray-300 mt-2">{r.comment || "Fără comentariu"}</p>
              <p className="text-gray-500 text-sm mt-2">
                de la <span className="text-green-300">{r.fromUser.email}</span> •{" "}
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ⭐ Ratinguri oferite */}
      <div>
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Ratinguri oferite</h2>

        {given.length === 0 && (
          <p className="text-gray-400">Nu ai oferit încă ratinguri.</p>
        )}

        <div className="flex flex-col gap-4">
          {given.map((r: any) => (
            <div key={r.id} className="bg-[#0b1220] p-5 rounded-lg border border-cyan-500/20">
              <p className="text-yellow-400 text-xl">{r.stars} ⭐</p>
              <p className="text-gray-300 mt-2">{r.comment || "Fără comentariu"}</p>
              <p className="text-gray-500 text-sm mt-2">
                pentru <span className="text-cyan-300">{r.toUser.email}</span> •{" "}
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
