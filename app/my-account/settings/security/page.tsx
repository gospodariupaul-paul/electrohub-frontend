"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function SecuritySettingsPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError("Parola nouă trebuie să aibă cel puțin 6 caractere.");
      return;
    }

    try {
      await axiosInstance.post(
        "/auth/change-password",
        {
          currentPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      setSuccess("Parola a fost schimbată cu succes.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "A apărut o eroare. Încearcă din nou."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0b141a] text-white p-6">

      <button
        onClick={() => router.push("/my-account/settings")}
        className="mb-6 px-4 py-2 bg-[#00aaff] text-black rounded-lg font-semibold hover:bg-[#008fcc] transition"
      >
        ← Înapoi la setări
      </button>

      <h1 className="text-2xl font-bold mb-6">Securitate</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#111b21] p-6 rounded-lg border border-white/10 max-w-md"
      >
        <label className="block mb-4">
          <span className="text-gray-300">Parola actuală</span>
          <input
            type="password"
            className="w-full mt-1 p-2 rounded bg-[#0b141a] border border-white/20"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-300">Parola nouă</span>
          <input
            type="password"
            className="w-full mt-1 p-2 rounded bg-[#0b141a] border border-white/20"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="text-red-400 mb-3">{error}</p>}
        {success && <p className="text-green-400 mb-3">{success}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-[#00aaff] text-black font-semibold rounded hover:bg-[#008fcc] transition"
        >
          Schimbă parola
        </button>
      </form>
    </div>
  );
}
