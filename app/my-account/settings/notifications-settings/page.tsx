"use client";

import { BellIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function NotificationSettings() {
  const router = useRouter();

  const [emailNotif, setEmailNotif] = useState(false);
  const [chatNotif, setChatNotif] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load settings from backend
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await axiosInstance.get("/notifications/settings/me", {
          withCredentials: true,
        });

        setEmailNotif(res.data.emailNotifications);
        setChatNotif(res.data.chatNotifications);
      } catch (err) {
        console.error("Eroare la încărcarea setărilor:", err);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      await axiosInstance.post(
        "/notifications/settings",
        {
          emailNotifications: emailNotif,
          chatNotifications: chatNotif,
        },
        { withCredentials: true }
      );

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Eroare la salvarea notificărilor:", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-white">
        Se încarcă setările...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-white">

      {/* Back button */}
      <button
        onClick={() => router.push("/my-acount/settings")}
        className="text-[#00eaff] hover:underline mb-6 flex items-center gap-2"
      >
        ← Înapoi la setări
      </button>

      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <BellIcon className="w-6 h-6 text-[#00eaff]" />
        Notificări
      </h1>

      <div className="space-y-6">

        {/* EMAIL */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
            className="w-5 h-5"
          />
          Notificări prin email
        </label>

        {/* CHAT */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={chatNotif}
            onChange={() => setChatNotif(!chatNotif)}
            className="w-5 h-5"
          />
          Notificări pentru mesaje / chat
        </label>

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-[#00eaff] text-black rounded hover:bg-[#00c7d1] transition"
        >
          Salvează notificările
        </button>

        {saved && (
          <p className="text-green-400 mt-3">
            ✔ Setările au fost salvate cu succes!
          </p>
        )}
      </div>
    </div>
  );
}
