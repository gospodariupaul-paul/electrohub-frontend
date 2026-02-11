"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axios";
import { deleteCategory } from "@/app/services/categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await axios.get("/categories");
      setCategories(res.data);
    }
    load();
  }, []);

  async function handleDelete(id: number) {
    await deleteCategory(id);
    setCategories(categories.filter((c: any) => c.id !== id));
  }

  return (
    <div>
      <h1>Categories</h1>
      <Link href="/dashboard/categories/create">Add category</Link>

      <ul>
        {categories.map((c: any) => (
          <li key={c.id}>
            {c.name}
            <button onClick={() => handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
