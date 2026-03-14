"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import ProductCard from "@/components/ProductCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/favorites/me")
      .then((res) => setFavorites(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Se încarcă favoritele...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-white">
        Nu ai produse la favorite încă ❤️
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b141a] text-white px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((fav: any) => (
          <ProductCard key={fav.id} product={fav.product} />
        ))}
      </div>
    </div>
  );
}
