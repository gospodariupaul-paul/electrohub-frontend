"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, updateProduct } from "@/app/services/products";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [name, setName] = useState("");

  useEffect(() => {
    if (!id) return;

    async function load() {
      const data = await getProductById(id);
      setName(data.name);
    }

    load();
  }, [id]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!id) return;

    await updateProduct(id, { name });
    router.push("/dashboard/products");
  }

  return (
    <div>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
