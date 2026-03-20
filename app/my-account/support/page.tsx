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

  // 🔥 ȘTERGERE MESAJ
  const handleDelete = async (id: number) => {
    if (!confirm("Sigur vrei să ștergi acest mesaj?")) return;

    try {
      await axiosInstance.patch(`/support/delete/${id}`, {}, { withCredentials: true });

      // Scoatem mesajul din listă instant
      setMessages((prev) => prev.filter((m: any) => m.id !== id));
    } catch (err) {
      console.error("Eroare la ștergere mesaj:", err);
    }
  };

  return (
    <div className="text-white p-6">

      {/* 🔥 BUTON ÎNAPOI LA PROFIL */}
      <Link
        href="/my-account/profile"
        className="inline-block mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
      >
        ← Înapoi la profil
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Mesajele mele</h1>

      {messages.length === 0 && (
        <p className="text-gray-400">Nu ai trimis niciun mesaj.</p>
      )}

      <div className="flex flex-col gap-4">
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            className="bg-[#0b1220] p-4 rounded-lg border border-cyan-500/20 hover:bg-[#0f1a2a]"
          >
            {/* 🔵 TITLU + MESAJ */}
            <Link href={`/my-account/support/${msg.id}`}>
              <h2 className="text-xl text-cyan-300">{msg.subject}</h2>
              <p className="text-gray-400 mt-2">{msg.message}</p>

              <p className="mt-3 text-sm">
                Status:{" "}
                {msg.reply ? (
                  <span className="text-green-400">Răspuns primit</span>
                ) : (
                  <span className="text-yellow-400">În așteptare</span>
                )}
              </p>
            </Link>

            {/* 🔥 BUTON ȘTERGERE — ÎN AFARA LINK-ULUI */}
            <button
              onClick={() => handleDelete(msg.id)}
              className="mt-4 px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
            >
              Șterge mesaj
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
