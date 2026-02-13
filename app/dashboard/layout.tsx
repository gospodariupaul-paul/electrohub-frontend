"use client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 220,
          background: "#f5f5f5",
          padding: 20,
          borderRight: "1px solid #ddd",
        }}
      >
        <h2>Dashboard</h2>
        <ul style={{ marginTop: 20, listStyle: "none", padding: 0 }}>
          <li><a href="/dashboard">Home</a></li>
          <li><a href="/dashboard/users">Users</a></li>
          <li><a href="/dashboard/products">Products</a></li>
          <li><a href="/dashboard/categories">Categories</a></li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: 20 }}>
        {children}
      </main>
    </div>
  );
}
