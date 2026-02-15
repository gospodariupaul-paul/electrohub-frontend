"use client";

import { useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("In stoc");
  const [description, setDescription] = useState("");

  function handleImage(e) {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function addProduct() {
    if (!imageFile || !name || !price) return;

    const newProduct = {
      id: Date.now(),
      name,
      price,
      stock,
      description,
      image: preview,
      rating: 5,
      reviews: 12,
    };

    setProducts([...products, newProduct]);
    setName("");
    setPrice("");
    setStock("In stoc");
    setDescription("");
    setPreview(null);
    setImageFile(null);
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 p-10">

      {/* TITLU */}
      <h1 className="text-3xl font-bold mb-6">Produse</h1>

      {/* FORMULAR ADAUGARE PRODUS */}
      <section className="bg-gray-100 border border-gray-300 rounded-xl p-6 mb-12 max-w-3xl">

        <h2 className="text-xl font-semibold mb-4">Adaugă un produs nou</h2>

        {/* PREVIEW IMAGINE */}
        <div className="w-full flex justify-center mb-6">
          <div className="w-48 h-48 rounded-xl bg-white border border-gray-300 overflow-hidden">
            {preview ? (
              <img src={preview} alt="product" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full opacity-40 text-xs">
                Nicio imagine
              </div>
            )}
          </div>
        </div>

        {/* INPUT NUME */}
        <input
          type="text"
          placeholder="Nume produs"
          className="w-full p-3 mb-3 rounded-lg bg-white border border-gray-300 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* INPUT PREȚ */}
        <input
          type="number"
          placeholder="Preț (lei)"
          className="w-full p-3 mb-3 rounded-lg bg-white border border-gray-300 text-sm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* SELECT STOC */}
        <select
          className="w-full p-3 mb-3 rounded-lg bg-white border border-gray-300 text-sm"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        >
          <option>In stoc</option>
          <option>Stoc limitat</option>
          <option>Precomandă</option>
          <option>Indisponibil</option>
        </select>

        {/* DESCRIERE */}
        <textarea
          placeholder="Descriere produs"
          className="w-full p-3 mb-3 rounded-lg bg-white border border-gray-300 text-sm"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* ÎNCĂRCARE IMAGINE */}
        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm font-semibold">
          Încarcă imagine
          <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
        </label>

        {/* BUTON ADAUGĂ */}
        <button
          onClick={addProduct}
          className="mt-4 w-full p-3 rounded-lg bg-green-600 hover:bg-green-700 transition text-white font-semibold text-sm"
        >
          Adaugă produs
        </button>
      </section>

      {/* LISTĂ PRODUSE */}
      <h2 className="text-2xl font-bold mb-4">Lista produselor</h2>

      {products.length === 0 && (
        <p className="opacity-60 text-sm">Nu există produse încă.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-gray-100 border border-gray-300 rounded-xl p-4 shadow-sm"
          >
            {/* IMAGINE */}
            <div className="w-full h-48 rounded-lg overflow-hidden mb-4 bg-white border border-gray-300">
              <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
            </div>

            {/* TITLU */}
            <h3 className="text-lg font-semibold mb-1">{prod.name}</h3>

            {/* PREȚ */}
            <p className="text-green-600 font-bold text-lg mb-1">{prod.price} lei</p>

            {/* STOC */}
            <p className="text-xs opacity-70 mb-2">{prod.stock}</p>

            {/* RATING */}
            <p className="text-yellow-500 text-sm mb-2">★★★★★</p>

            {/* DESCRIERE */}
            <p className="text-xs opacity-70 mb-4 line-clamp-3">{prod.description}</p>

            {/* CTA */}
            <button className="w-full p-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition">
              Vezi detalii
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
