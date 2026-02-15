"use client";

import { useState } from "react";
import Link from "next/link";

export default function CategoriesPage() {
  const [sort, setSort] = useState("newest");
  const [filterPrice, setFilterPrice] = useState("all");

  const categories = [
    { name: "Electronice", slug: "electronice" },
    { name: "Telefoane", slug: "telefoane" },
    { name: "Laptopuri", slug: "laptopuri" },
    { name: "Accesorii", slug: "accesorii" },
    { name: "Electrocasnice", slug: "electrocasnice" },
  ];

  const products = [
    {
      id: 1,
      name: "Telefon X Pro 2026",
      price: 2999,
      stock: "În stoc",
      rating: 5,
      image: "/placeholder-product.jpg",
    },
    {
      id: 2,
      name: "Laptop UltraTech 15",
      price: 4999,
      stock: "Stoc limitat",
      rating: 4,
      image: "/placeholder2.jpg",
    },
    {
      id: 3,
      name: "Căști Wireless Pro",
      price: 499,
      stock: "În stoc",
      rating: 5,
      image: "/placeholder3.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 p-10">

      {/* BREADCRUMB */}
      <nav className="text-xs opacity-70 mb-4">
        <Link href="/">Acasă</Link> {" > "}
        <span className="font-semibold">Categorii</span>
      </nav>

      {/* TITLU SEO */}
      <h1 className="text-3xl font-bold mb-2">Categorii Produse</h1>

      {/* DESCRIERE SEO */}
      <p className="text-sm opacity-70 max-w-2xl mb-8">
        Explorează toate categoriile disponibile în magazinul tău tehnic. 
        Produse premium, livrare rapidă și garanție extinsă. 
        Alege categoria potrivită pentru nevoile tale.
      </p>

      {/* SUBCATEGORII */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Subcategorii</h2>

        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/dashboard/categories/${cat.slug}`}
              className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm hover:bg-gray-200 transition"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* FILTRE + SORTARE */}
      <section className="flex flex-wrap items-center justify-between mb-6 gap-4">

        {/* FILTRU PREȚ */}
        <select
          className="p-2 border border-gray-300 rounded-lg text-sm bg-white"
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
        >
          <option value="all">Toate prețurile</option>
          <option value="0-500">0 - 500 lei</option>
          <option value="500-2000">500 - 2000 lei</option>
          <option value="2000-5000">2000 - 5000 lei</option>
        </select>

        {/* SORTARE */}
        <select
          className="p-2 border border-gray-300 rounded-lg text-sm bg-white"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Cele mai noi</option>
          <option value="price-asc">Preț crescător</option>
          <option value="price-desc">Preț descrescător</option>
          <option value="rating">Rating</option>
        </select>
      </section>

      {/* GRID PRODUSE */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Produse</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-gray-100 border border-gray-300 rounded-xl p-4 shadow-sm"
            >
              {/* IMAGINE */}
              <div className="w-full h-48 rounded-lg overflow-hidden mb-4 bg-white border border-gray-300">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
              </div>

              {/* TITLU */}
              <h3 className="text-lg font-semibold mb-1">{prod.name}</h3>

              {/* PREȚ */}
              <p className="text-green-600 font-bold text-lg mb-1">{prod.price} lei</p>

              {/* STOC */}
              <p className="text-xs opacity-70 mb-2">{prod.stock}</p>

              {/* RATING */}
              <p className="text-yellow-500 text-sm mb-2">★★★★★</p>

              {/* CTA */}
              <button className="w-full p-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition">
                Adaugă în coș
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* LOAD MORE */}
      <div className="flex justify-center mt-10">
        <button className="px-6 py-3 bg-gray-200 border border-gray-300 rounded-lg text-sm hover:bg-gray-300 transition">
          Încarcă mai multe
        </button>
      </div>

      {/* DESCRIERE SEO FINALĂ */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2">Despre această categorie</h2>
        <p className="text-sm opacity-70 max-w-3xl leading-relaxed">
          Această pagină conține toate categoriile de produse disponibile în magazinul tău.
          Fiecare categorie este optimizată pentru o navigare rapidă, filtre eficiente și
          o experiență de cumpărături modernă. Actualizăm constant produsele pentru a oferi
          cele mai noi tehnologii și cele mai bune oferte.
        </p>
      </section>
    </main>
  );
}
