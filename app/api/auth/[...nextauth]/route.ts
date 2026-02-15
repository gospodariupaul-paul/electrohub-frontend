async authorize(credentials) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok || !data.user) {
    return null;
  }

  return {
    id: data.user.id,
    email: data.user.email,
    name: data.user.email, // NextAuth cere obligatoriu name
    access_token: data.access_token,
  };
}
