"use client";

import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import axiosInstance from "@/lib/axios";

export default function ProductCard({ product, hideActions = false, isFavoritePage = false, onRemove }) {
  const handleRemoveFavorite = async () => {
    await axiosInstance.delete(`/favorites/${product.id}`);
    if (onRemove) onRemove(product.id);
  };

  return (
    <div className="relative bg-[#111] border border-[#222] rounded-xl p-4 hover:border-cyan-500 transition">

      {/* ❤️ Favorite Button */}
      <div className="absolute top-3 right-3 z-10">
        <FavoriteButton productId={product.id} />
      </div>

      <img
        src={product.images?.[0] || "/placeholder.png"}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

      <p className="text-cyan-400 text-lg font-bold mb-2">
        {product.price} lei
      </p>

      {/* 🔥 Dacă suntem în pagina de favorite → buton special */}
      {isFavoritePage && (
        <button
          onClick={handleRemoveFavorite}
          className="w-full mt-3 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
        >
          Șterge din favorite
        </button>
      )}

      {/* 🔥 Dacă NU suntem în favorite → arătăm Editare/Ștergere */}
      {!hideActions && !isFavoritePage && (
        <div className="flex gap-3 mt-3">
          <Link
            href={`/edit/${product.id}`}
            className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm"
          >
            Editează
          </Link>

          <Link
            href={`/delete/${product.id}`}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
          >
            Șterge
          </Link>
        </div>
      )}
    </div>
  );
}
