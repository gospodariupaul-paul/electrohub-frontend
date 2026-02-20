"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-64 h-64 object-cover rounded-lg border border-white/10"
        />
      )}

      <p className="text-lg opacity-80">{product.description}</p>

      <p className="text-xl font-bold text-cyan-400">
        {product.price} lei
      </p>

      <p className="opacity-70">Stoc: {product.stock}</p>
    </div>
  );
}
