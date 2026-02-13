export async function getCategories() {
  const res = await fetch("http://localhost:3000/categories");
  return res.json();
}
