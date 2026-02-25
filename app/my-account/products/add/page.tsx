"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function AddProductPage() {
  const router = useRouter();
  const { user } = useUser();

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
        images: [imageUrl], // backend-ul tău folosește array
        userId: user.id,    // 🔥 AICI ERA BUG-UL
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

  if (!user) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-xl font-bold">Trebuie să fii logat</h1>
      </div>
    );
  }

  return (
    <div className="p-6 text-white max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Adaugă un produs</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 opacity-70">Nume produs</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-[#070a20] border border-white/10"
          />
        </div>

        <div>
          <label className="block mb-1 opacity-70">Preț (lei)</label>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 rounded bg-[#070a20] border border-white/10"
          />
        </div>

        <div>
          <label className="block mb-1 opacity-70">URL imagine</label>
          <input
            type="text"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-3 rounded bg-[#070a20] border border-white/10"
          />
        </div>

        <div>
          <label className="block mb-1 opacity-70">Descriere</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded bg-[#070a20] border border-white/10 h-32"
          />
        </div>

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
