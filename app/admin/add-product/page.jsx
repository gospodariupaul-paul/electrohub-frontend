"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AddProductPage() {
  const API = "https://electrohub-backend-1-10qa.onrender.com";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState([]);

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // 🔥 1. Luăm categoriile din backend
  useEffect(() => {
    axios
      .get(`${API}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Eroare categorii:", err));
  }, []);

  // 🔥 2. Preview imagini înainte de upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // 🔥 3. Creare produs
  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("categoryId", categoryId);

      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await axios.post(`${API}/products/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Produs creat cu succes!");
      console.log(res.data);

      // Resetare formular
      setName("");
      setPrice("");
      setStock("");
      setDescription("");
      setCategoryId("");
      setImages([]);
      setPreviewImages([]);

    } catch (err) {
      console.error("Eroare creare produs:", err);
      alert("Eroare la creare produs!");
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Adaugă produs</h1>

      {/* Nume */}
      <input
        className="input"
        placeholder="Nume produs"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />

      {/* Preț */}
      <input
        className="input"
        placeholder="Preț"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={inputStyle}
      />

      {/* Stoc */}
      <input
        className="input"
        placeholder="Stoc"
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        style={inputStyle}
      />

      {/* Descriere */}
      <textarea
        className="input"
        placeholder="Descriere produs"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ ...inputStyle, height: 100 }}
      />

      {/* 🔥 Dropdown categorii */}
      <select
        className="input"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        style={inputStyle}
      >
        <option value="">Selectează categoria</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* 🔥 Upload imagini */}
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        style={{ marginTop: 10 }}
      />

      {/* 🔥 Preview imagini */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 15,
          flexWrap: "wrap",
        }}
      >
        {previewImages.map((src, index) => (
          <img
            key={index}
            src={src}
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />
        ))}
      </div>

      {/* 🔥 Buton creare */}
      <button
        onClick={handleCreate}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Creează produs
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 15,
  borderRadius: 6,
  border: "1px solid #ccc",
};
