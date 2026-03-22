"use client";

import Link from "next/link";
import { useState } from "react";

export default function SupportPage() {
  const [messageSent, setMessageSent] = useState(false);

  return (
    <div className="min-h-screen p-6 text-white">
      {/* 🔙 Înapoi */}
      <Link
        href="/"
        className="inline-block mb-6 px-3 py-1.5 rounded-lg border border-white/20 hover:border-cyan-400 hover:text-cyan-300 transition text-sm"
      >
        ← Înapoi la homepage
      </Link>

      {/* Titlu */}
      <h1 className="text-3xl font-bold mb-2">Suport Chatbot AI</h1>
      <p className="text-white/60 mb-8 max-w-2xl">
        Bine ai venit în centrul de suport ElectroHub. Aici poți discuta cu
        asistentul AI, poți găsi răspunsuri rapide la întrebări frecvente sau
        poți trimite un mesaj echipei noastre.
      </p>

      {/* Secțiune Chatbot */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-3">💬 Chatbot AI</h2>
        <p className="text-white/60 mb-4">
          Asistentul nostru AI este disponibil 24/7 pentru a te ajuta cu
          întrebări despre produse, cont, anunțuri și multe altele.
        </p>

        <Link
          href="/chat"
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 transition rounded-lg font-medium"
        >
          Deschide Chatbot AI →
        </Link>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">❓ Întrebări frecvente</h2>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <h3 className="font-semibold">Cum public un produs?</h3>
            <p className="text-white/60 text-sm">
              Mergi la secțiunea „Adaugă produs”, completezi detaliile și
              publici anunțul în câteva secunde.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <h3 className="font-semibold">Cum îmi editez anunțurile?</h3>
            <p className="text-white/60 text-sm">
              Accesează „Contul meu → Anunțurile mele” și selectează produsul
              pe care vrei să îl modifici.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <h3 className="font-semibold">Cum contactez vânzătorul?</h3>
            <p className="text-white/60 text-sm">
              Fiecare produs are un buton dedicat pentru contact direct cu
              vânzătorul.
            </p>
          </div>
        </div>
      </div>

      {/* Formular Contact */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3">📨 Trimite un mesaj</h2>
        <p className="text-white/60 mb-4">
          Dacă ai o problemă specifică, ne poți scrie direct aici.
        </p>

        {!messageSent ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMessageSent(true);
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Numele tău"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              required
            />

            <textarea
              placeholder="Mesajul tău"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white h-32"
              required
            />

            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 transition rounded-lg font-medium"
            >
              Trimite mesajul →
            </button>
          </form>
        ) : (
          <p className="text-green-400 font-medium">
            Mesajul tău a fost trimis! Te vom contacta în cel mai scurt timp.
          </p>
        )}
      </div>
    </div>
  );
}
