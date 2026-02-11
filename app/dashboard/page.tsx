"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ marginBottom: 20 }}>Dashboard</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <a
          href="/dashboard/users"
          style={{
            padding: "10px 14px",
            background: "#0275d8",
            color: "white",
            textDecoration: "none",
            borderRadius: 6,
          }}
        >
          Gestionare utilizatori
        </a>

        <a
          href="/dashboard/products"
          style={{
            padding: "10px 14px",
            background: "#5cb85c",
            color: "white",
            textDecoration: "none",
            borderRadius: 6,
          }}
        >
          Gestionare produse
        </a>

        <a
          href="/dashboard/categories"
          style={{
            padding: "10px 14px",
            background: "#f0ad4e",
            color: "white",
            textDecoration: "none",
            borderRadius: 6,
          }}
        >
          Gestionare categorii
        </a>
      </div>
    </div>
  );
}
