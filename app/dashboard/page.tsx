import { FaUser, FaUserTie, FaUserAlt, FaEdit, FaTrash } from "react-icons/fa";
import { getUsers } from "@/app/services/users";

export default async function UsersPage() {
  let users = [];

  try {
    users = await getUsers();
  } catch (err) {
    console.error("Error loading users:", err);
    return (
      <div style={{ padding: 30 }}>
        <h1 style={{ fontSize: 28 }}>Users</h1>
        <p style={{ color: "red", marginTop: 20 }}>
          A apărut o eroare la încărcarea utilizatorilor.
        </p>
      </div>
    );
  }

  const colors = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"];

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Users</h1>

      {/* CARDURI COLORATE */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
          marginBottom: 40,
        }}
      >
        {users.map((user: any, index: number) => (
          <div
            key={user.id}
            style={{
              background: colors[index % colors.length],
              padding: 20,
              borderRadius: 12,
              color: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 10 }}>
              {getUserIcon(user.name)}
            </div>

            <h3 style={{ fontSize: 22, marginBottom: 5 }}>{user.name}</h3>
            <p style={{ opacity: 0.9 }}>{user.email}</p>
          </div>
        ))}
      </div>

      {/* TABEL PROFESIONAL */}
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          border: "1px solid #ddd",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>User List</h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8f9fc" }}>
              <th style={thStyle}>Avatar</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name
                    )}&background=random&color=fff`}
                    alt="avatar"
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                </td>

                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>

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

/* ICONIȚE DIFERITE ÎN FUNCȚIE DE NUME */
function getUserIcon(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("admin")) return <FaUserTie />;
  if (lower.includes("a") || lower.includes("e")) return <FaUserAlt />;

  return <FaUser />;
}

/* STILURI TABEL */
const thStyle = {
  padding: "12px 10px",
  fontWeight: "600",
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
