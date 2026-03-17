"use client";

import { useRouter } from "next/navigation";

export default function ProductCard({
  product,
  hideActions,
  isFavoritePage,
  onRemove,
}: any) {
  const router = useRouter();

  // 🔥 Protecție totală împotriva undefined
  if (!product) return null;

  const image = product.images?.[0] || "/placeholder.png";

  return (
    <div
      className="bg-[#111b21] p-4 rounded-lg border border-white/10 hover:bg-[#15232b] transition cursor-pointer"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <img
        src={image}
        className="w-full h-40 object-cover rounded mb-3"
        alt={product.name}
      />

      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-[#00eaff] font-bold">{product.price} lei</p>

      {/* 🔥 Buton detalii produs */}
      {isFavoritePage && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/product/${product.id}`);
          }}
          className="mt-3 px-4 py-2 bg-[#00aaff] text-black rounded-lg font-semibold hover:bg-[#008fcc] transition"
        >
          Vezi detalii produs
        </button>
      )}

      {/* ❤️ Buton ȘTERGERE — NU îl ating, doar îl protejez */}
      {isFavoritePage && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(product.id);
          }}
          className="mt-2 text-red-400 underline"
        >
          Șterge din favorite
        </button>
      )}
    </div>
  );
}
