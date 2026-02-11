"use client";

import { useEffect, useState } from "react";
import { productService } from "../services/productService";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    productService.getAll().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {products.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.price} lei</p>
        </div>
      ))}
    </div>
  );
}
