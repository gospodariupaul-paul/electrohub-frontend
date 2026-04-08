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
  oldPrice?: number; // ⭐ preț vechi
  images: string[];
  tag?: string; // Nou, Hot Deal, Best Seller
  rating?: number; // 1–5 stele
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

  // ⭐ Skeleton Loading Premium
  if (loading) {
    return (
      <div className="w-full py-10 flex justify-center gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-[240px] h-[450px] bg-white/5 border border-white/10 rounded-xl animate-pulse"
          >
            <div className="w-full h-[260px] bg-white/10 rounded-t-xl" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-white/10 rounded" />
              <div className="h-4 bg-white/10 rounded w-1/2" />
              <div className="h-8 bg-white/10 rounded" />
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
        autoplay={{ delay: 2200 }}
        speed={900}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 180,
          modifier: 2.2,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="w-full max-w-5xl mx-auto"
      >
        {products.map((p) => (
          <SwiperSlide
            key={p.id}
            className="
              w-[240px] h-[450px] 
              bg-white/5 border border-white/10 
              rounded-xl overflow-hidden backdrop-blur-md shadow-xl 
              flex flex-col relative
              transition-all duration-300 
              hover:scale-[1.05] hover:shadow-cyan-500/40 hover:border-cyan-400/40
            "
          >

            {/* ⭐ Gradient neon pe margini */}
            <div className="absolute inset-0 rounded-xl pointer-events-none opacity-40 bg-gradient-to-br from-cyan-500/40 via-transparent to-purple-500/40 animate-pulse" />

            <Link href={`/product/${p.id}`} className="flex flex-col h-full relative z-10">

              {/* ⭐ Badge animat */}
              {p.tag && (
                <span className="absolute top-2 left-2 bg-cyan-500 text-black text-xs font-bold px-2 py-1 rounded animate-bounce">
                  {p.tag}
                </span>
              )}

              {/* ⭐ Imagine pătrată */}
              <div className="w-full h-[260px] relative">
                <img
                  src={p.images?.[0] ?? "/no-image.png"}
                  alt={p.name}
                  className="w-full h-full object-cover rounded-t-xl"
                />

                {/* ⭐ Efect electric animat continuu */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,255,255,0.25)_0%,transparent_70%)] animate-ping opacity-20" />
              </div>

              {/* ⭐ Nume + Preț + Rating + Reduceri */}
              <div className="p-4 text-center flex flex-col gap-2">

                {/* ⭐ Glow neon pe text */}
                <p className="font-semibold text-white text-sm leading-tight line-clamp-2 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]">
                  {p.name}
                </p>

                {/* ⭐ Preț + Preț vechi */}
                <div className="flex justify-center items-center gap-2">
                  <p className="text-cyan-400 font-bold text-lg tracking-wide">
                    {p.price} lei
                  </p>

                  {p.oldPrice && (
                    <p className="text-white/40 line-through text-sm">
                      {p.oldPrice} lei
                    </p>
                  )}
                </div>

                {/* ⭐ Rating cu stele */}
                <div className="flex justify-center gap-1 text-yellow-400 text-sm">
                  {Array.from({ length: p.rating ?? 4 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* ⭐ Buton Adaugă în coș cu efect electric */}
                <button className="
                  mt-2 px-4 py-2 
                  bg-cyan-600/30 border border-cyan-400/40 
                  rounded-lg text-sm text-cyan-300 
                  hover:bg-cyan-600/60 hover:border-cyan-300 
                  hover:shadow-[0_0_12px_rgba(0,255,255,0.8)]
                  transition-all duration-300
                ">
                  Adaugă în coș
                </button>

              </div>

            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
