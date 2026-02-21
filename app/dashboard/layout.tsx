"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  // 🔥 PERMITEM ACCESUL LA DASHBOARD PENTRU:
  // - ADMIN (NextAuth)
  // - USER (JWT token)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!session?.user && !token) {
      router.push("/login");
    }
  }, [session]);

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
        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-4 right-[-15px] bg-cyan-600 hover:bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
        >
          <FaChevronLeft className={`transition ${collapsed ? "rotate-180" : ""}`} />
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center mt-2">
          <div className="h-10 w-10 rounded-full bg-cyan-500 blur-md" />
          <div
            className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mt-2 ${
              collapsed ? "text-xl" : "text-2xl"
            }`}
          >
            {collapsed ? "GEH" : "GOSPO Electro Hub"}
          </div>
          {!collapsed && (
            <p className="text-xs text-white/60 mt-1 tracking-wide">
              AI Control Center
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex flex-col gap-3">
          <SidebarLink href="/" icon={<FaHome />} label="Back to Home" active={false} collapsed={collapsed} />
          <SidebarLink href="/dashboard" icon={<FaChartLine />} label="Dashboard" active={pathname === "/dashboard"} collapsed={collapsed} />
          <SidebarLink href="/dashboard/products" icon={<FaBox />} label="Products" active={pathname.startsWith("/dashboard/products")} collapsed={collapsed} />
          <SidebarLink href="/dashboard/categories" icon={<FaTags />} label="Categories" active={pathname.startsWith("/dashboard/categories")} collapsed={collapsed} />
          <SidebarLink href="/dashboard/users" icon={<FaUser />} label="Users" active={pathname.startsWith("/dashboard/users")} collapsed={collapsed} />
          <SidebarLink href="/dashboard/settings" icon={<FaCog />} label="Settings" active={pathname.startsWith("/dashboard/settings")} collapsed={collapsed} />
        </div>

        <div className="flex-1" />

        {/* Logout */}
        <SidebarLink href="/logout" icon={<FaSignOutAlt />} label="Logout" collapsed={collapsed} danger={true} />
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}

/* SIDEBAR LINK COMPONENT */
function SidebarLink({
  href,
  icon,
  label,
  active = false,
  collapsed,
  danger = false,
}: {
  href: string;
  icon: any;
  label: string;
  active?: boolean;
  collapsed: boolean;
  danger?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
        ${active ? "bg-cyan-600/30 border border-cyan-400/40" : "hover:bg-white/10"}
        ${danger ? "text-red-400 hover:bg-red-500/20" : "text-white"}
      `}
      style={{ justifyContent: collapsed ? "center" : "flex-start" }}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span className="tracking-wide">{label}</span>}
    </Link>
  );
}
