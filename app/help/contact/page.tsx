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
    <div className="max-w-3xl mx-auto py-10 px-4 text-black"> {/* FIX AICI */}
      <h1 className="text-3xl font-bold mb-6">Contact</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nume"
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Subiect"
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <textarea
          placeholder="Mesaj"
          className="w-full p-3 border rounded h-32"
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
          Trimite mesaj
        </button>
      </form>

      {response && <p className="mt-4 text-green-600">{response}</p>}
    </div>
  );
}
