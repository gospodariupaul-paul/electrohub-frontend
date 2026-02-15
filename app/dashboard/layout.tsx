"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    router.push("/login");
    return null;
  }

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

        <Link href="/dashboard" style={linkStyle}>Overview</Link>
        <Link href="/dashboard/users" style={linkStyle}>Users</Link>
        <Link href="/dashboard/products" style={linkStyle}>Products</Link>
        <Link href="/dashboard/categories" style={linkStyle}>Categories</Link>
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
