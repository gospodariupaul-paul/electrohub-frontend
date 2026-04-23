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
  FaEnvelope,
} from "react-icons/fa";

import { NotificationProvider } from "@/app/context/NotificationContext";
import axiosInstance from "@/lib/axios";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();
  const [collapsed, setCollapsed] = useState(false);

  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (loading) return;

    // 🔥 1. Dacă nu există user → redirect la login
    if (!user) {
      router.push("/login");
      return;
    }

    // 🔥 2. Dacă userul NU este admin → redirect la profil
    if (user.role !== "admin") {
      router.push("/my-account/profile");
      return;
    }

    // 🔥 3. Fetch pentru badge (folosește cookie-ul automat)
    axiosInstance
      .get("/support/admin/pending/count")
      .then((res) => setPendingCount(res.data))
      .catch(() => {});
  }, [loading, user]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Se încarcă...
      </div>
    );
  }

  return (
    <NotificationProvider>
      <div className="flex min-h-screen bg-[#020312] text-white">
        
        {/* SIDEBAR */}
        <aside
          className={`relative flex flex-col transition-all duration-300 border-r border-cyan-500/30 bg-[#05071a]/80 backdrop-blur-xl`}
          style={{
            width: collapsed ? 80 : 260,
            padding: "25px 15px",
          }}
        >
          {/* BUTON COLLAPSE */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute top-4 right-[-15px] bg-cyan-600 hover:bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
          >
            <FaChevronLeft className={`transition ${collapsed ? "rotate-180" : ""}`} />
          </button>

          {/* LOGO */}
          <div className="flex items-center gap-3 mb-10 mt-6 px-2">
            {!collapsed && (
              <span className="text-xl font-bold tracking-wide">
                GOSPO <span className="text-cyan-400">ElectroHub</span>
              </span>
            )}
            {collapsed && (
              <span className="text-2xl font-bold text-cyan-400">G</span>
            )}
          </div>

          {/* LINK HOME */}
          <SidebarLink
            href="/"
            icon={<FaHome />}
            label="Home"
            collapsed={collapsed}
          />

          {/* MENIU DASHBOARD */}
          <div className="mt-6 flex flex-col gap-3">
            <SidebarLink href="/dashboard" icon={<FaChartLine />} label="Dashboard" collapsed={collapsed} />
            <SidebarLink href="/dashboard/products" icon={<FaBox />} label="Products" collapsed={collapsed} />
            <SidebarLink href="/dashboard/categories" icon={<FaTags />} label="Categories" collapsed={collapsed} />
            <SidebarLink href="/dashboard/users" icon={<FaUser />} label="Users" collapsed={collapsed} />

            {/* SUPPORT MESSAGES CU BADGE */}
            <SidebarLink
              href="/dashboard/support"
              icon={<FaEnvelope />}
              label="Support Messages"
              collapsed={collapsed}
              badge={pendingCount}
            />

            <SidebarLink href="/dashboard/settings" icon={<FaCog />} label="Settings" collapsed={collapsed} />
          </div>

          <div className="flex-1" />

          {/* LOGOUT */}
          <SidebarLink href="/logout" icon={<FaSignOutAlt />} label="Logout" collapsed={collapsed} danger={true} />
        </aside>

        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </NotificationProvider>
  );
}

function SidebarLink({ href, icon, label, collapsed, danger = false, badge = 0 }: any) {
  return (
    <Link
      href={href}
      className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
        hover:bg-white/10
        ${danger ? "text-red-400 hover:bg-red-500/20" : "text-white"}
      `}
      style={{ justifyContent: collapsed ? "center" : "flex-start" }}
    >
      <span className="text-lg">{icon}</span>

      {!collapsed && <span className="tracking-wide">{label}</span>}

      {badge > 0 && (
        <span
          className="absolute right-3 top-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full"
        >
          {badge}
        </span>
      )}
    </Link>
  );
}
