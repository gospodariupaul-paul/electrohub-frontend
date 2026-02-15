"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email sau parolă greșită");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center px-6">

      {/* Holograme electronice */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-10 mix-blend-screen"></div>
      </div>

      {/* Conținut */}
      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl">

        {/* Logo */}
        <h1 className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
          GOSPO Electro Hub
        </h1>

        <p className="text-center opacity-80 mb-10 text-lg">
          Autentificare futuristă pentru platforma ta inteligentă.
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 mb-6">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Parola"
            className="p-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-green-500 font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Login Providers */}
        <div className="flex flex-col gap-3">

          <button
            onClick={() => signIn("google")}
            className="p-3 rounded-lg bg-white/20 hover:bg-white/30 transition font-semibold"
          >
            Login cu Google
          </button>

          <button
            onClick={() => signIn("apple")}
            className="p-3 rounded-lg bg-white/20 hover:bg-white/30 transition font-semibold"
          >
            Login cu Apple
          </button>

          <button
            onClick={() => signIn("yahoo")}
            className="p-3 rounded-lg bg-white/20 hover:bg-white/30 transition font-semibold"
          >
            Login cu Yahoo
          </button>

          <button
            onClick={() => router.push("/register")}
            className="p-3 rounded-lg bg-blue-600/40 hover:bg-blue-600/60 transition font-semibold"
          >
            Creează cont
          </button>
        </div>
      </div>
    </main>
  );
}
