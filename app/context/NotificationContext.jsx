"use client";

import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // 🔥 Încarcă notificările din localStorage la pornire
  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  // 🔥 Salvează notificările în localStorage la fiecare modificare
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // 🔵 Adaugă notificare nouă
  const addNotification = (userId, text, link) => {
    const newNotif = {
      id: Date.now(),
      userId,
      text,
      link,
      read: false,
      createdAt: Date.now(),
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  // 🔵 Număr notificări necitite
  const getUnreadCount = (userId) => {
    if (!userId) return 0;
    return notifications.filter((n) => n.userId === userId && !n.read).length;
  };

  // 🔵 Notificările userului
  const getUserNotifications = (userId) => {
    if (!userId) return [];
    return notifications.filter((n) => n.userId === userId);
  };

  // 🔵 Marchează ca citită
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // 🔵 Șterge notificare
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const value = {
    notifications,
    addNotification,
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
