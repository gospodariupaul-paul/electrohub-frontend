import Link from "next/link";
export const dynamic = "force-dynamic";

import { getCategory } from "@/lib/categories";

export default async function CategoryDetails({ params }: any) {
  const { id } = params;
  const { data: category } = await getCategory(id);

  return (
    <div>
      <h1>Category Details</h1>

      <p><strong>ID:</strong> {category.id}</p>
      <p><strong>Name:</strong> {category.name}</p>
    </div>
  );
}
