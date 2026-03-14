"use client";

import Link from "next/link";

export default function SavedSearchesPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-2xl font-bold mb-4">Căutări salvate</h1>

      <p className="text-gray-400 text-center max-w-md mb-6">
        Momentan nu ai căutări salvate sau funcția nu este încă disponibilă.
      </p>

      <Link
        href="/search"
        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition"
      >
        Începe o căutare
      </Link>
    </div>
  );
}
