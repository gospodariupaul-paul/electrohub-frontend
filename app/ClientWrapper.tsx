"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

export default function AddProductPage() {
  const router = useRouter();
  const { user } = useUser();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(1);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 🔥 Upload în Cloudinary
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "electrohub_uploads");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/ds7eqokum/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (files.length + images.length > 8) {
      alert("Poți încărca maxim 8 imagini");
      return;
    }

    const uploaded: string[] = [];

    for (const file of files) {
      const url = await uploadToCloudinary(file);
      uploaded.push(url);
    }

    setImages((prev) => [...prev, ...uploaded]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axiosInstance.post(
        "/products",
        {
          name,
          price,
          stock,
          description,
          images,
          categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Anunț publicat cu succes!");
      router.push("/my-account/profile");
    } catch (err) {
      console.error(err);
      alert("Eroare la publicarea anunțului");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020312] text-white p-10 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0a0f2d] p-8 rounded-xl border border-white/10 w-full max-w-3xl"
      >
        {/* BUTON ÎNAPOI */}
        <button
          type="button"
          onClick={() => router.push("/my-account/profile")}
          className="mb-6 text-cyan-400 hover:text-cyan-300"
        >
          ← Înapoi la cont
        </button>

        <h1 className="text-3xl font-bold mb-6">Publică un anunț</h1>

        {/* NUME PRODUS */}
        <label className="block mb-4">
          <span className="text-sm opacity-80">Titlu anunț</span>
          <input
            type="text"
            maxLength={70}
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        {/* PREȚ */}
        <label className="block mb-4">
          <span className="text-sm opacity-80">Preț (€)</span>
          <input
            type="number"
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </label>

        {/* STOC */}
        <label className="block mb-4">
          <span className="text-sm opacity-80">Stoc</span>
          <input
            type="number"
            min={1}
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            required
          />
        </label>

        {/* CATEGORIE */}
        <label className="block mb-4">
          <span className="text-sm opacity-80">Categoria*</span>
          <select
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
            value={categoryId ?? ""}
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
            required
          >
            <option value="">Alege categoria</option>
            <option value="1">Telefoane</option>
            <option value="2">Laptopuri</option>
            <option value="3">Electrocasnice</option>
            <option value="4">Gaming</option>
          </select>
        </label>

        {/* IMAGINI */}
        <div className="mb-6">
          <span className="text-sm opacity-80">Imagini</span>

          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-full h-28 object-cover rounded-lg border border-white/20"
                />
              ))}
            </div>
          )}

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-3"
          />
        </div>

        {/* DESCRIERE */}
        <label className="block mb-4">
          <span className="text-sm opacity-80">Descriere</span>
          <textarea
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none h-40"
            value={description}
            maxLength={9000}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        {/* BUTON PUBLICARE */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold transition"
        >
          {loading ? "Se publică..." : "Publică anunțul"}
        </button>
      </form>
    </div>
  );
}
