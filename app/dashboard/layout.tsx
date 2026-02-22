"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import {
  FaUser,
  FaBox,
  FaTags,
  FaHome,
  FaSignOutAlt,
  FaChevronLeft,
  FaCog,
  FaChartLine,
} from "react-icons/fa";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (loading) return;

    const token = localStorage.getItem("token");

    // dacă nu e logat → login
    if (!token || !user) {
      router.push("/login");
      return;
    }

    // 🔥 AICI ESTE FIX-UL IMPORTANT
    // dacă userul NU este admin → trimite-l în contul lui
    if (user.role !== "admin") {
      router.push("/my-account/profile");
      return;
    }

  }, [loading, user]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Se încarcă...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#020312] text-white">
      {/* SIDEBAR */}
      <aside
        className={`relative flex flex-col transition-all duration-300 border-r border-cyan-500/30 bg-[#05071a]/80 backdrop-blur-xl`}
        style={{
          width: collapsed ? 80 : 260,
          padding: "25px 15px",
        }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-4 right-[-15px] bg-cyan-600 hover:bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
        >
          <FaChevronLeft className={`transition ${collapsed ? "rotate-180" : ""}`} />
        </button>

        <div className="mt-10 flex flex-col gap-3">
          <SidebarLink href="/dashboard" icon={<FaChartLine />} label="Dashboard" collapsed={collapsed} />
          <SidebarLink href="/dashboard/products" icon={<FaBox />} label="Products" collapsed={collapsed} />
          <SidebarLink href="/dashboard/categories" icon={<FaTags />} label="Categories" collapsed={collapsed} />
          <SidebarLink href="/dashboard/users" icon={<FaUser />} label="Users" collapsed={collapsed} />
          <SidebarLink href="/dashboard/settings" icon={<FaCog />} label="Settings" collapsed={collapsed} />
        </div>

        <div className="flex-1" />

        <SidebarLink href="/logout" icon={<FaSignOutAlt />} label="Logout" collapsed={collapsed} danger={true} />
      </aside>

      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}

function SidebarLink({ href, icon, label, collapsed, danger = false }: any) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
        hover:bg-white/10
        ${danger ? "text-red-400 hover:bg-red-500/20" : "text-white"}
      `}
      style={{ justifyContent: collapsed ? "center" : "flex-start" }}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span className="tracking-wide">{label}</span>}
    </Link>
  );
}
