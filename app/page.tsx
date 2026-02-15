"use client";

import { useState } from "react";

export default function HomePage() {
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

      {/* LOGO GOSPO ELECTRO HUB */}
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
        GOSPO Electro Hub
      </h1>

      {/* SUBTEXT */}
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

      {/* BUTTON WITH MAGNETIC EFFECT */}
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
          zIndex: 2,
        }}
      >
        Intră în Dashboard
      </a>

      {/* KEYFRAMES */}
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
