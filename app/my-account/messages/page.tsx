"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Funcția de încărcare a conversațiilor
  const load = async () => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(stored);
      if (!user?.id) {
        setLoading(false);
        return;
      }

      const res = await axiosInstance.get(`/conversations/user/${user.id}`);
      setConversations(res.data || []);
    } catch (error) {
      console.error("Eroare la încărcarea conversațiilor:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Se încarcă o singură dată la intrarea pe pagină
  useEffect(() => {
    load();
  }, []);

  // 🔥 Reîncarcă automat când revii pe pagină (SOLUȚIA pentru badge)
  useEffect(() => {
    const handleFocus = () => load();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <div className="p-6 text-white space-y-6 bg-[#0b141a] min-h-screen">
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
              className="flex items-center gap-4 p-4 rounded-xl bg-[#111b21] hover:bg-[#202c33] transition border border-transparent hover:border-[#00a884]"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white font-bold text-lg shadow-md">
                {conv.otherUserName?.charAt(0)?.toUpperCase() || "?"}
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-white font-semibold text-lg">
                  {conv.otherUserName || "Utilizator necunoscut"}
                </p>

                <p className="text-sm text-gray-400">
                  {conv.productName || "Produs necunoscut"}
                </p>

                {/* 🔥 Afișare corectă a ultimului mesaj */}
                <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                  {conv.lastMessageDeletedForAll
                    ? "Acest mesaj a fost șters"
                    : conv.lastMessage || "—"}
                </p>
              </div>

              {/* Badge mesaje necitite */}
              {conv.unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">
                  {conv.unreadCount}
                </span>
              )}

              {/* Ora */}
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {new Date(conv.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
