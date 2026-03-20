"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

export default function MySupportMessages() {
  const [messages, setMessages] = useState([]);

  // 🔥 FETCH MESAJELOR
  useEffect(() => {
    axiosInstance
      .get("/support/my", { withCredentials: true })
      .then((res) => setMessages(res.data));
  }, []);

  // 🔥 SEPARĂM MESAJELE
  const sentMessages = messages.filter((m: any) => !m.reply);
  const receivedMessages = messages.filter((m: any) => m.reply);

  // 🔥 ȘTERGERE MESAJ
  const handleDelete = async (id: number) => {
    if (!confirm("Sigur vrei să ștergi acest mesaj?")) return;

    try {
      await axiosInstance.patch(`/support/delete/${id}`, {}, { withCredentials: true });

      setMessages((prev) => prev.filter((m: any) => m.id !== id));
    } catch (err) {
      console.error("Eroare la ștergere mesaj:", err);
    }
  };

  return (
    <div className="text-white p-6">

      {/* 🔙 ÎNAPOI */}
      <Link
        href="/my-account/profile"
        className="inline-block mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
      >
        ← Înapoi la profil
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Mesajele mele</h1>

      {/* ============================
          🔵 MESAJE PRIMITE DE LA ADMIN
      ============================ */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">
          Mesaje primite de la admin
        </h2>

        {receivedMessages.length === 0 && (
          <p className="text-gray-400">Nu ai primit încă niciun răspuns.</p>
        )}

        <div className="flex flex-col gap-4">
          {receivedMessages.map((msg: any) => (
            <div
              key={msg.id}
              className="bg-[#0f1a2a] p-5 rounded-lg border border-green-500/30 shadow-lg"
            >
              <h3 className="text-xl text-green-300">{msg.subject}</h3>

              <p className="text-gray-400 mt-2">
                <span className="text-gray-500">Mesaj trimis de tine:</span> {msg.message}
              </p>

              <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <p className="text-green-300 text-sm font-semibold">Răspuns de la admin:</p>
                <p className="text-green-200 mt-1">{msg.reply}</p>
              </div>

              <div className="flex gap-3 mt-4">
                <Link
                  href={`/my-account/support/${msg.id}`}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-semibold"
                >
                  Vezi detalii
                </Link>

                <button
                  onClick={() => handleDelete(msg.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-semibold"
                >
                  Șterge mesaj
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================
          🔵 MESAJE TRIMISE DE TINE
      ============================ */}
      <div>
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
          Mesaje trimise de tine
        </h2>

        {sentMessages.length === 0 && (
          <p className="text-gray-400">Nu ai mesaje în așteptare.</p>
        )}

        <div className="flex flex-col gap-4">
          {sentMessages.map((msg: any) => (
            <div
              key={msg.id}
              className="bg-[#0b1220] p-5 rounded-lg border border-cyan-500/20 shadow-lg"
            >
              <h3 className="text-xl text-cyan-300">{msg.subject}</h3>

              <p className="text-gray-400 mt-2">{msg.message}</p>

              <p className="mt-3 text-sm">
                Status: <span className="text-yellow-400">În așteptare</span>
              </p>

              <div className="flex gap-3 mt-4">
                <Link
                  href={`/my-account/support/${msg.id}`}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-semibold"
                >
                  Vezi detalii
                </Link>

                <button
                  onClick={() => handleDelete(msg.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-semibold"
                >
                  Șterge mesaj
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
