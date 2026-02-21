import Link from "next/link";
"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/user";

export default function CreateUserPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createUser({ email, name });

    router.push("/dashboard/users");
  }

  return (
    <div>
      <h1>Create User</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
