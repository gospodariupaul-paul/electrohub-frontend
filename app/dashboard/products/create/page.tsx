"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/services/products";

export default function CreateProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    await createProduct({ name });
    router.push("/dashboard/products");
  }

  return (
    <div>
      <h1>Create Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
