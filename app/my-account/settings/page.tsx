"use client";

import Link from "next/link";
import { FiUser, FiBell, FiLock, FiCreditCard, FiHelpCircle, FiInfo, FiMapPin } from "react-icons/fi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { RiWallet3Line } from "react-icons/ri";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">

      <h1 className="text-3xl font-bold mb-6">Setări</h1>

      {/* 🔙 BUTON ÎNAPOI */}
      <a
        href="/my-account/profile"
        className="inline-block mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
      >
        ← Înapoi la profil
      </a>

      {/* 1. Cont și Profil */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Cont și Profil</h2>
        <div className="space-y-3">

          <SettingCard
            icon={<FiUser />}
            title="Editare profil"
            desc="Modifică numele, poza de profil, emailul și numărul de telefon."
            href="/my-account/settings/profile"
          />

          <SettingCard
            icon={<FiLock />}
            title="Schimbare parolă"
            desc="Actualizează parola și verifică activitatea recentă."
            href="/my-account/settings/security"
          />

          <SettingCard
            icon={<FiMapPin />}
            title="Adrese salvate"
            desc="Gestionează adresele pentru livrare și ridicare."
            href="/my-account/settings/addresses"
          />

          <SettingCard
            icon={<MdOutlineVerifiedUser />}
            title="Verificare cont"
            desc="Verifică emailul sau numărul de telefon pentru siguranță."
            href="/my-account/settings/verification"
          />

        </div>
      </section>

      {/* 2. Notificări */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Notificări</h2>
        <div className="space-y-3">

          <SettingCard
            icon={<FiBell />}
            title="Setări notificări"
            desc="Mesaje noi, actualizări anunțuri, căutări salvate și promoții."
            href="/my-account/settings/notifications"
          />

        </div>
      </section>

      {/* 3. Livrare și Plată */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Livrare și Plată</h2>
        <div className="space-y-3">

          <SettingCard
            icon={<FiCreditCard />}
            title="Metode de plată"
            desc="Gestionează cardurile salvate pentru plăți rapide."
            href="/my-account/settings/payments"
          />

          <SettingCard
            icon={<RiWallet3Line />}
            title="Portofel electronic"
            desc="Vezi soldul, tranzacțiile și opțiunile de încărcare."
            href="/my-account/settings/wallet"
          />

          <SettingCard
            icon={<FiMapPin />}
            title="Setări livrare"
            desc="Curieri preferați și opțiuni implicite de livrare."
            href="/my-account/settings/shipping"
          />

        </div>
      </section>

      {/* 4. Securitate și Confidențialitate */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Securitate și Confidențialitate</h2>
        <div className="space-y-3">

          <SettingCard
            icon={<FiLock />}
            title="Confidențialitate"
            desc="Blocare utilizatori, GDPR, date personale."
            href="/my-account/settings/privacy"
          />

          <SettingCard
            icon={<FiInfo />}
            title="Termeni și condiții"
            desc="Regulile platformei și politica de confidențialitate."
            href="/legal/terms"
          />

        </div>
      </section>

      {/* 5. Suport */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Suport și Ajutor</h2>
        <div className="space-y-3">

          <SettingCard
            icon={<FiHelpCircle />}
            title="Centru de ajutor"
            desc="Întrebări frecvente și articole utile."
            href="/help"
          />

          <SettingCard
            icon={<FiHelpCircle />}
            title="Contactează-ne"
            desc="Formular de suport sau raportare problemă."
            href="/support/contact"
          />

        </div>
      </section>

      {/* 6. General */}
      <section>
        <h2 className="text-xl font-semibold mb-3">General</h2>
        <div className="space-y-3">

          <SettingCard
            icon={<FiInfo />}
            title="Despre aplicație"
            desc="Versiune, informații companie și actualizări."
            href="/my-account/settings/general"
          />

          <SettingCard
            icon={<FiLock />}
            title="Deconectare"
            desc="Ieși din contul tău."
            href="/logout"
          />

        </div>
      </section>

    </div>
  );
}

function SettingCard({ icon, title, desc, href }) {
  return (
    <Link
      href={href}
      className="flex items-start gap-4 p-4 bg-[#0f172a] border border-white/10 rounded-xl hover:bg-white/5 transition"
    >
      <div className="text-2xl text-cyan-400">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>
    </Link>
  );
}
