import Link from "next/link";
"use client";

import { useEffect, useState } from "react";
import ChatBox from "@/components/chat/ChatBox";

export default function ConversationPage({ params }) {
  const { id } = params;
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:1000/conversations/${id}`)
      .then((res) => res.json())
      .then(setConversation);
  }, [id]);

  if (!conversation) return <div>Se încarcă...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Conversație cu cumpărătorul #{conversation.buyerId}
      </h1>

      <ChatBox
        conversationId={conversation.id}
        userId={conversation.sellerId}
      />
    </div>
  );
}
