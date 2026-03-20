"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { FaEnvelope, FaReply } from "react-icons/fa";

export default function SupportMessageDetails() {
  const { id } = useParams();
  const [message, setMessage] = useState<any>(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/support/admin/${id}`, { withCredentials: true })
      .then((res) => setMessage(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const sendReply = async () => {
    await axiosInstance.patch(
      `/support/admin/${id}/reply`,
      { reply },
      { withCredentials: true }
    );

    setSuccess(true);
    setMessage({ ...message, reply });
  };

  if (loading) {
    return (
      <div className="text-white text-xl flex justify-center mt-20">
        Se încarcă mesajul...
      </div>
    );
  }

  if (!message) {
    return (
      <div className="text-white text-xl flex justify-center mt-20">
        Mesajul nu există.
      </div>
    );
  }

  return (
    <div className="text-white max-w-3xl mx-auto">
      <Link href="/dashboard/support" className="text-cyan-400 underline mb-6 inline-block">
        ← Înapoi la mesaje
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-cyan-400 flex items-center gap-3">
        <FaEnvelope /> Mesaj de la utilizator
      </h1>

      <div className="bg-[#0b1220] border border-cyan-500/20 rounded-xl p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-cyan-300 mb-2">
          Subiect: {message.subject}
        </h2>

        <p className="text-gray-300 whitespace-pre-line mb-4">
          {message.message}
        </p>

        <div className="text-sm text-gray-400">
          De la:{" "}
          <span className="text-cyan-300 font-semibold">
            {message.user?.email}
          </span>
        </div>
      </div>

      {/* Răspuns admin */}
      <div className="bg-[#0b1220] border border-cyan-500/20 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
          <FaReply /> Răspuns către utilizator
        </h3>

        {success && (
          <div className="text-green-400 font-semibold mb-4">
            Răspuns trimis cu succes!
          </div>
        )}

        <textarea
          className="w-full bg-[#0d1a22] border border-white/10 text-white p-3 rounded-lg mb-4"
          rows={6}
          placeholder="Scrie răspunsul tău..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />

        <button
          onClick={sendReply}
          className="bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-3 px-6 rounded-lg transition"
        >
          Trimite răspunsul
        </button>
      </div>
    </div>
  );
}
