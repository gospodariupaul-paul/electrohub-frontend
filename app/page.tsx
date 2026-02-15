"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FuturisticStartPage() {
  const { data: session } = useSession();
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
    <main className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center text-white relative overflow-hidden">

      {/* Efecte futuriste */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Logo */}
      <h1 className="text-6xl font-extrabold mb-4 z-10 tracking-wide drop-shadow-lg bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
        GOSPO ElectroHub
      </h1>

      <p className="text-lg opacity-80 mb-10 z-10 max-w-xl text-center">
        Platformă futuristă pentru administrarea inteligentă a magazinului tău.
      </p>

      {/* Card Login / Logout */}
      <div className="z-10 w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-2xl">

        {session ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-xl font-semibold">
              Bine ai revenit, {session.user.email}
            </p>

            <button
              onClick={() => signOut()}
              className="w-full p-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="p-3 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Parola"
                className="p-3 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-green-500 font-semibold hover:opacity-90 transition"
              >
                Login
              </button>
            </form>

            <button
              onClick={() => router.push("/register")}
              className="mt-4 w-full p-3 rounded-lg bg-white/20 hover:bg-white/30 transition font-semibold"
            >
              Creează cont
            </button>
          </>
        )}
      </div>
    </main>
  );
}
