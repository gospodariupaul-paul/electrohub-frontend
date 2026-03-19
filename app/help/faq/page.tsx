"use client";

import React from "react";
import "./faq.css";

export default function FAQPage() {
  return (
    <div className="faq-page">
      <div className="faq-card">
        <button className="back-btn" onClick={() => history.back()}>
          ← Înapoi
        </button>

        <h1 className="faq-title">Întrebări frecvente</h1>
        <p className="faq-subtitle">
          Aici găsești răspunsuri la cele mai comune întrebări.
        </p>

        <div className="faq-list">

          <div className="faq-item">
            <h3 className="faq-question">Cum pot crea un cont?</h3>
            <p className="faq-answer">
              Apasă pe butonul „Înregistrare” din meniul principal și completează formularul.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">Cum pot schimba parola?</h3>
            <p className="faq-answer">
              Mergi la secțiunea „Setări cont” și selectează opțiunea „Schimbă parola”.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">Cum pot contacta suportul?</h3>
            <p className="faq-answer">
              Poți folosi pagina de contact sau ne poți scrie direct pe email.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
