"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaUser,
  FaBox,
  FaTags,
  FaHome,
  FaSignOutAlt,
  FaChevronLeft,
  FaCog,
} from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0d1117] text-white">

      {/* SIDEBAR */}
      <aside
        className="relative flex flex-col transition-all duration-300"
        style={{
          width: collapsed ? 80 : 260,
          background: "rgba(17, 25, 40, 0.75)",
          backdropFilter: "blur(18px)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          padding: "25px 15px",
        }}
      >
        {/* COLLAPSE BUTTON */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-4 right-[-15px] bg-cyan-600 hover:bg-cyan-500 text-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition"
        >
          <FaChevronLeft
            className={`transition ${collapsed ? "rotate-180" : ""}`}
          />
        </button>

        {/* LOGO */}
        <div
          className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 transition text-center ${
            collapsed ? "text-xl" : "text-2xl"
          }`}
        >
          {collapsed ? "GEH" : "GOSPO Electro Hub"}
        </div>

        {/* NAVIGATION */}
        <div className="mt-10 flex flex-col gap-3">
          <SidebarLink
            href="/dashboard"
            icon={<FaHome />}
            label="Overview"
            active={pathname === "/dashboard"}
            collapsed={collapsed}
          />

          <SidebarLink
            href="/dashboard/products"
            icon={<FaBox />}
            label="Products"
            active={pathname.startsWith("/dashboard/products")}
            collapsed={collapsed}
          />

          <SidebarLink
            href="/dashboard/categories"
            icon={<FaTags />}
            label="Categories"
            active={pathname.startsWith("/dashboard/categories")}
            collapsed={collapsed}
          />

          <SidebarLink
            href="/dashboard/users"
            icon={<FaUser />}
            label="Users"
            active={pathname.startsWith("/dashboard/users")}
            collapsed={collapsed}
          />

          <SidebarLink
            href="/dashboard/settings"
            icon={<FaCog />}
            label="Settings"
            active={pathname.startsWith("/dashboard/settings")}
            collapsed={collapsed}
          />
        </div>

        <div className="flex-1" />

        {/* LOGOUT */}
        <SidebarLink
          href="/logout"
          icon={<FaSignOutAlt />}
          label="Logout"
          collapsed={collapsed}
          danger={true}
        />
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}

function SidebarLink({ href, icon, label, active, collapsed, danger = false }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
        active ? "bg-white/20 font-semibold" : "hover:bg-white/10"
      } ${danger ? "text-red-400" : "text-white"}`}
      style={{ justifyContent: collapsed ? "center" : "flex-start" }}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
