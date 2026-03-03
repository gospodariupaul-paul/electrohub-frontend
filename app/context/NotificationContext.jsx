"use client";

import { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Cineva ți-a apreciat anunțul",
      link: "/my-account/listings",
      read: false,
    },
    {
      id: 2,
      text: "Ai un mesaj nou",
      link: "/messages",
      read: false,
    },
    {
      id: 3,
      text: "Actualizare comandă: în curs de livrare",
      link: "/orders",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    deleteNotification,

    // 🔥 Imaginea hologram apare DOAR în dropdown
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
  const ctx = useContext(NotificationContext);

  if (!ctx) {
    return {
      notifications: [],
      unreadCount: 0,
      markAsRead: () => {},
      deleteNotification: () => {},
      emptyState: {
        image: "/images/bell-icon-hologram.png",
        title: "Missing notifications",
        line1: "Nu ai nicio notificare deocamdată",
        line2: "Te vom informa atunci când se întâmplă ceva important.",
      },
    };
  }

  return ctx;
}
