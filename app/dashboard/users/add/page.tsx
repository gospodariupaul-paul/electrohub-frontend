"use client";

import { useState } from "react";
import axiosInstance from "@/axios";

export default function AddUserPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axiosInstance.post("/users", {
      email,
      password,
    });

    alert("User creat!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Adaugă user</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email user"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
        />

        <input
          type="password"
          placeholder="Parolă"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 rounded bg-[#0a0d25] border border-white/10 w-full"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded"
        >
          Creează
        </button>
      </form>
    </div>
  );
}
