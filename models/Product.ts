import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "telefoane",
        "laptopuri",
        "smart-home",
        "electrocasnice",
        "audio-video",
      ],
      required: true,
    },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    onOffer: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
