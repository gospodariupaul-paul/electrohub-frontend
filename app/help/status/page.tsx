"use client";

import React from "react";
import "./status.css";

export default function StatusPage() {
  return (
    <div className="status-page">
      <div className="status-card">
        <button className="back-btn" onClick={() => history.back()}>
          ← Înapoi
        </button>

        <h1 className="status-title">Status Platformă</h1>
        <p className="status-subtitle">
          Verifică starea actuală a serviciilor ElectroHub.
        </p>

        <div className="status-section">
          <h3 className="status-heading">Servere</h3>
          <p className="status-text">Toate serverele funcționează normal.</p>
        </div>

        <div className="status-section">
          <h3 className="status-heading">Autentificare</h3>
          <p className="status-text">Serviciul de login este operațional.</p>
        </div>

        <div className="status-section">
          <h3 className="status-heading">Bază de date</h3>
          <p className="status-text">Conexiunea la baza de date este stabilă.</p>
        </div>

        <div className="status-section">
          <h3 className="status-heading">API</h3>
          <p className="status-text">Toate endpoint-urile răspund corect.</p>
        </div>

      </div>
    </div>
  );
}
