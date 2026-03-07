"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setOpen(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie_consent", "all");
    setOpen(false);
  };

  const acceptSelection = () => {
    localStorage.setItem("cookie_consent", "selection");
    setOpen(false);
  };

  const rejectAll = () => {
    localStorage.setItem("cookie_consent", "none");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up
                 bg-[#050712]/95 backdrop-blur-xl border-t border-cyan-500/20
                 p-6 text-white shadow-[0_-10px_40px_rgba(0,255,255,0.15)]"
    >
      <h2 className="text-xl font-bold mb-2 text-cyan-300">
        Acest site folosește cookie-uri
      </h2>

      <p className="text-sm text-white/70 mb-4">
        Site-ul nostru folosește cookie-uri care îmbunătățesc funcționalitatea și sunt
        inofensive. Acestea sunt stocate pe dispozitivul tău până la ștergere. Poți afla
        mai multe și îți poți ajusta browserul consultând secțiunile pentru diferitele
        categorii de cookie-uri.
      </p>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-cyan-400 hover:text-cyan-300 text-sm mb-3"
      >
        {showDetails ? "Ascunde detalii ▲" : "Afișează detalii ▼"}
      </button>

      {showDetails && (
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4
                     bg-white/5 p-4 rounded-xl border border-white/10 animate-fade-in"
        >
          <div>
            <p className="font-semibold text-cyan-300">Necesare</p>
            <p className="text-white/50 text-xs">Funcționarea de bază a site-ului.</p>
          </div>
          <div>
            <p className="font-semibold text-cyan-300">Preferințe</p>
            <p className="text-white/50 text-xs">Salvarea setărilor tale.</p>
          </div>
          <div>
            <p className="font-semibold text-cyan-300">Statistici</p>
            <p className="text-white/50 text-xs">Analiză anonimă a traficului.</p>
          </div>
          <div>
            <p className="font-semibold text-cyan-300">Marketing</p>
            <p className="text-white/50 text-xs">Personalizarea reclamelor.</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={acceptAll}
          className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg"
        >
          Permite toate
        </button>

        <button
          onClick={acceptSelection}
          className="px-5 py-2 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/10 rounded-lg"
        >
          Permite selecția
        </button>

        <button
          onClick={rejectAll}
          className="px-5 py-2 border border-red-500 text-red-400 hover:bg-red-500/10 rounded-lg"
        >
          Respinge toate
        </button>
      </div>

      {/* ANIMAȚII */}
      <style jsx>{`
        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
