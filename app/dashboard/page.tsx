import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Dashboard Overview</h1>

      <p>Total Users: 128</p>
      <p>Products: 54</p>
      <p>Categories: 12</p>
      <p>Monthly Sales: 8740 RON</p>
    </div>
  );
}
