"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  tag?: string; // Nou, Hot Deal, Best Seller
}

export default function HotDealsCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!API_URL) return;

    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        const items = res.data.slice(0, 6);
        setProducts(items);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔥 Skeleton Loading Premium
  if (loading) {
    return (
      <div className="w-full py-10 flex justify-center gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-[240px] h-[380px] bg-white/5 border border-white/10 rounded-xl animate-pulse"
          >
            <div className="w-full h-[240px] bg-white/10 rounded-t-xl" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-white/10 rounded" />
              <div className="h-4 bg-white/10 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full py-10">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{ delay: 2500 }}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 150,
          modifier: 2,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="w-full max-w-5xl mx-auto"
      >
        {products.map((p) => (
          <SwiperSlide
            key={p.id}
            className="w-[240px] h-[380px] bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-xl flex flex-col transition-all duration-300 hover:scale-[1.04] hover:shadow-cyan-500/40 hover:border-cyan-400/40"
          >
            <Link href={`/product/${p.id}`} className="flex flex-col h-full">

              {/* 🔥 BADGE DINAMIC */}
              {p.tag && (
                <span className="absolute z-10 top-2 left-2 bg-cyan-500 text-black text-xs font-bold px-2 py-1 rounded">
                  {p.tag}
                </span>
              )}

              {/* 🔥 IMAGINE PĂTRATĂ FULL-COVER */}
              <div className="w-full h-[240px] relative">
                <img
                  src={p.images?.[0] ?? "/no-image.png"}
                  alt={p.name}
                  className="w-full h-full object-cover rounded-t-xl"
                />

                {/* Efect electric subtil */}
                <div className="absolute inset-0 opacity-0 hover:opacity-20 transition bg-[radial-gradient(circle,rgba(0,255,255,0.4)_0%,transparent_70%)]" />
              </div>

              {/* 🔥 NUME + PREȚ */}
              <div className="p-4 text-center flex flex-col gap-2">
                <p className="font-semibold text-white text-sm leading-tight line-clamp-2">
                  {p.name}
                </p>

                <p className="text-cyan-400 font-bold text-lg tracking-wide">
                  {p.price} lei
                </p>
              </div>

            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
