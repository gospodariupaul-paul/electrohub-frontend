import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Dacă ești logat → mergi în dashboard
  if (session) {
    return (
      <div style={{ padding: 40 }}>
        <h1 style={{ fontSize: 32 }}>Ești deja logat</h1>
        <p style={{ marginTop: 10 }}>Mergi la dashboard:</p>
        <Link href="/dashboard" style={{ color: "#4e73df" }}>
          Go to Dashboard
        </Link>
      </div>
    );
  }

  // Dacă NU ești logat → afișează pagina de start
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32 }}>Bun venit la ElectroHub</h1>
      <p style={{ marginTop: 10 }}>Autentifică-te pentru a continua:</p>
      <Link href="/login" style={{ color: "#4e73df" }}>
        Login
      </Link>
    </div>
  );
}
