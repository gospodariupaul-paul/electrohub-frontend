"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";

export default function ChatBox({ conversationId, userId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // 1️⃣ Încarcă mesajele existente din backend-ul Render
  useEffect(() => {
    if (!conversationId) return;

    fetch(
      `https://electrohub-backend-1-10qa.onrender.com/messages/${conversationId}`
    )
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Eroare la încărcarea mesajelor:", err));
  }, [conversationId]);

  // 2️⃣ Ascultă mesajele noi prin Pusher
  useEffect(() => {
    if (!conversationId) return;

    const channel = pusherClient.subscribe(`conversation-${conversationId}`);

    channel.bind("new-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      pusherClient.unsubscribe(`conversation-${conversationId}`);
    };
  }, [conversationId]);

  // 3️⃣ Trimite mesaj (cu token JWT)
  const sendMessage = async () => {
    if (!text.trim()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Trebuie să fii logat ca să trimiți mesaje.");
      return;
    }

    await fetch("https://electrohub-backend-1-10qa.onrender.com/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔥 token trimis corect
      },
      body: JSON.stringify({
        conversationId,
        senderId: userId,
        text,
      }),
    });

    setText("");
  };

  return (
    <div className="border rounded p-4 bg-[#0f0f1a] text-white shadow max-w-xl mx-auto mt-6">
      <div className="h-64 overflow-y-auto border-b mb-3 pb-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm">Nu există mesaje încă...</p>
        )}

        {messages.map((m) => (
          <div key={m.id} className="mb-2">
            <b className={m.senderId === userId ? "text-green-400" : "text-cyan-300"}>
              {m.senderId === userId ? "Tu" : "Vânzător"}:
            </b>{" "}
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded bg-[#1a1a2e] text-white"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Scrie un mesaj..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Trimite
        </button>
      </div>
    </div>
  );
}
