"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [response, setResponse] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("https://electrohub-backend-production.up.railway.app/help/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">

        {/* TITLU */}
        <h1 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">
          Contact
        </h1>

        {/* BUTON ÎNAPOI */}
        <a
          href="/help"
          className="inline-block mb-6 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg shadow-md transition-all"
        >
          ← Înapoi
        </a>

        {/* FORMULAR */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Nume"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:bg-white/30"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:bg-white/30"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="text"
            placeholder="Subiect"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:bg-white/30"
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />

          <textarea
            placeholder="Mesaj"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 h-32 focus:outline-none focus:bg-white/30"
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button className="w-full bg-white/30 hover:bg-white/40 text-white font-semibold py-3 rounded-lg transition-all shadow-lg">
            Trimite mesaj
          </button>
        </form>

        {/* RĂSPUNS */}
        {response && (
          <p className="mt-6 text-green-200 text-center font-semibold">
            {response}
          </p>
        )}
      </div>
    </div>
  );
}
