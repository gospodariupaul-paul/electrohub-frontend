"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/products", {
        name,
        price: Number(price),
        description,
        imageUrl,
      });

      alert("Produs adăugat cu succes!");
      router.push("/my-account/products");
    } catch (error) {
      console.error("Eroare la adăugare produs:", error);
      alert("Nu s-a putut adăuga produsul.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white max-w-xl mx-auto space-y-6">

      <h1 className="text-3xl font-bold">Adaugă un produs</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NUME */}
        <div>
          <label className="block mb-1 opacity-70">Nume produs</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-[#070a20] border border-white/10"
            placeholder="Ex: iPhone 13 Pro"
          />
        </div>

        {/* PREȚ */}
        <div>
          <label className="block mb-1 opacity-70">Preț (lei)</label>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 rounded bg-[#070a20] border border-white/10"
            placeholder="Ex: 2500"
          />
        </div>

        {/* IMAGINE */}
        <div>
          <label className="block mb-1 opacity-70">URL imagine</label>
          <input
            type="text"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-3 rounded bg-[#070a20] border border-white/10"
            placeholder="Ex: https://poza-mea.jpg"
          />
        </div>

        {/* DESCRIERE */}
        <div>
          <label className="block mb-1 opacity-70">Descriere</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded bg-[#070a20] border border-white/10 h-32"
            placeholder="Detalii despre produs..."
          />
        </div>

        {/* BUTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
        >
          {loading ? "Se publică..." : "Publică produsul"}
        </button>
      </form>
    </div>
  );
}
