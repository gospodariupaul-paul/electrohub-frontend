export const dynamic = "force-dynamic";

"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";

export default function PublicProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(`/products/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Eroare la încărcarea produsului:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [productId]);

  const startChat = async () => {
    try {
      const res = await axiosInstance.post("/chat/start", {
        productId,
        sellerId: product.userId,
      });

      router.push(`/chat/${res.data.conversationId}`);
    } catch (error) {
      console.error("Eroare la inițierea conversației:", error);
      alert("Nu s-a putut deschide chatul.");
    }
  };

  if (loading) {
    return <p className="p-6 text-white opacity-70">Se încarcă produsul...</p>;
  }

  if (!product) {
    return <p className="p-6 text-white opacity-70">Produsul nu există.</p>;
  }

  return (
    <div className="p-6 text-white max-w-3xl mx-auto space-y-6">

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-80 object-cover rounded-xl"
        />
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <span className="text-2xl font-bold text-cyan-400">
          {product.price} lei
        </span>
      </div>

      <p className="opacity-80">{product.description}</p>

      <div className="p-4 bg-[#070a20] border border-white/10 rounded-xl">
        <p className="opacity-70 text-sm">Vândut de:</p>
        <p className="text-lg font-semibold">{product.userName}</p>
      </div>

      <button
        onClick={startChat}
        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
      >
        Contactează vânzătorul
      </button>
    </div>
  );
}
