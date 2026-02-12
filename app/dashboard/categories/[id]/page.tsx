"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { categoryService } from "@/app/services/categories";

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [name, setName] = useState("");

  useEffect(() => {
    if (!id) return;

    async function load() {
      const data = await categoryService.getCategoryById(id);
      setName(data.name);
    }

    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;

    await categoryService.updateCategory(id, { name });
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
