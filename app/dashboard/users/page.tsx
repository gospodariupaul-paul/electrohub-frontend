export const dynamic = "force-dynamic";

import { getUsers } from "@/lib/user";

export default async function UsersPage() {
  const { data: users } = await getUsers();

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {users?.map((u: any) => (
          <li key={u.id}>{u.email}</li>
        ))}
      </ul>
    </div>
  );
}
