"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

export default function MySupportMessageDetails() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/support/my/${id}`, { withCredentials: true })
      .then(res => setMessage(res.data));
  }, [id]);

  if (!message) {
    return <div className="text-white p-6">Mesajul nu există.</div>;
  }

  return (
    <div className="text-white p-6 max-w-3xl mx-auto">
      <Link href="/my-account/support" className="text-cyan-400 underline">
        ← Înapoi
      </Link>

      <h1 className="text-3xl font-bold mt-6 mb-4 text-cyan-400">
        {message.subject}
      </h1>

      <div className="bg-[#0b1220] p-6 rounded-lg border border-cyan-500/20 mb-6">
        <h2 className="text-xl text-cyan-300 mb-2">Mesajul tău</h2>
        <p className="text-gray-300 whitespace-pre-line">{message.message}</p>
      </div>

      <div className="bg-[#0b1220] p-6 rounded-lg border border-cyan-500/20">
        <h2 className="text-xl text-cyan-300 mb-2">Răspunsul adminului</h2>

        {message.reply ? (
          <p className="text-green-400 whitespace-pre-line">{message.reply}</p>
        ) : (
          <p className="text-yellow-400">Adminul nu a răspuns încă.</p>
        )}
      </div>
    </div>
  );
}
