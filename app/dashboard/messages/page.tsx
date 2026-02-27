"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";

export default function MessagesPage() {
  const { user } = useUser();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (!user) return;

        const res = await axiosInstance.get(`/conversations/user/${user.id}`);
        setConversations(res.data || []);
      } catch (e) {
        console.error("Eroare la încărcarea conversațiilor:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  if (loading) return <p className="text-white">Se încarcă...</p>;

  return (
    <div className="p-4 space-y-6 bg-[#0b141a] min-h-screen">
      <h1 className="text-3xl font-bold text-white">Mesajele tale</h1>

      {conversations.length === 0 ? (
        <p className="text-gray-400">Nu ai conversații încă.</p>
      ) : (
        <div className="space-y-3">
          {conversations.map((c) => {
            const isBuyer = c.buyerId === user.id;
            const otherUser = isBuyer ? c.seller : c.buyer;
            const lastMessage = c.messages?.[0]?.text || "—";

            return (
              <Link
                key={c.id}
                href={`/chat/${c.id}`}
                className="flex items-center gap-4 p-3 rounded-xl bg-[#111b21] hover:bg-[#202c33] transition border border-transparent hover:border-[#00a884]"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {otherUser?.name?.charAt(0)?.toUpperCase() || "?"}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="text-white font-semibold text-lg">
                    {otherUser?.name || "Utilizator"}
                  </p>

                  <p className="text-sm text-gray-400">
                    {lastMessage}
                  </p>
                </div>

                {/* Ora */}
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(c.updatedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
