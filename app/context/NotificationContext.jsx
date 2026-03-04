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
        `https://electrohub-backend-1-10qa.onrender.com/notifications/${uid}`
      );

      if (!res.ok) {
        setNotifications([]);
        return;
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        setNotifications([]);
        return;
      }

      // 🔥 AICI ESTE MODIFICAREA IMPORTANTĂ
      // Ne asigurăm că fiecare notificare are "images" ca array
      const normalized = data.map((n) => ({
        ...n,
        images: n.images || (n.image ? [n.image] : []), // ← AICI E MAGIA
      }));

      setNotifications(normalized);
    } catch (err) {
      console.error("Eroare notificări:", err);
      setNotifications([]);
    }
  };

  // 🔥 Când avem userId → încărcăm notificările
  useEffect(() => {
    if (userId) loadNotifications(userId);
  }, [userId]);

  const refreshNotifications = () => {
    if (userId) loadNotifications(userId);
  };

  const markAsRead = async (id) => {
    await fetch(
      `https://electrohub-backend-1-10qa.onrender.com/notifications/read/${id}`,
      { method: "PATCH" }
    );

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = async (id) => {
    await fetch(
      `https://electrohub-backend-1-10qa.onrender.com/notifications/${id}`,
      { method: "DELETE" }
    );

    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getUnreadCount = () => {
    return notifications.filter((n) => !n.read).length;
  };

  const getUserNotifications = () => {
    return notifications;
  };

  const value = {
    notifications,
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
