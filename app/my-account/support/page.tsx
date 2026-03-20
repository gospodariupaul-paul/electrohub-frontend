"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

export default function MySupportMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axiosInstance.get("/support/my", { withCredentials: true })
      .then(res => setMessages(res.data));
  }, []);

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
        {messages.map(msg => (
          <Link
            key={msg.id}
            href={`/my-account/support/${msg.id}`}
            className="bg-[#0b1220] p-4 rounded-lg border border-cyan-500/20 hover:bg-[#0f1a2a]"
          >
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
        ))}
      </div>
    </div>
  );
}
