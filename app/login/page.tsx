"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      // 🔥 Salvăm token + user în localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔥 Dacă este ADMIN → dashboard
      if (res.data.user.role === "admin") {
        router.push("/dashboard");
        return;
      }

      // 🔥 Dacă este USER NORMAL → my-account
      router.push("/my-account/profile");

    } catch (err) {
      console.error(err);
      alert("Email sau parolă greșită");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020312] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#0a0f2d] p-8 rounded-xl border border-white/10 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Autentificare</h1>

        <label className="block mb-3">
          <span className="text-sm opacity-80">Email</span>
          <input
            type="email"
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm opacity-80">Parola</span>
          <input
            type="password"
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold transition"
        >
          {loading ? "Se autentifică..." : "Autentificare"}
        </button>
      </form>
    </div>
  );
}
