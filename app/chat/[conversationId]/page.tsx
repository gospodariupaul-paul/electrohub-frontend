"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import Pusher from "pusher-js";
import EmojiPicker from "emoji-picker-react";
import { FiMessageCircle } from "react-icons/fi";

export default function ChatPage() {
  const { conversationId } = useParams();
  const router = useRouter();

  const [messages, setMessages] = useState<any[]>([]);
  const [conversation, setConversation] = useState<any>(null);
  const [text, setText] = useState("");
  const [user, setUser] = useState<any>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [contextMenu, setContextMenu] = useState<any>(null);

  const [headerMenu, setHeaderMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    if (user === null) return;
    if (!user?.id) router.push("/login");
  }, [user]);

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
        axiosInstance.post(`/conversations/mark-read/${conversationId}`);
      })
      .catch((err) => console.error("Error loading chat:", err));
  }, [conversationId, user]);

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleRightClick = (e: any, msg: any) => {
    e.preventDefault();
    setContextMenu({
      x: e.pageX,
      y: e.pageY,
      msg,
    });
  };

  const deleteForMe = async (id: number) => {
    try {
      await axiosInstance.post(`/messages/delete-for-me/${id}`);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setContextMenu(null);
    } catch (err) {
      console.error("Eroare la ștergere pentru tine:", err);
    }
  };

  const deleteForAll = async (id: number) => {
    try {
      await axiosInstance.post(`/messages/delete-for-all/${id}`);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, text: "Acest mesaj a fost șters", deletedForAll: true }
            : m
        )
      );
      setContextMenu(null);
    } catch (err) {
      console.error("Eroare la ștergere pentru toți:", err);
    }
  };

  const deleteConversation = async () => {
    try {
      await axiosInstance.delete(`/conversations/${conversationId}`);
      router.push("/my-account/messages");
    } catch (err) {
      console.error("Eroare la ștergerea conversației:", err);
    }
  };

  useEffect(() => {
    fetch("https://electrohub-backend-1-10qa.onrender.com/conversations/unread", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.count !== undefined) {
          setUnreadCount(data.count);
        }
      })
      .catch(() => {});
  }, [messages]);

  const otherUser =
    conversation?.buyerId === user?.id
      ? conversation?.seller
      : conversation?.buyer;

  return (
    <div className="min-h-screen bg-[#0b141a] flex flex-col relative">

      {/* HEADER CU BUTON ÎNAPOI */}
      <div className="h-16 bg-[#202c33] text-white flex items-center px-4 gap-3 border-b border-black/20 shadow-md relative">

        {/* 🔥 BUTON ÎNAPOI ÎN CASETĂ COLORATĂ */}
        <button
          onClick={() => router.push("/my-account/messages")}
          className="bg-[#00a884] text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#029f78] transition"
        >
          ← Înapoi
        </button>

        <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center text-white font-bold text-lg ml-2">
          {otherUser?.name?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <div className="flex flex-col flex-1">
          <p className="font-semibold text-base">
            {otherUser?.name || "Utilizator"}
          </p>
          <p className="text-xs text-gray-300">
            {conversation?.product?.name || ""}
          </p>
        </div>

        <div className="relative mr-3">
          <FiMessageCircle size={22} className="text-cyan-300" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        <button
          onClick={() => setHeaderMenu((v) => !v)}
          className="text-2xl px-2"
        >
          ⋮
        </button>

        {headerMenu && (
          <div className="absolute right-4 top-14 bg-[#202c33] text-white rounded-md shadow-lg border border-gray-700 z-50 w-40">
            <button
              onClick={deleteConversation}
              className="block px-4 py-2 hover:bg-[#2a3942] w-full text-left text-red-400"
            >
              🗑️ Șterge conversația
            </button>
          </div>
        )}
      </div>

      {/* MESAJ */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 bg-[#111b21]">
        {messages.map((msg, i) => {
          const isMe = user && msg.senderId === user.id;

          return (
            <div
              key={i}
              onContextMenu={(e) => handleRightClick(e, msg)}
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
                {msg.deletedForAll
                  ? "Acest mesaj a fost șters"
                  : msg.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
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
