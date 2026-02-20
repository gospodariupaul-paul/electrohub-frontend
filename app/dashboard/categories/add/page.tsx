"use client";

import { useState } from "react";
import axiosInstance from "@/axios";

export default function AddCategoryPage() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axiosInstance.post("/categories", { name });

    alert("Categorie creată!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Adaugă categorie</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nume categorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
