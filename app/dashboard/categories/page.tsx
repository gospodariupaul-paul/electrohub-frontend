import { getCategories } from "@/app/services/categories";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Categorii</h1>

      <ul className="space-y-2">
        {categories.map((cat: any) => (
          <li key={cat.id} className="p-3 bg-gray-100 rounded">
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
