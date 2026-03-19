import React from "react";
import "./contact.css";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <button className="back-btn" onClick={() => history.back()}>
          ← Înapoi
        </button>

        <h1 className="contact-title">Contact</h1>
        <p className="contact-subtitle">
          Ai întrebări, idei sau feedback? Scrie-mi un mesaj.
        </p>

        <form className="contact-form">
          <input
            type="text"
            placeholder="Numele tău"
            className="contact-input"
          />

          <input
            type="email"
            placeholder="Email"
            className="contact-input"
            defaultValue="gospodariupaul@gmail.com"
          />

          <input
            type="text"
            placeholder="Subiect"
            className="contact-input"
          />

          <textarea
            placeholder="Mesajul tău..."
            className="contact-input contact-textarea"
          />

          <button type="submit" className="contact-btn">
            Trimite mesaj
          </button>
        </form>
      </div>
    </div>
  );
}
