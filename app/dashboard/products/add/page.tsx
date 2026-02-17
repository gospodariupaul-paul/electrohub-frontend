"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://BACKEND_URL/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          description,
          image,
          inStock,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Eroare la salvarea produsului");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("A apărut o eroare neașteptată");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050814] text-white flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#0b1020] border border-white/10 rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold mb-6">Adaugă un produs nou</h1>

        {error && (
          <p className="mb-4 text-red-400 text-sm bg-red-900/30 border border-red-500/40 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm opacity-80">Nume produs</label>
            <input
              type="text"
              className="w-full p-3 rounded bg-black/40 border border-white/15 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm opacity-80">Preț (lei)</label>
            <input
              type="number"
              step="0.01"
              className="w-full p-3 rounded bg-black/40 border border-white/15 outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="inStock"
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="inStock" className="text-sm opacity-80">
              În stoc
            </label>
          </div>

          <div>
            <label className="block mb-1 text-sm opacity-80">Descriere produs</label>
            <textarea
              className="w-full p-3 rounded bg-black/40 border border-white/15 outline-none min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm opacity-80">URL imagine (opțional)</label>
            <input
              type="text"
              className="w-full p-3 rounded bg-black/40 border border-white/15 outline-none"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-900 py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Se salvează..." : "Adaugă produs"}
          </button>
        </form>
      </div>
    </div>
  );
}
