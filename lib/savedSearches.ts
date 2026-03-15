export async function saveSearch(query: string, filters: any) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/saved-searches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, filters }),
  });

  if (!res.ok) {
    console.error("Eroare la salvarea căutării");
    return;
  }

  return await res.json();
}

export async function deleteSearch(id: number) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/saved-searches/" + id,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    console.error("Eroare la ștergerea căutării");
    return;
  }

  return await res.json();
}

export async function deleteAllSearches() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/saved-searches", {
    method: "DELETE",
  });

  if (!res.ok) {
    console.error("Eroare la ștergerea tuturor căutărilor");
    return;
  }

  return await res.json();
}
