"use client";

import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 260,
          background: "#f5f5f5",
          padding: 20,
          borderRight: "1px solid #ddd",
          color: "#000",            // text clar
          fontSize: 16,             // font clar
          fontWeight: "500",        // mai lizibil
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Dashboard</h2>

        <ul style={{ marginTop: 20, listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: 12 }}>
            <Link href="/dashboard" style={{ textDecoration: "none", color: "#000" }}>
              Home
            </Link>
          </li>

          <li style={{ marginBottom: 12 }}>
            <Link href="/dashboard/users" style={{ textDecoration: "none", color: "#000" }}>
              Users
            </Link>
          </li>

          <li style={{ marginBottom: 12 }}>
            <Link href="/dashboard/products" style={{ textDecoration: "none", color: "#000" }}>
              Products
            </Link>
          </li>

          <li style={{ marginBottom: 12 }}>
            <Link href="/dashboard/categories" style={{ textDecoration: "none", color: "#000" }}>
              Categories
            </Link>
          </li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: 20 }}>{children}</main>
    </div>
  );
}
