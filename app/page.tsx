export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "linear-gradient(135deg, #4e73df, #1cc88a)",
        color: "#fff",
        textAlign: "center",
        padding: 40,
      }}
    >
      <h1 style={{ fontSize: 48, fontWeight: "700", marginBottom: 20 }}>
        Welcome to Your Dashboard
      </h1>

      <p style={{ fontSize: 20, maxWidth: 600, opacity: 0.9 }}>
        Aceasta este pagina principală a aplicației tale. Folosește meniul pentru a naviga
        către Users, Products, Categories și Dashboard Overview.
      </p>
    </div>
  );
}
