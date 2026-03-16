"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { useUser } from "@/app/context/UserContext";

export default function EditProfilePage() {
  const { user, reloadUser } = useUser();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const [birthDate, setBirthDate] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔥 SINCRONIZARE AUTOMATĂ CU USER-UL
  useEffect(() => {
    if (!user) return;

    setFullName(user.name || "");
    setEmail(user.email || "");
    setPhone(user.phone || "");
    setCity(user.city || "");
    setCounty(user.county || "");
    setAddress(user.address || "");
    setGender(user.gender || "");
    setAvatarUrl(user.avatarUrl || "");

    setBirthDate(
      user.birthDate ? user.birthDate.split("T")[0] : ""
    );
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      await axiosInstance.put(`/users/${user.id}`, {
        name: fullName,
        email,
        phone,
        city,
        county,
        address,
        birthDate,
        gender,
        avatarUrl,
      });

      await reloadUser(); // 🔥 Actualizează UserContext

      setSuccess(true);
    } catch (err) {
      console.error("Eroare la salvare:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">

      <h1 className="text-3xl font-bold mb-4">Editare profil</h1>

      {/* 🔙 BUTON ÎNAPOI */}
      <a
        href="/my-account/user-profile"
        className="inline-block mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
      >
        ← Înapoi la profil
      </a>

      <p className="text-gray-400 mb-6">
        Modifică informațiile personale ale contului tău.
      </p>

      {/* Avatar */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Avatar (URL imagine)</label>
        <input
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="https://imagine-avatar.com/avatar.jpg"
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400"
        />
      </div>

      {/* Nume complet */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Nume complet</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Introdu numele"
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemplu@email.com"
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400"
        />
      </div>

      {/* Telefon */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Telefon</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="07xx xxx xxx"
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400"
        />
      </div>

      {/* Localitate */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Localitate</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ex: Iași"
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400"
        />
      </div>

      {/* Județ */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Județ</label>
        <input
          type="text"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
          placeholder="Ex: Iași"
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400"
        />
      </div>

      {/* Adresă */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Adresă</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Strada, număr, bloc, apartament"
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400"
        />
      </div>

      {/* Data nașterii */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Data nașterii</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400"
        />
      </div>

      {/* Gen */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Gen</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-cyan-400"
        >
          <option value="">Selectează</option>
          <option value="Masculin">Masculin</option>
          <option value="Feminin">Feminin</option>
          <option value="Altul">Altul</option>
        </select>
      </div>

      {/* Buton salvare */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Se salvează..." : "Salvează modificările"}
      </button>

      {success && (
        <p className="text-green-400 text-center mt-2">
          Modificările au fost salvate cu succes!
        </p>
      )}
    </div>
  );
}
