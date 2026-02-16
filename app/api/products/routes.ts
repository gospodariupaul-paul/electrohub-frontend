async authorize(credentials) {
  console.log("CREDENTIALS RECEIVED BY NEXTAUTH:", credentials);

  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  const res = await fetch(
    `${process.env.API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  if (!data?.user) return null;

  return {
    id: data.user.id,
    email: data.user.email,
    role: data.user.role,
  };
}
