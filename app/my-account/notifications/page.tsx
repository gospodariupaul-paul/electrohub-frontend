"use client";

import { useNotifications } from "@/app/context/NotificationContext";
import { useUser } from "@/app/context/UserContext";

export default function NotificationsPage() {
  const { user } = useUser();
  const {
    getUserNotifications,
    markAsRead,
    emptyState
  } = useNotifications();

  if (!user) {
    return (
      <div className="text-center text-gray-300 mt-10">
        Se încarcă datele contului...
      </div>
    );
  }

  const notifications = getUserNotifications(user.id);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-[#0f172a] rounded-xl border border-white/10">
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
            className={`p-4 rounded-lg cursor-pointer ${
              n.read
                ? "bg-white/5"
                : "bg-white/10 border border-cyan-500/40"
            }`}
            onClick={() => markAsRead(n.id)}
          >
            <a href={n.link} className="text-white font-semibold">
              {n.text}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
