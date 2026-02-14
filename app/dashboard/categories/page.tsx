import { getCategories } from "@/app/services/categories";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>

      <div className="space-y-2">
        {categories && categories.length > 0 ? (
          categories.map((cat: any) => (
            <div
              key={cat.id}
              className="p-4 border rounded-md bg-white shadow-sm"
            >
              <p className="font-medium">{cat.name}</p>
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
}
