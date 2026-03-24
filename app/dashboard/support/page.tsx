"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { FaEnvelope, FaCheckCircle, FaClock } from "react-icons/fa";

export default function SupportMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/support/admin", { withCredentials: true })   // 🔥 RUTA CORECTĂ
      .then((res) => setMessages(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Sigur vrei să ștergi acest mesaj?")) return;

    try {
      await axiosInstance.patch(
        `/support/admin/delete/${id}`,   // 🔥 RUTA CORECTĂ
        {},
        { withCredentials: true }
      );

      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Eroare la ștergere mesaj:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-xl flex justify-center mt-20">
        Se încarcă mesajele...
      </div>
    );
  }

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400 flex items-center gap-3">
        <FaEnvelope className="text-cyan-300" />
        Support Messages
      </h1>

      {messages.length === 0 && (
        <div className="text-center text-gray-300 text-lg mt-20">
          Nu există mesaje trimise de utilizatori.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-[#0b1220] border border-cyan-500/20 rounded-xl p-5 shadow-lg hover:shadow-cyan-500/20 transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-cyan-300">
                {msg.subject}
              </h2>

              {msg.reply ? (
                <span className="flex items-center gap-2 text-green-400 text-sm">
                  <FaCheckCircle /> Răspuns primit
                </span>
              ) : (
                <span className="flex items-center gap-2 text-yellow-400 text-sm">
                  <FaClock /> În așteptare
                </span>
              )}
            </div>

            <p className="text-gray-300 mb-4 line-clamp-3">{msg.message}</p>

            <div className="text-sm text-gray-400 mb-4">
              De la:{" "}
              <span className="text-cyan-300 font-semibold">
                {msg.user?.email || "unknown@unknown.com"}   {/* 🔥 FALLBACK */}
              </span>
            </div>

            <Link
              href={`/dashboard/support/${msg.id}`}
              className="block text-center bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 rounded-lg transition"
            >
              Vezi mesajul
            </Link>

            <button
              onClick={() => handleDelete(msg.id)}
              className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded-lg transition"
            >
              Șterge mesaj
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
