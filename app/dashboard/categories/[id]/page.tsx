"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCategoryById, updateCategory } from "@/app/services/categories";

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string; // conversie sigură

  const [name, setName] = useState("");

  useEffect(() => {
    if (!id) return; // protecție TS

    async function load() {
      const data = await getCategoryById(id);
      setName(data.name);
    }

    load();
  }, [id]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!id) return;

    await updateCategory(id, { name });
    router.push("/dashboard/categories");
  }

  return (
    <div>
      <h1>Edit Category</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
