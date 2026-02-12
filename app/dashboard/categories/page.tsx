"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/app/services/api";
import { categoryService } from "@/app/services/categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await api.get("/categories");
      setCategories(res.data);
    }
    load();
  }, []);

  async function handleDelete(id: number) {
    await categoryService.deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div>
      <h1>Categories</h1>
      <Link href="/dashboard/categories/create">Add category</Link>

      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            {c.name}
            <button onClick={() => handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
