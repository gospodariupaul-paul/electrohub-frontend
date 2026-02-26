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

        // 🔥 Luăm conversațiile unde userul este VÂNZĂTOR
        const res = await axiosInstance.get(`/conversations?sellerId=${user.id}`);
        setConversations(res.data || []);
      } catch (e) {
        console.error("Eroare la încărcarea conversațiilor:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  if (loading) return <p>Se încarcă...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mesajele tale</h1>

      {conversations.length === 0 ? (
        <p className="opacity-70">Nu ai conversații încă.</p>
      ) : (
        <div className="space-y-4">
          {conversations.map((c) => (
            <Link
              key={c.id}
              href={`/chat/${c.id}`}
              className="block bg-[#070a20] border border-white/10 p-4 rounded-xl hover:border-cyan-400 transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-cyan-300">
                    Client: {c.buyer?.name || "Anonim"}
                  </p>
                  <p className="text-sm opacity-70">
                    Produs: {c.product?.name}
                  </p>
                </div>

                <p className="text-xs opacity-50">
                  {new Date(c.updatedAt).toLocaleString()}
                </p>
              </div>

              <p className="mt-2 text-sm opacity-80 line-clamp-1">
                Ultimul mesaj: {c.lastMessage?.content || "—"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
