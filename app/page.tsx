"use client";

import Image from "next/image";
import { FaGoogle, FaGithub, FaApple, FaYahoo } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white flex flex-col">

      {/* HERO SECTION */}
      <section className="relative flex-1 flex items-center justify-center px-6 py-20">

        {/* BACKGROUND IMAGE */}
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920"
          alt="Electronics Background"
          fill
          className="object-cover opacity-30"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

        {/* CONTENT */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            GOSPO Electro Hub
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10">
            Platforma futuristă pentru gestionarea electronicelor, utilizatorilor și categoriilor.
          </p>

          {/* LOGIN BUTTONS */}
          <div className="flex flex-col gap-4 max-w-sm mx-auto">

            <LoginButton
              icon={<FaGoogle className="text-xl" />}
              label="Continuă cu Google"
              color="bg-red-500/20 hover:bg-red-500/40"
            />

            <LoginButton
              icon={<FaGithub className="text-xl" />}
              label="Continuă cu GitHub"
              color="bg-gray-500/20 hover:bg-gray-500/40"
            />

            <LoginButton
              icon={<FaApple className="text-xl" />}
              label="Continuă cu Apple"
              color="bg-white/10 hover:bg-white/20"
            />

            <LoginButton
              icon={<FaYahoo className="text-xl" />}
              label="Continuă cu Yahoo"
              color="bg-purple-500/20 hover:bg-purple-500/40"
            />

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} GOSPO Electro Hub — All rights reserved.
      </footer>
    </div>
  );
}

function LoginButton({ icon, label, color }) {
  return (
    <button
      className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl border border-white/10 transition ${color}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}
