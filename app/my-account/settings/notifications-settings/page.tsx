"use client";

import { BellIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function NotificationSettings() {
  const router = useRouter();

  const [emailNotif, setEmailNotif] = useState(false);
  const [pushNotif, setPushNotif] = useState(false);
  const [productAlerts, setProductAlerts] = useState(false);
  const [chatNotif, setChatNotif] = useState(false);
  const [priceAlerts, setPriceAlerts] = useState(false);

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load settings from backend
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await axiosInstance.get("/notifications/settings/me", {
          withCredentials: true,
        });

        setEmailNotif(res.data.email_notifications ?? false);
        setPushNotif(res.data.push_notifications ?? false);
        setProductAlerts(res.data.product_alerts ?? false);
        setChatNotif(res.data.message_alerts ?? false);
        setPriceAlerts(res.data.price_alerts ?? false);

      } catch (err) {
        console.error("Eroare la încărcarea setărilor:", err);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  // Save settings
  const handleSave = async () => {
    try {
      await axiosInstance.post(
        "/notifications/settings",
        {
          email_notifications: emailNotif,
          push_notifications: pushNotif,
          product_alerts: productAlerts,
          message_alerts: chatNotif,
          price_alerts: priceAlerts,
        },
        { withCredentials: true }
      );

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Eroare la salvarea notificărilor:", err.response?.data || err);
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
        onClick={() => router.push("/my-account/settings")}
        className="flex items-center gap-2 text-[#00eaff] hover:text-[#00c7d1] transition mb-6"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Înapoi la setări
      </button>

      {/* Card */}
      <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6 shadow-lg">

        {/* Title */}
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <BellIcon className="w-8 h-8 text-[#00eaff]" />
          Notificări
        </h1>

        <p className="text-gray-400 mb-8">
          Controlează modul în care primești notificări despre activitatea contului tău.
        </p>

        <div className="space-y-8">

          {/* EMAIL */}
          <SettingToggle
            title="Notificări prin email"
            description="Primești emailuri despre activitatea contului."
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
          />

          {/* PUSH */}
          <SettingToggle
            title="Notificări push"
            description="Primești notificări direct pe dispozitiv."
            checked={pushNotif}
            onChange={() => setPushNotif(!pushNotif)}
          />

          {/* PRODUCT ALERTS */}
          <SettingToggle
            title="Alerte produse"
            description="Primești notificări când apar produse noi sau actualizări."
            checked={productAlerts}
            onChange={() => setProductAlerts(!productAlerts)}
          />

          {/* CHAT */}
          <SettingToggle
            title="Notificări pentru mesaje / chat"
            description="Primești notificări când cineva îți trimite un mesaj."
            checked={chatNotif}
            onChange={() => setChatNotif(!chatNotif)}
          />

          {/* PRICE ALERTS */}
          <SettingToggle
            title="Alerte de preț"
            description="Primești notificări când prețurile produselor scad."
            checked={priceAlerts}
            onChange={() => setPriceAlerts(!priceAlerts)}
          />

          {/* Save button */}
          <button
            onClick={handleSave}
            className="w-full mt-6 py-3 bg-[#00eaff] text-black font-semibold rounded-lg hover:bg-[#00c7d1] transition"
          >
            Salvează notificările
          </button>

          {saved && (
            <p className="text-green-400 mt-3 text-center">
              ✔ Setările au fost salvate cu succes!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable toggle component */
function SettingToggle({ title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-12 h-6 bg-gray-600 peer-focus:ring-2 peer-focus:ring-[#00eaff] rounded-full peer peer-checked:bg-[#00eaff] transition"></div>
      </label>
    </div>
  );
}
