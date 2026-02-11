import { redirect } from "next/navigation";

export default function Home() {
  // Redirectăm automat către dashboard
  redirect("/dashboard");
}
