"use client";

import { useState } from "react";
import { useNotifications } from "@/app/context/NotificationContext";
import { useUser } from "@/app/context/UserContext";
import Link from "next/link";

export default function NotificationsPage() {
  const { user } = useUser();
  const {
    getUserNotifications,
    markAsRead,
    deleteNotification,
    emptyState
  } = useNotifications();

  const [currentIndex, setCurrentIndex] = useState({});

  if (!user) {
    return (
      <div className="text-center text-gray-300 mt-10">
        Se încarcă datele contului...
      </div>
    );
  }

  const notifications = getUserNotifications();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-[#0f172a] rounded-xl border border-white/10">

      <button
        onClick={() => window.history.back()}
        className="mb-6 px-4 py-2 bg-[#00eaff] text-black rounded-lg font-semibold hover:bg-[#00c7d6] transition"
      >
        ← Înapoi
      </button>

      <h1 className="text-2xl font-bold mb-6">Notificările tale</h1>

      {notifications.length === 0 && (
        <div className="text-center text-gray-400 px-2 py-4">
          <img
            src={emptyState.image}
            alt="Nu ai notificări"
            className="mx-auto mb-4 w-40 h-auto opacity-90"
          />
          <h4 className="text-lg font-semibold text-white">
            {emptyState.title}
          </h4>
          <p className="text-sm text-gray-400">{emptyState.line1}</p>
          <p className="text-sm text-gray-400">{emptyState.line2}</p>
        </div>
      )}

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-lg flex justify-between items-center ${
              n.read
                ? "bg-white/5"
                : "bg-white/10 border border-cyan-500/40"
            }`}
          >

            {n.images && n.images.length > 0 && (
              <div className="relative w-32 h-32 overflow-hidden rounded-lg mr-4">
                <img
                  src={n.images[currentIndex[n.id] || 0]}
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prev) => ({
                      ...prev,
                      [n.id]:
                        prev[n.id] > 0
                          ? prev[n.id] - 1
                          : n.images.length - 1,
                    }));
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1"
                >
                  ‹
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex((prev) => ({
                      ...prev,
                      [n.id]:
                        prev[n.id] < n.images.length - 1
                          ? prev[n.id] + 1
                          : 0,
                    }));
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 text-white px-2 py-1"
                >
                  ›
                </button>
              </div>
            )}

            <div className="flex flex-col flex-1">
              <Link
                href={n.link || "#"}   // 🔥 FIX
                onClick={async (e) => {
                  e.preventDefault();
                  await markAsRead(n.id);
                  if (n.link) window.location.href = n.link; // 🔥 FIX
                }}
                className={`text-lg ${
                  n.read ? "opacity-70" : "font-bold text-cyan-300"
                }`}
              >
                {n.text}
              </Link>

              <span className="text-xs text-gray-400 mt-1">
                {new Date(n.createdAt).toLocaleString("ro-RO")}
              </span>
            </div>

            <button
              onClick={() => deleteNotification(n.id)}
              className="text-red-400 text-sm hover:text-red-300 ml-4"
            >
              Șterge
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
