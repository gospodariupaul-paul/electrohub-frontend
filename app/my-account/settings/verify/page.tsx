"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function VerifyAccountPage() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  // Trimite cod pe email
  const sendEmail = async () => {
    try {
      await axiosInstance.post("/verify/request", { method: "email" });
      setEmailSent(true);
      setMessage("Cod trimis pe email");
    } catch (err) {
      setMessage("Eroare la trimiterea emailului");
    }
  };

  // Trimite cod pe SMS
  const sendSms = async () => {
    try {
      await axiosInstance.post("/verify/request", { method: "phone" });
      setSmsSent(true);
      setMessage("Cod trimis prin SMS");
    } catch (err) {
      setMessage("Eroare la trimiterea SMS-ului");
    }
  };

  // Verifică codul
  const verify = async () => {
    try {
      const res = await axiosInstance.post("/verify/confirm", { code });
      if (res.data.success) {
        setMessage("Cont verificat cu succes!");
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Cod invalid sau expirat");
    }
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

      {/* Butoane trimitere cod */}
      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={sendEmail}
          className="px-6 py-3 bg-[#00aaff] text-black rounded-lg font-semibold hover:bg-[#008fcc]"
        >
          Trimite cod pe email
        </button>

        <button
          onClick={sendSms}
          className="px-6 py-3 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600"
        >
          Trimite cod SMS
        </button>
      </div>

      {/* Input cod */}
      <input
        className="w-full p-3 rounded bg-[#111b21] border border-white/10 text-white"
        placeholder="Codul primit"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={verify}
        className="mt-4 px-6 py-3 bg-[#00aaff] text-black rounded-lg font-semibold hover:bg-[#008fcc]"
      >
        Verifică
      </button>

      {/* Mesaj */}
      <p className="mt-4 text-center text-gray-300">{message}</p>
    </div>
  );
}
