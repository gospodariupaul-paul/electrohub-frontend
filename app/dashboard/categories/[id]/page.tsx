"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCategory, updateCategory } from "@/app/services/categories";

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategory() {
      const data = await getCategory(params.id as string);
      setName(data.name);
      setLoading(false);
    }

    loadCategory();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await updateCategory(params.id as string, { name });
    router.push("/dashboard/categories");
  }

  if (loading) return <p>Loading...</p>;

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
