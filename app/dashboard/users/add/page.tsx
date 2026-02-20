"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";

export default function AddUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    try {
      await axiosInstance.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("User creat cu succes!");

      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error("Eroare la creare user:", err);
      alert("Eroare la creare user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Adaugă user</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Nume user"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
          required
        />

        <input
          type="email"
          placeholder="Email user"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
          required
        />

        <input
          type="password"
          placeholder="Parolă"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <textarea
          placeholder="Descriere user (opțional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full h-24"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded disabled:opacity-50"
        >
          {loading ? "Se încarcă..." : "Creează"}
        </button>
      </form>
    </div>
  );
}
