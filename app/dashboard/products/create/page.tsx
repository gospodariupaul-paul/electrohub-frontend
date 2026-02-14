"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/lib/categories";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createCategory({ name });
    router.push("/dashboard/categories");
  }

  return (
    <div>
      <h1>Create Category</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
