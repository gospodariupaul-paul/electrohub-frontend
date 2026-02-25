"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const CLOUD_NAME = "ds7eqokum";
  const UPLOAD_PRESET = "electrohub_uploads";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // 🔥 Load product
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${productId}`);
        const p = res.data;

        setName(p.name);
        setPrice(p.price);
        setDescription(p.description);
        setImages(p.images || []);
      } catch (error) {
        console.error("Eroare la încărcarea produsului:", error);
        alert("Produsul nu a putut fi încărcat.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  // 🔥 Upload imagine în Cloudinary
  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setImages((prev) => [...prev, data.secure_url]);
      }
    } catch (err) {
      console.error("Eroare upload:", err);
      alert("Nu s-a putut încărca imaginea.");
    }

    setUploading(false);
  };

  // 🔥 Ștergere imagine
  const deleteImage = (url: string) => {
    setImages(images.filter((img) => img !== url));
  };

  // 🔥 Salvare modificări
  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axiosInstance.put(`/products/${productId}`, {
        name,
        price: Number(price),
        description,
        images,
      });

      alert("Produs actualizat cu succes!");
      router.push("/my-account/profile");
    } catch (error) {
      console.error("Eroare la salvare:", error);
      alert("Nu s-a putut salva produsul.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Se încarcă produsul...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020312] text-white p-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Editează produsul</h1>

        <Link
          href="/my-account/profile"
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
        >
          ← Înapoi la profil
        </Link>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSave}
        className="max-w-2xl mx-auto bg-[#05071a] p-8 rounded-xl border border-white/10 space-y-6"
      >
        {/* NUME */}
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

        {/* PRET */}
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

        {/* IMAGINI */}
        <div>
          <label className="block mb-1 opacity-70">Imagini</label>

          {/* Upload nou */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-3"
          />

          {uploading && (
            <p className="text-yellow-400 text-sm">Se încarcă imaginea...</p>
          )}

          {/* PREVIEW IMAGINI */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {images.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img}
                  className="w-full h-32 object-cover rounded-lg border border-white/10"
                />

                <button
                  type="button"
                  onClick={() => deleteImage(img)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  Șterge
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* DESCRIERE */}
        <div>
          <label className="block mb-1 opacity-70">Descriere</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded bg-[#070a20] border border-white/10 h-32"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
        >
          {saving ? "Se salvează..." : "Salvează modificările"}
        </button>
      </form>
    </div>
  );
}
