"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(1);

  // 🔥 FIX: categoryId nu mai este null
  const [categoryId, setCategoryId] = useState<number>(1);

  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

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
    console.log("CLOUDINARY RESPONSE:", data);
    return data.secure_url;
  };

  // 🔥 Upload + PREVIEW
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (files.length + images.length > 8) {
      alert("Poți încărca maxim 8 imagini");
      return;
    }

    const uploaded: string[] = [];

    for (const file of files) {
      const url = await uploadToCloudinary(file);
      console.log("URL CLOUDINARY:", url);
      uploaded.push(url);
    }

    setImages((prev) => {
      const finalImages = [...prev, ...uploaded];
      console.log("IMAGINI IN STATE:", finalImages);
      return finalImages;
    });
  };

  // 🔥 ȘTERGERE IMAGINE
  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setCurrentIndex(0);
  };

  // 🔥 SUBMIT FORM
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // 🔥 FIX CRITIC: luăm userId din localStorage
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;

      if (!user?.id) {
        alert("Eroare: utilizatorul nu este autentificat.");
        setLoading(false);
        return;
      }

      await axiosInstance.post(
        "/products/create",
        {
          name,
          price,
          stock,
          description,
          images,
          categoryId,
          userId: user.id, // 🔥 FIX CRITIC
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Anunț publicat cu succes!");
      router.push("/"); // 🔥 redirect pe homepage
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
        {/* 🔙 BUTON ÎNAPOI */}
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
            value={categoryId}
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
            required
          >
            <option value="1">Telefoane</option>
            <option value="2">Laptopuri</option>
            <option value="3">Componente PC</option>
            <option value="4">Audio-Video</option>
          </select>
        </label>

        {/* IMAGINI */}
        <div className="mb-6">
          <span className="text-sm opacity-80">Imagini</span>

          {images.length > 0 && (
            <div className="mt-3">
              {/* CAROUSEL */}
              <div className="relative w-full h-64 overflow-hidden rounded-xl border border-white/20">
                <img
                  src={images[currentIndex]}
                  className="w-full h-full object-cover"
                />

                {/* SĂGEATA STÂNGA */}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white px-3 py-2 rounded-full"
                >
                  ‹
                </button>

                {/* SĂGEATA DREAPTA */}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white px-3 py-2 rounded-full"
                >
                  ›
                </button>

                {/* BUTON ȘTERGERE */}
                <button
                  type="button"
                  onClick={() => removeImage(currentIndex)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                >
                  Șterge
                </button>
              </div>

              {/* DOTS */}
              <div className="flex justify-center gap-2 mt-3">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-3 h-3 rounded-full ${
                      i === currentIndex ? "bg-cyan-400" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>

              {/* THUMBNAILS */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-full h-20 object-cover rounded-lg border cursor-pointer ${
                      i === currentIndex ? "border-cyan-400" : "border-white/20"
                    }`}
                  />
                ))}
              </div>
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
