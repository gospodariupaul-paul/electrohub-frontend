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
            className="w-[300px] h-[300px] bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-xl flex flex-col"
          >
            <Link href={`/product/${p.id}`} className="flex flex-col h-full">

              {/* 🔥 IMAGINE PĂTRATĂ FULL-COVER */}
              <div className="w-full h-[300px]">
                <img
                  src={p.images?.[0] ?? "/no-image.png"}
                  alt={p.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔥 TEXT SUB CARUSEL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-5xl mx-auto">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="text-center bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-400 transition"
          >
            <p className="font-semibold text-white">{p.name}</p>
            <p className="text-cyan-400 font-bold text-lg">{p.price} lei</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
