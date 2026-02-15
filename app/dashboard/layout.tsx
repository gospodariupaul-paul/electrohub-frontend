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
  FaChevronDown,
  FaPlus,
  FaList,
  FaCog,
} from "react-icons/fa";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0d1117" }}>
      
      {/* SIDEBAR */}
      <aside
        style={{
          width: collapsed ? 80 : 260,
          background: "rgba(17, 25, 40, 0.75)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          color: "#fff",
          padding: "25px 15px",
          display: "flex",
          flexDirection: "column",
          gap: 30,
          transition: "0.25s ease",
          position: "relative",
          boxShadow: "4px 0 20px rgba(0,0,0,0.4)",
          borderRadius: "0 20px 20px 0",
        }}
      >
        {/* COLLAPSE BUTTON */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: "absolute",
            top: 20,
            right: collapsed ? -15 : -20,
            background: "#4e73df",
            border: "none",
            width: 35,
            height: 35,
            borderRadius: "50%",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            transition: "0.25s",
          }}
        >
          <FaChevronLeft
            style={{
              transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.25s",
            }}
          />
        </button>

        {/* LOGO */}
        <div
          style={{
            textAlign: collapsed ? "center" : "left",
            fontSize: collapsed ? 26 : 30,
            fontWeight: 800,
            letterSpacing: 1,
            color: "#4e73df",
            transition: "0.25s",
          }}
        >
          {collapsed ? "EH" : "ElectroHub"}
        </div>

        {/* USER MENU */}
        <div
          style={{
            textAlign: "center",
            opacity: collapsed ? 0 : 1,
            transition: "0.25s",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={() => setUserMenu(!userMenu)}
        >
          {!collapsed && (
            <>
              <img
                src="https://i.pravatar.cc/100"
                alt="avatar"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: "3px solid #4e73df",
                  marginBottom: 10,
                }}
              />
              <h3 style={{ margin: 0, fontSize: 18 }}>Admin Panel</h3>
              <p style={{ margin: 0, opacity: 0.7, fontSize: 14 }}>ElectroHub</p>

              {userMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: 110,
                    left: 0,
                    right: 0,
                    background: "rgba(17, 25, 40, 0.85)",
                    padding: 10,
                    borderRadius: 8,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  }}
                >
                  <DropdownItem icon={<FaUser />} label="Profile" />
                  <DropdownItem icon={<FaCog />} label="Settings" />
                </div>
              )}
            </>
          )}
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.1)" }} />

        {/* NAVIGATION */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <SidebarLink
            href="/dashboard"
            icon={<FaHome />}
            label="Overview"
            active={pathname === "/dashboard"}
            collapsed={collapsed}
          />

          <SidebarLink
            href="/dashboard/users"
            icon={<FaUser />}
            label="Users"
            badge="3"
            active={pathname.startsWith("/dashboard/users")}
            collapsed={collapsed}
          />

          {/* PRODUCTS WITH SUBMENU */}
          <div>
            <SidebarLink
              href="#"
              icon={<FaBox />}
              label="Products"
              active={pathname.startsWith("/dashboard/products")}
              collapsed={collapsed}
              onClick={() => setOpenProducts(!openProducts)}
              arrow={<FaChevronDown style={{ transform: openProducts ? "rotate(180deg)" : "rotate(0deg)", transition: "0.25s" }} />}
            />

            {openProducts && !collapsed && (
              <div style={{ marginLeft: 20, marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                <SubLink href="/dashboard/products/add" icon={<FaPlus />} label="Add Product" />
                <SubLink href="/dashboard/products" icon={<FaList />} label="Product List" />
              </div>
            )}
          </div>

          <SidebarLink
            href="/dashboard/categories"
            icon={<FaTags />}
            label="Categories"
            active={pathname.startsWith("/dashboard/categories")}
            collapsed={collapsed}
          />
        </nav>

        <div style={{ flex: 1 }} />

        {/* LOGOUT */}
        <SidebarLink
          href="/logout"
          icon={<FaSignOutAlt />}
          label="Logout"
          active={false}
          collapsed={collapsed}
          danger
        />
      </aside>

      {/* CONTENT */}
      <main style={{ flex: 1, padding: 40 }}>{children}</main>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  active,
  collapsed,
  danger,
  badge,
  onClick,
  arrow,
}: any) {
  return (
    <div onClick={onClick} style={{ position: "relative" }}>
      <Link
        href={href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: collapsed ? 0 : 12,
          padding: "12px 15px",
          borderRadius: 8,
          textDecoration: "none",
          color: danger ? "#f87171" : "#fff",
          background: active ? "rgba(255,255,255,0.15)" : "transparent",
          transition: "0.25s",
          fontWeight: active ? "600" : "400",
          justifyContent: collapsed ? "center" : "flex-start",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 18 }}>{icon}</span>

        {!collapsed && <span>{label}</span>}

        {!collapsed && arrow && <span style={{ marginLeft: "auto" }}>{arrow}</span>}

        {badge && !collapsed && (
          <span
            style={{
              background: "#ef4444",
              padding: "2px 8px",
              borderRadius: 12,
              fontSize: 12,
              marginLeft: "auto",
            }}
          >
            {badge}
          </span>
        )}
      </Link>
    </div>
  );
}

function SubLink({ href, icon, label }: any) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 6,
        textDecoration: "none",
        color: "#cbd5e1",
        background: "rgba(255,255,255,0.05)",
        transition: "0.2s",
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function DropdownItem({ icon, label }: any) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 6,
        color: "#fff",
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      {icon}
      {label}
    </div>
  );
}
