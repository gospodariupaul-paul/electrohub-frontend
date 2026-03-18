"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

// Funcție pentru puterea parolei
function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length > 6) score++;
  if (password.length > 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export default function SecuritySettingsPage() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const strength = getPasswordStrength(newPassword);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Parolele nu coincid.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Parola nouă trebuie să aibă cel puțin 6 caractere.");
      return;
    }

    setLoading(true);

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
      setConfirmPassword("");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "A apărut o eroare. Încearcă din nou."
      );
    } finally {
      setLoading(false);
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
        {/* Parola actuală */}
        <label className="block mb-4">
          <span className="text-gray-300">Parola actuală</span>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              className="w-full mt-1 p-2 rounded bg-[#0b141a] border border-white/20"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400"
            >
              {showCurrent ? "Ascunde" : "Arată"}
            </button>
          </div>
        </label>

        {/* Parola nouă */}
        <label className="block mb-4">
          <span className="text-gray-300">Parola nouă</span>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              className="w-full mt-1 p-2 rounded bg-[#0b141a] border border-white/20"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400"
            >
              {showNew ? "Ascunde" : "Arată"}
            </button>
          </div>

          {/* Indicator putere parolă */}
          {newPassword && (
            <div className="mt-2">
              <div className="h-2 w-full bg-gray-700 rounded">
                <div
                  className={`h-full rounded transition-all ${
                    strength <= 2
                      ? "bg-red-500 w-1/4"
                      : strength === 3
                      ? "bg-yellow-500 w-2/4"
                      : strength === 4
                      ? "bg-blue-500 w-3/4"
                      : "bg-green-500 w-full"
                  }`}
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Puterea parolei:{" "}
                {strength <= 2
                  ? "Slabă"
                  : strength === 3
                  ? "Mediu"
                  : strength === 4
                  ? "Bună"
                  : "Foarte bună"}
              </p>
            </div>
          )}
        </label>

        {/* Confirmare parolă */}
        <label className="block mb-4">
          <span className="text-gray-300">Confirmă parola nouă</span>
          <input
            type="password"
            className="w-full mt-1 p-2 rounded bg-[#0b141a] border border-white/20"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        {/* Mesaje */}
        {error && <p className="text-red-400 mb-3">{error}</p>}
        {success && <p className="text-green-400 mb-3">{success}</p>}

        {/* Buton */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[#00aaff] text-black font-semibold rounded hover:bg-[#008fcc] transition flex items-center justify-center"
        >
          {loading && (
            <span className="mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          )}
          Schimbă parola
        </button>
      </form>
    </div>
  );
}
