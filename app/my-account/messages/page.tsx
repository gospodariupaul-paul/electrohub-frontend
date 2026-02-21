"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // 🔥 Luăm toate conversațiile userului logat
        const res = await axiosInstance.get("/chat/my-conversations");
        setConversations(res.data || []);
      } catch (error) {
        console.error("Eroare la încărcarea conversațiilor:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="p-6 text-white space-y-6">

      <h1 className="text-3xl font-bold">Mesajele mele</h1>

      {loading ? (
        <p className="opacity-70">Se încarcă conversațiile...</p>
      ) : conversations.length === 0 ? (
        <p className="opacity-70">Nu ai conversații încă.</p>
      ) : (
        <div className="space-y-4">
          {conversations.map((conv) => (
            <Link
              key={conv.id}
              href={`/chat/${conv.id}`}
              className="block bg-[#070a20] border border-white/10 p-4 rounded-xl hover:border-cyan-400 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    Conversație cu: {conv.otherUserName}
                  </h3>
                  <p className="text-sm opacity-70">
                    Produs: {conv.productName}
                  </p>
                </div>

                <span className="text-xs opacity-50">
                  {new Date(conv.updatedAt).toLocaleString()}
                </span>
              </div>

              <p className="text-sm mt-2 opacity-80 line-clamp-1">
                Ultimul mesaj: {conv.lastMessage}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
