"use client";

import { BellIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axiosInstance from "@/lib/axios";

export default function NotificationSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [chatNotif, setChatNotif] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      // Trimite setările către backend
      await axiosInstance.post(
        "/notifications/settings",
        {
          email: emailNotif,
          chat: chatNotif,
        },
        { withCredentials: true }
      );

      // Afișează mesaj de succes
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Eroare la salvarea notificărilor:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-white">
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
