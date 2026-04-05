"use client";

import Link from "next/link";
import { TruckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export default function DeliverySettings() {
  const [form, setForm] = useState({
    preferredCourier: "sameday",
    preferredMethod: "address",
    street: "",
    number: "",
    city: "",
    county: "",
    postalCode: "",
    callBefore: false,
    noSaturday: false,
    cashOnDelivery: false,
    easyboxId: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/delivery-settings/me", { withCredentials: true })
      .then((res) => {
        const data = res.data;

        setForm({
          preferredCourier: data.preferredCourier || "sameday",
          preferredMethod: data.preferredMethod || "address",
          street: data.street || "",
          number: data.number || "",
          city: data.city || "",
          county: data.county || "",
          postalCode: data.postalCode || "",
          callBefore: data.callBefore ?? false,
          noSaturday: data.noSaturday ?? false,
          cashOnDelivery: data.cashOnDelivery ?? false,
          easyboxId: data.easyboxId || "",
        });
      })
      .catch((err) => console.error("Eroare la încărcare:", err));
  }, []);

  const handleSave = async () => {
    try {
      await axiosInstance.patch(
        "/delivery-settings/me",
        {
          preferredCourier: form.preferredCourier,
          preferredMethod: form.preferredMethod,
          street: form.street,
          number: form.number,
          city: form.city,
          county: form.county,
          postalCode: form.postalCode,
          callBefore: form.callBefore,
          noSaturday: form.noSaturday,
          cashOnDelivery: form.cashOnDelivery,
          easyboxId: form.easyboxId,
        },
        { withCredentials: true }
      );

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Eroare la salvare:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-white">
      <Link
        href="/my-account/settings"
        className="inline-block mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
      >
        ← Înapoi la setări
      </Link>

      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <TruckIcon className="w-6 h-6 text-[#00eaff]" />
        Setări livrare
      </h1>

      <div className="space-y-6">
        {/* Curier preferat */}
        <div>
          <label className="block mb-2 text-gray-300">Curier preferat</label>

          <select
            value={form.preferredCourier}
            onChange={(e) =>
              setForm({ ...form, preferredCourier: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
          >
            <option className="text-black" value="sameday">Sameday</option>
            <option className="text-black" value="fan">Fan Courier</option>
            <option className="text-black" value="dpd">DPD</option>
            <option className="text-black" value="gls">GLS</option>
            <option className="text-black" value="cargus">Cargus</option>
            <option className="text-black" value="nemo">Nemo Express</option>
            <option className="text-black" value="posta">Poșta Română</option>
            <option className="text-black" value="easybox">EasyBox (locker)</option>
            <option className="text-black" value="sameday-box">SameDay Box</option>
            <option className="text-black" value="pickup">Ridicare personală</option>
          </select>
        </div>

        {/* Stradă */}
        <div>
          <label className="block mb-2 text-gray-300">Stradă</label>
          <input
            type="text"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
          />
        </div>

        {/* Număr */}
        <div>
          <label className="block mb-2 text-gray-300">Număr</label>
          <input
            type="text"
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
          />
        </div>

        {/* Oraș */}
        <div>
          <label className="block mb-2 text-gray-300">Oraș</label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
          />
        </div>

        {/* Județ */}
        <div>
          <label className="block mb-2 text-gray-300">Județ</label>
          <input
            type="text"
            value={form.county}
            onChange={(e) => setForm({ ...form, county: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
          />
        </div>

        {/* Cod poștal */}
        <div>
          <label className="block mb-2 text-gray-300">Cod poștal</label>
          <input
            type="text"
            value={form.postalCode}
            onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-[#00eaff] text-black rounded hover:bg-[#00c7d1] transition"
        >
          Salvează setările
        </button>

        {saved && (
          <p className="text-green-400 mt-3">
            ✔ Setările de livrare au fost salvate cu succes!
          </p>
        )}
      </div>
    </div>
  );
}
