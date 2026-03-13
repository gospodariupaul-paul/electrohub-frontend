"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState(null);

  // 🔥 PRELUĂM USERUL REAL DIN UserContext
  const { user } = useUser();

  const API = process.env.NEXT_PUBLIC_API_URL;

  // 🔥 Încarcă notificările
  const loadNotifications = async (uid) => {
    try {
      const res = await fetch(`${API}/notifications/${uid}`, {
        credentials: "include",
      });

      if (!res.ok) {
        setNotifications([]);
        return;
      }

      const data = await res.json();

      const normalized = data.map((n) => ({
        ...n,
        images: n.images || (n.image ? [n.image] : []),
      }));

      setNotifications(normalized);
    } catch (err) {
      console.error("Eroare notificări:", err);
      setNotifications([]);
    }
  };

  // 🔥 Încarcă setările utilizatorului
  const loadSettings = async () => {
    try {
      const res = await fetch(`${API}/notifications/settings/me`, {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error("Eroare setări:", err);
    }
  };

  // 🔥 Când userul este disponibil → încărcăm notificările
  useEffect(() => {
    if (user?.id) {
      loadNotifications(user.id);
      loadSettings();
    }
  }, [user]);

  const markAsRead = async (id) => {
    await fetch(`${API}/notifications/read/${id}`, { method: "PATCH" });

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = async (id) => {
    await fetch(`${API}/notifications/${id}`, { method: "DELETE" });

    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getUnreadCount = () => {
    return notifications.filter((n) => !n.read).length;
  };

  const getUserNotifications = () => {
    return notifications;
  };

  const refreshNotifications = () => {
    if (user?.id) loadNotifications(user.id);
  };

  const value = {
    notifications,
    settings,
    saveSettings: async (newSettings) => {
      try {
        const res = await fetch(`${API}/notifications/settings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(newSettings),
        });

        if (!res.ok) throw new Error("Eroare la salvare");

        const data = await res.json();
        setSettings(data);
        return true;
      } catch (err) {
        console.error("Eroare salvare setări:", err);
        return false;
      }
    },
    getUnreadCount,
    getUserNotifications,
    markAsRead,
    deleteNotification,
    refreshNotifications,

    emptyState: {
      image: "/images/bell-icon-hologram.png",
      title: "Missing notifications",
      line1: "Nu ai nicio notificare deocamdată",
      line2: "Te vom informa atunci când se întâmplă ceva important.",
    },
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
