"use client";

import React from "react";
import "./policies.css";

export default function PoliciesPage() {
  return (
    <div className="policies-page">
      <div className="policies-card">
        <button className="back-btn" onClick={() => history.back()}>
          ← Înapoi
        </button>

        <h1 className="policies-title">Politici & Termeni</h1>
        <p className="policies-subtitle">
          Aici poți citi regulile, termenii și politicile platformei.
        </p>

        <div className="policies-section">
          <h3 className="policies-heading">1. Politica de confidențialitate</h3>
          <p className="policies-text">
            Respectăm confidențialitatea utilizatorilor și nu distribuim datele personale către terți fără acordul acestora.
          </p>
        </div>

        <div className="policies-section">
          <h3 className="policies-heading">2. Termeni și condiții</h3>
          <p className="policies-text">
            Prin utilizarea platformei, ești de acord cu termenii noștri privind utilizarea serviciilor și responsabilitățile utilizatorilor.
          </p>
        </div>

        <div className="policies-section">
          <h3 className="policies-heading">3. Politica de utilizare</h3>
          <p className="policies-text">
            Este interzisă folosirea platformei în scopuri ilegale, frauduloase sau abuzive.
          </p>
        </div>

        <div className="policies-section">
          <h3 className="policies-heading">4. Politica de securitate</h3>
          <p className="policies-text">
            Implementăm măsuri tehnice pentru protejarea datelor și prevenirea accesului neautorizat.
          </p>
        </div>

      </div>
    </div>
  );
}
