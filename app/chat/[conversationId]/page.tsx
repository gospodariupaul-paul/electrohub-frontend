"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Pusher from "pusher-js";
import EmojiPicker from "emoji-picker-react";

export default function ChatPage() {
  const { conversationId } = useParams();
  const router = useRouter();

  const [messages, setMessages] = useState<any[]>([]);
  const [conversation, setConversation] = useState<any>(null);
  const [text, setText] = useState("");
  const [user, setUser] = useState<any>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🔥 1. Luăm userul logat
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    if (user === null) return;
    if (!user?.id) router.push("/login");
  }, [user]);

  // 🔥 2. Încărcăm conversația + mesajele + MARCĂM CA CITITE
  useEffect(() => {
    if (!conversationId || !user?.id) return;

    axiosInstance
      .get(`/conversations/${conversationId}`)
      .then((res) => {
        setConversation(res.data);
        return axiosInstance.get(`/messages/${conversationId}`);
      })
      .then((res) => {
        setMessages(res.data);

        // 🔥 MARCHEAZĂ MESAJELE CA CITITE
        axiosInstance.post(`/conversations/mark-read/${conversationId}`);
      })
      .catch((err) => console.error("Error loading chat:", err));
  }, [conversationId, user]);

  // 🔥 3. Pusher pentru mesaje noi
  useEffect(() => {
    if (!conversationId) return;

    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

    const pusher = new Pusher(key!, { cluster });
    const channel = pusher.subscribe(`conversation-${conversationId}`);

    channel.bind("new-message", (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      pusher.unsubscribe(`conversation-${conversationId}`);
      pusher.disconnect();
    };
  }, [conversationId]);

  // 🔥 4. Scroll automat
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 5. Trimite mesaj
  const sendMessage = async () => {
    if (!text.trim() || !user) return;

    try {
      await axiosInstance.post("/messages", {
        conversationId: Number(conversationId),
        senderId: user.id,
        text: text,
      });

      setText("");
      setShowEmoji(false);
    } catch (err) {
      console.error("Eroare la trimitere mesaj:", err);
    }
  };

  // 🔥 Determinăm cu cine vorbește userul
  const otherUser =
    conversation?.buyerId === user?.id
      ? conversation?.seller
      : conversation?.buyer;

  return (
    <div className="min-h-screen bg-[#0b141a] flex flex-col">
      {/* 🔥 HEADER WHATSAPP STYLE */}
      <div className="h-16 bg-[#202c33] text-white flex items-center px-4 gap-3 border-b border-black/20 shadow-md">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center text-white font-bold text-lg">
          {otherUser?.name?.charAt(0)?.toUpperCase() || "?"}
        </div>

        {/* Nume + produs */}
        <div className="flex flex-col">
          <p className="font-semibold text-base">
            {otherUser?.name || "Utilizator"}
          </p>
          <p className="text-xs text-gray-300">
            {conversation?.product?.name || ""}
          </p>
        </div>
      </div>

      {/* 🔥 Mesaje */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 bg-[#111b21]">
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

      {/* 🔥 Input */}
      <div className="relative bg-[#202c33] px-3 py-2 flex items-center gap-2 z-30">
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
          <div className="absolute bottom-14 left-2 z-10">
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
