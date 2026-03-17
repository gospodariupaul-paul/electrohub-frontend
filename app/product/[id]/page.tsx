"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

export default function Page() {
  const params = useParams();
  const id = params?.id;

  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    if (!id) return;
    if (typeof id !== "string") return;
    if (!/^\d+$/.test(id)) return;

    axiosInstance
      .get(`/products/${id}`, { withCredentials: true })
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
      const res = await axiosInstance.post(
        "/conversations",
        { productId: Number(id) },
        { withCredentials: true }
      );

      const conversationId = res.data.id;
      router.push(`/chat/${conversationId}`);
    } catch (err) {
      console.error("Error creating conversation:", err);
      alert("Eroare: nu s-a putut crea conversația.");
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

  const images = product.images || [];

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-[#0b141a] text-white p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-[#00eaff] text-black rounded-lg font-semibold hover:bg-[#00c7d6] transition"
      >
        ← Înapoi
      </button>

      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      <div className="relative w-full max-w-md mb-4">
        <img
          src={images[index] || "/placeholder.png"}
          alt={product.name}
          className="w-full rounded-lg h-80 object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded"
            >
              ›
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full ${
                    index === i ? "bg-white" : "bg-white/40"
                  }`}
                ></button>
              ))}
            </div>
          </>
        )}
      </div>

      <p className="text-lg font-semibold mb-2">{product.price} RON</p>

      {/* 📍 Locație + timp listare */}
      <p className="text-gray-400 text-sm mb-4">
        Listat acum {product.daysListed || "câteva zile"} în{" "}
        {product.location || "România"}
      </p>

      {/* 🛠 Detalii produs */}
      <div className="bg-[#111b21] p-4 rounded-lg mb-6 border border-white/10">
        <h2 className="text-lg font-semibold mb-3">Detalii</h2>

        <p className="text-gray-300">
          <span className="font-semibold">Stare:</span>{" "}
          {product.condition || "Folosit - stare bună"}
        </p>

        <p className="text-gray-300 mt-2">
          <span className="font-semibold">Capacitate:</span>{" "}
          {product.storage || "512GB"}
        </p>
      </div>

      {/* 📝 Descriere */}
      <div className="bg-[#111b21] p-4 rounded-lg mb-6 border border-white/10">
        <h2 className="text-lg font-semibold mb-3">Descriere</h2>
        <p className="text-gray-300 whitespace-pre-line">
          {product.description}
        </p>
      </div>

      {/* 📍 Locație aproximativă */}
      <div className="bg-[#111b21] p-4 rounded-lg mb-6 border border-white/10">
        <h2 className="text-lg font-semibold mb-3">Locație</h2>
        <p className="text-gray-300 mb-2">
          {product.location || "Iași, România"}
        </p>
        <p className="text-gray-500 text-sm">Locația este aproximativă</p>
      </div>

      {/* 👤 Informații vânzător */}
      <div className="bg-[#111b21] p-4 rounded-lg mb-6 border border-white/10">
        <h2 className="text-lg font-semibold mb-3">Informații despre vânzător</h2>

        <p className="text-gray-300 font-semibold">
          {product.user?.name || "Vânzător necunoscut"}
        </p>

        <p className="text-gray-500 text-sm">
          S-a înscris în {product.user ? new Date(product.user.createdAt).getFullYear() : "2015"}
        </p>
      </div>

      <button
        onClick={startConversation}
        className="px-6 py-3 bg-[#00a884] text-white rounded-lg font-semibold"
      >
        Contactează vânzătorul
      </button>
    </div>
  );
}
