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
          width: 260, // lățime mărită ca să nu taie textul
          background: "#f5f5f5",
          padding: 20,
          borderRight: "1px solid #ddd",
        }}
      >
        <h2>Dashboard</h2>

        <ul style={{ marginTop: 20, listStyle: "none", padding: 0 }}>
          <li style={{ whiteSpace: "normal", overflow: "visible", marginBottom: 10 }}>
            <Link href="/dashboard">Home</Link>
          </li>

          <li style={{ whiteSpace: "normal", overflow: "visible", marginBottom: 10 }}>
            <Link href="/dashboard/users">Users</Link>
          </li>

          <li style={{ whiteSpace: "normal", overflow: "visible", marginBottom: 10 }}>
            <Link href="/dashboard/products">Products</Link>
          </li>

          <li style={{ whiteSpace: "normal", overflow: "visible", marginBottom: 10 }}>
            <Link href="/dashboard/categories">Categories</Link>
          </li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: 20 }}>{children}</main>
    </div>
  );
}
