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
  tag?: string;
}

export default function HotDealsCarousel() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!API_URL) return;

    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        const items = res.data.slice(0, 6);
        setProducts(items);
      })
      .catch(() => {});
  }, []);

  if (products.length === 0) {
    return (
      <p className="text-white/40 text-center py-10">
        Se încarcă ofertele...
      </p>
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
            className="w-[260px] h-[340px] bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-xl"
          >
            <Link href={`/product/${p.id}`}>
              <div className="w-full h-full flex flex-col">

                {/* 🔥 IMAGINEA CORECTĂ, COMPLET VIZIBILĂ */}
                <img
                  src={p.images?.[0] ?? "/no-image.png"}
                  alt={p.name}
                  className="w-full h-40 object-contain bg-black rounded-t-xl"
                />

                <div className="p-4 flex flex-col gap-2">
                  {p.tag && (
                    <span className="text-xs text-cyan-300 font-semibold">
                      {p.tag}
                    </span>
                  )}

                  <p className="font-semibold text-white">{p.name}</p>

                  <p className="text-cyan-400 font-bold text-lg">
                    {p.price} lei
                  </p>

                  <button className="mt-auto px-3 py-2 bg-cyan-600/30 border border-cyan-400/40 rounded-lg text-sm hover:bg-cyan-600/50 transition">
                    Adaugă în coș
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
