"use client";

import { useEffect, useState } from "react";

const API_BASE = "https://electrohub-backend.vercel.app";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/categories`);
        if (res.ok) setCategories(await res.json());
      } catch (err) {
        console.error("Eroare la încărcarea categoriilor:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-cyan-300">Categorii</h1>

        <a
          href="/dashboard/categories/add"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] transition"
        >
          + Adaugă categorie
        </a>
      </div>

      {loading ? (
        <p className="opacity-70">Se încarcă...</p>
      ) : categories.length === 0 ? (
        <p className="opacity-70">Nu există categorii.</p>
      ) : (
        <ul className="space-y-3">
          {categories.map((c: any) => (
            <li
              key={c.id}
              className="bg-[#070a20] border border-purple-500/30 rounded-xl p-4 flex items-center justify-between hover:border-purple-400 transition"
            >
              <span className="font-semibold">{c.name}</span>
              <span className="text-xs opacity-60">
                {c.productCount || 0} produse
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
