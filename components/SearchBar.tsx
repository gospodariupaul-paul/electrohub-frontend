"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Caută produse..."
        className="px-4 py-2 rounded-lg bg-[#111] text-white border border-[#222] w-64"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white"
      >
        Caută
      </button>
    </form>
  );
}
