"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setProduct(res.data);
      } catch (e) {
        console.error("Eroare la încărcarea produsului:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <p>Se încarcă...</p>;
  if (!product) return <p>Produsul nu există.</p>;

  // Dacă backend-ul trimite doar imageUrl, îl transformăm în array
  const images = product.images?.length
    ? product.images
    : product.imageUrl
    ? [product.imageUrl]
    : [];

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>

      {/* SLIDER */}
      {images.length > 0 && (
        <div className="relative w-64 h-64 mx-auto">
          <img
            src={images[index]}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg border border-white/10"
          />

          {/* Săgeată stânga */}
          {images.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 px-3 py-1 rounded"
            >
              ◀
            </button>
          )}

          {/* Săgeată dreapta */}
          {images.length > 1 && (
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 px-3 py-1 rounded"
            >
              ▶
            </button>
          )}

          {/* Buline */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === index ? "bg-cyan-400" : "bg-white/30"
                }`}
              ></div>
            ))}
          </div>
        </div>
      )}

      <p className="text-lg opacity-80">{product.description}</p>

      <p className="text-xl font-bold text-cyan-400">
        {product.price} lei
      </p>

      <p className="opacity-70">Stoc: {product.stock}</p>
    </div>
  );
}
