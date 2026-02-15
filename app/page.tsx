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
    <main className="relative min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">

      {/* Elemente electronice virtuale */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-green-500/20 rounded-full blur-[180px]"></div>
        <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-10 mix-blend-screen"></div>
      </div>

      {/* Conținut */}
      <div className="relative z-10 flex flex-col items-center py-16 px-6">

        {/* Logo */}
        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent drop-shadow-xl">
          GOSPO Electro Hub
        </h1>

        <p className="text-lg opacity-80 mb-12 text-center max-w-2xl">
          Platformă futuristă pentru autentificare, administrare și gestionare inteligentă a magazinului tău electronic.
        </p>

        {/* Secțiune vizuală inspirată din imagine */}
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Ilustrație futuristă */}
            <div className="flex justify-center">
              <div className="w-72 h-72 bg-gradient-to-br from-blue-500 to-green-400 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-20"></div>
                <div className="absolute bottom-4 left-4 text-black font-bold text-xl bg-white/80 px-4 py-2 rounded-xl shadow-lg">
                  Electro Shop
                </div>
              </div>
            </div>

            {/* Formular Login */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Autentificare</h2>

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
          </div>
        </div>

        {/* Footer futurist */}
        <p className="opacity-50 text-sm">
          © 2026 GOSPO Electro Hub — Platformă Futuristă de Autentificare
        </p>
      </div>
    </main>
  );
}
