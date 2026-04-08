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
  oldPrice?: number;
  images: string[];
  tag?: string;
  rating?: number;
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
            className="w-[260px] h-[500px] bg-white/5 border border-white/10 rounded-xl animate-pulse"
          >
            <div className="w-full h-[280px] bg-white/10 rounded-t-xl" />
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
      <audio id="hoverSound" src="/sounds/hover.mp3" preload="auto" />
      <audio id="clickSound" src="/sounds/click.mp3" preload="auto" />

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{ delay: 2000 }}
        speed={900}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 200,
          modifier: 2.4,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="w-full max-w-6xl mx-auto"
      >
        {products.map((p) => (
          <SwiperSlide
            key={p.id}
            className="
              w-[260px] h-[500px] 
              bg-white/5 border border-white/10 
              rounded-xl overflow-hidden backdrop-blur-md shadow-xl 
              flex flex-col relative
              transition-all duration-500 
              hover:scale-[1.08] hover:rotate-[1.5deg]
              hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]
            "
            onMouseEnter={() => document.getElementById("hoverSound")?.play()}
          >

            {/* ⚡ Efect electric pe margini la hover */}
            <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 hover:opacity-70 transition-all duration-700 bg-[conic-gradient(from_0deg,cyan,transparent,cyan)] animate-spin-slow" />

            <Link href={`/product/${p.id}`} className="flex flex-col h-full relative z-10">

              {/* 🌈 Badge cu gradient animat */}
              {p.tag && (
                <span className="absolute top-2 left-2 text-black text-xs font-bold px-2 py-1 rounded bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-x">
                  {p.tag}
                </span>
              )}

              {/* Imagine cu reflexii animate */}
              <div className="w-full h-[280px] relative overflow-hidden">
                <img
                  src={p.images?.[0] ?? "/no-image.png"}
                  alt={p.name}
                  className="w-full h-full object-cover rounded-t-xl"
                />

                {/* Reflexie animată */}
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)] animate-reflect" />

                {/* Particule electrice TURBO */}
                <div className="absolute inset-0 pointer-events-none animate-electric-particles" />
              </div>

              {/* Text + Preț + Rating + Buton */}
              <div className="p-4 text-center flex flex-col gap-3">

                {/* Glow neon pe text */}
                <p className="font-semibold text-white text-sm leading-tight line-clamp-2 drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]">
                  {p.name}
                </p>

                {/* 🔄 Preț cu animație flip/slide */}
                <div className="flex justify-center items-center gap-2">
                  <p className="text-cyan-400 font-bold text-xl tracking-wide animate-flip">
                    {p.price} lei
                  </p>

                  {p.oldPrice && (
                    <p className="text-white/40 line-through text-sm animate-slide-up">
                      {p.oldPrice} lei
                    </p>
                  )}
                </div>

                {/* ⭐ Stele animate */}
                <div className="flex justify-center gap-1 text-yellow-400 text-sm">
                  {Array.from({ length: p.rating ?? 4 }).map((_, i) => (
                    <span key={i} className="animate-star-pulse">★</span>
                  ))}
                </div>

                {/* 🌊 Buton cu animație ripple + glow electric la click */}
                <button
                  className="
                    mt-2 px-4 py-2 
                    bg-cyan-600/30 border border-cyan-400/40 
                    rounded-lg text-sm text-cyan-300 
                    relative overflow-hidden
                    hover:bg-cyan-600/60 hover:border-cyan-300 
                    hover:shadow-[0_0_15px_rgba(0,255,255,0.9)]
                    transition-all duration-300
                    active:shadow-[0_0_25px_rgba(0,255,255,1)]
                  "
                  onClick={(e) => {
                    document.getElementById("clickSound")?.play();

                    const ripple = document.createElement("span");
                    ripple.className =
                      "absolute w-20 h-20 bg-cyan-400/40 rounded-full animate-ripple";
                    ripple.style.left = `${e.nativeEvent.offsetX - 40}px`;
                    ripple.style.top = `${e.nativeEvent.offsetY - 40}px`;
                    e.currentTarget.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                  }}
                >
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
