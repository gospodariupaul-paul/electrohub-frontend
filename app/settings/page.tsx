"use client";

import { useState } from "react";
import axios from "axios";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Selectează o imagine!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("image", image);

    try {
      const res = await axios.post(
        "https://electrohub-backend-1-10qa.onrender.com/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Produs creat cu succes!");
      console.log(res.data);

    } catch (err) {
      console.error("Eroare la creare produs:", err);
      alert("Nu s-a putut crea produsul.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Adaugă produs</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nume produs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Preț"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stoc"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <textarea
          placeholder="Descriere produs"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="ID categorie"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button type="submit">Creează</button>
      </form>
    </div>
  );
}
