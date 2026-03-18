"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function VerifyAccountPage() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);

  const sendVerification = async () => {
    await axiosInstance.post("/auth/send-verification", {}, { withCredentials: true });
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen bg-[#0b141a] text-white p-6">
      <button
        onClick={() => router.push("/my-account/settings")}
        className="mb-6 px-4 py-2 bg-[#00aaff] text-black rounded-lg font-semibold hover:bg-[#008fcc]"
      >
        ← Înapoi la setări
      </button>

      <h1 className="text-2xl font-bold mb-6">Verificare cont</h1>

      <p className="text-gray-300 mb-4">
        Verifică emailul sau numărul de telefon pentru siguranță.
      </p>

      {!emailSent ? (
        <button
          onClick={sendVerification}
          className="px-6 py-3 bg-[#00aaff] text-black rounded-lg font-semibold hover:bg-[#008fcc]"
        >
          Trimite email de verificare
        </button>
      ) : (
        <p className="text-green-400">Email trimis! Verifică inbox-ul.</p>
      )}
    </div>
  );
}
