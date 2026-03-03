"use client";

import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  // 🔥 Preluăm userId din localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUserId(parsed.id);
    }
  }, []);

  // 🔥 Funcție care încarcă notificările din backend
  const loadNotifications = async (uid) => {
    try {
      const res = await fetch(
        `https://electrohub-backend.onrender.com/notifications/${uid}`
      );
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Eroare notificări:", err);
    }
  };

  // 🔥 Când avem userId → încărcăm notificările
  useEffect(() => {
    if (userId) loadNotifications(userId);
  }, [userId]);

  // 🔥 Funcție publică pentru refresh manual
  const refreshNotifications = () => {
    if (userId) loadNotifications(userId);
  };

  // 🔵 Marchează notificare ca citită
  const markAsRead = async (id) => {
    await fetch(
      `https://electrohub-backend.onrender.com/notifications/read/${id}`,
      { method: "PATCH" }
    );

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // 🔵 Șterge notificare
  const deleteNotification = async (id) => {
    await fetch(
      `https://electrohub-backend.onrender.com/notifications/${id}`,
      { method: "DELETE" }
    );

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
    refreshNotifications, // 🔥 ADĂUGAT

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
