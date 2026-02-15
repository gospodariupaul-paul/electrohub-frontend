import Link from "next/link";

export default function Home() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* HERO SECTION */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "40px 20px",
          background: "linear-gradient(135deg, #4e73df, #1cc88a)",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: 52, fontWeight: "800", marginBottom: 20 }}>
          Welcome to Your Modern App
        </h1>

        <p style={{ fontSize: 20, maxWidth: 700, opacity: 0.9, marginBottom: 40 }}>
          O aplicație enterprise completă, cu autentificare, dashboard, management de utilizatori,
          produse, categorii și funcționalități avansate. Totul într‑un design modern și profesionist.
        </p>

        <div style={{ display: "flex", gap: 20 }}>
          <Link
            href="/login"
            style={{
              background: "#fff",
              color: "#4e73df",
              padding: "14px 28px",
              borderRadius: 8,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Login
          </Link>

          <Link
            href="/register"
            style={{
              background: "#1cc88a",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: 8,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Create Account
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ padding: "80px 20px", background: "#f8f9fc" }}>
        <h2 style={{ textAlign: "center", fontSize: 36, marginBottom: 40 }}>
          What Your App Offers
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
          <FeatureCard
            title="User Authentication"
            text="Login, register, reset password, social login și protecție pentru rute."
          />
          <FeatureCard
            title="Dashboard Enterprise"
            text="Carduri moderne, grafice, activitate recentă și statistici în timp real."
          />
          <FeatureCard
            title="User Management"
            text="Listă utilizatori, editare, ștergere, avatar, search bar și modal de confirmare."
          />
          <FeatureCard
            title="Products & Categories"
            text="CRUD complet, tabele profesionale, carduri colorate și iconițe."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: 30,
          textAlign: "center",
          background: "#fff",
          borderTop: "1px solid #ddd",
          marginTop: 40,
        }}
      >
        <p style={{ color: "#555" }}>© 2026 Your Enterprise App. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 25,
        borderRadius: 12,
        border: "1px solid #ddd",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ fontSize: 22, marginBottom: 10 }}>{title}</h3>
      <p style={{ color: "#555" }}>{text}</p>
    </div>
  );
}
