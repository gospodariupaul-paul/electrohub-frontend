"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productService } from "@/app/services/productService";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [name, setName] = useState("");

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const data = await productService.getById(id);
        setName(data.name);
      } catch (err) {
        console.error("Eroare la încărcarea produsului:", err);
      }
    }

    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;

    try {
      await productService.update(id, { name });
      router.push("/dashboard/products");
    } catch (err) {
      console.error("Eroare la actualizare:", err);
    }
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
