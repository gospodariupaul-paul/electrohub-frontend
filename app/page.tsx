"use client";

import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: any) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Email sau parolă incorecte");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4e73df, #1cc88a)",
        color: "#fff",
        padding: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 50,
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ flex: 1, minWidth: 320 }}>
          <h1 style={{ fontSize: 56, fontWeight: "800", marginBottom: 20 }}>
            Welcome to ElectroHub
          </h1>

          <p style={{ fontSize: 20, opacity: 0.9, maxWidth: 500 }}>
            Platformă modernă pentru administrarea utilizatorilor, produselor și
            categoriilor. Autentificare rapidă, design premium și funcționalități
            avansate.
          </p>

          <div
            style={{
              marginTop: 40,
              width: "100%",
              height: 260,
              borderRadius: 16,
              background:
                "url('https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
            }}
          ></div>
        </div>

        {/* LOGIN CARD */}
        <div
          style={{
            width: 380,
            background: "#fff",
            color: "#1e1e2f",
            padding: "40px 35px",
            borderRadius: 14,
            boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: 25,
              fontSize: 28,
              fontWeight: "700",
            }}
          >
            Login
          </h2>

          {error && (
            <p style={{ color: "red", marginBottom: 10, textAlign: "center" }}>
              {error}
            </p>
          )}

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div style={inputWrapper}>
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email"
                style={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={inputWrapper}>
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" style={loginBtn}>
              Login
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 14,
              opacity: 0.8,
            }}
          >
            Nu ai cont?
            <Link href="/register" style={{ color: "#4e73df", marginLeft: 6 }}>
              Creează unul
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputWrapper = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "#f1f1f1",
  padding: "12px 14px",
  borderRadius: 8,
};

const inputStyle = {
  width: "100%",
  border: "none",
  background: "transparent",
  outline: "none",
  fontSize: 15,
  color: "#000",
};

const loginBtn = {
  background: "#4e73df",
  color: "#fff",
  padding: "12px 0",
  border: "none",
  borderRadius: 8,
  fontSize: 16,
  fontWeight: "600",
  cursor: "pointer",
};
