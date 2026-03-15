export async function saveSearch(query: string, filters: any) {
  await fetch(process.env.NEXT_PUBLIC_API_URL + "/saved-searches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, filters }),
  });
}
