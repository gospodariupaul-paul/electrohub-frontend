async authorize(credentials) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: credentials?.email,
        password: credentials?.password,
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();

    if (!data || !data.user) return null;

    return {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
    };
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}
