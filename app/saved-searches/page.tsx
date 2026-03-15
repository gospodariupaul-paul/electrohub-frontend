"use client";

import { useEffect, useState } from "react";

interface SavedSearch {
  id: number;
  query: string;
  filters: any;
  createdAt: string;
}

export default function SavedSearchesPage() {
  const [saved, setSaved] = useState<SavedSearch[]>([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/saved-searches")
      .then((res) => res.json())
      .then((data) => setSaved(data));
  }, []);

  async function deleteSearch(id: number) {
    await fetch(process.env.NEXT_PUBLIC_API_URL + `/saved-searches/${id}`, {
      method: "DELETE",
    });

    setSaved((prev) => prev.filter((s) => s.id !== id));
  }

  function viewResults(search: SavedSearch) {
    const params = new URLSearchParams({
      query: search.query,
      filters: JSON.stringify(search.filters),
    });

    window.location.href = `/search?${params.toString()}`;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Căutări salvate</h1>

      {saved.length === 0 && <p>Nu ai căutări salvate.</p>}

      {saved.map((s) => (
        <div
          key={s.id}
          style={{
            padding: 10,
            marginBottom: 10,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        >
          <p><strong>{s.query}</strong></p>

          <button onClick={() => viewResults(s)}>Vezi rezultate</button>
          <button
            onClick={() => deleteSearch(s.id)}
            style={{ marginLeft: 10, color: "red" }}
          >
            Șterge
          </button>
        </div>
      ))}
    </div>
  );
}
