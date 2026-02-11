"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { API } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(API.login, { email, password });

      console.log("LOGIN RESPONSE:", res.data); // DEBUG IMPORTANT

      if (res.status === 200) {
        // Salvăm token-ul în cookie
        document.cookie = `token=${res.data.token}; path=/;`;

        // Redirecționăm către dashboard
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError("Email sau parolă greșită");
      console.error("Login failed", err);
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          style={{ padding: 10, background: "black", color: "white" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
