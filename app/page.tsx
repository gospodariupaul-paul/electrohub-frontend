"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaGithub } from "react-icons/fa";

export default function Home() {
  const [dark, setDark] = useState(false);

  // detectează dark mode din sistem
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
  }, []);

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
      {/* HERO + LOGIN */}
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
          animation: "fadeIn 1s ease",
        }}
      >
        {/* TEXT HERO */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <h1 style={{ fontSize: 52, fontWeight: "800", marginBottom: 20 }}>
            Build Your Modern App
          </h1>
          <p style={{ fontSize: 20, opacity: 0.9, maxWidth: 500 }}>
            Autentificare modernă, dashboard enterprise, management utilizatori,
            produse, categorii și funcționalități avansate. Totul într‑un design
            premium.
          </p>

          {/* SLIDER / HERO IMAGE */}
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
            animation: "fadeUp 1s ease",
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

          <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={inputWrapper(dark)}>
              <FaEnvelope />
              <input type="email" placeholder="Email" style={inputStyle(dark)} />
            </div>

            <div style={inputWrapper(dark)}>
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                style={inputStyle(dark)}
              />
            </div>

            <button style={loginBtn}>Login</button>
          </form>

          {/* LOGIN CU GOOGLE / GITHUB */}
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

      {/* ABOUT SECTION */}
      <section style={{ marginTop: 80, textAlign: "center" }}>
        <h2 style={{ fontSize: 36, marginBottom: 20 }}>About the App</h2>
        <p style={{ maxWidth: 800, margin: "0 auto", fontSize: 18, opacity: 0.9 }}>
          Aplicația ta oferă un dashboard enterprise complet, cu management de
          utilizatori, produse, categorii, statistici, grafice și funcționalități
          avansate. Totul într‑un design modern și scalabil.
        </p>
      </section>

      {/* TESTIMONIALE */}
      <section style={{ marginTop: 80 }}>
        <h2 style={{ textAlign: "center", fontSize: 36, marginBottom: 40 }}>
          Testimonials
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 30,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {[
            { name: "Alex", text: "O aplicație incredibil de rapidă și modernă." },
            { name: "Maria", text: "Dashboard-ul este superb și ușor de folosit." },
            { name: "George", text: "Autentificarea funcționează impecabil." },
          ].map((t, i) => (
            <div
              key={i}
              style={{
                background: dark ? "#1a1a1a" : "#fff",
                padding: 25,
                borderRadius: 12,
                boxShadow: dark
                  ? "0 4px 10px rgba(255,255,255,0.1)"
                  : "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ fontSize: 18, marginBottom: 10 }}>"{t.text}"</p>
              <p style={{ opacity: 0.7 }}>— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: 80,
          padding: 30,
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          opacity: 0.8,
        }}
      >
        © 2026 Your Enterprise App — All rights reserved.
      </footer>

      {/* ANIMAȚII CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide {
          0% { background-image: url('https://picsum.photos/1200/600?1'); }
          33% { background-image: url('https://picsum.photos/1200/600?2'); }
          66% { background-image: url('https://picsum.photos/1200/600?3'); }
          100% { background-image: url('https://picsum.photos/1200/600?1'); }
        }
      `}</style>
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
