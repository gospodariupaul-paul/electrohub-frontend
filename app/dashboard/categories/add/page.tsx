"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";

const API_BASE = "https://electrohub-backend.vercel.app";

export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);

      if (image) {
        formData.append("image", image);
      }

      const token = localStorage.getItem("accessToken");

      const res = await fetch(`${API_BASE}/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        setError("A apărut o eroare neașteptată");
        return;
      }

      window.location.href = "/dashboard/categories";
    } catch (err) {
      console.error(err);
      setError("A apărut o eroare neașteptată");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-300">Adaugă categorie nouă</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Nume categorie</label>
          <input
            className="w-full p-2 rounded bg-[#0b0f2a] border border-white/20"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Imagine categorie</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 rounded bg-[#0b0f2a] border border-white/20"
            onChange={handleImageChange}
            required
          />
        </div>

        {preview && (
          <div className="mt-4">
            <p className="mb-2 opacity-70">Preview imagine:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-48 h-48 object-cover rounded-lg border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            />
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.4)] transition"
        >
          Adaugă categorie
        </button>
      </form>
    </div>
  );
}
