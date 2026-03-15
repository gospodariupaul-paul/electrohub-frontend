"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

// 🔥 Importăm funcția de salvare
import { saveSearch } from "@/lib/savedSearches";

function SearchContent() {
  const params = useSearchParams();
  const q = params.get("q") || "";

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Dacă ai filtre, le poți lua din URL:
  const filtersParam = params.get("filters");
  const filters = filtersParam ? JSON.parse(filtersParam) : {};

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const API = process.env.NEXT_PUBLIC_API_URL;

        const res = await axios.get(`${API}/products/search?q=${q}`);

        setResults(res.data);
      } catch (err) {
        console.error("EROARE LA SEARCH:", err);
        setResults([]);
      }

      setLoading(false);
    };

    load();
  }, [q]);

  return (
    <div className="p-6 text-white space-y-6">

      {/* 🔥 Buton Înapoi la Home */}
      <Link
        href="/"
        className="inline-block px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition"
      >
        ← Înapoi la Home
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Rezultate pentru: "{q}"</h1>

        {/* 🔥 Buton Salvează căutarea */}
        <button
          onClick={() => saveSearch(q, filters)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
        >
          ⭐ Salvează căutarea
        </button>
      </div>

      {loading ? (
        <p>Se caută...</p>
      ) : results.length === 0 ? (
        <p className="opacity-70">Niciun produs găsit.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="bg-[#111] p-4 rounded-xl border border-[#222] hover:border-cyan-600 transition"
            >
              <img
                src={p.images?.[0] || "/placeholder.png"}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="mt-3 font-semibold">{p.name}</h2>
              <p className="text-cyan-400 font-bold">{p.price} RON</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  );
}
