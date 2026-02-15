"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaGoogle, FaGithub } from "react-icons/fa";

export default function Home() {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
  }, []);

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
        background: dark
          ? "#0f0f0f"
          : "linear-gradient(135deg, #4e73df, #1cc88a)",
        color: dark ? "#fff" : "#fff",
        transition: "0.4s",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 40,
          paddingTop: 40,
        }}
      >
        <div style={{ flex: 1, minWidth: 300 }}>
          <h1 style={{ fontSize: 52, fontWeight: "800", marginBottom: 20 }}>
            Build Your Modern App
          </h1>
          <p style={{ fontSize: 20, opacity: 0.9, maxWidth: 500 }}>
            Autentificare modernă, dashboard enterprise, management utilizatori,
            produse, categorii și funcționalități avansate. Totul într‑un design
            premium.
          </p>

          <div
            style={{
              marginTop: 30,
              width: "100%",
              height: 250,
              borderRadius: 12,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              animation: "slide 12s infinite",
            }}
          ></div>
        </div>

        {/* LOGIN CARD */}
        <div
          style={{
            width: 380,
            background: dark ? "#1a1a1a" : "#fff",
            padding: "40px 35px",
            borderRadius: 12,
            boxShadow: dark
              ? "0 8px 20px rgba(255,255,255,0.1)"
              : "0 8px 20px rgba(0,0,0,0.15)",
            color: dark ? "#fff" : "#1e1e2f",
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
            <div style={inputWrapper(dark)}>
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email"
                style={inputStyle(dark)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={inputWrapper(dark)}>
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                style={inputStyle(dark)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" style={loginBtn}>
              Login
            </button>
          </form>

          <div style={{ marginTop: 20 }}>
            <button style={oauthBtn("#db4437")}>
              <FaGoogle /> Login with Google
            </button>

            <button style={oauthBtn("#333")}>
              <FaGithub /> Login with GitHub
            </button>
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 14,
              opacity: 0.8,
            }}
          >
            Don’t have an account?
            <Link href="/register" style={{ color: "#4e73df", marginLeft: 6 }}>
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* restul paginii rămâne identic */}
    </div>
  );
}

const inputWrapper = (dark: boolean) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: dark ? "#2a2a2a" : "#f1f1f1",
  padding: "12px 14px",
  borderRadius: 8,
});

const inputStyle = (dark: boolean) => ({
  width: "100%",
  border: "none",
  background: "transparent",
  outline: "none",
  fontSize: 15,
  color: dark ? "#fff" : "#000",
});

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

const oauthBtn = (color: string) => ({
  width: "100%",
  background: color,
  color: "#fff",
  padding: "12px 0",
  border: "none",
  borderRadius: 8,
  fontSize: 16,
  fontWeight: "600",
  cursor: "pointer",
  marginTop: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
});
