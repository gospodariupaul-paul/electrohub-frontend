"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function HomePage() {
  const { data: session } = useSession();
  const [hover, setHover] = useState(false);

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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND GLOW */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(78,115,223,0.4), transparent)",
          top: -100,
          left: -100,
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(28,200,138,0.4), transparent)",
          bottom: -100,
          right: -100,
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      {/* LOGO */}
      <h1
        style={{
          fontSize: 60,
          fontWeight: 900,
          background: "linear-gradient(135deg, #4e73df, #1cc88a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: 2,
          marginBottom: 20,
          position: "relative",
          zIndex: 2,
          animation: "shine 3s infinite linear",
        }}
      >
        GOSPO ElectroHub
      </h1>

      <p
        style={{
          fontSize: 22,
          opacity: 0.85,
          maxWidth: 650,
          lineHeight: 1.6,
          marginBottom: 40,
          zIndex: 2,
        }}
      >
        Platforma inteligentă pentru administrarea completă a magazinului tău.
        Rapidă. Modernă. Enterprise‑ready.
      </p>

      {/* DEVICE CARDS */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginBottom: 50,
          zIndex: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* iPhone */}
        <div
          style={{
            width: 160,
            height: 300,
            borderRadius: 30,
            background: "linear-gradient(135deg, #1f2937, #111827)",
            border: "2px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "60%",
              height: 6,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 3,
              position: "absolute",
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>

        {/* MacBook */}
        <div
          style={{
            width: 320,
            height: 200,
            borderRadius: 12,
            background: "linear-gradient(135deg, #1f2937, #111827)",
            border: "2px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 12,
              background: "rgba(255,255,255,0.15)",
              borderRadius: "0 0 12px 12px",
              position: "absolute",
              bottom: -12,
            }}
          />
        </div>
      </div>

      {/* AUTH BUTTONS */}
      <div style={{ display: "flex", flexDirection: "column", gap: 15, zIndex: 2 }}>
        {!session && (
          <>
            <a
              href="/login"
              style={{
                padding: "14px 28px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 12,
                color: "#fff",
                fontSize: 18,
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Login
            </a>

            <a
              href="/register"
              style={{
                padding: "14px 28px",
                background: "linear-gradient(135deg, #4e73df, #1cc88a)",
                borderRadius: 12,
                color: "#fff",
                fontSize: 18,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              }}
            >
              Create Account
            </a>

            <button
              onClick={() => signIn("google")}
              style={{
                padding: "14px 28px",
                background: "#db4437",
                borderRadius: 12,
                color: "#fff",
                fontSize: 18,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Login with Google
            </button>

            <button
              onClick={() => signIn("github")}
              style={{
                padding: "14px 28px",
                background: "#333",
                borderRadius: 12,
                color: "#fff",
                fontSize: 18,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Login with GitHub
            </button>
          </>
        )}

        {session && (
          <>
            <a
              href="/dashboard"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                padding: "16px 34px",
                background: hover
                  ? "linear-gradient(135deg, #1cc88a, #4e73df)"
                  : "linear-gradient(135deg, #4e73df, #1cc88a)",
                borderRadius: 14,
                color: "#fff",
                fontSize: 20,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: hover
                  ? "0 8px 25px rgba(0,0,0,0.4)"
                  : "0 4px 15px rgba(0,0,0,0.3)",
                transform: hover ? "scale(1.05)" : "scale(1)",
                transition: "0.25s ease",
              }}
            >
              Intră în Dashboard
            </a>

            <button
              onClick={() => signOut()}
              style={{
                padding: "14px 28px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 12,
                color: "#fff",
                fontSize: 18,
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes shine {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.35); }
          100% { filter: brightness(1); }
        }
      `}</style>
    </main>
  );
}
