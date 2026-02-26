"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function SellerChatButton({ userId }: { userId: number }) {
  const router = useRouter();

  const handleOpenChat = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/conversations/user/${userId}`
      );

      if (!res.data || res.data.length === 0) {
        alert("Nu există conversații încă.");
        return;
      }

      const conversationId = res.data[0].id;
      router.push(`/chat/${conversationId}`);
    } catch (err) {
      console.error("Eroare la deschiderea chatului:", err);
    }
  };

  return (
    <button
      onClick={handleOpenChat}
      className="px-5 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold"
    >
      💬 Chat
    </button>
  );
}
