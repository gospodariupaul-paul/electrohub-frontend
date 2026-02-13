"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    // Șterge token-ul corect
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax;";
    router.push("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 220,
          background: "#f4f4f4",
          padding: 20,
          borderRight: "1px solid #ddd",
        }}
      >
        <h3>ElectroHub</h3>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 20,
          }}
        >
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/users">Users</Link>
          <Link href="/dashboard/products">Products</Link>
          <Link href="/dashboard/categories">Categories</Link>

          <button
            onClick={handleLogout}
            style={{
              marginTop: 20,
              padding: "8px 12px",
              background: "#d9534f",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
