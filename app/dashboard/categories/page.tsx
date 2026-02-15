export const dynamic = "force-dynamic";

import { getCategories } from "@/app/services/categories";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1>Categories</h1>

      <ul>
        {categories.map((c: any) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
