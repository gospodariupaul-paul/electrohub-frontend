"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: any) => {
    e.preventDefault();

    if (name.length < 3) {
      setError("Numele trebuie să aibă minim 3 caractere");
      return;
    }

    if (!email.includes("@")) {
      setError("Email invalid");
      return;
    }

    if (password.length < 6) {
      setError("Parola trebuie să aibă minim 6 caractere");
      return;
    }

    setError("");
    alert("Cont creat cu succes! (mock)");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #4e73df, #1cc88a)",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          padding: "40px 35px",
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 25,
            fontSize: 28,
            fontWeight: "700",
            color: "#1e1e2f",
          }}
        >
          Create Account
        </h2>

        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div>
            <label style={labelStyle}>Name</label>
            <div style={inputWrapper}>
              <FaUser style={{ opacity: 0.7 }} />
              <input
                type="text"
                placeholder="Your name"
                style={inputStyle}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <div style={inputWrapper}>
              <FaEnvelope style={{ opacity: 0.7 }} />
              <input
                type="email"
                placeholder="you@example.com"
                style={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <div style={inputWrapper}>
              <FaLock style={{ opacity: 0.7 }} />
              <input
                type="password"
                placeholder="••••••••"
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p style={{ color: "red", fontSize: 14, marginTop: -10 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              background: "#1cc88a",
              color: "#fff",
              padding: "12px 0",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 14,
            color: "#555",
          }}
        >
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#4e73df" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontSize: 14,
  fontWeight: "600",
  color: "#333",
};

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
};
