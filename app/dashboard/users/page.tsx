import { getUsers } from "@/app/services/users";
import UsersClient from "./UsersClient";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Users</h1>
      <UsersClient users={users} />
    </div>
  );
}
