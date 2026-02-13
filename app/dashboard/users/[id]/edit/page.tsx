"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState<any>({
    name: "",
    email: "",
  });

  useEffect(() => {
    // DEMO — înlocuiești cu API-ul tău real
    setUser({
      name: "User Demo",
      email: "demo@example.com",
    });
  }, [id]);

  function handleChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    // aici vei pune updateUser(id, user)
    console.log("Saving user:", user);

    router.push(`/dashboard/users/${id}`);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit User #{id}</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: 300 }}
      >
        <label style={{ marginTop: 10 }}>Name</label>
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          style={{ padding: 8 }}
        />

        <label style={{ marginTop: 10 }}>Email</label>
        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          style={{ padding: 8 }}
        />

        <button
          type="submit"
          style={{
            marginTop: 20,
            padding: 10,
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}
