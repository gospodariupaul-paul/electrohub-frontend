"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    if (!id) return;

    axiosInstance
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error loading product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const startConversation = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      // 🔥 Creează conversația în backend
      const res = await axiosInstance.post("/conversations", {
        productId: Number(id),
      });

      const conversationId = res.data.id;

      // 🔥 Navighează către chat
      router.push(`/chat/${conversationId}`);
    } catch (err) {
      console.error("Error creating conversation:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Se încarcă produsul...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Produsul nu a fost găsit.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b141a] text-white p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      <img
        src={product.images?.[0] || "/placeholder.png"}
        alt={product.name}
        className="w-full max-w-md rounded-lg mb-4"
      />

      <p className="text-lg font-semibold mb-2">{product.price} RON</p>
      <p className="text-gray-300 mb-6">{product.description}</p>

      <button
        onClick={startConversation}
        className="px-6 py-3 bg-[#00a884] text-white rounded-lg font-semibold"
      >
        Contactează vânzătorul
      </button>
    </div>
  );
}
