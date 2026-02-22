"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    // 🔥 ADMIN LOGIN (NextAuth)
    if (email === "admin@electrohub.com") {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email sau parolă greșită");
        return;
      }

      router.push("/dashboard");
      return;
    }

    // 🔥 USER NORMAL LOGIN (Backend)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Email sau parolă greșită");
        return;
      }

      const data = await res.json();

      // Salvăm token-ul JWT
      localStorage.setItem("token", data.accessToken);

      // 🔥 REDIRECT USER NORMAL PE PAGINA LUI
      router.push(`/user/${data.user.id}`);

    } catch (err) {
      console.error(err);
      setError("Eroare de server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0d14] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#0f131b] p-8 rounded-xl border border-white/10 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Autentificare</h1>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 rounded bg-white/10 border border-white/10 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Parolă</label>
          <input
            type="password"
            name="password"
            className="w-full p-3 rounded bg-white/10 border border-white/10 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-500 py-3 rounded-xl font-semibold"
        >
          Login
        </button>

        <p className="text-center mt-4 text-white/60">
          Nu ai cont?{" "}
          <Link href="/register" className="text-cyan-400 underline">
            Creează cont
          </Link>
        </p>
      </form>
    </div>
  );
}
