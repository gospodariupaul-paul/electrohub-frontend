import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: null },
    category: { type: String, required: true },
    brand: { type: String, default: null },
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
