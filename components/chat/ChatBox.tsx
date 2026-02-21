"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";

export default function ChatBox({ conversationId, userId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!conversationId) return;

    const channel = pusherClient.subscribe(`conversation-${conversationId}`);

    channel.bind("new-message", (message: any) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      pusherClient.unsubscribe(`conversation-${conversationId}`);
    };
  }, [conversationId]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await fetch("http://localhost:1000/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId,
        senderId: userId,
        text,
      }),
    });

    setText("");
  };

  return (
    <div className="border rounded p-4 bg-white shadow">
      <div className="h-64 overflow-y-auto border-b mb-3 pb-3">
        {messages.map((m) => (
          <div key={m.id} className="mb-2">
            <b>{m.senderId === userId ? "Tu" : "Vânzător"}:</b> {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
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
