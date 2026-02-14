export const dynamic = "force-dynamic";

import { getCategories } from "@/lib/categories";

export default async function CategoriesPage() {
  const { data: categories } = await getCategories();

  return (
    <div>
      <h1>Categories</h1>

      <ul>
        {categories?.map((c: any) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}

