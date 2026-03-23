"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useUser } from "@/app/context/UserContext";

// 🔥 Importăm iconițele
import { FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

// 🔥 Importăm NextAuth pentru Google Login
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, reloadUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const user = res.data.user;
      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      reloadUser();

      if (user.role === "admin") {
        router.push("/dashboard");
        return;
      }

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

        {/* 🔵 CONTINUĂ CU */}
        <div className="space-y-3 mb-6">

          <button
            type="button"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition flex items-center justify-center gap-3"
          >
            <FaFacebook size={22} />
            Continuă cu Facebook
          </button>

          <button
            type="button"
            className="w-full py-3 bg-black hover:bg-gray-900 rounded-lg font-semibold transition flex items-center justify-center gap-3"
          >
            <FaApple size={22} />
            Continuă cu Apple
          </button>

          {/* 🔥 BUTON GOOGLE LOGIN (MODIFICAT CORECT) */}
          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold transition flex items-center justify-center gap-3"
          >
            <FcGoogle size={22} />
            Continuă cu Google
          </button>

        </div>

        <div className="text-center text-sm opacity-70 mb-4">
          Intră în cont sau Creează un cont
        </div>

        {/* 🔵 EMAIL */}
        <label className="block mb-3">
          <span className="text-sm opacity-80">Adresa ta de e-mail</span>
          <input
            type="email"
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {email.length === 0 && (
            <span className="text-xs text-red-400">Lipsește e-mail-ul tău</span>
          )}
        </label>

        {/* 🔵 PAROLA */}
        <label className="block mb-6">
          <span className="text-sm opacity-80">Parola</span>
          <input
            type="password"
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {password.length > 0 && password.length < 6 && (
            <span className="text-xs text-red-400">
              Sigur asta e parola corectă? E prea scurtă
            </span>
          )}
        </label>

        <div className="text-right mb-4">
          <a href="/forgot-password" className="text-sm text-cyan-400 hover:underline">
            Ai uitat parola?
          </a>
        </div>

        {/* 🔵 BUTON LOGIN */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold transition"
        >
          {loading ? "Se autentifică..." : "Intră în cont"}
        </button>

        <p className="text-xs text-center opacity-60 mt-4">
          Intrând în cont, accepți Termenii si Conditiile site-ului nostru
        </p>
      </form>
    </div>
  );
}
