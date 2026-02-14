export const dynamic = "force-dynamic";

import { getUserById } from "@/lib/users";

export default async function UserDetails({ params }: any) {
  const { id } = params;
  const { data: user } = await getUserById(id);

  return (
    <div>
      <h1>User Details</h1>

      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}
