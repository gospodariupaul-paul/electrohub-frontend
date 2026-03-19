"use client";

import { useEffect, useState } from "react";

export default function FAQPage() {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    fetch("https://electrohub-backend-production.up.railway.app/help/faq")
      .then(res => res.json())
      .then(data => setFaq(data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Întrebări frecvente</h1>

      <div className="space-y-4">
        {faq.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold">{item.question}</h2>
            <p className="text-gray-700 mt-2">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
