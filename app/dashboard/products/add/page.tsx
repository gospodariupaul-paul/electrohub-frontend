"use client";

import { useState } from "react";
import axiosInstance from "@/axios";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axiosInstance.post("/products", {
      name,
      price: Number(price),
    });

    alert("Produs creat!");
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
        />

        <input
          type="number"
          placeholder="Preț"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded"
        >
          Creează
        </button>
      </form>
    </div>
  );
}
