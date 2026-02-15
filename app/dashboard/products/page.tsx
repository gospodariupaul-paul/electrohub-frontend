"use client";

import { useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");

  function handleImage(e) {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function addProduct() {
    if (!imageFile || !name) return;

    const newProduct = {
      id: Date.now(),
      name,
      image: preview,
    };

    setProducts([...products, newProduct]);
    setName("");
    setPreview(null);
    setImageFile(null);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">Products</h1>

      {/* CARD ADAUGARE PRODUS */}
      <div className="bg-white/10 p-8 rounded-2xl border border-white/20 max-w-xl mb-12">

        <h2 className="text-2xl font-semibold mb-4">Adaugă produs</h2>

        {/* PREVIEW IMAGINE */}
        <div className="w-full flex justify-center mb-6">
          <div className="w-48 h-48 rounded-xl bg-white/10 border border-white/20 overflow-hidden">
            {preview ? (
              <img src={preview} alt="product" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full opacity-40">
                Nicio imagine
              </div>
            )}
          </div>
        </div>

        {/* INPUT NUME PRODUS */}
        <input
          type="text"
          placeholder="Nume produs"
          className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* INPUT ÎNCĂRCARE IMAGINE */}
        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold">
          Încarcă imagine
          <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
        </label>

        {/* BUTON ADAUGĂ */}
        <button
          onClick={addProduct}
          className="mt-4 w-full p-3 rounded-lg bg-green-600 hover:bg-green-700 transition font-semibold"
        >
          Adaugă produs
        </button>
      </div>

      {/* LISTĂ PRODUSE */}
      <h2 className="text-3xl font-bold mb-6">Lista produselor</h2>

      {products.length === 0 && (
        <p className="opacity-60">Nu există produse încă.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-white/10 p-4 rounded-xl border border-white/20 shadow-lg"
          >
            <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
              <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-semibold">{prod.name}</h3>
          </div>
        ))}
      </div>
    </main>
  );
}
