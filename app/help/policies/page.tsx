"use client";

import { useEffect, useState } from "react";

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<any>(null);

  useEffect(() => {
    fetch("https://electrohub-backend-production.up.railway.app/help/policies")
      .then(res => res.json())
      .then(data => setPolicies(data));
  }, []);

  if (!policies) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Politici</h1>

      <ul className="space-y-4">
        <li><a href={policies.terms} className="text-blue-600 underline">Termeni și condiții</a></li>
        <li><a href={policies.privacy} className="text-blue-600 underline">Politica de confidențialitate</a></li>
        <li><a href={policies.return} className="text-blue-600 underline">Politica de retur</a></li>
        <li><a href={policies.delivery} className="text-blue-600 underline">Politica de livrare</a></li>
      </ul>
    </div>
  );
}
