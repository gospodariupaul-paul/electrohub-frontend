"use client";

import { useState } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

export default function UsersClient({ users }: { users: any[] }) {
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* SEARCH BAR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
          background: "#f1f1f1",
          padding: "10px 14px",
          borderRadius: 8,
        }}
      >
        <FaSearch />
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            width: "100%",
            fontSize: 15,
          }}
        />
      </div>

      {/* TABEL */}
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
          {filtered.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={tdStyle}>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}&background=random&color=fff`}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
              </td>

              <td style={tdStyle}>
                <Link href={`/dashboard/users/${user.id}`} style={{ color: "#4e73df" }}>
                  {user.name}
                </Link>
              </td>

              <td style={tdStyle}>{user.email}</td>

              <td style={tdStyle}>
                <div style={{ display: "flex", gap: 10 }}>
                  <Link href={`/dashboard/users/edit/${user.id}`}>
                    <button style={editBtn}><FaEdit /></button>
                  </Link>

                  <button
                    style={deleteBtn}
                    onClick={() => setSelectedUser(user)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL DELETE */}
      {selectedUser && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3>Delete user?</h3>
            <p>Are you sure you want to delete {selectedUser.name}?</p>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                style={cancelBtn}
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>

              <button
                style={confirmBtn}
                onClick={() => {
                  alert("User deleted (mock)");
                  setSelectedUser(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  padding: "12px 10px",
  fontWeight: "600",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "12px 10px",
};

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

const modalOverlay = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalBox = {
  background: "#fff",
  padding: 30,
  borderRadius: 10,
  width: 350,
  textAlign: "center" as const,
};

const cancelBtn = {
  flex: 1,
  background: "#ccc",
  border: "none",
  padding: 10,
  borderRadius: 6,
  cursor: "pointer",
};

const confirmBtn = {
  flex: 1,
  background: "#e74a3b",
  border: "none",
  padding: 10,
  borderRadius: 6,
  color: "#fff",
  cursor: "pointer",
};
