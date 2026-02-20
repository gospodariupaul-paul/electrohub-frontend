"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";

export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    try {
      await axiosInstance.post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Categorie creată cu succes!");

      setName("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error("Eroare la creare categorie:", err);
      alert("Eroare la creare categorie!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Adaugă categorie</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Nume categorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
          required
        />

        <textarea
          placeholder="Descriere categorie"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full h-24"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
        />

        {image && (
          <div className="mt-4">
            <p className="text-sm opacity-70 mb-2">Preview imagine:</p>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg border border-white/10"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded disabled:opacity-50"
        >
          {loading ? "Se încarcă..." : "Creează"}
        </button>
      </form>
    </div>
  );
}
