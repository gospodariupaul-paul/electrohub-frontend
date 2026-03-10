"use client";

import Link from "next/link";

export default function ProductsList({ products }: { products: any[] }) {
  if (!products || products.length === 0) {
    return <p className="text-white/60">Nu există produse momentan.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}   // 🔥 RUTA CORECTĂ
          className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
        >
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />

          <h3 className="font-semibold mt-3">{product.name}</h3>
          <p className="text-cyan-400 font-bold">{product.price} RON</p>
        </Link>
      ))}
    </div>
  );
}
