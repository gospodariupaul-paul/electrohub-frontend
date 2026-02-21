import Link from "next/link";
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  // Chat state
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

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

  // Send message (momentan doar local)
  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input]);
    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* TITLU */}
      <h1 className="text-3xl font-bold text-center">{product.name}</h1>

      {/* SLIDER */}
      {images.length > 0 && (
        <div className="relative w-72 h-72 mx-auto">
          <img
            src={images[index]}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg border border-white/10"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 px-3 py-1 rounded"
              >
                ◀
              </button>

              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 px-3 py-1 rounded"
              >
                ▶
              </button>
            </>
          )}

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

      {/* DESCRIERE */}
      <div className="bg-[#070a20] p-4 rounded-xl border border-white/10 space-y-3">
        <p className="text-lg opacity-90 leading-relaxed">
          {product.description}
        </p>

        <p className="text-xl font-bold text-cyan-400">
          {product.price} lei
        </p>

        <p className="opacity-70">Stoc: {product.stock}</p>
      </div>

      {/* CHAT BOX */}
      <div className="bg-[#070a20] p-4 rounded-xl border border-white/10 space-y-3">
        <h2 className="text-xl font-semibold">Chat cu vânzătorul</h2>

        {/* Mesaje */}
        <div className="h-40 overflow-y-auto bg-black/20 p-3 rounded-lg space-y-2">
          {messages.length === 0 ? (
            <p className="opacity-50 text-sm">Nu există mesaje încă.</p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className="bg-cyan-600/30 p-2 rounded-lg text-sm"
              >
                {msg}
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-black/30 border border-white/10"
            placeholder="Scrie un mesaj..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-500"
          >
            Trimite
          </button>
        </div>
      </div>
    </div>
  );
}
