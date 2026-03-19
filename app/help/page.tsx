"use client";

import React from "react";
import Link from "next/link";
import "./help.css";

export default function HelpPage() {
  return (
    <div className="help-page">
      <div className="help-card">

        <h1 className="help-title">Centrul de Ajutor</h1>
        <p className="help-subtitle">
          Alege o secțiune pentru a găsi informațiile de care ai nevoie.
        </p>

        <div className="help-links">

          <Link href="/help/faq" className="help-link">
            Întrebări frecvente (FAQ)
          </Link>

          <Link href="/help/contact" className="help-link">
            Contact
          </Link>

          <Link href="/help/policies" className="help-link">
            Politici & Termeni
          </Link>

          <Link href="/help/status" className="help-link">
            Status Platformă
          </Link>

        </div>
      </div>
    </div>
  );
}
