import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function CreateCategoryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Create Category</h1>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: 320,
        }}
      >
        <input
          type="text"
          placeholder="Category name"
          style={{
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: 12,
            background: "#4e73df",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
}
