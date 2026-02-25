"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function SellerProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://electrohub-backend-1-10qa.onrender.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Eroare la încărcarea produsului:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Se încarcă...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Produsul nu a fost găsit.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] to-[#4c1d95] text-white p-6">
      
      {/* Înapoi */}
      <Link href="/" className="text-cyan-300 text-lg font-semibold">
        ← Înapoi în homepage
      </Link>

      <div className="max-w-4xl mx-auto mt-6 bg-white/10 p-6 rounded-2xl backdrop-blur-lg shadow-xl">

        {/* Imagine produs */}
        <div className="w-full h-80 rounded-xl overflow-hidden mb-6">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Titlu + preț */}
        <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
        <p className="text-3xl text-green-400 font-semibold mb-4">
          {product.price} lei
        </p>

        {/* Descriere */}
        <p className="text-white/80 text-lg mb-6">{product.description}</p>

        {/* Vânzător */}
        <div className="bg-black/30 p-4 rounded-xl mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Vândut de: {product.user?.name}
          </h2>

          <p className="text-white/70 mb-1">Email: {product.user?.email}</p>

          <p className="text-white/70 mb-3">
            ID vânzător: {product.user?.id}
          </p>

          <Link
            href={`/user/${product.user?.id}`}
            className="text-cyan-300 underline"
          >
            Vezi profilul vânzătorului →
          </Link>
        </div>

        {/* Butoane */}
        <div className="flex gap-4">
          <Link
            href={`/chat/${product.id}`}
            className="px-5 py-3 bg-blue-500 rounded-xl font-semibold"
          >
            Trimite mesaj
          </Link>

          <a
            href={`mailto:${product.user?.email}`}
            className="px-5 py-3 bg-green-500 rounded-xl font-semibold"
          >
            Contactează vânzătorul
          </a>
        </div>
      </div>
    </div>
  );
}
