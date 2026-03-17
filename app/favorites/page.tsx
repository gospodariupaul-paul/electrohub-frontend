"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/favorites")
      .then((res) => setFavorites(res.data))
      .finally(() => setLoading(false));
  }, []);

  const removeFromList = (productId: number) => {
    setFavorites((prev) => prev.filter((f: any) => f.product.id !== productId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Se încarcă favoritele...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-xl font-semibold text-white gap-6">
        <div>Nu ai produse la favorite încă ❤️</div>

        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
        >
          Înapoi la homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b141a] text-white px-4 py-8">
      <div className="max-w-6xl mx-auto mb-6">
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
        >
          Înapoi la homepage
        </Link>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((fav: any) => (
          <ProductCard
            key={fav.id}
            product={fav.product}
            hideActions={true}
            isFavoritePage={true}
            onRemove={removeFromList}
          />
        ))}
      </div>
    </div>
  );
}