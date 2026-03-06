"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    email_notifications: false,
    push_notifications: false,
    product_alerts: false,
    message_alerts: false,
    price_alerts: false,
  });

  // 🔥 Încarcă setările utilizatorului
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("https://electrohub-backend-1-10qa.onrender.com/notifications/settings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSettings(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔥 Salvează setările
  const saveSettings = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .post(
        "https://electrohub-backend-1-10qa.onrender.com/notifications/settings",
        settings,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => alert("Setările au fost salvate"))
      .catch(() => alert("Eroare la salvare"));
  };

  const toggle = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return (
      <div className="text-center text-white py-20">
        Se încarcă setările...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050712] text-white px-6 py-10">
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">

        <h1 className="text-2xl font-bold mb-6 text-cyan-400">
          Setări notificări
        </h1>

        <p className="text-white/60 text-sm mb-8">
          Controlează ce notificări dorești să primești în contul tău ElectroHub.
        </p>

        {/* LISTA DE SETĂRI */}
        <div className="space-y-6">

          {[
            { key: "email_notifications", label: "Notificări prin email" },
            { key: "push_notifications", label: "Notificări push" },
            { key: "product_alerts", label: "Alerte produse noi" },
            { key: "message_alerts", label: "Notificări mesaje primite" },
            { key: "price_alerts", label: "Alerte de preț" },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between bg-black/30 border border-white/10 p-4 rounded-xl"
            >
              <span className="text-sm">{item.label}</span>

              {/* TOGGLE SWITCH */}
              <button
                onClick={() => toggle(item.key)}
                className={`w-14 h-7 rounded-full transition relative ${
                  settings[item.key]
                    ? "bg-cyan-500"
                    : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition ${
                    settings[item.key] ? "translate-x-7" : ""
                  }`}
                />
              </button>
            </div>
          ))}

        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveSettings}
          className="mt-8 w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
        >
          Salvează setările
        </button>
      </div>
    </div>
  );
}
