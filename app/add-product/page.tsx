"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useNotifications } from "@/app/context/NotificationContext";

export default function AddProductPage() {
  const router = useRouter();
  const { refreshNotifications } = useNotifications();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(1);
  const [category, setCategory] = useState("Telefoane");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const [condition, setCondition] = useState("");
  const [storage, setStorage] = useState("");
  const [location, setLocation] = useState("");

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

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setCurrentIndex(0);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;

      if (!user?.id) {
        alert("Eroare: utilizatorul nu este autentificat.");
        setLoading(false);
        return;
      }

      const payload = {
        name,
        price,
        stock,
        description,
        images,
        category,
        condition,
        storage: storage || null,
        location,
        userId: user.id,
      };

      const res = await axiosInstance.post("/products", payload);

      refreshNotifications();

      alert("Anunț publicat cu succes!");
      router.push("/my-account/profile");
    } catch (err: any) {
      if (err.response) {
        alert("Eroare backend: " + JSON.stringify(err.response.data));
      } else {
        alert("Eroare necunoscută");
      }
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
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Telefoane">Telefoane</option>
            <option value="Laptopuri">Laptopuri</option>
            <option value="Componente PC">Componente PC</option>
            <option value="Audio-Video">Audio-Video</option>
            <option value="Drones">Drones</option>
            <option value="Altele">Altele</option>
          </select>
        </label>

        {/* STARE PRODUS */}
        <label className="block mb-4">
          <span className="text-sm opacity-80">Stare produs</span>
          <select
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none text-white"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="">Selectează</option>
            <option value="Nou">Nou</option>
            <option value="Ca nou">Ca nou</option>
            <option value="Folosit - stare bună">Folosit - stare bună</option>
            <option value="Folosit - stare acceptabilă">Folosit - stare acceptabilă</option>
          </select>
        </label>

        {/* CAPACITATE */}
        {(category === "Telefoane" || category === "Laptopuri") && (
          <label className="block mb-4">
            <span className="text-sm opacity-80">Capacitate / Specificații</span>
            <select
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none text-white"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
            >
              <option value="">Selectează</option>
              <option value="64GB">64GB</option>
              <option value="128GB">128GB</option>
              <option value="256GB">256GB</option>
              <option value="512GB">512GB</option>
              <option value="1TB">1TB</option>
            </select>
          </label>
        )}

        {/* LOCAȚIE */}
        <label className="block mb-4">
          <span className="text-sm opacity-80">Locație</span>
          <input
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex: Iași, România"
            required
          />
        </label>

        {/* IMAGINI — VARIANTA MODERNĂ */}
        <div className="mb-6">
          <span className="text-sm opacity-80">Imagini</span>

          {/* PREVIEW EXISTENT */}
          {images.length > 0 && (
            <div className="mt-3">
              <div className="relative w-full h-64 overflow-hidden rounded-xl border border-white/20">
                <img
                  src={images[currentIndex]}
                  className="w-full h-full object-cover"
                />

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

                <button
                  type="button"
                  onClick={() => removeImage(currentIndex)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                >
                  Șterge
                </button>
              </div>

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

          {/* INPUT ASCUNS */}
          <input
            type="file"
            id="imageUpload"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* CASETA DE UPLOAD */}
          <div
            onClick={() => document.getElementById("imageUpload")?.click()}
            className="mt-4 border-2 border-dashed border-cyan-600 bg-[#05071a] hover:bg-[#0a0d2a] transition cursor-pointer rounded-xl p-6 text-center"
          >
            <p className="text-cyan-400 font-semibold text-lg">Selectează imagini</p>
            <p className="text-gray-400 text-sm mt-1">Click pentru a alege fișiere</p>

            <button
              type="button"
              className="mt-4 px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
            >
              Browse product
            </button>
          </div>
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
