"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/axios";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res.data || []);
      } catch (e) {
        console.error("Eroare:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categorii</h1>

      {loading ? (
        <p className="opacity-70">Se încarcă...</p>
      ) : categories.length === 0 ? (
        <p className="opacity-70">Nu există categorii.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {categories.map((c: any) => (
            <li
              key={c.id}
              className="flex items-center justify-between border-b border-white/5 pb-1"
            >
              <span>{c.name}</span>
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
