export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: 240,
          background: "#1e1e2f",
          color: "#fff",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: "bold" }}>Dashboard</h2>

        <a href="/dashboard" style={linkStyle}>Overview</a>
        <a href="/dashboard/users" style={linkStyle}>Users</a>
        <a href="/dashboard/products" style={linkStyle}>Products</a>
        <a href="/dashboard/categories" style={linkStyle}>Categories</a>
      </aside>

      {/* CONTENT */}
      <main style={{ flex: 1, padding: 30 }}>{children}</main>
    </div>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  padding: "10px 0",
  fontSize: 16,
};
