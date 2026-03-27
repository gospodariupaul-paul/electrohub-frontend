"use client";

import Link from "next/link";
import { FiLock, FiUserX, FiShield } from "react-icons/fi";
import axiosInstance from "@/lib/axios";
import { useState, useEffect } from "react";

export default function PrivacySettings() {
  const [blockedUsers, setBlockedUsers] = useState([]);

  const loadBlocked = async () => {
    const res = await axiosInstance.get("/privacy/blocked");
    setBlockedUsers(res.data.blocked);
  };

  useEffect(() => {
    loadBlocked();
  }, []);

  const blockUser = async (id: string) => {
    await axiosInstance.post("/privacy/block", { targetUserId: id });
    loadBlocked();
  };

  const unblockUser = async (id: string) => {
    await axiosInstance.post("/privacy/unblock", { targetUserId: id });
    loadBlocked();
  };

  const handleExport = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/privacy/gdpr/export`;
  };

  const handleDelete = async () => {
    if (!confirm("Ești sigur că vrei să îți ștergi contul?")) return;

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Nu am putut identifica utilizatorul.");
      return;
    }

    // 🔥 RUTA CORECTĂ CĂTRE BACKEND NESTJS
    await axiosInstance.delete(`/users/${userId}`);

    window.location.href = "/logout";
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
        <FiShield className="w-6 h-6 text-[#00eaff]" />
        Confidențialitate
      </h1>

      {/* UTILIZATORI BLOCAȚI */}
      <section className="bg-white/5 p-5 rounded-xl border border-white/10 mb-8">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
          <FiUserX className="text-[#00eaff]" />
          Utilizatori blocați
        </h2>

        {blockedUsers.length === 0 && (
          <p className="text-gray-400">Nu ai utilizatori blocați.</p>
        )}

        {blockedUsers.map((u: any) => (
          <div key={u.id} className="flex justify-between items-center mb-2">
            <span>{u.name}</span>
            <button
              onClick={() => unblockUser(u.id)}
              className="px-3 py-1 bg-red-500 rounded"
            >
              Deblochează
            </button>
          </div>
        ))}

        <button
          onClick={() => blockUser("123")}
          className="mt-4 px-4 py-2 bg-[#00eaff] text-black rounded"
        >
          Blochează utilizator de test
        </button>
      </section>

      {/* GDPR */}
      <section className="bg-white/5 p-5 rounded-xl border border-white/10">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
          <FiLock className="text-[#00eaff]" />
          Date personale (GDPR)
        </h2>

        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-[#00eaff] text-black rounded"
          >
            Exportă datele
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Șterge contul
          </button>
        </div>
      </section>
    </div>
  );
}
