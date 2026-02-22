"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      // token-ul este deja salvat de axiosInstance
      setUser(res.data.user);

      router.push("/my-account/profile");
    } catch (err) {
      alert("Email sau parolă greșită");
    }
  };

  return (
    <div className="p-6 text-white max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-black/30 border border-white/20 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Parola"
          className="w-full p-3 bg-black/30 border border-white/20 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full py-3 bg-cyan-600 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
