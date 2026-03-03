"use client";

import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  // 🔥 Preluăm userId din localStorage (salvat de UserContext)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUserId(parsed.id);
    }
  }, []);

  // 🔥 Când avem userId → încărcăm notificările din backend
  useEffect(() => {
    if (!userId) return;

    fetch(`https://electrohub-backend.onrender.com/notifications/${userId}`)
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Eroare notificări:", err));
  }, [userId]);

  // 🔵 Marchează notificare ca citită (backend)
  const markAsRead = async (id) => {
    await fetch(`https://electrohub-backend.onrender.com/notifications/read/${id}`, {
      method: "PATCH",
    });

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // 🔵 Șterge notificare (backend)
  const deleteNotification = async (id) => {
    await fetch(`https://electrohub-backend.onrender.com/notifications/${id}`, {
      method: "DELETE",
    });

    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // 🔵 Număr notificări necitite
  const getUnreadCount = () => {
    return notifications.filter((n) => !n.read).length;
  };

  // 🔵 Notificările userului
  const getUserNotifications = () => {
    return notifications;
  };

  const value = {
    notifications,
    getUnreadCount,
    getUserNotifications,
    markAsRead,
    deleteNotification,

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
