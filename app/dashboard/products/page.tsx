import { FaLaptop, FaBoxOpen, FaMobileAlt, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { getProducts } from "@/app/services/products";

export default async function ProductsPage() {
  const products = await getProducts();

  const colors = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"];

  return (
    <div style={{ padding: 30 }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 28 }}>Products</h1>

        <Link
          href="/dashboard/products/add"
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
          <FaPlus /> Add Product
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
        {products.map((prod: any, index: number) => (
          <div
            key={prod.id}
            style={{
              background: colors[index % colors.length],
              padding: 20,
              borderRadius: 12,
              color: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 10 }}>
              {getProductIcon(prod.name)}
            </div>

            <h3 style={{ fontSize: 22, marginBottom: 5 }}>{prod.name}</h3>
            <p style={{ opacity: 0.9 }}>{prod.description || "No description"}</p>
            <p style={{ marginTop: 10, fontWeight: "bold" }}>{prod.price} RON</p>
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
        <h2 style={{ marginBottom: 20 }}>Product List</h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8f9fc", textAlign: "left" }}>
              <th style={thStyle}>Icon</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((prod: any) => (
              <tr key={prod.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{getProductIcon(prod.name)}</td>
                <td style={tdStyle}>{prod.name}</td>
                <td style={tdStyle}>{prod.price} RON</td>
                <td style={tdStyle}>{prod.description}</td>
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

/* ICONIȚE DIFERITE ÎN FUNCȚIE DE PRODUS */
function getProductIcon(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("laptop")) return <FaLaptop />;
  if (lower.includes("phone") || lower.includes("telefon")) return <FaMobileAlt />;
  if (lower.includes("box") || lower.includes("produs")) return <FaBoxOpen />;

  return <FaBoxOpen />;
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
