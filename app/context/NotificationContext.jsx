"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState(null);

  const { user } = useUser();
  const API = process.env.NEXT_PUBLIC_API_URL;

  // 🔵 ÎNCARCĂ NOTIFICĂRILE
  const loadNotifications = async () => {
    try {
      const res = await fetch(`${API}/notifications`, {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        setNotifications([]);
        return;
      }

      const data = await res.json();

      // 🔥 NORMALIZARE IMAGINI CORECTĂ
      const normalized = data.map((n) => ({
        ...n,
        images: Array.isArray(n.images)
          ? n.images
          : n.images
          ? [n.images]
          : [],
      }));

      setNotifications(normalized);
    } catch (err) {
      console.error("Eroare notificări:", err);
      setNotifications([]);
    }
  };

  // 🔵 ÎNCARCĂ SETĂRILE — FIXAT COMPLET
  const loadSettings = async () => {
    try {
      const res = await fetch(`${API}/notifications/settings/me`, {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        setSettings(null);
        return;
      }

      let data = null;
      try {
        data = await res.json(); // dacă răspunsul e gol, nu mai crăpă
      } catch {
        data = null;
      }

      setSettings(data);
    } catch (err) {
      console.error("Eroare setări:", err);
      setSettings(null);
    }
  };

  // 🔵 ÎNCARCĂ LA LOGIN
  useEffect(() => {
    if (user?.id) {
      loadNotifications();
      loadSettings();
    }
  }, [user]);

  // 🔵 MARCHEAZĂ CA CITITĂ
  const markAsRead = async (id) => {
    try {
      await fetch(`${API}/notifications/read/${id}`, {
        method: "PATCH",
        credentials: "include",
      });

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Eroare markAsRead:", err);
    }
  };

  // 🔥🔥🔥 ȘTERGEREA REALĂ A NOTIFICĂRII (BACKEND + FRONTEND)
  const deleteNotification = async (id) => {
    try {
      const res = await fetch(`${API}/notifications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Backend nu a șters notificarea!");
        return;
      }

      // 🔥 Șterge din state doar după confirmarea backend-ului
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Eroare deleteNotification:", err);
    }
  };

  // 🔵 NUMĂR NECITITE
  const getUnreadCount = () => {
    return notifications.filter((n) => !n.read).length;
  };

  // 🔵 RETURNARE LISTĂ
  const getUserNotifications = () => {
    return notifications;
  };

  // 🔵 REFRESH MANUAL
  const refreshNotifications = () => {
    if (user?.id) loadNotifications();
  };

  // 🔵 SALVARE SETĂRI
  const saveSettings = async (newSettings) => {
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
  };

  const value = {
    notifications,
    settings,
    saveSettings,
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
