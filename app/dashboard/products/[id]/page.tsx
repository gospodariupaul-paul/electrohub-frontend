export const dynamic = "force-dynamic";

import { getProduct } from "@/lib/products";

export default async function ProductDetails({ params }: any) {
  const { id } = params;
  const { data: product } = await getProduct(id);

  return (
    <div>
      <h1>Product Details</h1>

      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Price:</strong> {product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
    </div>
  );
}
