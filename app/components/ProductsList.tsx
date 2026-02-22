"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ProductsList() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((p: any) => (
        <div
          key={p.id}
          className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400 transition"
        >
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p className="text-green-400 font-bold text-xl">{p.price} RON</p>

            {session ? (
              <Link
                href={`/product/${p.id}`}
                className="block mt-4 bg-cyan-500 text-black text-center py-2 rounded-lg"
              >
                Vezi produsul
              </Link>
            ) : (
              <Link
                href="/login"
                className="block mt-4 bg-purple-500 text-white text-center py-2 rounded-lg"
              >
                Login pentru a contacta vânzătorul
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
