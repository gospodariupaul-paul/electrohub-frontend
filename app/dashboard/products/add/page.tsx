"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCategory = searchParams.get("category");

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("in stoc");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState(preselectedCategory || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.log(err);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("category", category);
      if (image) formData.append("image", image);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        setError("Eroare la adăugarea produsului");
        setLoading(false);
        return;
      }

      router.push("/dashboard/products");
    } catch (err) {
      setError("A apărut o eroare");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Adaugă un produs nou</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-[#0f131b] p-6 rounded-xl border border-white/10 max-w-xl"
      >
        <div className="mb-4">
          <label className="block mb-1">Imagine produs</label>
          <input
            type="file"
            accept="image/*"
            className="w-full bg-white/10 p-2 rounded"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Nume produs</label>
          <input
            type="text"
            className="w-full p-3 rounded bg-white/10 border border-white/10 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Preț (lei)</label>
          <input
            type="number"
            className="w-full p-3 rounded bg-white/10 border border-white/10 outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Stoc</label>
          <select
            className="w-full p-3 rounded bg-white/10 border border-white/10 outline-none"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          >
            <option value="in stoc">În stoc</option>
            <option value="stoc limitat">Stoc limitat</option>
            <option value="indisponibil">Indisponibil</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Categorie</label>
          <select
            className="w-full p-3 rounded bg-white/10 border border-white/10 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Selectează categoria</option>
            {categories.map((cat: any) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Descriere produs</label>
          <textarea
            className="w-full p-3 rounded bg-white/10 border border-white/10 outline-none"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-500 py-3 rounded-xl font-semibold"
        >
          {loading ? "Se adaugă..." : "Adaugă produs"}
        </button>
      </form>
    </div>
  );
}
