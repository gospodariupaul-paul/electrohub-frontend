"use client";

import { useEffect, useState } from "react";

export default function StatusPage() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    fetch("https://electrohub-backend-production.up.railway.app/help/status")
      .then(res => res.json())
      .then(data => setStatus(data));
  }, []);

  if (!status) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Status servicii</h1>

      <div className="p-4 border rounded-lg">
        <p><strong>Server:</strong> {status.server}</p>
        <p><strong>Probleme:</strong> {status.issues.length === 0 ? "Nicio problemă" : status.issues.join(", ")}</p>
        <p><strong>Mentenanță:</strong> {status.maintenance ?? "Nicio mentenanță programată"}</p>
      </div>
    </div>
  );
}
