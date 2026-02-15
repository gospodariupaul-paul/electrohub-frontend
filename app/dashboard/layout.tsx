import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return <>{children}</>;
}
