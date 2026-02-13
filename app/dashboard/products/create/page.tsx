"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    await axios.post("/products", { name });
    router.push("/dashboard/products");
  }

  return (
    <div>
      <h1>Create Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
