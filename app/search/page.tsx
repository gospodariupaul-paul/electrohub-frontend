"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteSearch, deleteAllSearches } from "@/lib/savedSearches";

export default function SavedSearchesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/saved-searches");
      const data = await res.json();
      setItems(data);
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Ești sigur că vrei să ștergi această căutare?")) return;

    setDeletingId(id);
    await deleteSearch(id);

    setTimeout(() => {
      setItems(items.filter((i) => i.id !== id));
      setDeletingId(null);
    }, 300);
  };

  const handleDeleteAll = async () => {
    if (!confirm("Ești sigur că vrei să ștergi TOATE căutările salvate?")) return;

    await deleteAllSearches();
    setItems([]);
  };

  return (
    <div className="p-6 text-white space-y-6">
      <Link
        href="/"
        className="inline-block px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
      >
        ← Înapoi la Home
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Căutări salvate</h1>

        {items.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            🗑️ Șterge TOT
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="opacity-70">Nu ai nicio căutare salvată.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between bg-[#111] p-4 rounded-xl border border-[#222] transition-all duration-300 ${
                deletingId === item.id ? "opacity-0 translate-x-10" : ""
              }`}
            >
              <div>
                <p className="font-semibold text-lg">{item.query}</p>
                <p className="text-sm opacity-60">
                  {new Date(item.createdAt).toLocaleString("ro-RO")}
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/search?q=${item.query}`}
                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
                >
                  Vezi rezultate
                </Link>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-1"
                >
                  🗑️ Șterge
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
