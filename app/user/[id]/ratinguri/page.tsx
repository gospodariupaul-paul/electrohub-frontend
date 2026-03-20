"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function UserRatingPage() {
  const { id } = useParams();
  const [ratings, setRatings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/users/${id}`)
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));

    axiosInstance.get(`/ratings/user/${id}`)
      .then((res) => setRatings(res.data))
      .catch(() => setRatings([]));
  }, [id]);

  const average =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b.stars, 0) / ratings.length).toFixed(1)
      : "–";

  return (
    <div className="text-white p-6 max-w-4xl mx-auto">

      <Link href="/" className="text-cyan-400 underline">
        ← Înapoi
      </Link>

      <h1 className="text-3xl font-bold mt-6 mb-6 text-cyan-400">
        Ratingurile utilizatorului
      </h1>

      {user && (
        <div className="mb-6">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-400">{user.email}</p>
        </div>
      )}

      {/* ⭐ Rating general */}
      <div className="bg-[#0b1220] p-6 rounded-lg border border-cyan-500/20 mb-8">
        <h2 className="text-2xl font-semibold mb-2">Rating general</h2>
        <p className="text-4xl font-bold text-yellow-400">{average} ⭐</p>
        <p className="text-gray-400 mt-1">{ratings.length} evaluări primite</p>
      </div>

      {/* ⭐ Ratinguri */}
      <div className="flex flex-col gap-4">
        {ratings.map((r: any) => (
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
  );
}
