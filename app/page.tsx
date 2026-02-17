"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );

        if (!res.ok) throw new Error("Nu s-au putut încărca categoriile");

        const data = await res.json();

        // Acceptă ORICE format de backend
        const cats =
          data.categories || data.data || data || [];

        setCategories(cats);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-white p-6">

      <h1 className="text-4xl font-bold mb-6">Categorii</h1>

      {loading && <p>Se încarcă...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat: any) => (
          <a
            key={cat._id}
            href={`/categorie/${cat.slug}`}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition block"
          >
            <p className="text-lg font-semibold">{cat.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
