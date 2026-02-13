"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function EditProductPage({ params }: any) {
  const { id } = params;
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await axios.get(`/products/${id}`);
      setName(res.data.name);
    }
    load();
  }, [id]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    await axios.put(`/products/${id}`, { name });
    router.push("/dashboard/products");
  }

  return (
    <div>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
