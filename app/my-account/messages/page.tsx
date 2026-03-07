"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [headerMenu, setHeaderMenu] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const router = useRouter();

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

      const cleaned = res.data.map((c: any) => ({
        ...c,
        markedRead: false
      }));

      setConversations(cleaned);
    } catch (error) {
      console.error("Eroare la încărcarea conversațiilor:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axiosInstance.post("/messages/mark-all-read");
      await load();
      setHeaderMenu(false);
      router.push("/my-account/profile");
    } catch (err) {
      console.error("Eroare la marcarea conversațiilor ca citite:", err);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await axiosInstance.post(`/messages/mark-read/${id}`);

      setConversations((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, unreadCount: 0, markedRead: true }
            : c
        )
      );

      setOpenMenuId(null);
    } catch (err) {
      console.error("Eroare la marcarea conversației:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const handleFocus = () => load();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <div className="p-6 text-white space-y-6 bg-[#0b141a] min-h-screen relative">

      {/* 🔥 HEADER CU BUTON ÎNAPOI + TITLU + ⋮ */}
      <div className="flex items-center justify-between">

        {/* 🔙 BUTON ÎNAPOI */}
        <button
          onClick={() => router.push("/my-account/profile")}
          className="text-white text-xl px-3 py-1 hover:text-[#00a884] transition"
        >
          ←
        </button>

        <h1 className="text-3xl font-bold flex-1 text-center -ml-6">
          Mesajele mele
        </h1>

        {/* ⋮ BUTON */}
        <button
          onClick={() => setHeaderMenu((v) => !v)}
          className="text-3xl px-2"
        >
          ⋮
        </button>

        {/* MENIU ⋮ */}
        {headerMenu && (
          <div className="absolute right-6 top-20 bg-[#202c33] text-white rounded-md shadow-lg border border-gray-700 z-50 w-52">
            <button
              onClick={markAllAsRead}
              className="block px-4 py-2 hover:bg-[#2a3942] w-full text-left text-[#00a884]"
            >
              ✔️ Marchează ca citit
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <p className="opacity-70">Se încarcă conversațiile...</p>
      ) : conversations.length === 0 ? (
        <p className="opacity-70">Nu ai conversații încă.</p>
      ) : (
        <div className="space-y-4">
          {conversations.map((conv) => (
            <div key={conv.id} className="relative">

              <Link
                href={`/chat/${conv.id}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#111b21] hover:bg-[#202c33] transition border border-transparent hover:border-[#00a884]"
              >
                <div className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {conv.otherUserName?.charAt(0)?.toUpperCase() || "?"}
                </div>

                <div className="flex-1">
                  <p className="text-white font-semibold text-lg">
                    {conv.otherUserName || "Utilizator necunoscut"}
                  </p>

                  <p className="text-sm text-gray-400">
                    {conv.productName || "Produs necunoscut"}
                  </p>

                  <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                    {conv.lastMessageDeletedForAll
                      ? "Acest mesaj a fost șters"
                      : conv.lastMessage || "—"}
                  </p>

                  {conv.markedRead === true && (
                    <p className="text-xs text-green-400 mt-1">
                      ✔️ Marcat ca citit
                    </p>
                  )}
                </div>

                {conv.unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">
                    {conv.unreadCount}
                  </span>
                )}

                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(conv.updatedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                {conv.unreadCount > 0 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenMenuId(openMenuId === conv.id ? null : conv.id);
                    }}
                    className="text-xl px-2"
                  >
                    ⋮
                  </button>
                )}
              </Link>

              {openMenuId === conv.id && conv.unreadCount > 0 && (
                <div className="absolute right-4 top-16 bg-[#202c33] text-white rounded-md shadow-lg border border-gray-700 z-50 w-48">
                  <button
                    onClick={() => markAsRead(conv.id)}
                    className="block px-4 py-2 hover:bg-[#2a3942] w-full text-left text-[#00a884]"
                  >
                    ✔️ Marchează ca citit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
