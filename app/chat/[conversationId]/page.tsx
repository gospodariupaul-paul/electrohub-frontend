"use client";

import { useEffect, useState, useRef } from "react";
import axiosInstance from "@/lib/axios";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const params = useParams();
  const conversationId = params?.conversationId;

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 🔥 Încărcăm mesajele conversației
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(`/chat/${conversationId}`);
        setMessages(res.data || []);
      } catch (error) {
        console.error("Eroare la încărcarea mesajelor:", error);
      } finally {
        setLoading(false);
      }
    };

    load();

    // 🔥 Auto-refresh la 2 secunde (ca OLX)
    const interval = setInterval(load, 2000);
    return () => clearInterval(interval);
  }, [conversationId]);

  // 🔥 Scroll automat la ultimul mesaj
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await axiosInstance.post(`/chat/${conversationId}`, {
        text: message,
      });

      setMessage("");
    } catch (error) {
      console.error("Eroare la trimiterea mesajului:", error);
      alert("Mesajul nu a putut fi trimis.");
    }
  };

  return (
    <div className="flex flex-col h-[85vh] p-6 text-white">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">Chat</h1>

      {/* MESAJE */}
      <div className="flex-1 overflow-y-auto space-y-4 bg-[#070a20] p-4 rounded-xl border border-white/10">

        {loading ? (
          <p className="opacity-70">Se încarcă mesajele...</p>
        ) : messages.length === 0 ? (
          <p className="opacity-70">Nu există mesaje încă.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg max-w-[70%] ${
                msg.isMine
                  ? "bg-cyan-600 ml-auto text-right"
                  : "bg-white/10 mr-auto"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-[10px] opacity-50 block mt-1">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* INPUT */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Scrie un mesaj..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-[#070a20] border border-white/10"
        />

        <button
          onClick={sendMessage}
          className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
        >
          Trimite
        </button>
      </div>
    </div>
  );
}
