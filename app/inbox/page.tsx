"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function InboxPage() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1000/conversations?sellerId=1")
      .then((res) => res.json())
      .then(setConversations);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Inbox</h1>

      {conversations.map((c) => (
        <Link
          key={c.id}
          href={`/inbox/${c.id}`}
          className="block border p-3 rounded mb-2 hover:bg-gray-100"
        >
          Conversație cu cumpărătorul #{c.buyerId}
        </Link>
      ))}
    </div>
  );
}
