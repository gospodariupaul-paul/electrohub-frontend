"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

export default function SellerProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://electrohub-backend-1-10qa.onrender.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Eroare la încărcarea produsului:", err);
        setLoading(false);
      });
  }, [id]);

  // 🔥 EXACT CA PE OLX
  const startConversation = async () => {
    const token = localStorage.getItem("token");

    // 1️⃣ Dacă nu e logat → trimite-l la login
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      // 2️⃣ Creează conversația în backend
      const res = await fetch(
        "https://electrohub-backend-1-10qa.onrender.com/conversations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔥 token trimis corect
          },
          body: JSON.stringify({ productId: product.id }),
        }
      );

      if (!res.ok) {
        console.error("Eroare backend:", await res.text());
        return;
      }

      const data = await res.json();

      // 3️⃣ Trimite-l în chat cu conversationId VALID
      router.push(`/chat/${data.id}`);
    } catch (err) {
      console.error("Eroare creare conversație:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Se încarcă...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Produsul nu a fost găsit.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] to-[#4c1d95] text-white p-6">
      <Link href="/" className="text-cyan-300 text-lg font-semibold">
        ← Înapoi în homepage
      </Link>

      <div className="max-w-4xl mx-auto mt-6 bg-white/10 p-6 rounded-2xl backdrop-blur-lg shadow-xl space-y-8">
        {product.images && product.images.length > 0 && (
          <div className="w-full max-w-3xl mx-auto">
            <Swiper
              modules={[Navigation, Pagination, Thumbs]}
              navigation
              pagination={{ clickable: true }}
              className="rounded-2xl overflow-hidden"
            >
              {product.images.map((img: string, index: number) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-4">
              <Swiper
                modules={[Thumbs]}
                slidesPerView={4}
                spaceBetween={10}
                watchSlidesProgress
                className="rounded-xl"
              >
                {product.images.map((img: string, index: number) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      className="w-full h-20 object-cover rounded-lg border border-white/20 hover:border-cyan-400 transition"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}

        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-3xl text-green-400 font-semibold mb-4">
            {product.price} lei
          </p>
          <p className="text-white/80 text-lg mb-6">{product.description}</p>
        </div>

        <div className="bg-black/30 p-4 rounded-xl mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Vândut de: {product.user?.name}
          </h2>
          <p className="text-white/70 mb-1">Email: {product.user?.email}</p>
          <p className="text-white/70 mb-3">ID vânzător: {product.user?.id}</p>

          <Link
            href={`/user/${product.user?.id}`}
            className="text-cyan-300 underline"
          >
            Vezi profilul vânzătorului →
          </Link>
        </div>

        <div className="flex gap-4">
          <button
            onClick={startConversation}
            className="px-5 py-3 bg-blue-500 rounded-xl font-semibold"
          >
            Trimite mesaj
          </button>

          <a
            href={`mailto:${product.user?.email}`}
            className="px-5 py-3 bg-green-500 rounded-xl font-semibold"
          >
            Contactează vânzătorul
          </a>
        </div>
      </div>
    </div>
  );
}
