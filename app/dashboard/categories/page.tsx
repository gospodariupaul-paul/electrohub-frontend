"use client";

import { FaLaptop, FaCogs, FaBox, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { getCategories } from "@/app/services/categories";

export default async function CategoriesPage() {
  const categories = await getCategories();

  // CULORI DIFERITE PENTRU CARDURI
  const colors = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"];

  return (
    <div style={{ padding: 30 }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 28 }}>Categories</h1>

        <Link
          href="/dashboard/categories/add"
          style={{
            background: "#1cc88a",
            padding: "10px 18px",
            borderRadius: 8,
            color: "#fff",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: "600",
          }}
        >
          <FaPlus /> Add Category
        </Link>
      </div>

      {/* CARDURI COLORATE */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
          marginTop: 30,
        }}
      >
        {categories.map((cat: any, index: number) => (
          <div
            key={cat.id}
            style={{
              background: colors[index % colors.length],
              padding: 20,
              borderRadius: 12,
              color: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 10 }}>
              {getCategoryIcon(cat.name)}
            </div>

            <h3 style={{ fontSize: 22, marginBottom: 5 }}>{cat.name}</h3>
            <p style={{ opacity: 0.9 }}>{cat.description || "No description"}</p>
          </div>
        ))}
      </div>

      {/* TABEL PROFESIONAL */}
      <div
        style={{
          marginTop: 40,
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          border: "1px solid #ddd",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Category List</h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8f9fc", textAlign: "left" }}>
              <th style={thStyle}>Icon</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat: any) => (
              <tr key={cat.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{getCategoryIcon(cat.name)}</td>
                <td style={tdStyle}>{cat.name}</td>
                <td style={tdStyle}>{cat.description}</td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button style={editBtn}><FaEdit /></button>
                    <button style={deleteBtn}><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ICONIȚE DIFERITE ÎN FUNCȚIE DE CATEGORIE */
function getCategoryIcon(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("laptop")) return <FaLaptop />;
  if (lower.includes("electronic")) return <FaCogs />;
  if (lower.includes("produs")) return <FaBox />;

  return <FaBox />;
}

/* STILURI TABEL */
const thStyle = {
  padding: "12px 10px",
  fontWeight: "600",
  fontSize: 15,
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "12px 10px",
  fontSize: 15,
};

/* BUTOANE EDIT / DELETE */
const editBtn = {
  background: "#4e73df",
  border: "none",
  padding: 8,
  borderRadius: 6,
  color: "#fff",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#e74a3b",
  border: "none",
  padding: 8,
  borderRadius: 6,
  color: "#fff",
  cursor: "pointer",
};
