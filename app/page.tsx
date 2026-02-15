"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function StartPage() {
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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center text-white px-6">
      
      {/* LOGO */}
      <h1 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
        GOSPO ElectroHub
      </h1>

      <p className="opacity-70 mb-10 text-center max-w-md">
        Platforma inteligentă pentru administrarea magazinului tău.
      </p>

      {/* Dacă ești logat → buton Logout */}
      {session ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg">Salut, {session.user.email}</p>
          <button
            onClick={() => signOut()}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
          >
            Logout
          </button>
        </div>
      ) : (
        /* Dacă NU ești logat → formular Login + Create Account */
        <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/10">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Parola"
              className="p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300"
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
        </div>
      )}
    </main>
  );
}
