"use client";

import { BellIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function NotificationSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [chatNotif, setChatNotif] = useState(true);

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

        <button className="px-6 py-2 bg-[#00eaff] text-black rounded hover:bg-[#00c7d1] transition">
          Salvează notificările
        </button>
      </div>
    </div>
  );
}
