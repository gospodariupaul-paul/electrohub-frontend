"use client";

import { useState } from "react";
import { FaEnvelope, FaLock, FaGoogle, FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dark, setDark] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

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

      // salvăm token-ul JWT
      localStorage.setItem("token", data.accessToken);
      document.cookie = `token=${data.accessToken}; path=/;`;
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Eroare de server");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        background: dark ? "#1e1e2f" : "#fff",
        padding: "40px 35px",
        borderRadius: 12,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        color: dark ? "#fff" : "#000",
        animation: "fadeIn 0.6s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <h2
        style={{
          textAlign: "center",
          marginBottom: 25,
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        Welcome Back
      </h2>

      {/* DARK MODE SWITCH */}
      <div style={{ textAlign: "right", marginBottom: 15 }}>
        <button
          onClick={() => setDark(!dark)}
          style={{
            background: "transparent",
            border: "1px solid #888",
            padding: "5px 10px",
            borderRadius: 6,
            cursor: "pointer",
            color: dark ? "#fff" : "#000",
          }}
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* EMAIL */}
        <div>
          <label style={labelStyle}>Email</label>
          <div style={inputWrapper(dark)}>
            <FaEnvelope style={{ opacity: 0.7 }} />
            <input
              type="email"
              placeholder="you@example.com"
              style={inputStyle(dark)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label style={labelStyle}>Password</label>
          <div style={inputWrapper(dark)}>
            <FaLock style={{ opacity: 0.7 }} />
            <input
              type="password"
              placeholder="••••••••"
              style={inputStyle(dark)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <p style={{ color: "red", fontSize: 14, marginTop: -10 }}>{error}</p>
        )}

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          style={{
            background: "#4e73df",
            color: "#fff",
            padding: "12px 0",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          Login
        </button>
      </form>

      {/* SOCIAL LOGIN */}
      <div style={{ marginTop: 25 }}>
        <p style={{ textAlign: "center", marginBottom: 10 }}>Or continue with</p>

        <div style={{ display: "flex", gap: 15 }}>
          <button style={socialBtn("#db4437")}>
            <FaGoogle /> Google
          </button>

          <button style={socialBtn("#333")}>
            <FaGithub /> GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontSize: 14,
  fontWeight: "600",
};

const inputWrapper = (dark: boolean) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: dark ? "#2a2a3d" : "#f1f1f1",
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

const socialBtn = (color: string) => ({
  flex: 1,
  background: color,
  color: "#fff",
  padding: "10px 0",
  border: "none",
  borderRadius: 8,
  fontSize: 15,
  fontWeight: "600",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
});
