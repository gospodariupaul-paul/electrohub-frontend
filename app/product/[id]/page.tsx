"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// Swiper (slider poze)
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function PublicProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(`/products/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Eroare la încărcarea produsului:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [productId]);

  const startChat = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await axiosInstance.post("/chat/start", {
        productId,
        sellerId: product.userId,
      });

      router.push(`/chat/${res.data.conversationId}`);
    } catch (error) {
      console.error("Eroare la inițierea conversației:", error);
      alert("Nu s-a putut deschide chatul.");
    }
  };

  if (loading) {
    return <p className="p-6 text-white opacity-70">Se încarcă produsul...</p>;
  }

  if (!product) {
    return <p className="p-6 text-white opacity-70">Produsul nu există.</p>;
  }

  return (
    <div className="p-6 text-white max-w-3xl mx-auto space-y-6">

      {/* ⭐ SLIDER POZE */}
      {product.images && product.images.length > 0 && (
        <Swiper navigation modules={[Navigation]} className="rounded-xl">
          {product.images.map((img: string, index: number) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={product.name}
                className="w-full h-80 object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Titlu + Preț */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <span className="text-2xl font-bold text-cyan-400">
          {product.price} lei
        </span>
      </div>

      {/* Descriere */}
      <p className="opacity-80">{product.description}</p>

      {/* ⭐ Vânzător */}
      <div className="p-4 bg-[#070a20] border border-white/10 rounded-xl space-y-4">

        {/* Poză + nume */}
        <div className="flex items-center gap-4">
          <img
            src={product.userAvatar || "/default-avatar.png"}
            className="w-16 h-16 rounded-full object-cover border border-white/10"
          />
          <div>
            <p className="opacity-70 text-sm">Vândut de:</p>
            <p className="text-lg font-semibold">{product.userName}</p>

            {/* ⭐ Rating */}
            <p className="text-yellow-400 text-sm">
              ⭐ {product.userRating || 0} / 5
            </p>
          </div>
        </div>

        {/* ⭐ Număr total de anunțuri */}
        <p className="opacity-70 text-sm">
          {product.userTotalProducts} anunțuri publicate
        </p>

        {/* ⭐ Link către pagina vânzătorului */}
        <Link
          href={`/seller/${product.userId}`}
          className="text-cyan-400 hover:underline text-sm"
        >
          Vezi profilul vânzătorului →
        </Link>
      </div>

      {/* ⭐ Buton chat */}
      <button
        onClick={startChat}
        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold"
      >
        Trimite mesaj
      </button>

      {/* ⭐ Buton sună vânzătorul */}
      {product.userPhone && (
        <a
          href={`tel:${product.userPhone}`}
          className="w-full block text-center py-3 bg-green-600 hover:bg-green-500 rounded-lg font-semibold"
        >
          Sună vânzătorul
        </a>
      )}
    </div>
  );
}
