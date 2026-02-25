"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Pusher from "pusher-js";
import EmojiPicker from "emoji-picker-react";

export default function ChatPage() {
  const { conversationId } = useParams();
  const searchParams = useSearchParams();

  const buyerId = Number(searchParams.get("buyerId"));
  const sellerId = Number(searchParams.get("sellerId"));
  const productId = Number(searchParams.get("productId"));

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState<any>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // user logat
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  // ia mesajele existente
  useEffect(() => {
    if (!conversationId) return;

    fetch(
      `https://electrohub-backend-1-10qa.onrender.com/messages?conversationId=${conversationId}`
    )
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [conversationId]);

  // realtime Pusher
  useEffect(() => {
    if (!conversationId) return;

    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_KEY as string,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      }
    );

    const channel = pusher.subscribe(`conversation-${conversationId}`);

    channel.bind("new-message", (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      pusher.unsubscribe(`conversation-${conversationId}`);
      pusher.disconnect();
    };
  }, [conversationId]);

  // scroll jos
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || !user) return;

    await fetch("https://electrohub-backend-1-10qa.onrender.com/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        buyerId,
        sellerId,
        productId,
        senderId: user.id,
        text,
      }),
    });

    setText("");
    setShowEmoji(false);
  };

  return (
    <div className="min-h-screen bg-[#0b141a] flex flex-col">
      {/* Header WhatsApp */}
      <div className="h-16 bg-[#202c33] text-white flex items-center px-4 gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-500" />
        <div>
          <p className="font-semibold text-sm">Chat</p>
          <p className="text-xs text-gray-300">online</p>
        </div>
      </div>

      {/* Mesaje */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 bg-[url('https://i.imgur.com/0Zf7ZqV.png')] bg-cover">
        {messages.map((msg, i) => {
          const isMe = user && msg.senderId === user.id;
          return (
            <div
              key={i}
              className={`flex w-full ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm shadow-sm ${
                  isMe
                    ? "bg-[#005c4b] text-white rounded-br-none"
                    : "bg-[#202c33] text-white rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="relative bg-[#202c33] px-3 py-2 flex items-center gap-2">
        <button
          onClick={() => setShowEmoji((v) => !v)}
          className="text-2xl text-gray-300"
        >
          😊
        </button>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Scrie un mesaj"
          className="flex-1 bg-[#2a3942] text-white text-sm px-3 py-2 rounded-lg outline-none"
        />

        <button
          onClick={sendMessage}
          className="text-sm font-semibold text-[#00a884]"
        >
          Trimite
        </button>

        {showEmoji && (
          <div className="absolute bottom-14 left-2 z-20">
            <EmojiPicker
              onEmojiClick={(emoji) => setText((prev) => prev + emoji.emoji)}
              theme="dark"
            />
          </div>
        )}
      </div>
    </div>
  );
}
