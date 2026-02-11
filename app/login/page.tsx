"use client";

import { useState } from "react";
import { authService } from "../services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      // DEBUG — vezi exact ce trimite frontend-ul
      console.log("Trimitem:", email, password);

      const data = await authService.login(email, password);

      // salvăm token-urile
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      setError("");

      // redirect către dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("EROARE LOGIN:", err);
      setError("Email sau parolă greșită");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="Parola"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: 10,
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}
