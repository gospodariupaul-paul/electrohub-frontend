"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,   // 🔥 NU MAI REDIRECTEAZĂ NICĂIERI
    });

    if (res?.error) {
      setError("Email sau parolă greșită");
      return;
    }

    // 🔥 LOGIN REUȘIT → mergi în dashboard
    window.location.href = "/dashboard";
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0d1117, #111827)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        padding: 40,
      }}
    >
      <h1
        style={{
          fontSize: 50,
          fontWeight: 900,
          background: "linear-gradient(135deg, #4e73df, #1cc88a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 10,
        }}
      >
        GOSPO ElectroHub
      </h1>

      <p style={{ opacity: 0.8, marginBottom: 40 }}>
        Platforma inteligentă pentru administrarea magazinului tău.
      </p>

      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          width: 300,
        }}
      >
        <input
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontSize: 16,
          }}
        />

        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontSize: 16,
          }}
        />

        {error && (
          <div style={{ color: "#ff6b6b", fontSize: 14 }}>{error}</div>
        )}

        <button
          type="submit"
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            background: "linear-gradient(135deg, #4e73df, #1cc88a)",
            color: "#fff",
            fontSize: 18,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </main>
  );
}
