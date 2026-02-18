"use client";

import { useState } from "react";

const API_BASE = "https://electrohub-backend.vercel.app";

export default function AddUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // PREVIEW
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("role", role);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setError("A apărut o eroare neașteptată");
        return;
      }

      window.location.href = "/dashboard/users";
    } catch (err) {
      console.error(err);
      setError("A apărut o eroare neașteptată");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-emerald-300">Adaugă user nou</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Nume</label>
          <input
            className="w-full p-2 rounded bg-[#0b0f2a] border border-white/20"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-[#0b0f2a] border border-white/20"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Rol</label>
          <select
            className="w-full p-2 rounded bg-[#0b0f2a] border border-white/20"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Avatar user</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 rounded bg-[#0b0f2a] border border-white/20"
            onChange={handleImageChange}
          />
        </div>

        {preview && (
          <div className="mt-4">
            <p className="mb-2 opacity-70">Preview avatar:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-full border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            />
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.4)] transition"
        >
          Adaugă user
        </button>
      </form>
    </div>
  );
}
