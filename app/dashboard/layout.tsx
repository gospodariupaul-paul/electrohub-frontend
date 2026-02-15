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
          width: 220,
          background: "#f5f5f5",
          padding: 20,
          borderRight: "1px solid #ddd",
        }}
      >
        <h2>Dashboard</h2>

        <ul style={{ marginTop: 20, listStyle: "none", padding: 0 }}>
          <li>
            <Link href="/dashboard">Home</Link>
          </li>
          <li>
            <Link href="/dashboard/users">Users</Link>
          </li>
          <li>
            <Link href="/dashboard/products">Products</Link>
          </li>
          <li>
            <Link href="/dashboard/categories">Categories</Link>
          </li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: 20 }}>{children}</main>
    </div>
  );
}
