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
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">

      {/* CASETĂ CENTRALĂ ALBASTRU ÎNCHIS */}
      <div className="max-w-3xl mx-auto bg-blue-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">

        {/* BUTON ÎNAPOI */}
        <a
          href="/help"
          className="inline-block mb-6 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg shadow-md transition-all"
        >
          ← Înapoi
        </a>

        <h1 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">
          Întrebări frecvente (FAQ)
        </h1>

        {/* LISTA FAQ CU CASETE ÎNCHISE */}
        <div className="space-y-6">
          {faq.map((item: any, index: number) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-purple-900/60 hover:bg-purple-900/80 transition-all shadow-lg border border-white/20"
            >
              <h2 className="text-2xl font-semibold">{item.question}</h2>
              <p className="text-white/90 mt-2">{item.answer}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
