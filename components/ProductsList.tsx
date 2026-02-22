"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  if (!products.length) {
    return <p className="text-white/60">Nu există produse momentan.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: any) => (
        <Link
          key={product._id}
          href={`/product/${product._id}`}
          className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
        >
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-full h-48 object-cover rounded-lg"
          />

          <h3 className="font-semibold mt-3">{product.title}</h3>
          <p className="text-cyan-400 font-bold">{product.price} RON</p>
        </Link>
      ))}
    </div>
  );
}
