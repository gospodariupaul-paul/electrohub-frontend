"use client";

import Link from "next/link";
import { FaHome, FaUsers, FaBoxOpen, FaTags } from "react-icons/fa";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f2f5" }}>
      
      {/* SIDEBAR */}
      <aside
        style={{
          width: 260,
          background: "#1e1e2f",
          padding: "25px 20px",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <h2 style={{ fontSize: 22, marginBottom: 10 }}>Dashboard</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          
          <SidebarItem href="/dashboard" icon={<FaHome />} label="Home" />
          <SidebarItem href="/dashboard/users" icon={<FaUsers />} label="Users" />
          <SidebarItem href="/dashboard/products" icon={<FaBoxOpen />} label="Products" />
          <SidebarItem href="/dashboard/categories" icon={<FaTags />} label="Categories" />

        </nav>
      </aside>

      {/* CONTENT */}
      <main style={{ flex: 1, padding: 30 }}>{children}</main>
    </div>
  );
}

function SidebarItem({ href, icon, label }: any) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 15px",
        borderRadius: 8,
        textDecoration: "none",
        color: "#fff",
        fontSize: 16,
        transition: "0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#2d2d44")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      {label}
    </Link>
  );
}
