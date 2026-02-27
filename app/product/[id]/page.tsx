"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductPage() {
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
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // 🔥 Dacă nu e logat → redirect la login (ca pe OLX)
    if (!user?.id) {
      router.push("/login");
      return;
    }

    try {
      // 🔥 Verificăm conversația EXISTENTĂ (corect)
      const existing = await axiosInstance.get(
        `/conversations?productId=${productId}`
      );

      if (existing.data) {
        router.push(`/chat/${existing.data.id}`);
        return;
      }

      // 🔥 Creăm conversația (backend-ul ia buyerId din token și sellerId din produs)
      const res = await axiosInstance.post("/conversations", {
        productId,
      });

      router.push(`/chat/${res.data.id}`);
    } catch (error) {
      console.error("Eroare la inițierea conversației:", error);
      alert("Nu s-a putut deschide chatul.");
    }
  };

  if (loading) return <p className="p-6 text-white">Se încarcă...</p>;
  if (!product) return <p className="p-6 text-white">Produsul nu există.</p>;

  return (
    <div className="p-6 text-white max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <span className="text-2xl font-bold text-cyan-400">
          {product.price} lei
        </span>
      </div>

      <p className="opacity-80">{product.description}</p>

      <div className="p-4 bg-[#070a20] border border-white/10 rounded-xl space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={product.userAvatar || "/default-avatar.png"}
            className="w-16 h-16 rounded-full object-cover border border-white/10"
          />
          <div>
            <p className="opacity-70 text-sm">Vândut de:</p>
            <p className="text-lg font-semibold">{product.userName}</p>
            <p className="text-yellow-400 text-sm">
              ⭐ {product.userRating || 0} / 5
            </p>
          </div>
        </div>

        <p className="opacity-70 text-sm">
          {product.userTotalProducts} anunțuri publicate
        </p>

        <Link
          href={`/seller/${product.userId}`}
          className="text-cyan-400 hover:underline text-sm"
        >
          Vezi profilul vânzătorului →
        </Link>
      </div>

      <button
        onClick={startChat}
        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
      >
        Trimite mesaj
      </button>

      {product.userPhone && (
        <a
          href={`tel:${product.userPhone}`}
          className="w-full block text-center py-3 bg-green-600 hover:bg-green-500 rounded-lg font-semibold"
        >
          Sună vânzătorul
        </a>
      )}
    </div>
  );
}
