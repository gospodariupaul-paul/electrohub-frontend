"use client";

import Link from "next/link";
import { useState } from "react";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://electrohub-backend-production.up.railway.app";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/help/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: "Mesaj trimis din pagina de suport",
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Eroare la trimiterea mesajului");
      }

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError("A apărut o eroare. Încearcă din nou.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 text-white">
      <Link
        href="/"
        className="inline-block mb-6 px-3 py-1.5 rounded-lg border border-white/20 hover:border-cyan-400 hover:text-cyan-300 transition text-sm"
      >
        ← Înapoi la homepage
      </Link>

      <h1 className="text-3xl font-bold mb-2">Suport Chatbot AI</h1>
      <p className="text-white/60 mb-8 max-w-2xl">
        Bine ai venit în centrul de suport ElectroHub. Aici poți discuta cu
        asistentul AI, poți găsi răspunsuri rapide sau poți trimite un mesaj
        direct echipei noastre.
      </p>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-3">💬 Chatbot AI</h2>
        <p className="text-white/60 mb-4">
          Asistentul nostru AI este disponibil 24/7 pentru a te ajuta cu
          întrebări despre produse, cont, anunțuri și multe altele.
        </p>

        <Link
          href="/help"
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 transition rounded-lg font-medium"
        >
          Deschide Chatbot AI →
        </Link>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3">📨 Trimite un mesaj</h2>
        <p className="text-white/60 mb-4">
          Mesajele trimise de aici ajung direct la administrator, exact ca în
          pagina /help.
        </p>

        {sent ? (
          <p className="text-green-400 font-medium">
            Mesajul tău a fost trimis cu succes! Te vom contacta în cel mai
            scurt timp.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-400">{error}</p>}

            <input
              type="text"
              placeholder="Numele tău"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              placeholder="Mesajul tău"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white h-32"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 transition rounded-lg font-medium disabled:opacity-50"
            >
              {loading ? "Se trimite..." : "Trimite mesajul →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
