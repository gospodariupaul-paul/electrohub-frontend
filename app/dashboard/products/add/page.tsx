import Link from "next/link";
"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("categoryId", categoryId); // 🔥 OBLIGATORIU

    // 🔥 MULTIPLE IMAGINI — CORECT
    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await axiosInstance.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Produs creat cu succes!");

      setName("");
      setPrice("");
      setStock("");
      setDescription("");
      setCategoryId("");
      setImages([]);
    } catch (err) {
      console.error("Eroare la creare produs:", err);
      alert("Eroare la creare produs!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Adaugă produs</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Nume produs"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
          required
        />

        <input
          type="number"
          placeholder="Preț"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
          required
        />

        <input
          type="number"
          placeholder="Stoc"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
          required
        />

        <textarea
          placeholder="Descriere produs"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full h-24"
          required
        />

        {/* 🔥 INPUT CATEGORY ID */}
        <input
          type="number"
          placeholder="ID categorie"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
          required
        />

        {/* 🔥 MULTIPLE IMAGINI */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files || []))}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
        />

        {/* PREVIEW MULTIPLE IMAGINI */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="Preview"
                className="w-24 h-24 object-cover rounded border border-white/10"
              />
            ))}
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
