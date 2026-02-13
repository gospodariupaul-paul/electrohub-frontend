"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        setError("Credențiale greșite");
        return;
      }

      const data = await res.json();
      console.log("Login success:", data);

      // Dacă backend-ul trimite token, îl poți salva aici:
      // localStorage.setItem("token", data.token);

      window.location.href = "/dashboard";
    } catch (err) {
      setError("Eroare de server");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: 300 }}
      >
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 8 }}
        />

        <label style={{ marginTop: 10 }}>Parola</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 8 }}
        />

        {error && (
          <p style={{ color: "red", marginTop: 10 }}>{error}</p>
        )}

        <button
          type="submit"
          style={{
            marginTop: 20,
            padding: 10,
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
