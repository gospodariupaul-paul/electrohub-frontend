"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
          <label className="block mb-1 opacity-70">
            Imagini (URL-uri separate prin virgulă)
          </label>
          <input
            type="text"
            value={images.join(",")}
            onChange={(e) => setImages(e.target.value.split(","))}
            className="w-full p-3 rounded bg-[#070a20] border border-white/10"
          />

          {/* PREVIEW IMAGINI */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  className="w-full h-32 object-cover rounded-lg border border-white/10"
                />
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
